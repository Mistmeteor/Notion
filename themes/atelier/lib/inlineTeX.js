import { useEffect } from 'react'

// Skip anything that is already code, already-rendered math, or a KaTeX node.
const SKIP_SELECTOR = [
  'code',
  'pre',
  '.notion-code',
  '.notion-equation',
  '.katex',
  '.katex-display',
  '.atelier-tex-rendered'
].join(',')

// $$...$$ (block, allows newlines) OR $...$ (inline, single line).
// Block alternative is listed first so JS regex alternation prefers it
// at the leftmost position when both could match.
const TEX_RE = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g

/**
 * Scan the article body for raw `$...$` / `$$...$$` written inside Notion
 * text blocks (not Notion equation blocks) and render them with KaTeX on
 * the client. Idempotent: already-rendered spans are skipped on re-run.
 */
export function useInlineTeX(deps) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    let cancelled = false
    const run = async () => {
      const root = document.getElementById('article-wrapper')
      if (!root || cancelled) return
      const mod = await import('katex')
      const katex = mod.default || mod
      if (cancelled) return
      scan(root, katex)
    }
    const t1 = setTimeout(run, 60)
    const t2 = setTimeout(run, 400)
    return () => {
      cancelled = true
      clearTimeout(t1)
      clearTimeout(t2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

function scan(root, katex) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !node.nodeValue.includes('$')) {
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
    TEX_RE.lastIndex = 0
    let m
    let last = 0
    const parts = []
    while ((m = TEX_RE.exec(text))) {
      if (m.index > last) {
        parts.push({ t: 'text', v: text.slice(last, m.index) })
      }
      if (m[1] !== undefined) {
        parts.push({ t: 'block', v: m[1].trim() })
      } else {
        parts.push({ t: 'inline', v: m[2] })
      }
      last = m.index + m[0].length
    }
    if (parts.length === 0) continue
    if (last < text.length) {
      parts.push({ t: 'text', v: text.slice(last) })
    }

    const frag = document.createDocumentFragment()
    for (const p of parts) {
      if (p.t === 'text') {
        frag.appendChild(document.createTextNode(p.v))
        continue
      }
      const el = document.createElement(p.t === 'block' ? 'div' : 'span')
      el.className =
        p.t === 'block'
          ? 'atelier-tex-rendered atelier-tex-block'
          : 'atelier-tex-rendered atelier-tex-inline'
      try {
        el.innerHTML = katex.renderToString(p.v, {
          displayMode: p.t === 'block',
          throwOnError: false,
          strict: 'ignore'
        })
      } catch (e) {
        el.textContent = p.t === 'block' ? `$$${p.v}$$` : `$${p.v}$`
      }
      frag.appendChild(el)
    }
    node.parentNode.replaceChild(frag, node)
  }
}
