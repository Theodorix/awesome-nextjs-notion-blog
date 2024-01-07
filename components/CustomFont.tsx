import Head from 'next/head'
import * as React from 'react'
import * as types from '@lib/types'

// 定义一个React函数组件 CustomFont，接受一个包含 site 属性的对象作为参数
export const CustomFont: React.FC<{ site: types.Site }> = ({ site }) => {
  // 如果站点对象中没有设置字体 fontFamily，则返回 null，不进行字体定制
  if (!site.fontFamily) {
    return null
  }

  // https://developers.google.com/fonts/docs/css2
  // 创建一个数组 fontFamilies，其中包含站点指定的字体 fontFamily
  const fontFamilies = [site.fontFamily]
  // 将字体名称中的空格替换为加号，以满足 Google Fonts 的要求
  const googleFontFamilies = fontFamilies
    .map((font) => font.replace(/ /g, '+'))
    // 指定字体的特性，如字体样式和字重
    .map((font) => `family=${font}:ital,wght@0,200..700;1,200..700`)
    .join('&')
  // 构建 Google Fonts 的链接，包含指定的字体和设置显示属性为 'swap'
  const googleFontsLink = `https://fonts.googleapis.com/css?${googleFontFamilies}&display=swap`
  // 将字体名称转换为 CSS 格式的字符串，用于在页面样式中指定字体
  const cssFontFamilies = fontFamilies.map((font) => `"${font}"`).join(', ')

  return (
    <>
      <Head>
        {/* 在页面头部添加链接标签，引入 Google Fonts 的字体文件 */}
        <link rel='stylesheet' href={googleFontsLink} />

        {/* 在页面头部添加内联样式，指定页面的字体 */}
        <style>{`
          .notion.notion-app {
            font-family: ${cssFontFamilies}, -apple-system, BlinkMacSystemFont,
              'Segoe UI', Helvetica, 'Apple Color Emoji', Arial, sans-serif,
              'Segoe UI Emoji', 'Segoe UI Symbol';
          }
        `}</style>
      </Head>
    </>
  )
}
