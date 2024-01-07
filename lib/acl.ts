import { PageProps } from './types'

// 定义pageAcl函数，用于处理页面的访问控制
export async function pageAcl({
  site,
  recordMap,
  pageId
}: PageProps): Promise<PageProps> {
  // 检查是否存在site，如果不存在则返回404错误
  if (!site) {
    return {
      error: {
        statusCode: 404,
        message: 'Unable to resolve notion site'
      }
    }
  }

  // 检查是否存在recordMap，如果不存在则返回404错误
  if (!recordMap) {
    return {
      error: {
        statusCode: 404,
        message: `Unable to resolve page for domain "${site.domain}". Notion page "${pageId}" not found.`
      }
    }
  }

  // 获取recordMap中的block的所有键
  const keys = Object.keys(recordMap.block)
  const rootKey = keys[0]

  // 检查是否存在有效的rootKey，如果不存在则返回404错误
  if (!rootKey) {
    return {
      error: {
        statusCode: 404,
        message: `Unable to resolve page for domain "${site.domain}". Notion page "${pageId}" invalid data.`
      }
    }
  }

  // 获取rootKey对应的block的值
  const rootValue = recordMap.block[rootKey]?.value
  const rootSpaceId = rootValue?.space_id

  // 检查页面所属的Notion空间是否与site配置中的一致，如果不一致则返回404错误
  if (
    rootSpaceId &&
    site.rootNotionSpaceId &&
    rootSpaceId !== site.rootNotionSpaceId
  ) {
    if (process.env.NODE_ENV) {
      return {
        error: {
          statusCode: 404,
          message: `Notion page "${pageId}" doesn't belong to the Notion workspace owned by "${site.domain}".`
        }
      }
    }
  }
}
