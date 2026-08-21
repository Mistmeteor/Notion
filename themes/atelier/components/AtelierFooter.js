import DarkModeButton from '@/components/DarkModeButton'
import SiteInfo from './SiteInfo'
import SocialButton from './SocialButton'
import { tr, useAtelierLang } from '../lib/i18n'

/**
 * Atelier 侧栏底部：[收起] · [语言] · 社交 · [暗色] · 版权信息
 *
 * onToggleSidebar：可选。桌面版才传，出现"收起侧栏"按钮
 * onToggleLang：可选。传入则出现语言切换按钮（EN / 中）
 */
const AtelierFooter = ({ className = '', onToggleSidebar, onToggleLang }) => {
  const { lang } = useAtelierLang()

  return (
    <section className={`atelier-sidebar-footer ${className}`}>
      <div className='atelier-footer-icons'>
        {onToggleSidebar && (
          <button
            type='button'
            className='atelier-footer-collapse hidden lg:inline-flex'
            onClick={onToggleSidebar}
            aria-label='收起侧栏'
            title='收起侧栏'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
              <line x1='9' y1='3' x2='9' y2='21' />
              <polyline points='16 8 13 12 16 16' />
            </svg>
          </button>
        )}
        {onToggleLang && (
          <button
            type='button'
            className='atelier-footer-lang'
            onClick={onToggleLang}
            aria-label={tr(lang, 'langAriaLabel')}
            title={tr(lang, 'langAriaLabel')}>
            {tr(lang, 'langLabel')}
          </button>
        )}
        <SocialButton />
        <DarkModeButton />
      </div>
      <SiteInfo />
    </section>
  )
}

export default AtelierFooter
