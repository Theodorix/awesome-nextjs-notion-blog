import React from 'react'
import Head from 'next/head'
import * as Fathom from 'fathom-client'

export function ClientRedirect({ url }) {
  // 从传入的URL中提取域名
  const domain = new URL(url).hostname

  // 使用React的Effect Hook来追踪页面视图，通常用于分析或统计
  React.useEffect(() => {
    Fathom.trackPageview()
  }, [])

  return (
    <>
      <Head>
      {/* 设置页面标题为 "Redirecting 域名…" */}
        <title>Redirecting {domain}…</title>
        {/* 使用<meta>标签进行重定向，0秒后将页面跳转至指定URL */}
        <meta httpEquiv='refresh' content={`0; URL=${url}`} />
        {/* 设置页面的规范URL */}
        <link rel='canonical' href={`${url}`} />
      </Head>
      <div
        style={{
          color: '#383838',
          fontFamily: "'Menlo', 'Monaco', Courier, monospace",
          fontSize: '0.8em',
          display: 'flex',
          height: '90vh',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* 显示正在重定向至特定域名的信息 */}
        Redirecting to {domain}…
      </div>
    </>
  )
}
