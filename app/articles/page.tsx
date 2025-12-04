import { Suspense } from "react"
import { fetchHashnodeArticles, fetchHashnodeSeries } from "@/lib/hashnode"
import { currentConfig as portfolioConfig } from "@/config/portfolio"
import ArticlesClient from "./articles-client"

// ISR fallback: Revalidate every 24 hours (86400 seconds)
// Primary updates come from on-demand revalidation via webhook
export const revalidate = 86400

// Pre-fetch articles at build time and on revalidation
async function getArticlesData() {
  const [articlesData, seriesData] = await Promise.all([
    fetchHashnodeArticles(portfolioConfig.hashnodeUsername, 1, 100),
    portfolioConfig.includeSeriesData 
      ? fetchHashnodeSeries(portfolioConfig.hashnodeUsername)
      : Promise.resolve([])
  ])

  return {
    articles: articlesData.articles.map((article) => ({
      id: article.id,
      title: article.title,
      brief: article.brief,
      slug: article.slug,
      published_at: article.publishedAt,
      read_time_minutes: article.readTimeInMinutes,
      cover_image_url: article.coverImage?.url || null,
      url: article.url,
      series_name: article.series?.name || null,
      series_slug: article.series?.slug || null,
      tags: article.tags || [],
    })),
    series: seriesData.map((s, index) => ({
      id: `series-${s.slug}-${index}`,
      name: s.name,
      slug: s.slug,
      description: s.description || null,
      total_posts: s.posts?.totalDocuments || 0,
    })),
    lastSync: new Date().toISOString(),
  }
}

export default async function ArticlesPage() {
  const data = await getArticlesData()

  return (
    <Suspense fallback={<ArticlesLoading />}>
      <ArticlesClient 
        initialArticles={data.articles}
        initialSeries={data.series}
        lastSync={data.lastSync}
      />
    </Suspense>
  )
}

function ArticlesLoading() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex items-center gap-2 text-primary">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <span className="font-mono">Loading articles...</span>
      </div>
    </main>
  )
}
