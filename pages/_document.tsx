import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { IconContext } from 'react-icons'
import { googleAnalyticsTrackingID } from '../lib/config'

export default class MyDocument extends Document {
  render() {
    return (
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <Html lang='en'>
          <Head>
            {/* 异步加载Google Analytics脚本 */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsTrackingID}`}
            ></script>

            {/* 初始化Google Analytics跟踪 */}
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsTrackingID}', {
              page_path: window.location.pathname,
            });
          `
              }}
            />
            {/* 设置网站图标和各种图标大小 */}
            <link rel='shortcut icon' href='/favicon.png' />

            <link
              rel='apple-touch-icon'
              sizes='180x180'
              href='/apple-touch-icon.png'
            />
            <link
              rel='icon'
              type='image/png'
              sizes='96x96'
              href='/favicon-96x96.png'
            />
            <link
              rel='icon'
              type='image/png'
              sizes='32x32'
              href='/favicon-32x32.png'
            />
            <link
              rel='icon'
              type='image/png'
              sizes='16x16'
              href='/favicon-16x16.png'
            />
            {/* 包括PWA（渐进式Web应用）清单 */}
            <link rel='manifest' href='/manifest.json' />
          </Head>

          {/* Activate dark-mode by default */}
          <body className='dark-mode'>
            <script src='noflash.js' />

            <Main />

            <NextScript />
          </body>
        </Html>
      </IconContext.Provider>
    )
  }
}
