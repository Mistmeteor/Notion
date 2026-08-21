'use client'

import AlgoliaSearchModal from '@/components/AlgoliaSearchModal'
import { AdSlot } from '@/components/GoogleAdsense'
import replaceSearchResult from '@/components/Mark'
import WWAds from '@/components/WWAds'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import dynamic from 'next/dynamic'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import ArticleDetail from './components/ArticleDetail'
import ArticleLock from './components/ArticleLock'
import AsideLeft from './components/AsideLeft'
import AtelierFooter from './components/AtelierFooter'
import ReadingProgress from './components/ReadingProgress'
import SidebarToggle from './components/SidebarToggle'
import BlogListPage from './components/BlogListPage'
import BlogListScroll from './components/BlogListScroll'
import BlogArchiveItem from './components/BlogPostArchive'
import TagItemMini from './components/TagItemMini'
import CONFIG from './config'
import { Style } from './style'

const Live2D = dynamic(() => import('@/components/Live2D'))

// 主题全局状态
const ThemeGlobalAtelier = createContext()
export const useAtelierGlobal = () => useContext(ThemeGlobalAtelier)

/**
 * 基础布局 采用左右两侧布局，移动端使用顶部导航栏
 * @param children
 * @param layout
 * @param tags
 * @param meta
 * @param post
 * @param currentSearch
 * @param currentCategory
 * @param currentTag
 * @param categories
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const { children, headerSlot } = props
  const leftAreaSlot = <Live2D />
  const { onLoading, fullWidth } = useGlobal()
  const searchModal = useRef(null)

  // 侧栏开关状态：桌面默认打开，手机默认关闭；localStorage 记住用户选择
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('atelier-sidebar-open')
      if (saved !== null) {
        setSidebarOpen(saved === 'true')
      } else {
        // 首次访问：桌面默认展开，手机默认收起
        setSidebarOpen(window.innerWidth >= 1024)
      }
    }
  }, [])

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      localStorage.setItem('atelier-sidebar-open', String(sidebarOpen))
    }
  }, [sidebarOpen, mounted])

  // 手机端进入文章详情页时，无论 localStorage 是什么，都强制关闭侧栏
  // 避免侧栏（含目录）遮住正文以及带来的滚动跳动问题
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (props.post && window.innerWidth < 1024) {
      setSidebarOpen(false)
    }
  }, [props.post])

  const toggleSidebar = () => setSidebarOpen(v => !v)

  return (
    <ThemeGlobalAtelier.Provider value={{ searchModal }}>
      <div
        id='theme-atelier'
        className={`${siteConfig('FONT_STYLE')} dark:bg-black scroll-smooth ${sidebarOpen ? 'atelier-sidebar-open' : 'atelier-sidebar-closed'}`}>
        <Style />
        {/* 桌面：侧栏关闭时显示顶部汉堡包，打开时藏起（footer 里的收起按钮接管）
            手机：任何时候都显示（顶部汉堡包是手机唯一入口）*/}
        {(!sidebarOpen || !mounted) && (
          <SidebarToggle open={sidebarOpen} onToggle={toggleSidebar} className='atelier-toggle-top' />
        )}
        {/* 手机端：无论侧栏开关都保留顶部汉堡包 */}
        {sidebarOpen && mounted && (
          <SidebarToggle open={sidebarOpen} onToggle={toggleSidebar} className='atelier-toggle-top atelier-toggle-mobile-only' />
        )}

        <div
          className={
            (JSON.parse(siteConfig('LAYOUT_SIDEBAR_REVERSE'))
              ? 'lg:flex-row-reverse'
              : '') + ' flex flex-col lg:flex-row'
          }>
          {/* 侧边抽屉 */}
          <AsideLeft {...props} slot={leftAreaSlot} onToggleSidebar={toggleSidebar} />

          <main
            id='wrapper'
            className='relative flex w-full pt-12 pb-8 justify-center bg-day dark:bg-night'>
            <div
              id='container-inner'
              className={`${fullWidth ? '' : '2xl:max-w-6xl md:max-w-4xl'} w-full relative z-10`}>
              <Transition
                show={!onLoading}
                appear={true}
                className='w-full'
                enter='transition ease-in-out duration-700 transform order-first'
                enterFrom='opacity-0 translate-y-16'
                enterTo='opacity-100'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='opacity-100 translate-y-0'
                leaveTo='opacity-0 -translate-y-16'
                unmount={false}>
                <div> {headerSlot} </div>
                <div> {children} </div>
              </Transition>

              <div className='mt-2'>
                <AdSlot type='native' />
              </div>
            </div>
          </main>
        </div>

        {/* 手机端 footer：桌面时侧栏底部已有一份，这里只在 <lg 时出现 */}
        <AtelierFooter className='flex lg:hidden' />

        <AlgoliaSearchModal cRef={searchModal} {...props} />
      </div>
    </ThemeGlobalAtelier.Provider>
  )
}

/**
 * 首页
 * @param {*} props notion数据
 * @returns 首页就是一个博客列表
 */
