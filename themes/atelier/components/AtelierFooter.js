import DarkModeButton from '@/components/DarkModeButton'
import SiteInfo from './SiteInfo'
import SocialButton from './SocialButton'

/**
 * Atelier 侧栏底部：社交 + 暗色 + [收起侧栏] + 版权信息
 *
 * 通过 className 由外层决定在哪个视口下显示：
 *   - 桌面：<AtelierFooter className='hidden lg:flex' />  嵌在 AsideLeft 底部
 *   - 手机：<AtelierFooter className='flex lg:hidden' />  渲染到主内容后
 *
 * onToggleSidebar：可选。传入时在暗色开关右边加一个"收起侧栏"按钮
 * （手机端不显示该按钮 —— 手机端顶部有独立汉堡包）
 */
const AtelierFooter = ({ className = '', onToggleSidebar }) => (
  <section className={`atelier-sidebar-footer ${className}`}>
    <div className='atelier-footer-icons'>
      <SocialButton />
      <DarkModeButton />
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
    </div>
    <SiteInfo />
  </section>
)

export default AtelierFooter
