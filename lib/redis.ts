import { Redis } from "@upstash/redis"

// Initialize Redis client using environment variables
let redis: Redis | null = null

try {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    redis = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    })
  }
} catch (error) {
  console.error("[v0] Failed to initialize Redis client:", error)
}

// Cache configuration
const CACHE_TTL = {
  ARTICLES: 3600, // 1 hour
  SERIES: 3600, // 1 hour
  SHORT: 300, // 5 minutes
}

// Generate cache keys
export const cacheKeys = {
  articles: (username: string, page: number, pageSize: number) => `hashnode:articles:${username}:${page}:${pageSize}`,
  series: (username: string) => `hashnode:series:${username}`,
  allArticles: (username: string) => `hashnode:all-articles:${username}`,
}

// Get cached data
export async function getCachedData<T>(key: string): Promise<T | null> {
  if (!redis) {
    return null
  }
  try {
    const cached = await redis.get(key)
    return cached as T | null
  } catch (error) {
    // Silently fail - caching is optional
    return null
  }
}

// Set cached data
export async function setCachedData<T>(key: string, data: T, ttl: number = CACHE_TTL.ARTICLES): Promise<boolean> {
  if (!redis) {
    return false
  }
  try {
    await redis.setex(key, ttl, JSON.stringify(data))
    return true
  } catch (error) {
    // Silently fail - caching is optional
    return false
  }
}

// Invalidate cache
export async function invalidateCache(pattern: string): Promise<void> {
  if (!redis) {
    return
  }
  try {
    const keys = await redis.keys(pattern)
    if (keys.length > 0) {
      await redis.del(...keys)
    }
  } catch (error) {
    // Silently fail
  }
}

// Clear all Hashnode cache
export async function clearHashnodeCache(username: string): Promise<void> {
  try {
    await invalidateCache(`hashnode:*${username}*`)
  } catch (error) {
    // Silently fail
  }
}

export { CACHE_TTL }
