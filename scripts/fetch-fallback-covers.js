#!/usr/bin/env node
/*
 * Fetch the image file list from Mistmeteor/notion-images/img at build time
 * and emit lib/fallback-covers.generated.json. Atelier's BlogCard uses this
 * list to deterministically assign a cover image to any post that has no
 * custom cover of its own.
 *
 * Excludes math formulas, derivations, and setup test files, keeping only
 * the curated landscape oil paintings (Clarice Beckett, Elioth Gruner,
 * David Davies, etc.).
 *
 * Runs in postinstall + prebuild + predev.
 */
const fs = require('node:fs')
const path = require('node:path')

const REPO = 'Mistmeteor/notion-images'
const DIR = 'img'
const BRANCH = 'main'
const OUT = path.resolve(__dirname, '..', 'lib', 'fallback-covers.generated.json')
const LOCAL_DIR = path.resolve(__dirname, '..', '..', 'notion-images', 'img')

const cdnUrl = name =>
  `https://cdn.jsdelivr.net/gh/${REPO}@${BRANCH}/${DIR}/${encodeURIComponent(name)}`

const isLandscapeOil = name => {
  const n = name.toLowerCase()
  if (n.startsWith('oil-landscape-')) return true
  if (n.startsWith('clarice-beckett-') && !n.includes('derivation')) return true
  return false
}

async function main() {
  let urls = null

  // 1. If local notion-images repository exists, read directly
  if (fs.existsSync(LOCAL_DIR)) {
    try {
      const files = fs.readdirSync(LOCAL_DIR)
      const valid = files.filter(isLandscapeOil).sort()
      if (valid.length > 0) {
        urls = valid.map(cdnUrl)
        console.log(
          `[fallback-covers] ${urls.length} landscape oil paintings loaded from local ${LOCAL_DIR}`
        )
      }
    } catch (err) {
      console.warn(`[fallback-covers] reading local dir failed: ${err.message}`)
    }
  }

  // 2. Fallback to GitHub API if local read wasn't used
  if (!urls) {
    try {
      const res = await fetch(
        `https://api.github.com/repos/${REPO}/contents/${DIR}?ref=${BRANCH}`,
        {
          headers: {
            'User-Agent': 'notion-blog-build',
            Accept: 'application/vnd.github+json'
          }
        }
      )
      if (!res.ok) throw new Error(`GitHub API ${res.status}`)
      const items = await res.json()
      urls = (items || [])
        .filter(i => i.type === 'file' && isLandscapeOil(i.name))
        .map(i => cdnUrl(i.name))
      console.log(
        `[fallback-covers] ${urls.length} landscape oil paintings fetched from ${REPO}/${DIR}`
      )
    } catch (e) {
      console.warn(`[fallback-covers] fetch failed (${e.message})`)
      if (fs.existsSync(OUT)) {
        console.warn(`[fallback-covers] keeping existing ${path.basename(OUT)}`)
        return
      }
      console.warn(`[fallback-covers] no existing manifest — writing empty list`)
      urls = []
    }
  }

  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.writeFileSync(OUT, JSON.stringify(urls, null, 2) + '\n')
}

main()
