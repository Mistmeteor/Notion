import { AdSlot } from '@/components/GoogleAdsense'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import BlogCard from './BlogCard'
import BlogPostListEmpty from './BlogListEmpty'
import PaginationSimple from './PaginationSimple'

/**
 * Atelier 首页 —— 方案 B（Hero + Grid 杂志式）
 * 第一条文章作为整幅 hero 大图卡，其余按 3 列 grid 排列，
 * 桌面 3 列 / 平板 2 列 / 手机 1 列（响应式在 style.js）。
 */
const BlogListPage = ({ page = 1, posts = [], postCount, siteInfo }) => {
  const { NOTION_CONFIG } = useGlobal()
  const postsPerPage = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  const totalPage = Math.ceil(postCount / postsPerPage)
  const showNext = page < totalPage

  if (!posts || posts.length === 0) {
    return <BlogPostListEmpty />
  }

  const [hero, ...rest] = posts
  // 没自己 pageCover 的卡回退到"posts 里第一个有 cover 的那张"
  // (而不是严格 posts[0], 否则 posts[0] 无图时整页都没图)
  const fallbackCover =
    posts.find(p => p?.pageCoverThumbnail)?.pageCoverThumbnail || null

  return (
    <div>
      <div id='posts-wrapper' className='atelier-b-wrapper'>
        <div className='atelier-b-hero'>
          <BlogCard
            post={hero}
            siteInfo={siteInfo}
            variant='hero'
            fallbackCover={fallbackCover}
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
                  fallbackCover={fallbackCover}
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

export default BlogListPage
