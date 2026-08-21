import Comment from '@/components/Comment'
import { AdSlot } from '@/components/GoogleAdsense'
import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import WWAds from '@/components/WWAds'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { formatDateFmt } from '@/lib/utils/formatDate'
import SmartLink from '@/components/SmartLink'
import ArticleAround from './ArticleAround'
import ReadingTime from './ReadingTime'
import RecommendPosts from './RecommendPosts'
import TagItemMini from './TagItemMini'
import { tr, useAtelierLang } from '../lib/i18n'

/**
 *
 * @param {*} param0
 * @returns
 */
export default function ArticleDetail(props) {
  const { post, prev, next } = props
  const { fullWidth } = useGlobal()
  const { lang } = useAtelierLang()

  if (!post) {
    return <></>
  }
  return (
    <div
      id='container'
      className={`${fullWidth ? 'px-10' : 'max-w-5xl '} overflow-x-auto flex-grow mx-auto w-screen md:w-full`}>
      {post?.type && !post?.type !== 'Page' && post?.pageCover && (
        <div className='w-full relative md:flex-shrink-0 overflow-hidden'>
          <LazyImage
            alt={post.title}
            src={post?.pageCover}
            className='object-cover max-h-[60vh] w-full'
          />
        </div>
      )}

      <article className='subpixel-antialiased overflow-y-hidden py-10 px-5 lg:pt-24 md:px-32  dark:border-gray-700 bg-white dark:bg-hexo-black-gray'>
        <header>
          {/* 文章Title */}
          <div className='font-bold text-4xl text-black dark:text-white'>
            {siteConfig('POST_TITLE_ICON') && (
              <NotionIcon icon={post?.pageIcon} />
            )}
            {post.title}
          </div>

          <section className='flex-wrap flex mt-2 text-gray-400 dark:text-gray-400 font-light leading-8'>
            <div>
              {post?.category && (
                <>
                  <SmartLink
                    href={`/category/${post.category}`}
                    passHref
                    className='cursor-pointer text-md mr-2 hover:text-black dark:hover:text-white border-b dark:border-gray-500 border-dashed'>
                    <i className='mr-1 fas fa-folder-open' />
                    {post.category}
                  </SmartLink>
                  <span className='mr-2'>|</span>
                </>
              )}

              {post?.type !== 'Page' && (
                <>
                  <SmartLink
                    href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
                    passHref
                    className='pl-1 mr-2 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 border-b dark:border-gray-500 border-dashed'>
                    {post?.publishDay}
                  </SmartLink>
                  <span className='mr-2'>|</span>
                  <span className='mx-2 text-gray-400 dark:text-gray-500'>
                    {tr(lang, 'lastEdited')}: {post.lastEditedDay}
                  </span>
                  <span className='mr-2'>|</span>
                  <ReadingTime post={post} />
                </>
              )}

              <div className='my-2'>
                {post.tagItems && (
                  <div className='flex flex-nowrap overflow-x-auto'>
                    {post.tagItems.map(tag => (
                      <TagItemMini key={tag.name} tag={tag} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          <WWAds className='w-full' orientation='horizontal' />
        </header>

        {/* Notion文章主体 */}
        <section id='article-wrapper'>
          {post && <NotionPage post={post} />}
        </section>

        <section className='atelier-article-actions'>
          <AdSlot type='in-article' />
          {/* 分享 */}
          <ShareBar post={post} />
        </section>
      </article>

      {post?.type === 'Post' && <ArticleAround prev={prev} next={next} />}

      {/* 相关推荐（由 NotionNext 依据同分类/同标签计算传入）*/}
      {post?.type === 'Post' && (
        <RecommendPosts recommendPosts={props.recommendPosts} />
      )}

      {/* 评论互动：容器无装饰；如果 Comment 组件没启用任何评论插件、返回空，
          CSS 里 :empty 规则会让整块塌陷不显示白块 */}
      <div className='atelier-comment-wrapper w-full overflow-x-auto'>
        <Comment frontMatter={post} />
      </div>
    </div>
  )
}
