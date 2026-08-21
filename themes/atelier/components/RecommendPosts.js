import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import { tr, useAtelierLang } from '../lib/i18n'

/**
 * 文章底部相关推荐（跟随语言切换）
 */
const RecommendPosts = ({ recommendPosts }) => {
  const { lang } = useAtelierLang()

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
      <div className='atelier-recommend-title'>{tr(lang, 'relatedPosts')}</div>
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
