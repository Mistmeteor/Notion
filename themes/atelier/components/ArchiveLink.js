import SmartLink from '@/components/SmartLink'
import { tr, useAtelierLang } from '../lib/i18n'

/**
 * 侧栏"归档"板块（仅首页渲染，由 AsideLeft 控制）
 * 标题走 `.atelier-latest-title`，整个标题文字点击即跳 /archive；
 * 标题下方按 LatestPosts 同款列表样式列出全站 folder 名字，每条链接
 * 对应 folder 落地页（/<folder-slug>），保持视觉与近期文章一致。
 */
const ArchiveLink = ({ folders }) => {
  const { lang } = useAtelierLang()
  const list = Array.isArray(folders) ? folders.filter(f => f?.title) : []

  return (
    <section className='atelier-archive-link'>
      <SmartLink
        href='/archive'
        className='atelier-latest-title atelier-archive-heading'>
        {tr(lang, 'archive')}
      </SmartLink>
      {list.length > 0 && (
        <div className='atelier-latest-list'>
          {list.map(folder => (
            <SmartLink
              key={folder.id}
              href={folder.href || `/${folder.slug}`}
              title={folder.title}>
              {folder.title}
            </SmartLink>
          ))}
        </div>
      )}
    </section>
  )
}

export default ArchiveLink
