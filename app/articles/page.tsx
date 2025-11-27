"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { currentConfig as portfolioConfig, formatDate, formatReadTime } from "@/config/portfolio"
import {
  ExternalLink,
  Calendar,
  Clock,
  Search,
  BookOpen,
  Loader2,
  RefreshCw,
  Code,
  Database,
  X,
  Tag,
} from "lucide-react"
import Image from "next/image"

interface Article {
  id: string
  title: string
  brief: string | null
  slug: string
  published_at: string
  read_time_minutes: number | null
  cover_image_url: string | null
  url: string
  series_name: string | null
  series_slug: string | null
  tags: Array<{ name: string; slug: string }>
  content: string | null // Added for potential future use or API response
}

interface Series {
  id: number | string // Allow string for generated IDs
  name: string
  slug: string
  description: string | null
  total_posts: number
}

// Removed PaginationInfo interface as pagination is no longer used

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [series, setSeries] = useState<Series[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [tagSearchTerm, setTagSearchTerm] = useState("")
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null)
  const [lastSync, setLastSync] = useState<string | null>(null)

  // Removed pagination state

  // API Response state
  const [apiResponse, setApiResponse] = useState<any>(null)
  const [apiLoading, setApiLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  // Auto-refresh status
  const [nextRefreshTime, setNextRefreshTime] = useState<Date | null>(null)
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true)
  const [isClient, setIsClient] = useState(false)

  // Get configuration settings
  const showDevControls = portfolioConfig.showDebugControls
  const refreshInterval = portfolioConfig.refreshIntervalMinutes * 60 * 1000
  const showRefreshTimer = portfolioConfig.showRefreshTimer
  const showAutoRefreshToggle = portfolioConfig.showAutoRefreshToggle

  // Handle client-side mounting
  useEffect(() => {
    setIsClient(true)
  }, [])

  const loadArticlesData = async () => {
    setLoading(true)
    try {
      // Fetch all articles from Hashnode API (large pageSize to get all)
      const hashnodeResponse = await fetch(
        `/api/hashnode?username=${portfolioConfig.hashnodeUsername}&includeSeries=${portfolioConfig.includeSeriesData}&pageSize=100`,
        {
          // Add cache busting to ensure fresh data
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        },
      )

      if (hashnodeResponse.ok) {
        const hashnodeData = await hashnodeResponse.json()
        console.log("Hashnode API response:", hashnodeData)

        if (hashnodeData.success && hashnodeData.data) {
          // Transform Hashnode data to match our Article interface
          const transformedArticles = hashnodeData.data.articles.map((article: any) => ({
            id: article.id,
            title: article.title,
            brief: article.brief,
            slug: article.slug,
            published_at: article.publishedAt,
            read_time_minutes: article.readTimeInMinutes,
            cover_image_url: article.coverImage?.url,
            url: article.url,
            series_name: article.series?.name,
            series_slug: article.series?.slug,
            tags: article.tags || [],
            content: article.content, // Include content if available in API response
          }))

          // Transform series data
          const transformedSeries = hashnodeData.data.series.map((s: any, index: number) => ({
            id: `series-${s.slug}-${index}`, // Use deterministic ID
            name: s.name,
            slug: s.slug,
            description: s.description,
            total_posts: s.posts?.totalDocuments || 0,
          }))

          setArticles(transformedArticles)
          setSeries(transformedSeries)
          setLastSync(hashnodeData.metadata?.timestamp)
          console.log(`✅ Loaded ${transformedArticles.length} articles from Hashnode`)
        }
      } else {
        console.error("❌ Failed to fetch from Hashnode API")
        // Fallback to database API is removed as we are directly fetching from Hashnode
        setArticles([])
        setSeries([])
      }
    } catch (error) {
      console.error("❌ Error loading articles:", error)
      setArticles([])
      setSeries([])
    } finally {
      setLoading(false)
    }
  }

  // Initial load of data
  useEffect(() => {
    loadArticlesData()
  }, []) // Empty dependency array means this runs only once on mount

  // Auto-refresh articles periodically and on visibility change
  useEffect(() => {
    if (!isClient) return // Only run on client side

    // Function to handle visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log("🔄 Page became visible, refreshing articles...")
        loadArticlesData() // Refresh all articles on visibility
      }
    }

    // Add visibility change listener
    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Set up automatic refresh (if enabled)
    let interval: NodeJS.Timeout | null = null

    if (autoRefreshEnabled) {
      interval = setInterval(() => {
        console.log(
          `⏰ Auto-refreshing articles from Hashnode every ${portfolioConfig.refreshIntervalMinutes} minutes...`,
        )
        loadArticlesData() // Refresh all articles on interval
        setNextRefreshTime(new Date(Date.now() + refreshInterval)) // Reset timer
      }, refreshInterval)
    }

    // Cleanup on component unmount
    return () => {
      if (interval) clearInterval(interval)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [autoRefreshEnabled, isClient]) // Dependencies include autoRefreshEnabled and isClient

  const handleSync = async () => {
    setSyncing(true)
    try {
      console.log("🔄 Manual refresh: Fetching latest articles from Hashnode...")
      await loadArticlesData() // Sync all articles
      console.log("✅ Manual refresh completed!")
    } catch (error) {
      console.error("❌ Error during manual refresh:", error)
      alert(`Error refreshing articles: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setSyncing(false)
    }
  }

  const fetchFromAPI = async () => {
    setApiLoading(true)
    setApiError(null)
    try {
      // Use pageSize for API call, no specific page needed for raw response view
      const response = await fetch(
        `/api/hashnode?username=${portfolioConfig.hashnodeUsername}&includeSeries=${portfolioConfig.includeSeriesData}&pageSize=100`, // Fetch all
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        },
      )

      const data = await response.json()
      setApiResponse(data)

      if (!response.ok) {
        setApiError(data.error || "Failed to fetch from API")
      } else {
        console.log(`📊 API Response: ${data.data?.articles?.length || 0} articles fetched`)
      }
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Unknown error occurred")
    } finally {
      setApiLoading(false)
    }
  }

  // Get all unique tags from articles
  const allTags = [...new Set(articles.flatMap((article) => article.tags.map((tag) => tag.name)))].sort()

  // Get tag counts
  const tagCounts = allTags.reduce(
    (acc, tag) => {
      acc[tag] = articles.filter((article) => article.tags.some((articleTag) => articleTag.name === tag)).length
      return acc
    },
    {} as Record<string, number>,
  )

  // Filter articles
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.brief && article.brief.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((selectedTag) => article.tags.some((tag) => tag.name === selectedTag))
    const matchesSeries = !selectedSeries || article.series_name === selectedSeries
    return matchesSearch && matchesTags && matchesSeries
  })

  // Filter tags based on search term
  const filteredTags = allTags.filter((tag) => tag.toLowerCase().includes(tagSearchTerm.toLowerCase()))

  // Handle tag selection
  const handleTagToggle = (tagName: string) => {
    setSelectedTags((prev) => (prev.includes(tagName) ? prev.filter((tag) => tag !== tagName) : [...prev, tagName]))
  }

  const clearAllTags = () => {
    setSelectedTags([])
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2 text-primary">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="font-mono">Loading articles...</span>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl font-bold text-primary">$ cat articles/</h1>
              {/* Development-only controls */}
              {isClient && showDevControls && (
                <div className="flex gap-2">
                  <Button
                    onClick={fetchFromAPI}
                    disabled={apiLoading}
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                  >
                    {apiLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Code className="h-4 w-4 mr-2" />}
                    Fetch API
                  </Button>
                  <Button
                    onClick={handleSync}
                    disabled={syncing}
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                  >
                    {syncing ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4 mr-2" />
                    )}
                    Sync DB
                  </Button>
                </div>
              )}
            </div>
            <p className="text-muted-foreground text-lg">
              Technical articles, tutorials, and insights from my development journey
            </p>
            {/* Removed pagination total count display */}
          </div>

          <Tabs defaultValue="articles" className="w-full">
            <TabsList className={`grid w-full ${isClient && showDevControls ? "grid-cols-2" : "grid-cols-1"}`}>
              <TabsTrigger value="articles" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Articles View
              </TabsTrigger>
              {/* API Response tab only in development */}
              {isClient && showDevControls && (
                <TabsTrigger value="api" className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  API Response
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="articles" className="mt-6">
              {articles.length > 0 && (
                <div className="text-sm text-muted-foreground mb-6 space-y-1 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Live: {articles.length} articles from Hashnode
                      </p>
                      {isClient && lastSync && <p>Last updated: {new Date(lastSync).toLocaleString()}</p>}
                      {/* Development-only detailed info */}
                      {isClient && showRefreshTimer && autoRefreshEnabled && nextRefreshTime && (
                        <p className="text-xs">Next auto-refresh: {nextRefreshTime.toLocaleTimeString()}</p>
                      )}
                      {/* Production-friendly message */}
                      {isClient && !showDevControls && (
                        <p className="text-xs">
                          Articles automatically sync with your Hashnode blog every{" "}
                          {portfolioConfig.refreshIntervalMinutes} minutes
                        </p>
                      )}
                    </div>
                    {/* Development-only toggle */}
                    {isClient && showAutoRefreshToggle && (
                      <button
                        onClick={() => setAutoRefreshEnabled(!autoRefreshEnabled)}
                        className="text-xs px-2 py-1 rounded border border-primary/20 hover:bg-primary/10 transition-colors"
                      >
                        Auto-refresh: {autoRefreshEnabled ? "ON" : "OFF"}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {articles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    No articles found. Make sure to update the HASHNODE_USERNAME in the code with your actual Hashnode
                    username.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Current username:{" "}
                    <code className="bg-muted px-2 py-1 rounded">{portfolioConfig.hashnodeUsername}</code>
                  </p>
                </div>
              ) : (
                <>
                  {/* Search and Filters */}
                  <div className="mb-8 space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-background border-primary/20"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      {/* Tag Filter with Multi-Select */}
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="bg-transparent border-primary/20 hover:bg-primary/10">
                            <Tag className="h-4 w-4 mr-2" />
                            Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-4" align="start">
                          <div className="space-y-4">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                              <Input
                                placeholder="Search tags..."
                                value={tagSearchTerm}
                                onChange={(e) => setTagSearchTerm(e.target.value)}
                                className="pl-10"
                              />
                            </div>
                            {selectedTags.length > 0 && (
                              <Button variant="ghost" size="sm" onClick={clearAllTags} className="w-full text-xs">
                                <X className="h-3 w-3 mr-1" />
                                Clear all tags
                              </Button>
                            )}
                            <div className="max-h-48 overflow-y-auto space-y-2">
                              {filteredTags.map((tag) => (
                                <div
                                  key={tag}
                                  className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                                    selectedTags.includes(tag)
                                      ? "bg-primary/20 border border-primary"
                                      : "hover:bg-muted"
                                  }`}
                                  onClick={() => handleTagToggle(tag)}
                                >
                                  <span className="text-sm">#{tag}</span> {/* Added '#' for tag display */}
                                  <Badge variant="secondary" className="text-xs">
                                    {tagCounts[tag]}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>

                      {/* Series Filter */}
                      {series.length > 0 && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="bg-transparent border-primary/20 hover:bg-primary/10">
                              <BookOpen className="h-4 w-4 mr-2" />
                              Series {selectedSeries && `(1)`}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-64 p-4" align="start">
                            <div className="space-y-2">
                              {selectedSeries && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedSeries(null)}
                                  className="w-full text-xs"
                                >
                                  <X className="h-3 w-3 mr-1" />
                                  Clear series filter
                                </Button>
                              )}
                              {series.map((s) => (
                                <div
                                  key={s.id}
                                  className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                                    selectedSeries === s.name ? "bg-primary/20 border border-primary" : "hover:bg-muted"
                                  }`}
                                  onClick={() => setSelectedSeries(selectedSeries === s.name ? null : s.name)}
                                >
                                  <span className="text-sm">{s.name}</span>
                                  <Badge variant="secondary" className="text-xs">
                                    {s.total_posts}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}

                      {/* Active filters display */}
                      {(selectedTags.length > 0 || selectedSeries) && (
                        <div className="flex flex-wrap gap-2">
                          {selectedTags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="cursor-pointer hover:bg-destructive/20"
                              onClick={() => handleTagToggle(tag)}
                            >
                              #{tag} {/* Added '#' for tag display */}
                              <X className="h-3 w-3 ml-1" />
                            </Badge>
                          ))}
                          {selectedSeries && (
                            <Badge
                              variant="secondary"
                              className="cursor-pointer hover:bg-destructive/20"
                              onClick={() => setSelectedSeries(null)}
                            >
                              {selectedSeries}
                              <X className="h-3 w-3 ml-1" />
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Series Section */}
                  {series.length > 0 && (
                    <div className="mb-12">
                      <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                        <BookOpen className="h-6 w-6" />
                        Article Series
                      </h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {series.map((s, index) => (
                          <Card
                            key={index}
                            className={`border-primary/20 hover:border-primary transition-all duration-300 cursor-pointer ${
                              selectedSeries === s.name ? "border-primary bg-primary/5" : ""
                            }`}
                            onClick={() => setSelectedSeries(selectedSeries === s.name ? null : s.name)}
                          >
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg flex items-center justify-between">
                                {s.name}
                                <Badge variant="secondary" className="text-xs w-fit mb-2">
                                  {s.total_posts} articles
                                </Badge>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground">
                                {s.description || "A collection of related articles"}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Articles Grid - now shows all filtered articles without pagination */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                      <Card
                        key={article.id}
                        className="group overflow-hidden border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                      >
                        {/* Cover Image */}
                        {article.cover_image_url && (
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={article.cover_image_url || "/placeholder.svg"}
                              alt={article.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {article.series_name && (
                              <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground">
                                {article.series_name}
                              </Badge>
                            )}
                          </div>
                        )}

                        <CardHeader className="pb-2">
                          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                        </CardHeader>

                        <CardContent className="pb-2">
                          <p className="text-muted-foreground text-sm line-clamp-3">{article.brief}</p>

                          {/* Tags */}
                          {article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-3">
                              {article.tags.slice(0, 3).map((tag) => (
                                <Badge
                                  key={tag.name}
                                  variant="outline"
                                  className="text-xs cursor-pointer hover:bg-primary/10"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    handleTagToggle(tag.name)
                                  }}
                                >
                                  {tag.name}
                                </Badge>
                              ))}
                              {article.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{article.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          )}
                        </CardContent>

                        <CardFooter className="pt-2 flex items-center justify-between text-xs text-muted-foreground border-t border-primary/5">
                          <div className="flex items-center gap-3">
                            {isClient && article.published_at && (
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(article.published_at)}
                              </span>
                            )}
                            {article.read_time_minutes && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatReadTime(article.read_time_minutes)}
                              </span>
                            )}
                          </div>
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-primary transition-colors"
                          >
                            Read <ExternalLink className="h-3 w-3" />
                          </a>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-8 text-center text-sm text-muted-foreground">
                    Showing {filteredArticles.length} of {articles.length} articles
                    {selectedSeries && ` in "${selectedSeries}"`}
                    {selectedTags.length > 0 && ` with tags: ${selectedTags.join(", ")}`}
                  </div>

                  {filteredArticles.length === 0 && articles.length > 0 && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-2">No articles found matching your criteria.</p>
                      <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            {/* API Response tab - development only */}
            {isClient && showDevControls && (
              <TabsContent value="api" className="mt-6">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      API Response
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {apiError && (
                      <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                        {apiError}
                      </div>
                    )}
                    {apiResponse ? (
                      <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-96 text-xs">
                        {JSON.stringify(apiResponse, null, 2)}
                      </pre>
                    ) : (
                      <p className="text-muted-foreground">Click "Fetch API" to see the raw API response</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </main>
  )
}
