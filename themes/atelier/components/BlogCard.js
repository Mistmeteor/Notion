import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import ReadingTime from './ReadingTime'

/**
 * Atelier 首页文章条目 —— 编辑器/画册风格
 * variant='hero'（默认）：全宽大图卡，用于首页首屏第一条
 * variant='card'：3 列 grid 里的小卡，图小、标题小
 */
const BlogCard = ({ post, showAnimate, variant = 'hero' }) => {
  const { siteInfo } = useGlobal()
  const isCard = variant === 'card'

  // 封面强制回退到站点默认背景
  if (
    siteConfig('ATELIER_POST_LIST_COVER_FORCE', null, CONFIG) &&
    post &&
    !post.pageCover
  ) {
    post.pageCoverThumbnail = siteInfo?.pageCover
  }
  const showCover =
    siteConfig('ATELIER_POST_LIST_COVER', null, CONFIG) &&
    post?.pageCoverThumbnail

  // 日期：优先 publishDay，退回到 date.start_date / lastEditedDay
  const dateText =
    post?.publishDay ||
    post?.date?.start_date ||
    post?.lastEditedDay ||
    ''

  const animate = siteConfig('ATELIER_POST_LIST_ANIMATION', null, CONFIG) || showAnimate
  const aosProps = animate
    ? {
        'data-aos': 'fade-up',
        'data-aos-duration': '400',
        'data-aos-once': 'true',
        'data-aos-anchor-placement': 'top-bottom'
      }
    : {}

  return (
    <article
      {...aosProps}
      className={`atelier-stream-item ${isCard ? 'atelier-stream-card' : 'atelier-stream-hero'}`}>
      {/* 封面图（占满宽度，点击进入文章） */}
      {showCover && (
        <SmartLink href={post?.href} passHref legacyBehavior>
          <div className='atelier-stream-cover-wrap cursor-pointer'>
            <LazyImage
              src={post?.pageCoverThumbnail}
              alt={post?.title || siteConfig('TITLE')}
              className='atelier-stream-cover'
            />
          </div>
        </SmartLink>
      )}

      {/* 标题（大号衬线体，点击进入文章） */}
      <h2 className='atelier-stream-title'>
        <SmartLink href={post?.href} passHref>
          {siteConfig('POST_TITLE_ICON') && (
            <NotionIcon icon={post.pageIcon} />
          )}
          {post.title}
        </SmartLink>
      </h2>

      {/* 日期 + 阅读时长（小号无衬线体） */}
      {dateText && (
        <div className='atelier-stream-date'>
          {dateText}
          <ReadingTime post={post} className='atelier-stream-date-sep' />
        </div>
      )}

      {/* 摘要 */}
      {post?.summary && (
        <div className='atelier-stream-summary'>{post.summary}</div>
      )}
    </article>
  )
}

export default BlogCard
