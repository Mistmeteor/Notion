import DarkModeButton from '@/components/DarkModeButton'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { debounce } from '@/lib/utils/debounce'
import CONFIG from '@/themes/atelier/config'
import { useEffect, useMemo, useState } from 'react'
import Catalog from './Catalog'
import LatestPosts from './LatestPosts'
import Logo from './Logo'
import { MenuList } from './MenuList'
import SiteInfo from './SiteInfo'
import SocialButton from './SocialButton'

/**
 * Atelier 侧栏（左固定 320px）
 * 排序：头像 + 站点标题 + 副标题（Logo 内） → 菜单 → 近期文章 → [文章目录] → 社交/暗色/页脚
 * 侧栏折叠功能保留但默认关闭（编辑器风格不需要）
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
    return isReverse ? 'right-96' : 'left-96'
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
      className={`sideLeft relative ${isCollapsed ? 'lg:w-0' : 'w-full lg:w-96'} duration-300 transition-all lg:min-h-screen block z-20`}>
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

      <div className={`h-full ${isCollapsed ? 'hidden' : 'px-10 pt-8 pb-14'}`}>
        {/* 头像 + 站点标题 + 副标题 */}
        <Logo {...props} />

        {/* 菜单：KONTAKT / ÜBER MICH 等，样式在 style.js 里做 uppercase + letter-spacing */}
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

        {/* 底部：社交按钮 + 暗色开关 + 版权信息 */}
        <section className='mt-16 pt-6' style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          <div className='flex items-center gap-3 mb-4'>
            <SocialButton />
            <DarkModeButton />
          </div>
          <SiteInfo />
        </section>

        {/* 主题预留插槽（如 Live2D 之类） */}
        {slot && <div className='mt-4'>{slot}</div>}
      </div>
    </div>
  )
}

export default AsideLeft
