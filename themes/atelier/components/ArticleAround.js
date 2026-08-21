import SmartLink from '@/components/SmartLink'
import { tr, useAtelierLang } from '../lib/i18n'

/**
 * 上一篇 / 下一篇（跟随语言切换）
 */
export default function ArticleAround({ prev, next }) {
  const { lang } = useAtelierLang()
  if (!prev && !next) return null

  return (
    <nav className='atelier-around'>
      <div className='atelier-around-prev'>
        {prev && (
          <SmartLink
            href={`/${prev.slug}`}
            passHref
            className='atelier-around-link'>
            <div className='atelier-around-label'>← {tr(lang, 'prevPost')}</div>
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
            <div className='atelier-around-label'>{tr(lang, 'nextPost')} →</div>
            <div className='atelier-around-title'>{next.title}</div>
          </SmartLink>
        )}
      </div>
    </nav>
  )
}
