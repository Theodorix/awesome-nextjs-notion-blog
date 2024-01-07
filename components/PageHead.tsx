import Head from 'next/head'
import * as React from 'react'
import * as types from 'lib/types'

// TODO: remove duplication between PageHead and NotionPage Head

/**
 * PageHead 组件用于管理页面的头部信息，包括字符集、视口设置、描述等元数据。
 *
 * @param {Object} props - 包含一个名为 "site" 的属性，表示包含网站信息的对象。
 * @returns {JSX.Element} - 返回包含页面头部信息的 React 元素。
 */

export const PageHead: React.FC<types.PageProps> = ({ site }) => {
  return (
    <Head>
      {/* 设置字符集为 UTF-8 */}
      <meta charSet='utf-8' />
      <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
      {/* 设置移动设备的视口信息 */}
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, shrink-to-fit=no'
      />

      {/* 如果提供了网站描述信息，则添加对应的元数据 */}
      {site?.description && (
        <>
          <meta name='description' content={site.description} />
          <meta property='og:description' content={site.description} />
        </>
      )}

      {/* 设置网站的主题颜色 */}
      <meta name='theme-color' content='#EB625A' />
      
      {/* 设置 Open Graph 类型为网站 */}
      <meta property='og:type' content='website' />
    </Head>
  )
}
