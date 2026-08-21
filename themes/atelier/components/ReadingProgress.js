import { useEffect, useState } from 'react'

/**
 * Atelier 阅读进度条 —— 借鉴 heo，只做水平进度条不做回顶按钮
 * 极细 3px 条，浅色米白背景 + 暖调深色进度色，配合编辑风克制的呈现
 * 使用 requestAnimationFrame 节流
 */
export default function ReadingProgress() {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    let requestId = null

    const compute = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      const scrollY = window.scrollY || window.pageYOffset
      const denom = Math.max(scrollHeight - clientHeight - 20, 1)
      const p = Math.max(0, Math.min(100, Math.floor((scrollY / denom) * 100)))
      setPercent(p)
      requestId = null
    }

    const onScroll = () => {
      if (requestId) return
      requestId = requestAnimationFrame(compute)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    compute()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (requestId) cancelAnimationFrame(requestId)
    }
  }, [])

  return (
    <div className='atelier-reading-progress' aria-hidden='true'>
      <div
        className='atelier-reading-progress-bar'
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
