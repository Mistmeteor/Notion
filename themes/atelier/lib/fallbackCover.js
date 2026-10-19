import FALLBACK_COVERS from '@/lib/fallback-covers.generated.json'

// djb2-ish hash on the Notion post id string so each post maps to the same
// fallback image across renders (no flicker on refresh) but different posts
// spread across the pool.
export function hashString(s) {
  if (!s) return 0
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

/**
 * Check if a cover is a default template placeholder (Unsplash / Notion standard solid/patterns)
 * that should be replaced by the curated landscape oil painting library.
 */
export function isTemplateCover(url) {
  if (!url || typeof url !== 'string') return true
  const lower = url.toLowerCase()
  return (
    lower.includes('unsplash.com') ||
    lower.includes('notion.so/images/page-cover') ||
    lower.includes('solid_beige.png') ||
    lower.includes('nasa_transonic_tunnel')
  )
}

/**
 * Pick a stable fallback cover from the Mistmeteor/notion-images pool for
 * a post that has no cover of its own. Returns null if the pool is empty.
 */
export function pickFallbackCoverForPost(postId, offset = 0) {
  if (!Array.isArray(FALLBACK_COVERS) || FALLBACK_COVERS.length === 0) {
    return null
  }
  if (!postId) return FALLBACK_COVERS[offset % FALLBACK_COVERS.length]
  const i = (hashString(postId) + offset) % FALLBACK_COVERS.length
  return FALLBACK_COVERS[i]
}

/**
 * Resolve effective cover for a post:
 * If it has a custom user-defined cover (not template Unsplash/Notion default), keep it;
 * Otherwise, pick a deterministic landscape oil painting from the notion-images pool.
 */
export function getEffectiveCover(post, offset = 0) {
  const customCover = post?.pageCoverThumbnail || post?.pageCover
  if (customCover && !isTemplateCover(customCover)) {
    return customCover
  }
  return pickFallbackCoverForPost(post?.id, offset)
}

/**
 * Guarantee pairwise distinct covers across a list of posts on the same page.
 * Each post gets an assigned distinct image from FALLBACK_COVERS.
 */
export function assignUniqueCovers(posts) {
  if (!Array.isArray(posts) || posts.length === 0) return posts
  if (!Array.isArray(FALLBACK_COVERS) || FALLBACK_COVERS.length === 0) return posts

  const poolLen = FALLBACK_COVERS.length
  const usedSlots = new Set()

  return posts.map(post => {
    // If post already has a custom user cover (not template), preserve it
    const customCover = post?.pageCoverThumbnail || post?.pageCover
    if (customCover && !isTemplateCover(customCover)) {
      return post
    }

    let slot = hashString(post?.id || '') % poolLen
    let attempts = 0
    while (usedSlots.has(slot) && attempts < poolLen) {
      slot = (slot + 1) % poolLen
      attempts++
    }
    usedSlots.add(slot)

    const coverUrl = FALLBACK_COVERS[slot]
    return {
      ...post,
      pageCover: coverUrl,
      pageCoverThumbnail: coverUrl
    }
  })
}
