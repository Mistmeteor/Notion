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
            href='https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&family=Noto+Serif+SC:wght@400;500;600&display=swap'
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

        /* ============= 侧栏：近期文章 ============= */
        #theme-atelier .atelier-latest-title {
          font-family: ${serif};
          color: ${text};
          font-size: 17px;
          font-weight: 400;
          margin: 44px 0 18px 0;
        }
        .dark #theme-atelier .atelier-latest-title {
          color: ${textDark};
        }
        #theme-atelier .atelier-latest-list a {
          display: block;
          font-family: ${serif};
          color: ${text};
          font-size: 17px;
          line-height: 1.45;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-thickness: 1px;
          margin-bottom: 10px;
        }
        .dark #theme-atelier .atelier-latest-list a {
          color: ${textDark};
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
        /* 只中和 SocialButton 外层的 w-full（DarkModeButton 里的 w-5 保持不动） */
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
          margin: 0 auto 96px auto;
          background: transparent;
          box-shadow: none;
          border: 0;
          padding: 0;
        }
        #theme-atelier .atelier-stream-item:last-child {
          margin-bottom: 40px;
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
          height: auto;
          aspect-ratio: 16 / 10;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }
        #theme-atelier .atelier-stream-cover-wrap:hover .atelier-stream-cover {
          transform: scale(1.03);
        }
        #theme-atelier .atelier-stream-title {
          font-family: ${serif};
          font-size: 40px;
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

        /* 小屏幕：略微缩小标题 */
        @media (max-width: 640px) {
          #theme-atelier .atelier-stream-title { font-size: 30px; }
          #theme-atelier .atelier-stream-item { margin-bottom: 64px; }
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
            overflow-y: auto;
            background: ${bg};
            z-index: 20;
            /* 隐藏侧栏原生滚动条，保持视觉干净 */
            scrollbar-width: thin;
            scrollbar-color: ${border} transparent;
          }
          .dark #theme-atelier .sideLeft {
            background: ${bgDark};
          }
          #theme-atelier .sideLeft::-webkit-scrollbar {
            width: 4px;
          }
          #theme-atelier .sideLeft::-webkit-scrollbar-thumb {
            background: ${border};
            border-radius: 2px;
          }
          /* 内层排成 flex 列，底部 footer 用 margin-top:auto 顶到底 */
          #theme-atelier .sideLeft > div {
            display: flex;
            flex-direction: column;
            min-height: 100%;
            box-sizing: border-box;
          }
          /* footer 是整体模块的一部分，不再 position:fixed
             margin-top: auto 保底把 footer 顶到侧栏底部；
             同时 min-margin 保证即使内容很长时，Catalog / LatestPosts 到 footer
             之间至少留 40px 呼吸空间 —— 用 padding-top 撑出这段空隙 */
          #theme-atelier .sideLeft .atelier-sidebar-footer {
            position: static;
            margin-top: auto;
            width: auto;
            background: transparent;
            border-top: 1px solid ${border};
            padding: 32px 0 8px 0;
          }
          /* 侧栏 fix 出流后，主内容左侧留出 360px 空位 */
          #theme-atelier main#wrapper {
            padding-left: 360px;
          }
        }

        /* ============= 回到顶部按钮 ============= */
        #theme-atelier .atelier-back-to-top {
          position: fixed;
          right: 20px;
          bottom: 20px;
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
        #theme-atelier .atelier-back-to-top.is-visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        #theme-atelier .atelier-back-to-top:hover {
          background: ${bg};
          transform: translateY(-2px);
        }
        .dark #theme-atelier .atelier-back-to-top {
          background: rgba(20, 16, 11, 0.85);
          color: ${textDark};
          border-color: rgba(255,255,255,0.15);
        }
        .dark #theme-atelier .atelier-back-to-top:hover {
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
        }

        /* 手机：sidebarOpen 时侧栏堆到顶（现有行为），关闭时隐藏 */
        @media (max-width: 1023px) {
          #theme-atelier.atelier-sidebar-closed .sideLeft {
            display: none;
          }
        }

        /* ============= Footer 里的"收起侧栏"按钮 ============= */
        #theme-atelier .atelier-footer-collapse,
        #theme-atelier .atelier-footer-lang {
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
        #theme-atelier .atelier-footer-lang:hover {
          color: ${text};
          transform: scale(1.1);
        }
        .dark #theme-atelier .atelier-footer-collapse,
        .dark #theme-atelier .atelier-footer-lang {
          color: ${mutedDark};
        }
        .dark #theme-atelier .atelier-footer-collapse:hover,
        .dark #theme-atelier .atelier-footer-lang:hover {
          color: ${textDark};
        }
        /* 语言按钮的字形样式：小号无衬线，模拟"图标"的紧凑观感 */
        #theme-atelier .atelier-footer-lang {
          font-family: ${sans};
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
          min-width: 20px;
          height: 20px;
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

        /* ============= 文章正文列宽与首页保持一致（780px）============= */
        /* 侧栏 fix 出流后，主内容里的 container-inner 用 max-w-4xl（896px），
           压到 780px 让文章封面和标题的左右边界与首页流式条目对齐 */
        @media (min-width: 1024px) {
          #theme-atelier #container-inner {
            max-width: 780px !important;
          }
          /* ArticleDetail 原本 md:px-32（128px）内边距太宽，收窄到 24px */
          #theme-atelier article {
            padding-left: 24px !important;
            padding-right: 24px !important;
            padding-top: 24px !important;
          }
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
