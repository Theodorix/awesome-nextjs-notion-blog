import * as React from 'react'
import { LoadingIcon } from './LoadingIcon'

import styles from './styles.module.css'

// 定义一个React函数组件 Loading
export const Loading: React.FC = () => (
  // 渲染一个包含 LoadingIcon 的容器
  <div className={styles.container}>
    <LoadingIcon />
  </div>
)
