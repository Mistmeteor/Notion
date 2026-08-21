import AtelierFooter from './AtelierFooter'
import Catalog from './Catalog'
import LatestPosts from './LatestPosts'
import Logo from './Logo'
import { MenuList } from './MenuList'

/**
 * Atelier 侧栏（桌面固定 360px 宽 / 手机全宽堆叠）
 * 排序：头像 → 站点标题 → 副标题（Logo 内）→ 菜单 → 近期文章 → [文章目录] → [footer]
 *
 * 主动去掉了 fukasawa 原本的折叠机制：atelier 是编辑器/画册风格，
 * 侧栏固定宽度不受 fullWidth / localStorage / 折叠按钮 影响，
 * 保证首页与文章详情页宽度完全一致。
 */
function AsideLeft(props) {
  const { post, slot, onToggleSidebar, onToggleLang } = props

  return (
    <div className='sideLeft relative w-full lg:w-[360px] lg:min-h-screen block z-20'>
      <div className='px-10 pt-12 pb-14'>
        {/* 头像 + 站点标题 + 副标题 */}
        <Logo {...props} />

        {/* 菜单：KONTAKT / ÜBER MICH 等 */}
        <section className='mt-2'>
          <MenuList {...props} />
        </section>

        {/* 近期文章：只在列表页显示；进入文章后让位给目录 */}
        {!post && <LatestPosts {...props} />}

        {/* 文章目录：只在文章详情页出现；上紧下留白，与 footer 保持距离 */}
        {post && (
          <section className='atelier-toc mt-2 mb-10'>
            <Catalog post={post} />
          </section>
        )}

        {/* 桌面版 footer：margin-top: auto 顶到侧栏底部 = 初始视口底部
            带 onToggleSidebar 使 footer 里出现"收起侧栏"按钮 */}
        <AtelierFooter
          className='hidden lg:flex'
          onToggleSidebar={onToggleSidebar}
          onToggleLang={onToggleLang}
        />

        {/* 主题预留插槽（如 Live2D 之类）*/}
        {slot && <div className='mt-4'>{slot}</div>}
      </div>
    </div>
  )
}

export default AsideLeft
