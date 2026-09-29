import SmartLink from '@/components/SmartLink'
import { tr, useAtelierLang } from '../lib/i18n'
import ReadingTime from './ReadingTime'

/**
 * Atelier 归档页 —— 方案 D（Archive Index · 年历式）
 * 按年份分组的极简 index：每行 [MM-DD | 标题 | 分类 | 阅读时长]
 * 无缩略图, 靠排版取胜.
 *
 * NotionNext 传的 archivePosts 是按 "YYYY-MM" 分组的对象;
 * 这里再按年份聚合, 组内保持原有的时间倒序.
 */
const AtelierArchive = ({ archivePosts }) => {
  const { lang } = useAtelierLang()
  const grouped = groupByYear(archivePosts)
  const total = grouped.reduce((sum, [, posts]) => sum + posts.length, 0)

  return (
    <div className='atelier-archive'>
      <div className='atelier-d-topstats'>
        <h1 className='atelier-d-heading'>{tr(lang, 'archive')}</h1>
        <div className='atelier-d-total'>
          {tr(lang, 'archiveTotal', { n: total })}
        </div>
      </div>

      {grouped.map(([year, posts]) => (
        <div key={year}>
          <div id={year} className='atelier-d-yr'>
            <span>{year}</span>
            <span className='cnt'>
              {tr(lang, 'archiveYearCount', { n: posts.length })}
            </span>
          </div>
          {posts.map(post => (
            <div key={post.id} className='atelier-d-row'>
              <div className='atelier-d-date'>{extractMMDD(post)}</div>
              <div className='atelier-d-title'>
                <SmartLink href={post?.href}>{post.title}</SmartLink>
              </div>
              <div className='atelier-d-cat'>{post?.category || ''}</div>
              <div className='atelier-d-len'>
                <ReadingTime post={post} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function groupByYear(archivePosts) {
  const grouped = {}
  Object.entries(archivePosts || {}).forEach(([ym, posts]) => {
    const year = String(ym).split('-')[0]
    if (!grouped[year]) grouped[year] = []
    grouped[year] = grouped[year].concat(posts)
  })
  return Object.entries(grouped).sort((a, b) => b[0].localeCompare(a[0]))
}

function extractMMDD(post) {
  const d = post?.publishDay || post?.date?.start_date || ''
  const parts = String(d).split('-')
  if (parts.length !== 3) return d
  return `${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`
}

export default AtelierArchive
