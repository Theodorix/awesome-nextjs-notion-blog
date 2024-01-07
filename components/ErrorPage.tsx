import React from 'react'
import Head from 'next/head'
import { PageHead } from './PageHead'

import styles from './styles.module.css'

/**
 * 这个组件用于渲染一个简单的错误页面，包含错误信息和一个错误图片，
 * 以便用户在访问出错时能够明确了解发生了什么问题。同时，它也包含了一些页面头部的设置，
 * 用于社交分享时显示正确的页面信息。
 */

// 定义一个React函数组件 ErrorPage，接受一个包含 statusCode 属性的对象作为参数
export const ErrorPage: React.FC<{ statusCode: number }> = ({ statusCode }) => {
  // 定义页面的标题
  const title = 'Error'

  return (
    <>
      {/* 使用 PageHead 组件，该组件可能包含页面头部的其他设置 */}
      <PageHead />

      <Head>
        {/* 设置 Open Graph 标签，用于社交分享时显示页面信息 */}
        <meta property='og:site_name' content={title} />
        <meta property='og:title' content={title} />

        {/* 设置页面的标题 */}
        <title>{title}</title>
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
          {/* 显示错误页面的标题 */}
          <h1>Error Loading Page</h1>

          {/* 如果有指定的 statusCode，显示错误代码 */}
          {statusCode && <p>Error code: {statusCode}</p>}

          {/* 显示一个错误图片 */}
          <img src='/error.png' alt='Error' className={styles.errorImage} />
        </main>
      </div>
    </>
  )
}
