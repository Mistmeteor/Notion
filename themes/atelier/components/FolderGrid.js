import { assignUniqueCovers } from '../lib/fallbackCover'
import BlogCard from './BlogCard'

/**
 * folder 落地页 / 归档页 folder 板块：按首页 b-grid 比例渲染一组 BlogCard
 * (3 列 grid，封面 2:1)。传入 posts 走和首页 card variant 同一样式。
 */
const FolderGrid = ({ title, posts = [], siteInfo, titleCount }) => {
  if (!Array.isArray(posts) || posts.length === 0) return null
  const uniquePosts = assignUniqueCovers(posts)
  return (
    <section className='atelier-b-group'>
      {title && (
        <header className='atelier-b-group-head'>
          <h2 className='atelier-b-group-title'>{title}</h2>
          {titleCount !== undefined && (
            <span className='atelier-b-group-count'>{titleCount}</span>
          )}
        </header>
      )}
      <div className='atelier-b-grid atelier-b-grid-inline'>
        {uniquePosts.map(post => (
          <div key={post.id} className='atelier-b-grid-item'>
            <BlogCard post={post} siteInfo={siteInfo} variant='card' />
          </div>
        ))}
      </div>
    </section>
  )
}

export default FolderGrid
