/* eslint-disable react/no-unknown-property */
import CONFIG from './config'
import { themeConsoleStyle } from '@/lib/themeConsoleStyle'

/**
 * Atelier —— 编辑器/画册风格
 * 参考：Anders Norén Fukasawa WordPress 主题
 * - 左侧固定 320px 侧栏 + 右主内容（atelier 布局本身提供）
 * - 全站暖调米白纸感底色，Source Serif 4 衬线体
 * - 菜单：小型大写字母（uppercase + 字距）
 * - 链接：下划线，克制无色
 */
const Style = () => {
  const bg = CONFIG.ATELIER_COLOR_BG
  const bgDark = CONFIG.ATELIER_COLOR_BG_DARK
  const text = CONFIG.ATELIER_COLOR_TEXT
  const textDark = CONFIG.ATELIER_COLOR_TEXT_DARK
  const muted = CONFIG.ATELIER_COLOR_MUTED
  const mutedDark = CONFIG.ATELIER_COLOR_MUTED_DARK
  const border = CONFIG.ATELIER_COLOR_BORDER
  const serif = CONFIG.ATELIER_FONT_SERIF
  const sans = CONFIG.ATELIER_FONT_SANS

  return (
    <>
      {CONFIG.ATELIER_LOAD_GOOGLE_FONTS && (
        <>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&family=Noto+Serif+SC:wght@400;500;600&display=optional'
          />
        </>
      )}
      <style jsx global>{`
        /* ============= 全站底色与字体 ============= */
        /* html 层也要设背景，否则页面短/宽比不足时顶部露出浏览器默认白色 */
        html {
          background-color: ${bg};
        }
        .dark html {
          background-color: ${bgDark};
        }
        body {
          background-color: ${bg};
          color: ${text};
          font-family: ${serif};
          font-size: 17px;
          line-height: 1.7;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .dark body {
          background-color: ${bgDark};
          color: ${textDark};
        }

        /* ============= 主容器 & 侧栏底色对齐 ============= */
        #theme-atelier {
          background: ${bg};
        }
        .dark #theme-atelier {
          background: ${bgDark};
        }
        #theme-atelier .sideLeft {
          background: ${bg} !important;
          border-right: 0 !important;
        }
        .dark #theme-atelier .sideLeft {
          background: ${bgDark} !important;
        }
        #theme-atelier main#wrapper {
          background: ${bg} !important;
        }
        .dark #theme-atelier main#wrapper {
          background: ${bgDark} !important;
        }

        /* ============= 侧栏：Logo/标题 ============= */
        #theme-atelier .atelier-logo-title {
          font-family: ${serif};
          font-size: 40px;
          font-weight: 500;
          line-height: 1.15;
          letter-spacing: -0.005em;
          color: ${text};
          margin: 0 0 20px 0;
        }
        .dark #theme-atelier .atelier-logo-title {
          color: ${textDark};
        }
        #theme-atelier .atelier-avatar {
          width: 56px;
          height: 56px;
          border: 1px solid ${border};
          margin-bottom: 32px;
          object-fit: cover;
          background: linear-gradient(135deg, #6b5a4c 0%, #2f2015 100%);
        }
        #theme-atelier .atelier-tagline {
          font-family: ${serif};
          color: ${muted};
          font-size: 17px;
          line-height: 1.55;
          margin-bottom: 40px;
        }
        .dark #theme-atelier .atelier-tagline {
          color: ${mutedDark};
        }

        /* ============= 侧栏：菜单（小型大写字母）============= */
        /* 手机端也用 PC 菜单样式，不要用折叠菜单 */
        #theme-atelier #nav-pc {
          display: block !important;
        }
        #theme-atelier #nav-mobile {
          display: none !important;
        }
        #theme-atelier #nav-pc li,
        #theme-atelier #nav-mobile li {
          border: 0 !important;
          padding: 0 !important;
          margin-bottom: 14px !important;
        }
        #theme-atelier #nav-pc li a,
        #theme-atelier #nav-mobile li a {
          font-family: ${serif};
          color: ${text};
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-size: 12px;
          font-weight: 500;
          text-decoration: none;
        }
        #theme-atelier #nav-pc li a:hover {
          color: ${muted};
          text-decoration: none;
        }
        .dark #theme-atelier #nav-pc li a,
        .dark #theme-atelier #nav-mobile li a {
          color: ${textDark};
        }

        /* ============= 侧栏：近期文章 =============
           字号与文章页的 Catalog (目录) 保持一致:
             heading  = toc-title  (20px / weight 600)
             list item = toc-item  (16px / line-height 1.55)
           下划线是 LatestPosts 的视觉标记, 保留.
           title 顶部不再加 margin: 桌面端 middle 段用 justify-content: center
           居中, 任何内部 margin 都会破坏 "上下等距" 的视觉平衡. 与顶部/菜单
           的间距交给 sidebar 布局的 flex 自动分配. */
        #theme-atelier .atelier-latest-title {
          font-family: ${serif};
          color: ${text};
          font-size: 20px;
          font-weight: 600;
          letter-spacing: normal;
          margin: 0 0 14px 0;
        }
        .dark #theme-atelier .atelier-latest-title {
          color: ${textDark};
        }
        #theme-atelier .atelier-latest-list a {
          display: block;
          font-family: ${serif};
          color: ${text};
          font-size: 16px;
          line-height: 1.55;
          text-decoration: none;
          margin-bottom: 10px;
        }
        .dark #theme-atelier .atelier-latest-list a {
          color: ${textDark};
        }
        #theme-atelier .atelier-latest-list a:last-child {
          margin-bottom: 0;
        }
        #theme-atelier .atelier-latest-list a:hover {
          opacity: 0.6;
        }

        /* ============= 文章：标题 / 正文 / 元信息 ============= */
        #theme-atelier article h1,
        #theme-atelier article h2,
        #theme-atelier article h3,
        #theme-atelier .article-header h1,
        #theme-atelier .article-header h2 {
          font-family: ${serif};
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: -0.005em;
          color: ${text};
        }
        .dark #theme-atelier article h1,
        .dark #theme-atelier article h2,
        .dark #theme-atelier article h3 {
          color: ${textDark};
        }
        #theme-atelier article p,
        #theme-atelier article li,
        #theme-atelier .notion-text,
        #theme-atelier .notion {
          font-family: ${serif};
          font-size: 17px;
          line-height: 1.75;
          color: ${text};
        }
        .dark #theme-atelier article p,
        .dark #theme-atelier article li,
        .dark #theme-atelier .notion-text,
        .dark #theme-atelier .notion {
          color: ${textDark};
        }
        #theme-atelier .post-meta,
        #theme-atelier time,
        #theme-atelier .article-date,
        #theme-atelier .publish-date {
          font-family: ${sans};
          letter-spacing: 0.02em;
          color: ${muted};
          font-size: 15px;
        }
        .dark #theme-atelier .post-meta,
        .dark #theme-atelier time,
        .dark #theme-atelier .publish-date {
          color: ${mutedDark};
        }

        /* ============= 卡片：极简去装饰 ============= */
        #theme-atelier .card {
          background: transparent !important;
          box-shadow: none !important;
          border: 0 !important;
          border-bottom: 1px solid ${border} !important;
          border-radius: 0 !important;
          padding: 20px 0 !important;
        }
        .dark #theme-atelier .card {
          border-bottom-color: rgba(255, 255, 255, 0.1) !important;
        }

        /* ============= 文章详情页：白底改成同底色 ============= */
        /* ArticleDetail 的 article 和评论区都写死了 bg-white，一并覆盖 */
        #theme-atelier .bg-white {
          background-color: ${bg} !important;
        }
        .dark #theme-atelier .bg-white,
        .dark #theme-atelier .dark\\:bg-hexo-black-gray {
          background-color: ${bgDark} !important;
        }
        /* 文章框也去掉阴影 */
        #theme-atelier article {
          box-shadow: none !important;
        }

        /* ============= 页脚：图标 + 版权，居中排版 ============= */
        #theme-atelier .atelier-sidebar-footer {
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 24px 8px 8px 8px;
          border-top: 1px solid ${border};
          gap: 12px;
        }
        .dark #theme-atelier .atelier-sidebar-footer {
          border-top-color: rgba(255,255,255,0.08);
        }
        #theme-atelier .atelier-footer-icons {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 24px;
          width: 100%;
          margin-bottom: 4px;
        }
        #theme-atelier .atelier-footer-icons > * {
          flex: 0 0 auto !important;
        }
        /* 中和 SocialButton 外层的 w-full，避免把整行撑开 */
        #theme-atelier .atelier-footer-icons .w-full {
          width: auto !important;
          flex-grow: 0 !important;
        }
        #theme-atelier .atelier-footer-icons a,
        #theme-atelier .atelier-footer-icons button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        #theme-atelier .atelier-sidebar-footer .siteInfo,
        #theme-atelier .atelier-sidebar-footer .siteInfo * {
          font-family: ${sans};
          font-size: 12px;
          color: ${muted};
          text-align: center;
          width: auto;
        }
        .dark #theme-atelier .atelier-sidebar-footer .siteInfo,
        .dark #theme-atelier .atelier-sidebar-footer .siteInfo * {
          color: ${mutedDark};
        }

        /* ============= 首页：单栏流（覆盖 fukasawa 的 3 列 masonry）============= */
        #theme-atelier .grid-container {
          column-count: initial !important;
          column-gap: initial !important;
          display: block;
          max-width: 780px;
          margin: 0 auto;
          padding: 0 20px;
        }
        #theme-atelier .grid-item {
          display: block !important;
          width: 100%;
          break-inside: auto;
          margin-bottom: 0;
          justify-content: flex-start !important;
        }

        /* ---- 单条流式文章条目 ---- */
        #theme-atelier .atelier-stream-item {
          max-width: 100%;
          margin: 0 auto;
          background: transparent;
          box-shadow: none;
          border: 0;
          padding: 0;
        }
        #theme-atelier .atelier-stream-item:last-child {
          margin-bottom: 40px;
        }
        /* 条目之间用两端淡出的细线做分隔：明确"新章节开始"但避免硬线的死板感。
           绑到 wrapper 层的相邻兄弟上，而不是 .atelier-stream-item —— 因为
           BlogCard 被 .grid-item 包了一层，:not(:last-child) 在 article 本身
           上永远不成立（它是自己 wrapper 里唯一的子元素） */
        #theme-atelier .grid-container > .grid-item + .grid-item::before {
          content: '';
          display: block;
          width: 60%;
          max-width: 320px;
          height: 1px;
          /* 上 90 下 30: 上面接文字 meta 视觉分量轻, 下面接图分量重, 拉不等间距才平衡 */
          margin: 90px auto 30px auto;
          background: linear-gradient(to right, transparent, ${border}, transparent);
        }
        .dark #theme-atelier .grid-container > .grid-item + .grid-item::before {
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.14), transparent);
        }
        #theme-atelier .atelier-stream-cover-wrap {
          display: block;
          width: 100%;
          overflow: hidden;
          margin-bottom: 32px;
          background: #eee;
        }
        .dark #theme-atelier .atelier-stream-cover-wrap {
          background: #262019;
        }
        #theme-atelier .atelier-stream-cover {
          width: 100%;
          /* 全设备统一"杂志封面横带"视觉: 横向吃满宽度, 纵向按 aspect-ratio
             固定裁剪成扁横带. 原来用 max-height: 40vh 在竖屏设备 (iPad / 手机)
             上会变成接近正方形, 失去横带感. 现在用 10/3 ≈ 3.33:1, 跟桌面
             16:9 显示器下 vh 推出来的 ratio 对齐, 手机/iPad 也能复刻这个版式. */
          aspect-ratio: 10 / 3;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }
        #theme-atelier .atelier-stream-cover-wrap:hover .atelier-stream-cover {
          transform: scale(1.03);
        }
        #theme-atelier .atelier-stream-title {
          font-family: ${serif};
          /* hero 标题比 Haruki Shi (atelier-logo-title: 40px) 小一档,
             保持品牌名是页面最大字号, 避免跟 hero 标题打架 */
          font-size: 32px;
          font-weight: 500;
          line-height: 1.15;
          letter-spacing: -0.005em;
          margin: 0 0 14px 0;
        }
        #theme-atelier .atelier-stream-title a {
          color: ${text};
          text-decoration: none;
        }
        #theme-atelier .atelier-stream-title a:hover {
          color: ${muted};
        }
        .dark #theme-atelier .atelier-stream-title a {
          color: ${textDark};
        }
        #theme-atelier .atelier-stream-date {
          font-family: ${sans};
          color: ${muted};
          font-size: 15px;
          letter-spacing: 0.02em;
          margin-bottom: 24px;
        }
        .dark #theme-atelier .atelier-stream-date {
          color: ${mutedDark};
        }
        #theme-atelier .atelier-stream-summary {
          font-family: ${serif};
          font-size: 17px;
          line-height: 1.75;
          color: ${text};
          margin-bottom: 20px;
        }
        .dark #theme-atelier .atelier-stream-summary {
          color: ${textDark};
        }
        #theme-atelier .atelier-stream-more {
          display: inline-block;
          font-family: ${serif};
          font-size: 14px;
          color: ${muted};
          text-decoration: none;
          border-bottom: 1px solid ${muted};
          padding-bottom: 2px;
          letter-spacing: 0.02em;
        }
        #theme-atelier .atelier-stream-more:hover {
          color: ${text};
          border-bottom-color: ${text};
        }
        .dark #theme-atelier .atelier-stream-more {
          color: ${mutedDark};
          border-bottom-color: ${mutedDark};
        }

        /* ============= 首页方案 B：Hero + Grid 杂志式 =============
           第一条 (variant='hero') 保留原有的大图 + 40px 标题 + 摘要 布局；
           其余条目 (variant='card') 走 3 列 grid, 图收窄, 标题 20px,
           摘要 clamp 2 行. 两块之间用一条细分割线过渡. */
        #theme-atelier .atelier-b-wrapper {
          margin: 0 auto;
          padding: 0 20px;
        }
        #theme-atelier .atelier-b-hero .atelier-stream-item {
          margin-bottom: 0;
        }
        #theme-atelier .atelier-b-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px 24px;
          margin-top: 56px;
          padding-top: 40px;
          border-top: 1px solid ${border};
        }
        .dark #theme-atelier .atelier-b-grid {
          border-top-color: rgba(255,255,255,0.14);
        }
        #theme-atelier .atelier-b-grid-item {
          min-width: 0;
        }
        /* ---- Card variant: 覆盖 stream 默认(hero)的尺寸 ---- */
        #theme-atelier .atelier-stream-card .atelier-stream-cover-wrap {
          margin-bottom: 14px;
        }
        #theme-atelier .atelier-stream-card .atelier-stream-cover {
          /* 卡片走稍微没那么极端的横带: 2:1. 跟 hero 的 10/3 (≈3.33:1)
             同体系但略方一点, 保留主次区分. 覆盖父规则的 10/3. */
          aspect-ratio: 2 / 1;
        }
        #theme-atelier .atelier-stream-card .atelier-stream-title {
          font-size: 20px;
          line-height: 1.25;
          margin-bottom: 8px;
        }
        #theme-atelier .atelier-stream-card .atelier-stream-date {
          font-size: 13px;
          margin-bottom: 10px;
        }
        #theme-atelier .atelier-stream-card .atelier-stream-summary {
          font-size: 14.5px;
          line-height: 1.55;
          margin-bottom: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* 平板端: grid 收成 2 列, 手机: 1 列(相当于回到单栏流) */
        @media (max-width: 1023px) {
          #theme-atelier .atelier-b-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px 20px;
          }
        }

        /* 小屏幕：略微缩小标题，条目之间的分隔线收紧一点 */
        @media (max-width: 640px) {
          #theme-atelier .atelier-stream-title { font-size: 30px; }
          #theme-atelier .grid-container > .grid-item + .grid-item::before {
            margin: 64px auto;
            width: 70%;
          }
          #theme-atelier .atelier-b-grid {
            grid-template-columns: 1fr;
            gap: 40px;
            margin-top: 40px;
            padding-top: 32px;
          }
          #theme-atelier .atelier-stream-card .atelier-stream-title {
            font-size: 22px;
          }
        }

        /* ============= 侧栏：归档入口 =============
           复用 .atelier-latest-title 的 heading 视觉,
           heading 本身就是链接, 直接跳 /archive.
           顶部加 margin 与上面的 Latest Posts 拉开距离. */
        #theme-atelier .atelier-archive-link {
          margin-top: 28px;
        }
        #theme-atelier .atelier-archive-heading {
          display: block;
          text-decoration: none;
          cursor: pointer;
          transition: opacity 0.15s ease;
        }
        #theme-atelier .atelier-archive-heading:hover {
          opacity: 0.6;
        }

        /* ============= 归档页方案 D：Archive Index · 年历式 =============
           按年份分组的极简 index, 每行 [MM-DD | 标题 | 分类 | 阅读时长].
           无缩略图, 靠排版取胜. */
        #theme-atelier .atelier-archive {
          margin: 0 auto;
          padding: 0 20px 60px;
        }
        #theme-atelier .atelier-d-topstats {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding-bottom: 16px;
          border-bottom: 1px solid ${border};
          margin-bottom: 20px;
        }
        .dark #theme-atelier .atelier-d-topstats {
          border-bottom-color: rgba(255,255,255,0.14);
        }
        #theme-atelier .atelier-d-heading {
          font-family: ${serif};
          font-size: 26px;
          font-weight: 500;
          color: ${text};
          margin: 0;
        }
        .dark #theme-atelier .atelier-d-heading {
          color: ${textDark};
        }
        #theme-atelier .atelier-d-total {
          font-family: ${sans};
          font-size: 13px;
          color: ${muted};
          letter-spacing: 0.02em;
        }
        .dark #theme-atelier .atelier-d-total {
          color: ${mutedDark};
        }
        #theme-atelier .atelier-d-yr {
          font-family: ${serif};
          font-size: 20px;
          color: ${muted};
          font-weight: 500;
          margin: 28px 0 4px;
          padding-bottom: 4px;
          border-bottom: 1px dashed ${border};
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .dark #theme-atelier .atelier-d-yr {
          color: ${mutedDark};
          border-bottom-color: rgba(255,255,255,0.14);
        }
        #theme-atelier .atelier-d-yr .cnt {
          font-family: ${sans};
          font-size: 12px;
          color: ${muted};
          letter-spacing: 0.02em;
        }
        .dark #theme-atelier .atelier-d-yr .cnt {
          color: ${mutedDark};
        }
        #theme-atelier .atelier-d-row {
          display: grid;
          grid-template-columns: 64px 1fr 140px 80px;
          gap: 16px;
          padding: 8px 0;
          align-items: baseline;
          border-bottom: 1px dotted ${border};
        }
        .dark #theme-atelier .atelier-d-row {
          border-bottom-color: rgba(255,255,255,0.10);
        }
        #theme-atelier .atelier-d-row:hover {
          background: rgba(0,0,0,0.03);
        }
        .dark #theme-atelier .atelier-d-row:hover {
          background: rgba(255,255,255,0.04);
        }
        /* 每行的三个元信息 (日期/分类/阅读时长) 走跟主页 hero 日期一致的
           sans + muted + letter-spacing 0.02em 朴素风: 不 uppercase 不加粗,
           密集列表所以字号收到 13px. */
        #theme-atelier .atelier-d-date {
          font-family: ${sans};
          font-size: 13px;
          color: ${muted};
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.02em;
        }
        .dark #theme-atelier .atelier-d-date {
          color: ${mutedDark};
        }
        #theme-atelier .atelier-d-title {
          font-family: ${serif};
          font-size: 16px;
          line-height: 1.35;
          color: ${text};
          min-width: 0;
        }
        .dark #theme-atelier .atelier-d-title {
          color: ${textDark};
        }
        #theme-atelier .atelier-d-title a {
          color: inherit;
          text-decoration: none;
        }
        #theme-atelier .atelier-d-title a:hover {
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-thickness: 1px;
        }
        #theme-atelier .atelier-d-cat {
          font-family: ${sans};
          font-size: 13px;
          color: ${muted};
          letter-spacing: 0.02em;
        }
        .dark #theme-atelier .atelier-d-cat {
          color: ${mutedDark};
        }
        #theme-atelier .atelier-d-len {
          font-family: ${sans};
          font-size: 13px;
          color: ${muted};
          text-align: right;
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.02em;
        }
        .dark #theme-atelier .atelier-d-len {
          color: ${mutedDark};
        }
        /* 手机端: cat 和 len 挤位置, 收窄一点, 隐藏 cat 可选 */
        @media (max-width: 640px) {
          #theme-atelier .atelier-d-row {
            grid-template-columns: 52px 1fr 60px;
            gap: 10px;
          }
          #theme-atelier .atelier-d-cat {
            display: none;
          }
          #theme-atelier .atelier-d-title {
            font-size: 15px;
          }
        }

        /* ============= 桌面端默认（列表页）：侧栏作为整体模块固定 ============= */
        @media (min-width: 1024px) {
          /* 侧栏 fix 到视口左侧，成为独立浮层；内容溢出时侧栏内滚 */
          #theme-atelier .sideLeft {
            position: fixed;
            top: 0;
            left: 0;
            width: 360px;
            height: 100vh;
            /* iOS Safari 收/展地址栏时 vh 会变化, 导致侧栏和 footer 抖动。
               改用 svh (小视口高度): 恒定使用"地址栏可见"那档的最小视口
               高度, 完全不随 URL 栏动画变化。旧浏览器 fallback 到 100vh */
            height: 100svh;
            overflow-y: auto;
            background: ${bg};
            z-index: 20;
            /* 默认隐藏滚动条：鼠标 hover/focus 时才淡入
               Firefox 用 scrollbar-color 控制 */
            scrollbar-width: thin;
            scrollbar-color: transparent transparent;
            transition: scrollbar-color 0.2s ease;
          }
          .dark #theme-atelier .sideLeft {
            background: ${bgDark};
          }
          #theme-atelier .sideLeft:hover,
          #theme-atelier .sideLeft:focus-within {
            scrollbar-color: ${border} transparent;
          }
          /* WebKit（Chrome/Safari/Edge）：thumb 透明，hover/focus 才显现 */
          #theme-atelier .sideLeft::-webkit-scrollbar {
            width: 4px;
          }
          #theme-atelier .sideLeft::-webkit-scrollbar-thumb {
            background: transparent;
            border-radius: 2px;
            transition: background 0.2s ease;
          }
          #theme-atelier .sideLeft:hover::-webkit-scrollbar-thumb,
          #theme-atelier .sideLeft:focus-within::-webkit-scrollbar-thumb {
            background: ${border};
          }
          /* 内层 flex 列: top 顶到最上, bottom 顶到最下, middle 用
             margin-top/bottom: auto 把剩余空间均分到自己上下, 这样无论
             top / bottom 内容量差多少, middle 到 top 段的距离始终等于
             middle 到 bottom 段的距离 (跟文章页 Catalog 的表现一致).
             用 100svh 而不是 100% (原来依赖父级 height, 在 iOS fixed +
             overflow-y:auto 上下文里不稳定, 会导致 middle 被挤到底部).
             内容超过一屏时 (文章页长 Catalog), auto margin 无剩余空间可
             分配, 自然回退到顺序堆叠, sidebar 用 overflow-y:auto 独立滚,
             不出问题. */
          #theme-atelier .sideLeft > div {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            min-height: 100svh;
            box-sizing: border-box;
          }
          #theme-atelier .sideLeft .atelier-sidebar-top,
          #theme-atelier .sideLeft .atelier-sidebar-middle,
          #theme-atelier .sideLeft .atelier-sidebar-bottom {
            flex: 0 0 auto;
          }
          #theme-atelier .sideLeft .atelier-sidebar-middle {
            margin-top: auto;
            margin-bottom: auto;
          }
          #theme-atelier .sideLeft .atelier-sidebar-footer {
            position: static;
            width: auto;
            background: transparent;
            border-top: 1px solid ${border};
            padding: 24px 0 12px 0;
          }
          .dark #theme-atelier .sideLeft .atelier-sidebar-footer {
            border-top-color: rgba(255,255,255,0.08);
          }
          /* 侧栏 fix 出流后，主内容左侧留出 360px 空位 */
          #theme-atelier main#wrapper {
            padding-left: 360px;
          }
        }

        /* ============= 回到顶部 / 回到底部 按钮组（右下角）============= */
        #theme-atelier .atelier-back-to-top,
        #theme-atelier .atelier-back-to-bottom {
          position: fixed;
          right: 20px;
          z-index: 45;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(247, 244, 237, 0.85);
          -webkit-backdrop-filter: blur(6px);
          backdrop-filter: blur(6px);
          border: 1px solid ${border};
          border-radius: 4px;
          color: ${text};
          cursor: pointer;
          opacity: 0;
          transform: translateY(8px);
          pointer-events: none;
          transition: opacity 0.25s ease, transform 0.25s ease,
            background 0.15s ease;
        }
        /* 回顶在上、回底在下（按钮组视觉栈）*/
        #theme-atelier .atelier-back-to-top {
          bottom: 68px;
        }
        #theme-atelier .atelier-back-to-bottom {
          bottom: 20px;
        }
        #theme-atelier .atelier-back-to-top.is-visible,
        #theme-atelier .atelier-back-to-bottom.is-visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        #theme-atelier .atelier-back-to-top:hover,
        #theme-atelier .atelier-back-to-bottom:hover {
          background: ${bg};
          transform: translateY(-2px);
        }
        .dark #theme-atelier .atelier-back-to-top,
        .dark #theme-atelier .atelier-back-to-bottom {
          background: rgba(20, 16, 11, 0.85);
          color: ${textDark};
          border-color: rgba(255,255,255,0.15);
        }
        .dark #theme-atelier .atelier-back-to-top:hover,
        .dark #theme-atelier .atelier-back-to-bottom:hover {
          background: ${bgDark};
        }

        /* ============= 侧栏开关按钮 ============= */
        #theme-atelier .atelier-sidebar-toggle {
          position: fixed;
          top: 14px;
          left: 14px;
          z-index: 50;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(247, 244, 237, 0.85);
          -webkit-backdrop-filter: blur(6px);
          backdrop-filter: blur(6px);
          border: 1px solid ${border};
          border-radius: 4px;
          cursor: pointer;
          color: ${text};
          transition: background 0.15s ease, transform 0.15s ease;
        }
        #theme-atelier .atelier-sidebar-toggle:hover {
          background: ${bg};
          transform: scale(1.05);
        }
        .dark #theme-atelier .atelier-sidebar-toggle {
          background: rgba(20, 16, 11, 0.85);
          color: ${textDark};
          border-color: rgba(255,255,255,0.15);
        }
        .dark #theme-atelier .atelier-sidebar-toggle:hover {
          background: ${bgDark};
        }
        /* 手机端切到屏幕右上角 —— 桌面保持左上（侧栏出没的位置）*/
        @media (max-width: 1023px) {
          #theme-atelier .atelier-sidebar-toggle {
            left: auto;
            right: 14px;
          }
          /* 手机 + 列表页（主页/归档/分类/标签）：不显示 toggle
             因为侧栏内容（logo + 近期文章）本来就是页面顶部的自然内容 */
          #theme-atelier.atelier-list-mode .atelier-sidebar-toggle {
            display: none;
          }
        }

        /* 桌面：sidebarOpen 时侧栏在位、主内容让位 360px；
           sidebarClosed 时侧栏向左滑出、主内容占满全宽（都带过渡动画）*/
        @media (min-width: 1024px) {
          #theme-atelier .sideLeft {
            transition: transform 0.25s ease;
          }
          #theme-atelier main#wrapper {
            transition: padding-left 0.25s ease;
          }
          #theme-atelier.atelier-sidebar-closed .sideLeft {
            transform: translateX(-100%);
          }
          #theme-atelier.atelier-sidebar-closed main#wrapper {
            padding-left: 0;
          }
          /* 桌面只在侧栏可见时用 footer 里的按钮收起 —— 顶部汉堡包这里隐藏，
             改用 index.js 的条件渲染控制何时显示 */
          #theme-atelier .atelier-toggle-mobile-only {
            display: none;
          }
          /* 桌面 + sidebar-open 状态下强制隐藏顶部 toggle。
             fix: 首次进页面 React 未 hydrate 完, mounted=false, index.js
             会强渲一次 toggle, 桌面上就会闪一下 X。这里 CSS 兜底: 只要
             wrapper 有 atelier-sidebar-open 类, 就不显示 toggle;
             用户真的通过 footer 收起时会切成 atelier-sidebar-closed,
             toggle 才出现。 */
          #theme-atelier.atelier-sidebar-open .atelier-toggle-top:not(.atelier-toggle-mobile-only) {
            display: none;
          }
        }

        /* 手机：sidebarOpen 时侧栏堆到顶（现有行为），关闭时隐藏 */
        @media (max-width: 1023px) {
          #theme-atelier.atelier-sidebar-closed .sideLeft {
            display: none;
          }
        }

        /* ============= Footer 图标：统一 Feather 线描风 20px ============= */
        /* 隐藏 SocialButton 内自带的 FontAwesome RSS —— 我们在
           AtelierFooter 里画了同款 SVG (带 .atelier-footer-rss 类) 顶替，
           避免出现两个 RSS 且风格不一致；:not() 排除自己那个 SVG 版 */
        #theme-atelier .atelier-footer-icons a[title='RSS']:not(.atelier-footer-rss) {
          display: none !important;
        }
        /* 若 SocialButton 里其实只启用了 RSS (被上面那条隐掉), 它剩下
           一个空 wrapper 仍占 flex 位, 会让周围多出一份 24px gap。
           用 :has 把"内部唯一子项就是 RSS 且被我们隐了"这种情况整体
           收掉。如果以后启用 GitHub/ORCID 等, :only-child 不成立,
           wrapper 自然恢复显示。 */
        #theme-atelier .atelier-footer-icons > div:has(> div > a[title='RSS']:only-child) {
          display: none !important;
        }
        /* 图标视觉尺寸对齐: 所有 svg / FA <i> 强制 20px, 避免 stroke
           SVG 和填充 icon 因字号继承漂移出视觉不齐 */
        #theme-atelier .atelier-footer-icons svg {
          width: 20px;
          height: 20px;
          display: block;
        }
        #theme-atelier .atelier-footer-icons i {
          font-size: 20px;
          line-height: 1;
        }
        #theme-atelier .atelier-footer-collapse,
        #theme-atelier .atelier-footer-home,
        #theme-atelier .atelier-footer-lang,
        #theme-atelier .atelier-footer-rss,
        #theme-atelier .atelier-footer-darkmode {
          background: transparent;
          border: 0;
          padding: 0;
          margin: 0;
          cursor: pointer;
          color: ${muted};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: color 0.15s ease, transform 0.15s ease;
        }
        #theme-atelier .atelier-footer-collapse:hover,
        #theme-atelier .atelier-footer-home:hover,
        #theme-atelier .atelier-footer-lang:hover,
        #theme-atelier .atelier-footer-rss:hover,
        #theme-atelier .atelier-footer-darkmode:hover {
          color: ${text};
          transform: scale(1.1);
        }
        .dark #theme-atelier .atelier-footer-collapse,
        .dark #theme-atelier .atelier-footer-home,
        .dark #theme-atelier .atelier-footer-lang,
        .dark #theme-atelier .atelier-footer-rss,
        .dark #theme-atelier .atelier-footer-darkmode {
          color: ${mutedDark};
        }
        .dark #theme-atelier .atelier-footer-collapse:hover,
        .dark #theme-atelier .atelier-footer-home:hover,
        .dark #theme-atelier .atelier-footer-lang:hover,
        .dark #theme-atelier .atelier-footer-rss:hover,
        .dark #theme-atelier .atelier-footer-darkmode:hover {
          color: ${textDark};
        }
        /* 语言按钮的字形样式：无衬线加粗, 尺寸和高度与相邻 SVG 图标对齐 */
        #theme-atelier .atelier-footer-lang {
          font-family: ${sans};
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.02em;
          min-width: 24px;
          height: 20px;
          line-height: 1;
        }

        /* ============= 评论区容器：清空装饰，避免空白块 ============= */
        #theme-atelier .atelier-comment-wrapper {
          margin-top: 40px;
        }
        /* Comment 组件返回空时，wrapper 里没有元素 → :empty 匹配 → 塌陷 */
        #theme-atelier .atelier-comment-wrapper:empty {
          display: none;
          margin: 0;
        }

        /* ============= 顶部阅读进度条 ============= */
        #theme-atelier .atelier-reading-progress {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: transparent;
          z-index: 40;
          pointer-events: none;
        }
        #theme-atelier .atelier-reading-progress-bar {
          height: 100%;
          background: ${text};
          transition: width 60ms linear;
        }
        .dark #theme-atelier .atelier-reading-progress-bar {
          background: ${textDark};
        }

        /* ============= 目录（Catalog）活跃高亮 ============= */
        #theme-atelier .atelier-catalog {
          display: flex;
          flex-direction: column;
          font-family: ${serif};
        }
        #theme-atelier .atelier-toc-title {
          font-family: ${serif};
          font-size: 20px;
          font-weight: 600;
          letter-spacing: normal;
          text-transform: none;
          color: ${text};
          margin-bottom: 14px;
          cursor: pointer;
          user-select: none;
        }
        #theme-atelier .atelier-toc-title:hover {
          opacity: 0.7;
        }
        .dark #theme-atelier .atelier-toc-title {
          color: ${textDark};
        }
        #theme-atelier .atelier-toc-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        #theme-atelier .atelier-toc-item {
          display: block;
          font-family: ${serif};
          font-size: 16px;
          line-height: 1.55;
          padding-top: 6px;
          padding-bottom: 6px;
          padding-right: 0;
          /* padding-left 由 Catalog.js inline 决定，按 indentLevel 递进：
             H1=8px、H2=24px、H3=40px。这里不用 !important 让 inline 生效 */
          color: ${muted};
          text-decoration: none;
          border-left: 2px solid transparent;
          margin-left: -8px;
          transition: color 0.15s ease, border-color 0.15s ease;
          word-break: break-word;
        }
        #theme-atelier .atelier-toc-item.atelier-toc-inactive:hover {
          color: ${text};
        }
        #theme-atelier .atelier-toc-item.atelier-toc-highlighted {
          color: ${text};
        }
        #theme-atelier .atelier-toc-item.atelier-toc-active {
          color: ${text};
          font-weight: 600;
          border-left-color: ${text};
        }
        .dark #theme-atelier .atelier-toc-item.atelier-toc-highlighted {
          color: ${textDark};
        }
        .dark #theme-atelier .atelier-toc-item.atelier-toc-active {
          color: ${textDark};
          border-left-color: ${textDark};
        }

        /* ============= 阅读时长小字 ============= */
        #theme-atelier .atelier-reading-time {
          font-family: ${sans};
          font-size: 13px;
          color: ${muted};
          letter-spacing: 0.02em;
        }
        .dark #theme-atelier .atelier-reading-time {
          color: ${mutedDark};
        }
        #theme-atelier .atelier-stream-date-sep::before {
          content: ' · ';
          margin: 0 4px;
          color: ${muted};
        }

        /* ============= 文章详情页标题 =============
           h1 本身已经被 article h1 规则给了 serif + weight 500 + line-height 1.2,
           这里只补 font-size 和 margin. 用 32px 跟首页 hero 标题
           (.atelier-stream-title) 保持一致, 全站标题体系统一. */
        #theme-atelier .atelier-article-title {
          font-size: 32px;
          margin: 0 0 16px 0;
        }

        /* ============= 文章详情页 meta 行：全站字体统一到 serif =============
           以前 meta 走 sans (系统无衬线), 跟标题/正文的 serif 混排看着像两种
           字体打架. 统一到 serif + muted + 15px, 视觉上与正文同体系, 只靠
           颜色/字号拉出次级信息层级, 不再靠切字体族. */
        #theme-atelier .atelier-post-meta,
        #theme-atelier .atelier-post-meta a,
        #theme-atelier .atelier-post-meta span {
          font-family: ${serif};
          font-size: 15px;
          letter-spacing: 0.02em;
          color: ${muted};
        }
        .dark #theme-atelier .atelier-post-meta,
        .dark #theme-atelier .atelier-post-meta a,
        .dark #theme-atelier .atelier-post-meta span {
          color: ${mutedDark};
        }
        #theme-atelier .atelier-post-meta a:hover {
          color: ${text};
        }
        .dark #theme-atelier .atelier-post-meta a:hover {
          color: ${textDark};
        }

        /* ============= 分享栏居中（覆盖 ShareBar 默认 md:justify-end）============= */
        #theme-atelier .atelier-article-actions {
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid ${border};
        }
        .dark #theme-atelier .atelier-article-actions {
          border-top-color: rgba(255,255,255,0.1);
        }
        #theme-atelier .atelier-article-actions > div > .flex {
          justify-content: center !important;
          gap: 6px;
        }
        /* ------- 分享按钮：性冷淡 ghost 圆形 --------
           覆盖上游 ShareButtons 的品牌彩色底和白色图标；
           保留原有的 FontAwesome 字体图标（<i class="fab fa-...">）
           因为它们本身就是矢量、单色，跟 atelier 极简调完全兼容 */
        #theme-atelier .atelier-article-actions button.rounded-full,
        #theme-atelier .atelier-article-actions a.rounded-full {
          background: transparent !important;
          background-color: transparent !important;
          color: ${muted} !important;
          border: 1px solid ${border};
          width: 34px !important;
          height: 34px !important;
          margin: 0 !important;
          transition: background-color 0.2s ease, color 0.2s ease,
            border-color 0.2s ease, transform 0.2s ease;
        }
        #theme-atelier .atelier-article-actions button.rounded-full:hover,
        #theme-atelier .atelier-article-actions a.rounded-full:hover {
          background-color: ${text} !important;
          color: ${bg} !important;
          border-color: ${text};
          transform: translateY(-1px);
        }
        .dark #theme-atelier .atelier-article-actions button.rounded-full,
        .dark #theme-atelier .atelier-article-actions a.rounded-full {
          color: ${mutedDark} !important;
          border-color: rgba(255,255,255,0.15);
        }
        .dark #theme-atelier .atelier-article-actions button.rounded-full:hover,
        .dark #theme-atelier .atelier-article-actions a.rounded-full:hover {
          background-color: ${textDark} !important;
          color: ${bgDark} !important;
          border-color: ${textDark};
        }
        /* 内部图标继承父级 color；不要再被 text-white 强制染白 */
        #theme-atelier .atelier-article-actions button.rounded-full i,
        #theme-atelier .atelier-article-actions a.rounded-full i {
          color: inherit !important;
        }
        /* 精准隐藏三个不需要的分享服务（用 aria-label 定位单个按钮，
           不影响相邻 icon 的 flex 布局，因此不会像 nth-last-child 那样带副作用）*/
        #theme-atelier button[aria-label='linkedin'],
        #theme-atelier button[aria-label='csdn'],
        #theme-atelier button[aria-label='juejin'] {
          display: none !important;
        }

        /* ============= 上一篇 / 下一篇 ============= */
        #theme-atelier .atelier-around {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin: 64px 0 40px 0;
          padding-top: 32px;
          border-top: 1px solid ${border};
        }
        .dark #theme-atelier .atelier-around {
          border-top-color: rgba(255,255,255,0.1);
        }
        #theme-atelier .atelier-around-next {
          text-align: right;
        }
        #theme-atelier .atelier-around-link {
          display: block;
          text-decoration: none;
          color: ${text};
        }
        .dark #theme-atelier .atelier-around-link {
          color: ${textDark};
        }
        #theme-atelier .atelier-around-label {
          font-family: ${sans};
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: ${muted};
          margin-bottom: 8px;
        }
        .dark #theme-atelier .atelier-around-label {
          color: ${mutedDark};
        }
        #theme-atelier .atelier-around-title {
          font-family: ${serif};
          font-size: 17px;
          line-height: 1.4;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-thickness: 1px;
        }
        #theme-atelier .atelier-around-link:hover .atelier-around-title {
          opacity: 0.6;
        }
        @media (max-width: 640px) {
          #theme-atelier .atelier-around {
            grid-template-columns: 1fr;
            gap: 24px;
            padding-left: 24px;
            padding-right: 24px;
            text-align: center;
          }
          #theme-atelier .atelier-around-prev,
          #theme-atelier .atelier-around-next {
            text-align: center;
          }
        }
        /* 平板端 (含 iPad 竖屏 768-820px, iPad Mini 横屏 1024 也压这里):
           保持两列布局, 只补上左右边距, 避免链接文字贴着屏幕两边 */
        @media (min-width: 641px) and (max-width: 1023px) {
          #theme-atelier .atelier-around {
            padding-left: 24px;
            padding-right: 24px;
          }
        }

        /* ============= 相关推荐 ============= */
        #theme-atelier .atelier-recommend {
          margin: 40px 0 32px 0;
          padding-top: 32px;
          border-top: 1px solid ${border};
        }
        .dark #theme-atelier .atelier-recommend {
          border-top-color: rgba(255,255,255,0.1);
        }
        #theme-atelier .atelier-recommend-title {
          font-family: ${sans};
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: ${muted};
          margin-bottom: 20px;
        }
        .dark #theme-atelier .atelier-recommend-title {
          color: ${mutedDark};
        }
        #theme-atelier .atelier-recommend-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        #theme-atelier .atelier-recommend-list a {
          font-family: ${serif};
          font-size: 17px;
          line-height: 1.45;
          color: ${text};
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-thickness: 1px;
        }
        .dark #theme-atelier .atelier-recommend-list a {
          color: ${textDark};
        }
        #theme-atelier .atelier-recommend-list a:hover {
          opacity: 0.6;
        }

        /* ============= 文章正文列宽 ============= */
        /* 关键坑: 原版 780 默认规则写成 #container-inner:not(:has(#container))
           以排除详情页. 但 :has(#container) 里包了一个 ID, 会把整条规则的
           specificity 拉高到 3 个 ID (0,3,0,0). 而 .atelier-list-wide 覆盖
           只有 2 ID + 1 class (0,2,1,0), 两个都 !important 时 specificity
           高的赢 —— 结果 wide 规则永远压不过 780, 首页/归档宽度改不动.
           修复: 780 默认规则去掉 :has(), 只留 2 ID; wide 规则和详情页
           规则各自 specificity 都比它高, 自然覆盖. */
        @media (min-width: 1024px) {
          #theme-atelier #container-inner {
            max-width: 780px;
          }
          /* 首页方案 B / 归档页方案 D: 撑满主区宽度（跟全宽文章同款处理),
             让 hero 图、3 列 grid、归档表格充分利用横向空间;
             右侧留 32px padding 避免贴到浏览器边.
             用 container-inner 上挂的 .atelier-list-wide class 触发,
             不用 :has() —— 旧版 Firefox/Safari 不支持 :has(),
             会让规则完全失效. LayoutBaseInner 里根据 router.pathname 挂. */
          #theme-atelier #container-inner.atelier-list-wide {
            max-width: none;
            padding-right: 32px;
          }
          /* sidebar 关闭时 main padding-left=0, wide-list 只有右 32
             padding 会让内容整体左偏 (iPad 2018 上尤其明显). 补一个
             对称的左侧 padding, 视觉回到居中. */
          #theme-atelier.atelier-sidebar-closed #container-inner.atelier-list-wide {
            padding-left: 32px;
          }
          /* ArticleDetail 原本 md:px-32（128px）内边距太宽，收窄到 24px */
          #theme-atelier article {
            padding-left: 24px !important;
            padding-right: 24px !important;
            padding-top: 24px !important;
          }
          /* 全宽文章：右侧留够空气感，不要贴到浏览器边缘 */
          #theme-atelier #container-inner:has(#container) {
            max-width: none;
            padding-right: 32px;
          }
        }

        /* ============= 长 LaTeX 公式水平滚动（隐藏滚动条）=============
           行为：短公式无变化；长公式超出容器时，手指/鼠标可横向滑动查看，
           但不显示任何滚动条 UI（跟 iOS 应用里的滚动区域一样静默）。
           桌面端可用 Shift+滚轮 / 触控板双指横滑；手机端直接手指滑。 */
        #theme-atelier .katex-display {
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;   /* Firefox */
          -ms-overflow-style: none; /* 老 Edge / IE */
        }
        #theme-atelier .katex-display::-webkit-scrollbar {
          display: none;           /* Chrome / Safari / iOS */
        }

        /* ============= 文章内 H2/H3 依次缩进（H1 不缩）============= */
        /* Notion 一级标题（H1）保持左对齐；二级 20px；三级 40px */
        #theme-atelier article .notion-h2 {
          padding-left: 20px;
        }
        #theme-atelier article .notion-h3 {
          padding-left: 40px;
        }
        @media (max-width: 640px) {
          #theme-atelier article .notion-h2 {
            padding-left: 12px;
          }
          #theme-atelier article .notion-h3 {
            padding-left: 24px;
          }
        }

        /* ============= 手机端：侧栏堆到内容上方 ============= */
        @media (max-width: 1023px) {
          #theme-atelier .sideLeft {
            width: 100% !important;
            min-height: 0 !important;
            border-right: 0 !important;
            border-bottom: 0 !important;
            padding-bottom: 8px;
          }
          /* 手机端 footer 独立成块，跟正常内容一样占满宽度 */
          #theme-atelier > .atelier-sidebar-footer {
            width: 100%;
            padding: 40px 24px 32px 24px;
            border-top: 1px solid ${border};
            margin: 40px 0 0 0;
          }
          .dark #theme-atelier > .atelier-sidebar-footer {
            border-top-color: rgba(255,255,255,0.1);
          }
          .dark #theme-atelier .sideLeft {
            border-bottom-color: rgba(255,255,255,0.1);
          }
          #theme-atelier .sideLeft > div {
            padding: 32px 24px 24px 24px !important;
          }
          /* 手机端标题略缩 */
          #theme-atelier .atelier-logo-title {
            font-size: 34px;
          }
          /* 手机端 sidebar 是自然堆叠 (没有 flex-center), Latest Posts
             需要一段顶部 margin 与上面菜单/tagline 拉开距离 */
          #theme-atelier .atelier-latest-title {
            margin-top: 40px;
          }
          /* 手机端主内容 padding 收紧 */
          #theme-atelier main#wrapper {
            padding-top: 24px !important;
            padding-bottom: 24px !important;
          }
          #theme-atelier .grid-container {
            padding: 0 24px !important;
          }
        }

        ${themeConsoleStyle('atelier', CONFIG)}
      `}</style>
    </>
  )
}

export { Style }
