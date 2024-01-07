import Head from 'next/head'
import * as React from 'react'
import * as types from 'lib/types'
import { PageHead } from './PageHead'
import { domain } from 'site.config'

import styles from './styles.module.css'


export const Page404: React.FC<types.PageProps> = ({ site, pageId, error }) => {
  const title = site?.name || 'Page Not Found'

  return (
    <>
      <PageHead site={site} />

      <Head>
        <meta property='og:site_name' content={title} />
        <meta property='og:title' content={title} />

        <title>{title}</title>
      </Head>
    
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 style={{ userSelect: 'none', fontSize: 50}}>Page Not Found</h1>

          <div className='page-404-wrapper'>
            <a href={'https://' + domain} className='page-404'>
              👉点我返回首页👈
            </a>
          </div>

          {/* <div className='button-404'>
            <a href={'https://' + domain}>
              👉点我返回首页👈
            </a>
          </div> */}

          {/* {error ? (
            <p>{error.message}</p>
          ) : (
            pageId && (
              <p>
                Make sure that Notion page "{pageId}" is publicly accessible.
              </p>
            )
          )} */}

          <img
            src='/404.png'
            alt='404 Not Found'
            style={{ userSelect: 'none' }}
            className={styles.errorImage}
          />
        </main>
      </div>
    </>
  )
}
