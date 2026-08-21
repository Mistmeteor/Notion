import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

/**
 * Atelier 头部：头像 + 站点标题（跳回首页）
 * 头像取值优先级：ATELIER_PROFILE_AVATAR > AVATAR > siteInfo.icon
 * 站点标题：直接用 TITLE，字体样式在 style.js 里定义
 */
const Logo = props => {
  const { siteInfo } = props || {}
  const title = siteConfig('TITLE')
  const showAvatar = siteConfig('ATELIER_SHOW_AVATAR', true, CONFIG)
  const showTagline = siteConfig('ATELIER_SHOW_TAGLINE', true, CONFIG)
  const description = siteConfig('DESCRIPTION')

  const avatarUrl =
    siteConfig('ATELIER_PROFILE_AVATAR', '', CONFIG) ||
    siteConfig('AVATAR') ||
    siteInfo?.icon ||
    ''

  return (
    <SmartLink href='/' className='block no-underline'>
      {showAvatar && (
        avatarUrl ? (
          <img
            src={avatarUrl}
            alt={title}
            className='atelier-avatar'
          />
        ) : (
          <div className='atelier-avatar' aria-hidden='true' />
        )
      )}
      <h1 className='atelier-logo-title'>{title}</h1>
      {showTagline && description && (
        <p className='atelier-tagline'>{description}</p>
      )}
    </SmartLink>
  )
}

export default Logo
