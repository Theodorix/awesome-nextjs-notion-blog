import * as React from 'react'
import cs from 'classnames'
import styles from './styles.module.css'

/**
 * 这个组件用于渲染一个带有特定样式的SVG加载图标，通常用于显示在加载数据或执行异步操作时，以提供用户一个加载中的反馈
 */

// 定义一个LoadingIcon组件，接受props作为参数
export const LoadingIcon = (props) => {
  // 从props中提取className和其余的props
  const { className, ...rest } = props
  return (
    // 渲染一个SVG图标，用于表示加载状态
    <svg
      className={cs(styles.loadingIcon, className)} // 使用classnames库合并样式类名
      {...rest} // 将其余的props传递给SVG元素
      viewBox='0 0 24 24' // 设置SVG视口框
    >
      <defs>
        <linearGradient
          x1='28.1542969%'
          y1='63.7402344%'
          x2='74.6289062%'
          y2='17.7832031%'
          id='linearGradient-1'
        >
          <stop stopColor='rgba(164, 164, 164, 1)' offset='0%' />
          <stop
            stopColor='rgba(164, 164, 164, 0)'
            stopOpacity='0'
            offset='100%'
          />
        </linearGradient>
      </defs>

      <g id='Page-1' stroke='none' strokeWidth='1' fill='none'>
        <g transform='translate(-236.000000, -286.000000)'>
          <g transform='translate(238.000000, 286.000000)'>
            {/* 渲染一个带有渐变边框的圆 */}
            <circle
              id='Oval-2'
              stroke='url(#linearGradient-1)'
              strokeWidth='4'
              cx='10'
              cy='12'
              r='10'
            />
            {/* 渲染一个带有边框的弧线 */}
            <path
              d='M10,2 C4.4771525,2 0,6.4771525 0,12'
              id='Oval-2'
              stroke='rgba(164, 164, 164, 1)'
              strokeWidth='4'
            />
            {/* 渲染一个填充颜色的矩形 */}
            <rect
              id='Rectangle-1'
              fill='rgba(164, 164, 164, 1)'
              x='8'
              y='0'
              width='4'
              height='4'
              rx='8'
            />
          </g>
        </g>
      </g>
    </svg>
  )
}
