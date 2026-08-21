import { useEffect, useState } from 'react'

/**
 * 一键返回底部
 * - 固定在视口右下角，位于回顶按钮的下方
 * - 已经在底部时（滑动距离 = 页面总高 - 视口高）就隐藏
 * - 点击平滑滚到 document 底端
 * - rAF 节流
 */
export default function BackToBottom() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let raf = null

    const check = () => {
      const scrolled = (window.scrollY || window.pageYOffset)
      const viewport = window.innerHeight
      const total = document.documentElement.scrollHeight
      // 距离底部超过 100px 就显示；不到 100 就隐藏，避免抖动
      setVisible(total - (scrolled + viewport) > 100)
      raf = null
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(check)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    check()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const scrollToBottom = () => {
    const target = document.documentElement.scrollHeight
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  return (
    <button
      type='button'
      className={`atelier-back-to-bottom ${visible ? 'is-visible' : ''}`}
      onClick={scrollToBottom}
      aria-label='回到底部'
      title='回到底部'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='18'
        height='18'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'>
        <line x1='12' y1='5' x2='12' y2='19' />
        <polyline points='19 12 12 19 5 12' />
      </svg>
    </button>
  )
}
