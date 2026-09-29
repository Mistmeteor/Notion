import { useRouter } from 'next/router'
import ArchiveLink from './ArchiveLink'
import AtelierFooter from './AtelierFooter'
import Catalog from './Catalog'
import LatestPosts from './LatestPosts'
import Logo from './Logo'
import { MenuList } from './MenuList'

/**
 * Atelier 侧栏（桌面固定 360px 宽 / 手机全宽堆叠）
 * 排序：头像 → 站点标题 → 副标题（Logo 内）→ 菜单 → 近期文章 → [归档入口, 仅首页] → [文章目录] → [footer]
 *
 * 主动去掉了 fukasawa 原本的折叠机制：atelier 是编辑器/画册风格，
 * 侧栏固定宽度不受 fullWidth / localStorage / 折叠按钮 影响，
 * 保证首页与文章详情页宽度完全一致。
 */
function AsideLeft(props) {
  const { post, slot, onToggleSidebar, onToggleLang } = props
  const router = useRouter()
  // "主页"含首页 / 分页首页；分类、标签、归档、搜索、文章页都不算
  const isHome =
    router.pathname === '/' || router.pathname.startsWith('/page/')
  // 归档页本身就是"所有帖子"的完整列表, sidebar 里再放 Latest Posts 视觉冗余.
  // 手机端 sidebar 堆到内容上方, 更是浪费首屏空间 → 用 lg:block 只桌面留.
  const isArchive = router.pathname === '/archive'

  return (
    <div className='sideLeft relative w-full lg:w-[360px] lg:min-h-screen block z-20'>
      <div className='px-10 pt-12 pb-6'>
        {/* 顶部组：头像 + 站点标题 + 副标题 + 菜单 */}
        <div className='atelier-sidebar-top'>
          <Logo {...props} />
          <section className='mt-2'>
            <MenuList {...props} />
          </section>
        </div>

        {/* 中段组（近期文章 / 归档入口 / 文章目录）—— 桌面上通过外层
            justify-content: space-between，与顶部组、底部组三等分侧栏高度，
            中段自然居中 */}
        <div className='atelier-sidebar-middle'>
          {!post && (
            <div className={isArchive ? 'hidden lg:block' : ''}>
              <LatestPosts {...props} />
            </div>
          )}
          {!post && isHome && <ArchiveLink />}
          {post && (
            <section className='atelier-toc mt-2 mb-10'>
              <Catalog post={post} />
            </section>
          )}
        </div>

        {/* 底部组：footer + 可选 slot（Live2D 之类）*/}
        <div className='atelier-sidebar-bottom'>
          <AtelierFooter
            className='hidden lg:flex'
            onToggleSidebar={onToggleSidebar}
            onToggleLang={onToggleLang}
          />
          {slot && <div className='mt-4'>{slot}</div>}
        </div>
      </div>
    </div>
  )
}

export default AsideLeft
