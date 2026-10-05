#!/usr/bin/env node
/*
 * Fetch the image file list from Mistmeteor/notion-images/img at build time
 * and emit lib/fallback-covers.generated.json. Atelier's BlogCard uses this
 * list to deterministically assign a cover image (by post.id hash) to any
 * post that has no cover of its own.
 *
 * Runs in postinstall + prebuild. If the GitHub API call fails (offline,
 * rate limited, Vercel sandbox), the existing JSON is kept as-is; if there
 * is none, an empty array is written so the import never breaks the build.
 */
const fs = require('node:fs')
const path = require('node:path')

const REPO = 'Mistmeteor/notion-images'
const DIR = 'img'
const BRANCH = 'main'
const OUT = path.resolve(__dirname, '..', 'lib', 'fallback-covers.generated.json')
const IMG_EXT = /\.(jpg|jpeg|png|webp|gif|avif)$/i

const cdnUrl = name =>
  `https://cdn.jsdelivr.net/gh/${REPO}@${BRANCH}/${DIR}/${encodeURIComponent(name)}`

async function main() {
  let urls = null
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
      .filter(i => i.type === 'file' && IMG_EXT.test(i.name))
      .map(i => cdnUrl(i.name))
    console.log(
      `[fallback-covers] ${urls.length} images fetched from ${REPO}/${DIR}`
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
  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.writeFileSync(OUT, JSON.stringify(urls, null, 2) + '\n')
}

main()
