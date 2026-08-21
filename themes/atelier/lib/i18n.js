/**
 * Atelier 主题内建的双语切换
 *
 * 只处理 atelier 自定义组件里的字符串（近期文章 / X 分钟阅读 /
 * 最后更新 / 相关阅读 / 上一篇 / 下一篇 / 目录）。
 * 用户点侧栏底部的语言按钮 → 切换语言 → localStorage 记忆 → 全站生效。
 *
 * 未在此覆盖的 NotionNext 系统级 locale（分页文案等）继续跟随
 * siteConfig('LANG')，不受本切换影响。
 */

import { createContext, useContext, useEffect, useState } from 'react'

export const ATELIER_LANG_STORAGE_KEY = 'atelier-lang'
export const ATELIER_LANGS = ['zh-CN', 'en-US']

const T = {
  'zh-CN': {
    latestPosts: '近期文章',
    readingTime: '{n} 分钟阅读',
    relatedPosts: '相关阅读',
    prevPost: '上一篇',
    nextPost: '下一篇',
    tocTitle: '目录',
    lastEdited: '最后更新',
    langLabel: '中', // 按钮显示当前语言：正在中文时显示"中"
    langAriaLabel: '当前中文，点击切换到英文'
  },
  'en-US': {
    latestPosts: 'Latest Posts',
    readingTime: '{n} min read',
    relatedPosts: 'Related',
    prevPost: 'Previous',
    nextPost: 'Next',
    tocTitle: 'Contents',
    lastEdited: 'Last edited',
    langLabel: 'EN',
    langAriaLabel: 'Currently English, click to switch to Chinese'
  }
}

export function tr(lang, key, params = {}) {
  const table = T[lang] || T['zh-CN']
  let s = table[key] ?? T['zh-CN'][key] ?? key
  Object.entries(params).forEach(([k, v]) => {
    s = s.replace(`{${k}}`, String(v))
  })
  return s
}

// ============================================================
// Context: 提供 lang / setLang / toggleLang 给组件
// ============================================================
const AtelierLangContext = createContext({
  lang: 'zh-CN',
  setLang: () => {},
  toggleLang: () => {}
})

export const useAtelierLang = () => useContext(AtelierLangContext)

export function AtelierLangProvider({ initialLang, children }) {
  // SSR 时用 initialLang（来自 siteConfig('LANG')），客户端 mount 后
  // 优先用 localStorage 记住的选择
  const [lang, setLangState] = useState(() => {
    const normalized = normalizeLang(initialLang)
    return normalized
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem(ATELIER_LANG_STORAGE_KEY)
      if (saved && ATELIER_LANGS.includes(saved)) {
        setLangState(saved)
      }
    }
  }, [])

  const setLang = newLang => {
    if (!ATELIER_LANGS.includes(newLang)) return
    setLangState(newLang)
    if (mounted && typeof window !== 'undefined') {
      window.localStorage.setItem(ATELIER_LANG_STORAGE_KEY, newLang)
    }
  }

  const toggleLang = () => {
    setLang(lang === 'zh-CN' ? 'en-US' : 'zh-CN')
  }

  return (
    <AtelierLangContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </AtelierLangContext.Provider>
  )
}

// 把 NotionNext 的 LANG 字符串归一到我们支持的两种之一
function normalizeLang(raw) {
  if (!raw) return 'zh-CN'
  const low = String(raw).toLowerCase()
  if (low.startsWith('en')) return 'en-US'
  return 'zh-CN'
}
