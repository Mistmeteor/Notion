import { AdSlot } from '@/components/GoogleAdsense'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { assignUniqueCovers } from '../lib/fallbackCover'
import { tr, useAtelierLang } from '../lib/i18n'
import CONFIG from '../config'
import BlogCard from './BlogCard'
import BlogPostListEmpty from './BlogListEmpty'
import PaginationSimple from './PaginationSimple'

const UNCATEGORIZED_KEY = '__uncategorized__'
const UNCATEGORIZED_LABEL = '未分类'

/**
 * Atelier 首页 —— 方案 B（Hero + Grid 杂志式）
 * 第一条文章作为整幅 hero 大图卡，其余按 3 列 grid 排列，
 * 桌面 3 列 / 平板 2 列 / 手机 1 列（响应式在 style.js）。
 *
 * 分组模式（ATELIER_HOME_GROUP_BY_CATEGORY=true）：
 * 第一条仍作 hero，其余按 category 分段渲染，每段露 N 篇 +
 * "查看全部 →" 链接到 /category/<name>；取消首页分页。
 */
const BlogListPage = ({ page = 1, posts = [], postCount, siteInfo }) => {
  const { NOTION_CONFIG } = useGlobal()
  const router = useRouter()
  // 分组模式只在首页 `/` 开启；分类/分页/标签等列表页仍走原扁平布局，
  // 避免 /category/<name> 再次按 category 分组形成循环入口
  const isHome = router.pathname === '/'
  const groupByCategory =
    isHome &&
    siteConfig('ATELIER_HOME_GROUP_BY_CATEGORY', false, {
      ...CONFIG,
      ...NOTION_CONFIG
    })

  if (!posts || posts.length === 0) {
    return <BlogPostListEmpty />
  }

  const uniquePosts = assignUniqueCovers(posts)

  if (groupByCategory) {
    return (
      <GroupedByCategory
        posts={uniquePosts}
        siteInfo={siteInfo}
        postCount={postCount}
        NOTION_CONFIG={NOTION_CONFIG}
      />
    )
  }

  const postsPerPage = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  const totalPage = Math.ceil(postCount / postsPerPage)
  const showNext = page < totalPage
  const [hero, ...rest] = uniquePosts

  return (
    <div>
      <div id='posts-wrapper' className='atelier-b-wrapper'>
        <div className='atelier-b-hero'>
          <BlogCard
            post={hero}
            siteInfo={siteInfo}
            variant='hero'
          />
        </div>

        {rest.length > 0 && (
          <div className='atelier-b-grid'>
            {rest.map(post => (
              <div key={post.id} className='atelier-b-grid-item'>
                <BlogCard
                  post={post}
                  siteInfo={siteInfo}
                  variant='card'
                />
              </div>
            ))}
          </div>
        )}

        {siteConfig('ADSENSE_GOOGLE_ID') && (
          <div className='p-3'>
            <AdSlot type='flow' />
          </div>
        )}
      </div>
      <PaginationSimple page={page} showNext={showNext} />
    </div>
  )
}

const GroupedByCategory = ({ posts, siteInfo, postCount, NOTION_CONFIG }) => {
  const { lang } = useAtelierLang()
  const perCategory = Number(
    siteConfig('ATELIER_HOME_POSTS_PER_CATEGORY', 6, {
      ...CONFIG,
      ...NOTION_CONFIG
    })
  )
  const orderConfig =
    siteConfig('ATELIER_HOME_CATEGORY_ORDER', [], {
      ...CONFIG,
      ...NOTION_CONFIG
    }) || []
  const postsPerPage = siteConfig('POSTS_PER_PAGE', 12, NOTION_CONFIG)
  const hasNextPage = Number(postCount || 0) > Number(postsPerPage || 0)

  const [hero, ...rest] = posts

  const groupMap = new Map()
  for (const p of rest) {
    const key =
      p.category && String(p.category).trim()
        ? String(p.category)
        : UNCATEGORIZED_KEY
    if (!groupMap.has(key)) groupMap.set(key, [])
    groupMap.get(key).push(p)
  }

  const orderedKeys = []
  for (const k of orderConfig) {
    if (groupMap.has(k)) orderedKeys.push(k)
  }
  const remaining = Array.from(groupMap.keys())
    .filter(k => !orderedKeys.includes(k))
    .sort((a, b) => {
      const da = Number(groupMap.get(a)[0]?.publishDate) || 0
      const db = Number(groupMap.get(b)[0]?.publishDate) || 0
      return db - da
    })
  const finalKeys = [...orderedKeys, ...remaining]

  return (
    <div id='posts-wrapper' className='atelier-b-wrapper'>
      <div className='atelier-b-hero'>
        <BlogCard post={hero} siteInfo={siteInfo} variant='hero' />
      </div>

      {finalKeys.map(key => {
        const groupPosts = groupMap.get(key)
        const label = key === UNCATEGORIZED_KEY ? UNCATEGORIZED_LABEL : key
        const shown = groupPosts.slice(0, perCategory)
        return (
          <section key={key} className='atelier-b-group'>
            <header className='atelier-b-group-head'>
              <h2 className='atelier-b-group-title'>{label}</h2>
              <span className='atelier-b-group-count'>
                {tr(lang, 'archiveYearCount', { n: groupPosts.length })}
              </span>
            </header>
            <div className='atelier-b-grid atelier-b-grid-inline'>
              {shown.map(post => (
                <div key={post.id} className='atelier-b-grid-item'>
                  <BlogCard post={post} siteInfo={siteInfo} variant='card' />
                </div>
              ))}
            </div>
          </section>
        )
      })}

      {hasNextPage && (
        <div className='atelier-b-next'>
          <SmartLink href='/page/2'>
            {tr(lang, 'nextPage')} →
          </SmartLink>
        </div>
      )}

      {siteConfig('ADSENSE_GOOGLE_ID') && (
        <div className='p-3'>
          <AdSlot type='flow' />
        </div>
      )}
    </div>
  )
}

export default BlogListPage
