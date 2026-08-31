import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
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
  const { isDarkMode, toggleDarkMode } = useGlobal()

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
              width='20'
              height='20'
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
        {/* 回主页：无需 prop，第二位放置，方便从任意子页面一键回到首页 */}
        <SmartLink
          href='/'
          className='atelier-footer-home'
          aria-label={tr(lang, 'homeAriaLabel')}
          title={tr(lang, 'homeAriaLabel')}>
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
            <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-5h-2v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
          </svg>
        </SmartLink>
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
        {siteConfig('ENABLE_RSS') && (
          <a
            href='/rss/feed.xml'
            target='_blank'
            rel='noreferrer'
            className='atelier-footer-rss'
            aria-label='RSS'
            title='RSS'>
            {/* Feather-style 20px stroke SVG, 与 collapse/home 一套画风 */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path d='M4 11a9 9 0 0 1 9 9' />
              <path d='M4 4a16 16 0 0 1 16 16' />
              <circle cx='5' cy='19' r='1' />
            </svg>
          </a>
        )}
        <button
          type='button'
          className='atelier-footer-darkmode'
          onClick={toggleDarkMode}
          aria-label={isDarkMode ? tr(lang, 'lightModeAriaLabel') : tr(lang, 'darkModeAriaLabel')}
          title={isDarkMode ? tr(lang, 'lightModeAriaLabel') : tr(lang, 'darkModeAriaLabel')}>
          {isDarkMode ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <circle cx='12' cy='12' r='4' />
              <line x1='12' y1='2' x2='12' y2='4' />
              <line x1='12' y1='20' x2='12' y2='22' />
              <line x1='4.93' y1='4.93' x2='6.34' y2='6.34' />
              <line x1='17.66' y1='17.66' x2='19.07' y2='19.07' />
              <line x1='2' y1='12' x2='4' y2='12' />
              <line x1='20' y1='12' x2='22' y2='12' />
              <line x1='4.93' y1='19.07' x2='6.34' y2='17.66' />
              <line x1='17.66' y1='6.34' x2='19.07' y2='4.93' />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
            </svg>
          )}
        </button>
      </div>
      <SiteInfo />
    </section>
  )
}

export default AtelierFooter
