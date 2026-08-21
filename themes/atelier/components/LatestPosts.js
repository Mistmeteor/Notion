import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * 侧栏"近期文章"列表
 * - 使用 NotionNext 全站已计算好的 latestPosts 属性
 * - 数量与标题文案由 config 控制
 */
const LatestPosts = props => {
  const { latestPosts } = props || {}
  const count = siteConfig('ATELIER_LATEST_POSTS_COUNT', 6, CONFIG)
  const title = siteConfig('ATELIER_LATEST_POSTS_TITLE', '近期文章', CONFIG)

  if (!count || !Array.isArray(latestPosts) || latestPosts.length === 0) {
    return null
  }

  const items = latestPosts.slice(0, count)

  return (
    <section>
      <div className='atelier-latest-title'>{title}</div>
      <div className='atelier-latest-list'>
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

export default LatestPosts
