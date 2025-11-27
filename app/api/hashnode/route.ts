// API route for fetching Hashnode articles
import { fetchHashnodeArticles, fetchHashnodeSeries, clearHashnodeCache } from "../../../lib/hashnode"

export const revalidate = 3600 // Revalidate every hour

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const username = url.searchParams.get("username") || "maroayman"
    const page = Number.parseInt(url.searchParams.get("page") || "1")
    const pageSize = Number.parseInt(url.searchParams.get("pageSize") || "9")
    const includeSeries = url.searchParams.get("includeSeries") === "true"
    const bypassCache = url.searchParams.get("bypassCache") === "true"

    if (bypassCache) {
      await clearHashnodeCache(username)
    }

    // Fetch articles with pagination
    const articlesData = await fetchHashnodeArticles(username, page, pageSize)

    let seriesData: any[] = []
    if (includeSeries) {
      seriesData = await fetchHashnodeSeries(username)
    }

    const response = {
      success: true,
      data: {
        articles: articlesData.articles,
        totalCount: articlesData.totalCount,
        series: seriesData,
        page,
        pageSize,
        hasNextPage: articlesData.hasNextPage,
        hasPreviousPage: articlesData.hasPreviousPage,
      },
      metadata: {
        timestamp: new Date().toISOString(),
        username,
        source: "hashnode",
        autoRefresh: "enabled",
        cacheEnabled: true,
        cacheBypass: bypassCache,
        isrEnabled: true,
        revalidateInterval: revalidate,
      },
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, s-maxage=${revalidate}, stale-while-revalidate=86400`,
        "X-Generated-At": new Date().toISOString(),
        "X-Articles-Count": articlesData.articles.length.toString(),
        "X-Total-Count": articlesData.totalCount.toString(),
        "X-Current-Page": page.toString(),
      },
    })
  } catch (error) {
    console.error("Error fetching Hashnode data:", error)
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to fetch articles from Hashnode",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username = "maroayman", page = 1, pageSize = 20, includeSeries = true, bypassCache = false } = body

    if (bypassCache) {
      await clearHashnodeCache(username)
    }

    // Fetch articles
    const articlesData = await fetchHashnodeArticles(username, page, pageSize)

    let seriesData: any[] = []
    if (includeSeries) {
      seriesData = await fetchHashnodeSeries(username)
    }

    const response = {
      success: true,
      data: {
        articles: articlesData.articles,
        totalCount: articlesData.totalCount,
        series: seriesData,
        page,
        pageSize,
        hasNextPage: page * pageSize < articlesData.totalCount,
        hasPreviousPage: page > 1,
      },
      metadata: {
        timestamp: new Date().toISOString(),
        username,
        source: "hashnode",
        requestType: "POST",
        cacheEnabled: true,
        cacheBypass: bypassCache,
      },
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error fetching Hashnode data:", error)
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to fetch articles from Hashnode",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}
