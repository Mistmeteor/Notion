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

  // 字体：正文和标题共用 Source Serif 4；中文回退 Noto Serif SC；系统字体做保底
  ATELIER_FONT_SERIF:
    "'Source Serif 4', 'Noto Serif SC', 'Songti SC', 'Source Han Serif SC', Georgia, serif",
  ATELIER_FONT_SANS:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif",

  // 是否从 Google Fonts CDN 加载字体（国内节点访问差可以关掉，走系统字体）
  ATELIER_LOAD_GOOGLE_FONTS:
    process.env.NEXT_PUBLIC_ATELIER_LOAD_GOOGLE_FONTS !== 'false',

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
    process.env.NEXT_PUBLIC_ATELIER_LATEST_POSTS_COUNT || 6
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

  // ================= 侧栏行为（继承自 fukasawa）=================
  // atelier 是编辑器/杂志风格，默认不显示折叠按钮
  ATELIER_SIDEBAR_COLLAPSE_BUTTON: false,
  ATELIER_SIDEBAR_COLLAPSE_SATUS_DEFAULT: false,
  ATELIER_SIDEBAR_COLLAPSE_ON_SCROLL: false,

  // ================= 其他 =================
  ATELIER_MAILCHIMP_FORM: false // 邮件订阅表单
}

export default CONFIG
