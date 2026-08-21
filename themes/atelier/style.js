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

        /* ============= 页脚 SiteInfo：柔和小字 ============= */
        #theme-atelier .siteInfo,
        #theme-atelier .siteInfo * {
          font-family: ${sans};
          font-size: 12px;
          color: ${muted};
        }
        .dark #theme-atelier .siteInfo,
        .dark #theme-atelier .siteInfo * {
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

        /* ============= 手机端：侧栏堆到内容上方 ============= */
        @media (max-width: 1023px) {
          #theme-atelier .sideLeft {
            width: 100% !important;
            min-height: 0 !important;
            border-right: 0 !important;
            border-bottom: 1px solid ${border};
            padding-bottom: 20px;
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
