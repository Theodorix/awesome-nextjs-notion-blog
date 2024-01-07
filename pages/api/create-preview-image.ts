import { NextApiRequest, NextApiResponse } from 'next'

import got from 'got'
import lqip from 'lqip-modern'

// import { isPreviewImageSupportEnabled } from '@lib/config'
import * as types from '@lib/types'
import * as db from '@lib/db'

/**
 * 这个文件的核心功能是提供一个API接口，允许其他服务或应用发送图像的URL和ID，
 * 然后该服务将创建一个低质量的图像预览，这通常用于加快页面加载速度，提高用户体验，
 * 因为低质量的图像占位符比原图像加载得更快。同时，它还将这些信息存储在数据库中以供以后使用，
 * 如果预览图已经存在，则直接返回现有数据以减少重复的工作负载。
 */

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  console.log('create-preview-image: method:', req.method)

  if (req.method !== 'POST') {
    return res
      .status(405)
      .send({ error: 'create-preview-image: method not allowed' })
  }

  // Debug vercel build error (probably race condition)
  // if (!isPreviewImageSupportEnabled) {
  //   return res.status(418).send({
  //     error: 'preview image support has been disabled for this deployment'
  //   })
  // }

  const { url, id } = req.body

  const result = await createPreviewImage(url, id)

  res.setHeader(
    'Cache-Control',
    result.error
      ? 'public, s-maxage=60, max-age=60, stale-while-revalidate=60'
      : 'public, immutable, s-maxage=31536000, max-age=31536000, stale-while-revalidate=60'
  )
  res.status(200).json(result)
}

export async function createPreviewImage(
  url: string,
  id: string
): Promise<types.PreviewImage> {
  console.log('createPreviewImage lambda', { url, id })
  const doc = db.images.doc(id)

  try {
    const model = await doc.get()
    if (model.exists) {
      return model.data() as types.PreviewImage
    }

    const { body } = await got(url, { responseType: 'buffer' })
    const result = await lqip(body)
    console.log('lqip', result.metadata)

    const image = {
      url,
      originalWidth: result.metadata.originalWidth,
      originalHeight: result.metadata.originalHeight,
      width: result.metadata.width,
      height: result.metadata.height,
      type: result.metadata.type,
      dataURIBase64: result.metadata.dataURIBase64
    }

    await doc.create(image)
    return image
  } catch (err) {
    console.error('lqip error', err)

    try {
      const error: any = {
        url,
        error: err.message || 'unknown error'
      }

      if (err?.response?.statusCode) {
        error.statusCode = err?.response?.statusCode
      }

      await doc.create(error)
      return error
    } catch (err) {
      // ignore errors
      console.error(err)
    }
  }
}
