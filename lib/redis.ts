// This prevents the "requires integrations" message

// Cache configuration
const CACHE_TTL = {
  ARTICLES: 3600, // 1 hour
  SERIES: 3600, // 1 hour
  SHORT: 300, // 5 minutes
}

// In-memory cache fallback (for when Redis is not available)
const memoryCache = new Map<string, { data: any; expiry: number }>()

// Generate cache keys
export const cacheKeys = {
  articles: (username: string, page: number, pageSize: number) => `hashnode:articles:${username}:${page}:${pageSize}`,
  series: (username: string) => `hashnode:series:${username}`,
  allArticles: (username: string) => `hashnode:all-articles:${username}`,
}

// Get cached data (uses memory cache only)
export async function getCachedData<T>(key: string): Promise<T | null> {
  try {
    const cached = memoryCache.get(key)
    if (cached && cached.expiry > Date.now()) {
      return cached.data as T
    }
    // Clean up expired entry
    if (cached) {
      memoryCache.delete(key)
    }
    return null
  } catch (error) {
    return null
  }
}

// Set cached data (uses memory cache only)
export async function setCachedData<T>(key: string, data: T, ttl: number = CACHE_TTL.ARTICLES): Promise<boolean> {
  try {
    memoryCache.set(key, {
      data,
      expiry: Date.now() + ttl * 1000,
    })
    return true
  } catch (error) {
    return false
  }
}

// Invalidate cache
export async function invalidateCache(pattern: string): Promise<void> {
  try {
    const regex = new RegExp(pattern.replace(/\*/g, ".*"))
    for (const key of memoryCache.keys()) {
      if (regex.test(key)) {
        memoryCache.delete(key)
      }
    }
  } catch (error) {
    // Silently fail
  }
}

// Clear all Hashnode cache
export async function clearHashnodeCache(username: string): Promise<void> {
  try {
    await invalidateCache(`hashnode:.*${username}.*`)
  } catch (error) {
    // Silently fail
  }
}

export { CACHE_TTL }
