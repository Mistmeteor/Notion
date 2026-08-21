import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * 文章底部相关推荐
 * 由 NotionNext 依据同分类/同标签计算并传入 recommendPosts
 * atelier 风：无衬线小写字母标题 + 下划线链接列表，视觉与 LatestPosts 一致
 */
const RecommendPosts = ({ recommendPosts }) => {
  if (
    !siteConfig('ATELIER_ARTICLE_RECOMMEND_POSTS', true, CONFIG) ||
    !Array.isArray(recommendPosts) ||
    recommendPosts.length === 0
  ) {
    return null
  }

  const count = Number(
    siteConfig('ATELIER_ARTICLE_RECOMMEND_POSTS_COUNT', 4, CONFIG)
  )
  const items = recommendPosts.slice(0, count)

  return (
    <section className='atelier-recommend'>
      <div className='atelier-recommend-title'>相关阅读</div>
      <div className='atelier-recommend-list'>
        {items.map(post => (
          <SmartLink
            key={post.id}
            href={`/${post.slug}`}
            title={post.title}>
            {post.title}
          </SmartLink>
        ))}
      </div>
    </section>
  )
}

export default RecommendPosts
