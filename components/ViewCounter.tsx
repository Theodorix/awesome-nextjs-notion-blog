import React, { useEffect } from 'react'
import useSWR from 'swr'
import format from 'comma-number'

// ViewCounter组件用于显示页面的浏览次数
export function ViewCounter({ slug }) {
  // 使用useSWR钩子来获取浏览次数数据
  const { data } = useSWR(`/api/views/${slug}`, (args) =>
    fetch(args).then((res) => res.json())
  )
  const views = data?.total // 从数据中提取浏览次数

  // 使用useEffect钩子在组件挂载时注册浏览次数
  useEffect(() => {
    // 定义registerView函数，发送POST请求来注册浏览次数
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST'
      })

    registerView() // 调用registerView函数来注册浏览次数
  }, [slug]) // slug作为依赖项，确保在slug变化时触发注册

  // 返回一个包含浏览次数的React元素，如果数据尚未加载，则显示"…"表示加载中
  return <>{views ? format(views) : '…'} views</>
}
