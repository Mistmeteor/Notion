import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { debounce } from '@/lib/utils/debounce'
import CONFIG from '@/themes/atelier/config'
import { useEffect, useMemo, useState } from 'react'
import AtelierFooter from './AtelierFooter'
import Catalog from './Catalog'
import LatestPosts from './LatestPosts'
import Logo from './Logo'
import { MenuList } from './MenuList'

/**
 * Atelier 侧栏（桌面固定 360px 宽 / 手机全宽堆叠）
 * 排序：头像 → 站点标题 → 副标题（Logo 内）→ 菜单 → 近期文章 → [文章目录] → [footer]
 * footer 只在桌面（lg+）出现在这里；手机端由 index.js 渲染到内容最下方
 */
function AsideLeft(props) {
  const { post, slot } = props
  const { fullWidth } = useGlobal()

  const ATELIER_SIDEBAR_COLLAPSE_SATUS_DEFAULT =
    fullWidth ||
    siteConfig('ATELIER_SIDEBAR_COLLAPSE_SATUS_DEFAULT', null, CONFIG)

  const ATELIER_SIDEBAR_COLLAPSE_ON_SCROLL = siteConfig(
    'ATELIER_SIDEBAR_COLLAPSE_ON_SCROLL',
    false,
    CONFIG
  )

  const ATELIER_SIDEBAR_COLLAPSE_BUTTON = siteConfig(
    'ATELIER_SIDEBAR_COLLAPSE_BUTTON',
    null,
    CONFIG
  )

  const [isCollapsed, setIsCollapse] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('atelier-sidebar-collapse') === 'true' ||
        ATELIER_SIDEBAR_COLLAPSE_SATUS_DEFAULT
      )
    }
    return ATELIER_SIDEBAR_COLLAPSE_SATUS_DEFAULT
  })

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('atelier-sidebar-collapse', isCollapsed)
    }
  }, [isCollapsed])

  const isReverse = siteConfig('LAYOUT_SIDEBAR_REVERSE')
  const position = useMemo(() => {
    if (isCollapsed) {
      return isReverse ? 'right-2' : 'left-2'
    }
    return isReverse ? 'right-[360px]' : 'left-[360px]'
  }, [isCollapsed, isReverse])

  const toggleOpen = () => setIsCollapse(!isCollapsed)

  useEffect(() => {
    if (!ATELIER_SIDEBAR_COLLAPSE_ON_SCROLL) return
    const handleResize = debounce(() => {
      if (window.innerWidth < 1366 || window.scrollY >= 1366) {
        setIsCollapse(true)
      } else {
        setIsCollapse(false)
      }
    }, 100)

    if (post) {
      window.addEventListener('resize', handleResize)
      window.addEventListener('scroll', handleResize, { passive: true })
    }
    return () => {
      if (post) {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('scroll', handleResize, { passive: true })
      }
    }
  }, [ATELIER_SIDEBAR_COLLAPSE_ON_SCROLL, post])

  return (
    <div
      className={`sideLeft relative ${isCollapsed ? 'lg:w-0' : 'w-full lg:w-[360px]'} duration-300 transition-all lg:min-h-screen block z-20`}>
      {ATELIER_SIDEBAR_COLLAPSE_BUTTON && (
        <div
          className={`${position} hidden lg:block fixed top-0 cursor-pointer hover:scale-110 duration-300 px-3 py-2 dark:text-white`}
          onClick={toggleOpen}>
          {isCollapsed ? (
            <i className='fa-solid fa-indent text-xl'></i>
          ) : (
            <i className='fas fa-bars text-xl'></i>
          )}
        </div>
      )}

      <div className={`${isCollapsed ? 'hidden' : 'px-10 pt-12 pb-14'}`}>
        {/* 头像 + 站点标题 + 副标题 */}
        <Logo {...props} />

        {/* 菜单：KONTAKT / ÜBER MICH 等 */}
        <section className='mt-2'>
          <MenuList {...props} />
        </section>

        {/* 近期文章（下划线列表） */}
        <LatestPosts {...props} />

        {/* 文章目录：只在文章详情页出现 */}
        {post && (
          <section className='sticky top-0 mt-12 pt-6 flex flex-col max-h-screen'>
            <Catalog toc={post?.toc} />
          </section>
        )}

        {/* 桌面版 footer：margin-top: auto 顶到侧栏底部 = 初始视口底部 */}
        <AtelierFooter className='hidden lg:flex' />

        {/* 主题预留插槽（如 Live2D 之类）*/}
        {slot && <div className='mt-4'>{slot}</div>}
      </div>
    </div>
  )
}

export default AsideLeft
