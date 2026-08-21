import SmartLink from '@/components/SmartLink'

/**
 * 上一篇 / 下一篇导航
 * atelier 极简风：左右两列，无卡片背景、无阴影
 * 顶部小写字母标签 + 下面衬线体标题带下划线
 * 如果只有一侧存在，另一侧留空但保持栅格
 */
export default function ArticleAround({ prev, next }) {
  if (!prev && !next) return null

  return (
    <nav className='atelier-around'>
      <div className='atelier-around-prev'>
        {prev && (
          <SmartLink
            href={`/${prev.slug}`}
            passHref
            className='atelier-around-link'>
            <div className='atelier-around-label'>← 上一篇</div>
            <div className='atelier-around-title'>{prev.title}</div>
          </SmartLink>
        )}
      </div>
      <div className='atelier-around-next'>
        {next && (
          <SmartLink
            href={`/${next.slug}`}
            passHref
            className='atelier-around-link'>
            <div className='atelier-around-label'>下一篇 →</div>
            <div className='atelier-around-title'>{next.title}</div>
          </SmartLink>
        )}
      </div>
    </nav>
  )
}
