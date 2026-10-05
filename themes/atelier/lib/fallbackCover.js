import FALLBACK_COVERS from '@/lib/fallback-covers.generated.json'

// djb2-ish hash on the Notion post id string so each post maps to the same
// fallback image across renders (no flicker on refresh) but different posts
// spread across the pool.
function hashString(s) {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

/**
 * Pick a stable fallback cover from the Mistmeteor/notion-images pool for
 * a post that has no cover of its own. Returns null if the pool is empty.
 */
export function pickFallbackCoverForPost(postId) {
  if (!Array.isArray(FALLBACK_COVERS) || FALLBACK_COVERS.length === 0) {
    return null
  }
  if (!postId) return FALLBACK_COVERS[0]
  const i = hashString(postId) % FALLBACK_COVERS.length
  return FALLBACK_COVERS[i]
}
