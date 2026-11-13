const CONFIG = {
  // ================= 视觉基础 =================
  // 暖调米白纸感底色（浅色模式）
  ATELIER_COLOR_BG: '#f7f4ed',
  ATELIER_COLOR_TEXT: '#1a1a1a',
  ATELIER_COLOR_MUTED: '#6c6660',
  ATELIER_COLOR_BORDER: 'rgba(0,0,0,0.12)',
  // 深色模式
  ATELIER_COLOR_BG_DARK: '#14100b',
  ATELIER_COLOR_TEXT_DARK: '#e8e2d6',
  ATELIER_COLOR_MUTED_DARK: '#a09a8f',

  // 字体：首选 Source Serif 4 (本地若装了直接命中), 否则英文走 Georgia,
  // 中文走 Noto Serif SC / Songti SC / Source Han Serif SC。
  // 关键: Georgia 必须排在中文字体前面, 否则英文会被 Noto Serif SC 的
  // 简陋 Latin 字型接管, 看着像中文宋体里的罗马字。
  ATELIER_FONT_SERIF:
    "'Source Serif 4', Georgia, 'Noto Serif SC', 'Songti SC', 'Source Han Serif SC', serif",
  ATELIER_FONT_SANS:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif",

  // 是否从 Google Fonts CDN 加载 Source Serif 4。默认关 —— 远程字体首次
  // 访问会造成 FOUT (fallback 字体先渲, 字体到达后替换导致字跳一下)。
  // 直接走系统 Georgia + Noto Serif SC 可以彻底消除跳动, 字型差异极小。
  // 想开: 设 NEXT_PUBLIC_ATELIER_LOAD_GOOGLE_FONTS=true。
  ATELIER_LOAD_GOOGLE_FONTS:
    process.env.NEXT_PUBLIC_ATELIER_LOAD_GOOGLE_FONTS === 'true',

  // ================= 侧栏内容 =================
  // 头像：留空则回退到全站 AVATAR / siteInfo.icon
  ATELIER_PROFILE_AVATAR:
    process.env.NEXT_PUBLIC_ATELIER_PROFILE_AVATAR || '',
  // 侧栏是否显示头像
  ATELIER_SHOW_AVATAR: true,
  // 侧栏是否显示副标题（DESCRIPTION）
  ATELIER_SHOW_TAGLINE: true,
  // 侧栏"近期文章"列表条数（0 = 不显示）
  ATELIER_LATEST_POSTS_COUNT: Number(
    process.env.NEXT_PUBLIC_ATELIER_LATEST_POSTS_COUNT || 3
  ),
  // "近期文章"标题文案
  ATELIER_LATEST_POSTS_TITLE:
    process.env.NEXT_PUBLIC_ATELIER_LATEST_POSTS_TITLE || '近期文章',

  // ================= 菜单 =================
  ATELIER_MENU_CATEGORY: true, // 显示分类
  ATELIER_MENU_TAG: true,      // 显示标签
  ATELIER_MENU_ARCHIVE: true,  // 显示归档

  // ================= 文章列表 =================
  ATELIER_POST_LIST_COVER: true,       // 文章列表显示图片封面
  ATELIER_POST_LIST_COVER_FORCE: false,
  ATELIER_POST_LIST_PREVIEW: false,
  ATELIER_POST_LIST_ANIMATION: false,

  // ================= 阅读体验 =================
  // 顶部阅读进度条（仅文章页显示）
  ATELIER_READING_PROGRESS: true,
  // 显示预估阅读时长（"X 分钟阅读"）
  ATELIER_READING_TIME: true,
  // 每分钟阅读字数（中文 300~350 较合理，英文 200~250）
  ATELIER_READING_WORDS_PER_MINUTE: Number(
    process.env.NEXT_PUBLIC_ATELIER_READING_WORDS_PER_MINUTE || 300
  ),
  // 目录：是否显示到第 3 级（关闭则只显示 L1+L2）
  ATELIER_TOC_SHOW_LEVEL3:
    process.env.NEXT_PUBLIC_ATELIER_TOC_SHOW_LEVEL3 !== 'false',
  // 目录滚动行为：'smooth' 或 'instant'
  ATELIER_TOC_SCROLL_BEHAVIOR:
    process.env.NEXT_PUBLIC_ATELIER_TOC_SCROLL_BEHAVIOR || 'smooth',

  // ================= 相关推荐 =================
  // 文章底部显示相关推荐（同分类/同标签匹配）
  ATELIER_ARTICLE_RECOMMEND_POSTS: true,
  ATELIER_ARTICLE_RECOMMEND_POSTS_COUNT: Number(
    process.env.NEXT_PUBLIC_ATELIER_ARTICLE_RECOMMEND_POSTS_COUNT || 4
  )
}

export default CONFIG
