import { useEffect, useState } from 'react'

/**
 * 回到顶部按钮
 * - 固定在视口右下角
 * - 滚过 500px 才淡入（不打扰首屏阅读）
 * - 点击平滑滚回顶部
 * - rAF 节流
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let raf = null

    const check = () => {
      setVisible((window.scrollY || window.pageYOffset) > 500)
      raf = null
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(check)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    check()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type='button'
      className={`atelier-back-to-top ${visible ? 'is-visible' : ''}`}
      onClick={scrollToTop}
      aria-label='回到顶部'
      title='回到顶部'>
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
        <line x1='12' y1='19' x2='12' y2='5' />
        <polyline points='5 12 12 5 19 12' />
      </svg>
    </button>
  )
}
