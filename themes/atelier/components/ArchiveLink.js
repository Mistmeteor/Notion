import SmartLink from '@/components/SmartLink'
import { tr, useAtelierLang } from '../lib/i18n'

/**
 * 侧栏"归档"入口
 * - 只在首页展示（AsideLeft 里控制何时渲染）
 * - 复用 .atelier-latest-title 的 heading 视觉，整块本身就是链接
 * - 点击直接跳转到 /archive
 */
const ArchiveLink = () => {
  const { lang } = useAtelierLang()

  return (
    <section className='atelier-archive-link'>
      <SmartLink
        href='/archive'
        className='atelier-latest-title atelier-archive-heading'>
        {tr(lang, 'archive')}
      </SmartLink>
    </section>
  )
}

export default ArchiveLink
