import * as React from 'react'
import { SiGithub, SiWechat, SiNotion } from 'react-icons/si'
import { IoSunnyOutline, IoMoonSharp } from 'react-icons/io5'
import { RiCopyrightFill } from 'react-icons/ri'
import * as config from 'lib/config'
import { footCounterList, copyRightFromYear } from 'site.config'
import { ViewCounter } from './ViewCounter'
import styles from './styles.module.css'

/**
 * 这个组件用于渲染网页的底部部分，包括一些与页面主题、作者
 * 以及社交媒体相关的信息和功能，如暗黑模式切换和社交链接
 */

// TODO: merge the data and icons from PageSocial with the social links in Footer

// 定义一个React函数组件 Footer，接受一些属性作为参数
export const Footer: React.FC<{
  pageId: string
  isDarkMode: boolean
  toggleDarkMode: () => void
}> = ({ pageId, isDarkMode, toggleDarkMode }) => {
  // 定义一个状态变量 hasMounted，用于追踪组件是否已经渲染完成
  const [hasMounted, setHasMounted] = React.useState(false)
  
  // 定义一个回调函数 toggleDarkModeCb，用于切换暗黑模式
  const toggleDarkModeCb = React.useCallback(
    (e) => {
      e.preventDefault()
      toggleDarkMode()
    },
    [toggleDarkMode]
  )
  // const isRootPage = pageId === rootNotionPageId
  // 判断当前页面是否需要显示浏览量计数器
  const needFootCounter = footCounterList.indexOf(pageId) !== -1

  // 当组件渲染完成后，将 hasMounted 设置为 true
  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  // 获取作者信息
  const author = `${config.author}`

  return (
    // 渲染页面底部的 footer 元素
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        {/* 显示版权信息，包括年份、作者名字以及浏览量计数器 */}
        <RiCopyrightFill /> {copyRightFromYear ? copyRightFromYear + ' - ' : ''}
        {new Date().getFullYear()} {'· ' + author + ' '}
        {needFootCounter ? '· ' : ''}
        {needFootCounter ? <ViewCounter slug={pageId} /> : ''}
      </div>

      {hasMounted ? (
        <div className={styles.settings}>
          {/* 显示暗黑模式切换按钮，根据当前模式切换显示不同的图标 */}
          <a
            className={styles.toggleDarkMode}
            onClick={toggleDarkModeCb}
            title='Tottle dark mode'
          >
            {isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
          </a>
        </div>
      ) : null}

      <div className={styles.social}>
        {/* 显示社交链接，包括 GitHub、微信公众号和 Notion */}
        {config.github && (
          <a
            className={styles.github}
            // href={`https://github.com/${config.github}`}
            title={`GitHub @${config.github}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <span className={styles.tooltiptext}>@{config.github}</span>
            <SiGithub />
          </a>
        )}
        {/* {config.wechatPublicName && (
          <a
            className={styles.wechatPublicName}
            // href={`${config.wechatPublicURL}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <SiWechat />
            <span className={styles.tooltiptext}>
              公众号: {config.wechatPublicName}
            </span>
          </a>
        )}
        {config.notionPublic && (
          <a
            className={styles.notionPublic}
            // href={`${config.notionPublic}`}
            title='通过 Notion 打开'
            target='_blank'
            rel='noopener noreferrer'
          >
            <SiNotion />
            <span className={styles.tooltiptext}>从 Notion 打开</span>
          </a>
        )} */}
      </div>
    </footer>
  )
}
