import DarkModeButton from '@/components/DarkModeButton'
import SiteInfo from './SiteInfo'
import SocialButton from './SocialButton'

/**
 * Atelier 侧栏底部：社交按钮 + 暗色开关 + 版权信息
 *
 * 通过 className 由外层决定在哪个视口下显示：
 *   - 桌面：<AtelierFooter className='hidden lg:flex' />  嵌在 AsideLeft 底部
 *   - 手机：<AtelierFooter className='flex lg:hidden' />  渲染到主内容后
 *
 * 图标和文字统一居中；样式在 style.js 的 .atelier-sidebar-footer 里定义。
 */
const AtelierFooter = ({ className = '' }) => (
  <section className={`atelier-sidebar-footer ${className}`}>
    <div className='atelier-footer-icons'>
      <SocialButton />
      <DarkModeButton />
    </div>
    <SiteInfo />
  </section>
)

export default AtelierFooter
