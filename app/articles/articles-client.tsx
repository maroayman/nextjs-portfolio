"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { formatDate, formatReadTime } from "@/config/portfolio"
import {
  ExternalLink,
  Calendar,
  Clock,
  Search,
  BookOpen,
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
}

interface Series {
  id: string
  name: string
  slug: string
  description: string | null
  total_posts: number
}

interface ArticlesClientProps {
  initialArticles: Article[]
  initialSeries: Series[]
  lastSync: string
}

export default function ArticlesClient({ 
  initialArticles, 
  initialSeries, 
  lastSync 
}: ArticlesClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [tagSearchTerm, setTagSearchTerm] = useState("")
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null)

  const articles = initialArticles
  const series = initialSeries

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

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl font-bold text-primary">$ cat articles/</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Technical articles, tutorials, and insights from my development journey
            </p>
          </div>

          <Tabs defaultValue="articles" className="w-full">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="articles" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Articles View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="articles" className="mt-6">
              {articles.length > 0 && (
                <div className="text-sm text-muted-foreground mb-6 space-y-1 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                        {articles.length} articles from Hashnode
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Auto-updates when new articles are published
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {articles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    No articles found.
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
                                  <span className="text-sm">#{tag}</span>
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
                              #{tag}
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

                  {/* Articles Grid */}
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
                            {article.published_at && (
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
          </Tabs>
        </div>
      </div>
    </main>
  )
}
