import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import { tr, useAtelierLang } from '../lib/i18n'

/**
 * 预估阅读时长（跟随语言切换：X 分钟阅读 / X min read）
 */
export default function ReadingTime({ post, className = '' }) {
  const { lang } = useAtelierLang()

  if (!siteConfig('ATELIER_READING_TIME', true, CONFIG)) return null
  if (!post) return null

  const wpm = Math.max(
    100,
    Number(siteConfig('ATELIER_READING_WORDS_PER_MINUTE', 300, CONFIG))
  )

  const words =
    Number(post.wordCount) ||
    Number(post.blockCount) * 30 ||
    0

  if (!words) return null

  const minutes = Math.max(1, Math.round(words / wpm))
  return (
    <span className={`atelier-reading-time ${className}`}>
      {tr(lang, 'readingTime', { n: minutes })}
    </span>
  )
}
