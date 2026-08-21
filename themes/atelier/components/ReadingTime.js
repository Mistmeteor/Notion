import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * 预估阅读时长
 * 优先用 post.wordCount（NotionNext 计算），否则用 blockCount 粗估
 * 中文按 300 字/分钟，可通过 ATELIER_READING_WORDS_PER_MINUTE 覆盖
 */
export default function ReadingTime({ post, className = '' }) {
  if (!siteConfig('ATELIER_READING_TIME', true, CONFIG)) return null
  if (!post) return null

  const wpm = Math.max(
    100,
    Number(siteConfig('ATELIER_READING_WORDS_PER_MINUTE', 300, CONFIG))
  )

  // NotionNext 的 post 对象上通常有 wordCount；没有就用 blockCount 兜底
  const words =
    Number(post.wordCount) ||
    Number(post.blockCount) * 30 || // 每 block 粗估 30 字
    0

  if (!words) return null

  const minutes = Math.max(1, Math.round(words / wpm))
  return (
    <span className={`atelier-reading-time ${className}`}>
      {minutes} 分钟阅读
    </span>
  )
}
