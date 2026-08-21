import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import { tr, useAtelierLang } from '../lib/i18n'

/**
 * 侧栏"近期文章"列表
 * - 使用 NotionNext 全站已计算好的 latestPosts 属性
 * - 数量由 config 控制；标题文案跟随语言切换（zh / en）
 */
const LatestPosts = props => {
  const { latestPosts } = props || {}
  const { lang } = useAtelierLang()
  const count = siteConfig('ATELIER_LATEST_POSTS_COUNT', 6, CONFIG)
  const title = tr(lang, 'latestPosts')

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
