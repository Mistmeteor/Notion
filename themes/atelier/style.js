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

        /* ============= 首页文章瀑布流（继承 atelier 的响应式列数）============= */
        #theme-atelier .grid-item {
          height: auto;
          break-inside: avoid-column;
          margin-bottom: 1rem;
        }
        @media (min-width: 1024px) {
          #theme-atelier .grid-container {
            column-count: 3;
            column-gap: 1rem;
          }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          #theme-atelier .grid-container {
            column-count: 2;
            column-gap: 1rem;
          }
        }
        @media (max-width: 639px) {
          #theme-atelier .grid-container {
            column-count: 1;
            column-gap: 0;
          }
        }

        ${themeConsoleStyle('atelier', CONFIG)}
      `}</style>
    </>
  )
}

export { Style }
