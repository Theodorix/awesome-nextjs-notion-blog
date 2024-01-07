import React from 'react'
import { IoHeartOutline } from 'react-icons/io5'
import { AiOutlineRetweet } from 'react-icons/ai'

import styles from './styles.module.css'

/**
 * PageActions 组件是一个用于在页面上显示 "点赞" 和 "转发" 功能的 React 组件。
 *
 * @param {Object} props - 包含一个名为 "tweet" 的属性，表示要操作的推文的 ID。
 * @returns {JSX.Element} - 返回包含 "点赞" 和 "转发" 链接的组件。
 *
 * @see https://developer.twitter.com/en/docs/twitter-for-websites/web-intents/overview
 */
export const PageActions: React.FC<{ tweet: string }> = ({ tweet }) => {
  return (
    <div className={styles.pageActions}>
      {/* "点赞" 链接，点击后打开 Twitter 并将用户重定向到点赞该推文的页面 */}
      <a
        className={styles.likeTweet}
        href={`https://twitter.com/intent/like?tweet_id=${tweet}`}
        target='_blank'
        rel='noopener noreferrer'
        title='Like this post on Twitter'
      >
        <IoHeartOutline />
      </a>
      {/* "转发" 链接，点击后打开 Twitter 并将用户重定向到转发该推文的页面 */}
      <a
        className={styles.retweet}
        href={`https://twitter.com/intent/retweet?tweet_id=${tweet}`}
        target='_blank'
        rel='noopener noreferrer'
        title='Retweet this post on Twitter'
      >
        <AiOutlineRetweet />
      </a>
    </div>
  )
}
