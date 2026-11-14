import { useEffect } from 'react'

// Don't re-process code, equations, KaTeX output, or already-bolded spans.
const SKIP_SELECTOR = [
  'code',
  'pre',
  'strong',
  'b',
  '.notion-code',
  '.notion-equation',
  '.katex',
  '.katex-display',
  '.atelier-tex-rendered',
  '.atelier-bold-rendered'
].join(',')

// **text** on a single line. Inner content may contain single `*` (e.g.
// `**s* ≥ 0**`) but not `**`. Non-greedy so adjacent bold runs stay
// distinct. Requires at least one char.
const BOLD_RE = /\*\*((?:[^*\n]|\*(?!\*))+?)\*\*/g

/**
 * Convert raw markdown-style **bold** inside Notion text blocks into
 * <strong> on the client. The Notion recordMap doesn't carry
 * paired-asterisk formatting, so these would otherwise render as literal
 * `**` in the page. Runs after useInlineTeX so math stays intact.
 */
export function useInlineBold(deps) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    let cancelled = false
    const run = () => {
      const root = document.getElementById('article-wrapper')
      if (!root || cancelled) return
      scan(root)
    }
    const t1 = setTimeout(run, 100)
    const t2 = setTimeout(run, 500)
    return () => {
      cancelled = true
      clearTimeout(t1)
      clearTimeout(t2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

function scan(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !node.nodeValue.includes('**')) {
        return NodeFilter.FILTER_REJECT
      }
      let p = node.parentElement
      while (p && p !== root) {
        if (p.matches && p.matches(SKIP_SELECTOR)) {
          return NodeFilter.FILTER_REJECT
        }
        p = p.parentElement
      }
      return NodeFilter.FILTER_ACCEPT
    }
  })

  const targets = []
  let n
  while ((n = walker.nextNode())) targets.push(n)

  for (const node of targets) {
    const text = node.nodeValue
    BOLD_RE.lastIndex = 0
    let m
    let last = 0
    const parts = []
    while ((m = BOLD_RE.exec(text))) {
      if (m.index > last) {
        parts.push({ bold: false, v: text.slice(last, m.index) })
      }
      parts.push({ bold: true, v: m[1] })
      last = m.index + m[0].length
    }
    if (parts.length === 0) continue
    if (last < text.length) {
      parts.push({ bold: false, v: text.slice(last) })
    }

    const frag = document.createDocumentFragment()
    for (const p of parts) {
      if (!p.bold) {
        frag.appendChild(document.createTextNode(p.v))
        continue
      }
      const el = document.createElement('strong')
      el.className = 'atelier-bold-rendered'
      el.textContent = p.v
      frag.appendChild(el)
    }
    node.parentNode.replaceChild(frag, node)
  }
}