const LayoutIndex = props => {
  return <LayoutPostList {...props} />
}

/**
 * 博客列表
 * @param {*} props
 */
const LayoutPostList = props => {
  const POST_LIST_STYLE = siteConfig('POST_LIST_STYLE')
  return (
    <>
      {/* WWAds 直接渲染：没广告配置时组件返回 null，不留空白撑高 */}
      <WWAds className='w-full mb-4' orientation='horizontal' />
      { POST_LIST_STYLE === 'page' ? (
        <BlogListPage {...props} />
      ) : (
        <BlogListScroll {...props} />
      )}
    </>
  )
}

/**
 * 文章详情
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
  useEffect(() => {
    // 404
    if (!post) {
      setTimeout(
        () => {
          if (isBrowser) {
            const article = document.querySelector('#article-wrapper #notion-article')
            if (!article) {
              router.push('/404').then(() => {
                console.warn('找不到页面', router.asPath)
              })
            }
          }
        },
        waiting404
      )
    }
  }, [post])
  const showProgress = siteConfig('ATELIER_READING_PROGRESS', true, CONFIG)
  return (
    <>
      {post && showProgress && <ReadingProgress />}
      {lock ? (
        <ArticleLock validPassword={validPassword} />
      ) : post && (
        <ArticleDetail {...props} />
      )}
    </>
  )
}

/**
 * 搜索页
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  useEffect(() => {
    if (isBrowser) {
      replaceSearchResult({
        doms: document.getElementById('posts-wrapper'),
        search: keyword,
        target: {
          element: 'span',
          className: 'text-red-500 border-b border-dashed'
        }
      })
    }
  }, [router])
  return <LayoutPostList {...props} />
}

/**
 * 归档页面
 */
const LayoutArchive = props => {
  const { archivePosts } = props
  return (
    <>
      <div className='mb-10 pb-20 bg-white md:p-12 p-3 dark:bg-gray-800 shadow-md min-h-full'>
        {Object.keys(archivePosts).map(archiveTitle => (
          <BlogArchiveItem
            key={archiveTitle}
            posts={archivePosts[archiveTitle]}
            archiveTitle={archiveTitle}
          />
        ))}
      </div>
    </>
  )
}

/**
 * 404
 * @param {*} props
 * @returns
 */
const Layout404 = props => {
  const router = useRouter()
  const { locale } = useGlobal()
  useEffect(() => {
    // 延时3秒如果加载失败就返回首页
    setTimeout(() => {
      const article = isBrowser && document.getElementById('article-wrapper')
      if (!article) {
        router.push('/').then(() => {
          // console.log('找不到页面', router.asPath)
        })
      }
    }, 3000)
  }, [])

  return <>
        <div className='md:-mt-20 text-black w-full h-screen text-center justify-center content-center items-center flex flex-col'>
            <div className='dark:text-gray-200'>
                <h2 className='inline-block border-r-2 border-gray-600 mr-2 px-3 py-2 align-top'><i className='mr-2 fas fa-spinner animate-spin' />404</h2>
                <div className='inline-block text-left h-32 leading-10 items-center'>
                    <h2 className='m-0 p-0'>{locale.NAV.PAGE_NOT_FOUND_REDIRECT}</h2>
                </div>
            </div>
        </div>
    </>
}

/**
 * 分类列表
 * @param {*} props
 * @returns
 */
const LayoutCategoryIndex = props => {
  const { locale } = useGlobal()
  const { categoryOptions } = props
  return (
    <>
      <div className='bg-white dark:bg-gray-700 px-10 py-10 shadow'>
        <div className='dark:text-gray-200 mb-5'>
          <i className='mr-4 fas fa-th' />
          {locale.COMMON.CATEGORY}:
        </div>
        <div id='category-list' className='duration-200 flex flex-wrap'>
          {categoryOptions?.map(category => {
            return (
              <SmartLink
                key={category.name}
                href={`/category/${category.name}`}
                passHref
                legacyBehavior>
                <div
                  className={
                    'hover:text-black dark:hover:text-white dark:text-gray-300 dark:hover:bg-gray-600 px-5 cursor-pointer py-2 hover:bg-gray-100'
                  }>
                  <i className='mr-4 fas fa-folder' />
                  {category.name}({category.count})
                </div>
              </SmartLink>
            )
          })}
        </div>
      </div>
    </>
  )
}

/**
 * 标签列表
 * @param {*} props
 * @returns
 */
const LayoutTagIndex = props => {
  const { locale } = useGlobal()
  const { tagOptions } = props
  return (
    <>
      <div className='bg-white dark:bg-gray-700 px-10 py-10 shadow'>
        <div className='dark:text-gray-200 mb-5'>
          <i className='mr-4 fas fa-tag' />
          {locale.COMMON.TAGS}:
        </div>
        <div id='tags-list' className='duration-200 flex flex-wrap ml-8'>
          {tagOptions.map(tag => {
            return (
              <div key={tag.name} className='p-2'>
                <TagItemMini key={tag.name} tag={tag} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
