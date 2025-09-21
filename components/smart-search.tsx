"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Filter, X, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface SearchResult {
  id: string
  name: string
  artist: string
  category: string
  price: number
  rating: number
  reviews: number
  image: string
  location: string
  relevanceScore: number
  matchType: "exact" | "semantic" | "category" | "artist" | "material"
}

interface SmartSearchProps {
  onResults?: (results: SearchResult[]) => void
  placeholder?: string
  className?: string
}

export default function SmartSearch({
  onResults,
  placeholder = "Search artisan creations, stories, or makers...",
  className = "",
}: SmartSearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [searchTime, setSearchTime] = useState(0)
  const searchRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    if (query.trim().length > 2) {
      debounceRef.current = setTimeout(() => {
        performSearch(query)
      }, 300)
    } else {
      setResults([])
      setSuggestions([])
      setShowResults(false)
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [query])

  const performSearch = async (searchQuery: string) => {
    try {
      setLoading(true)
      const startTime = Date.now()

      const response = await fetch(`/api/search/smart?q=${encodeURIComponent(searchQuery)}&limit=8`)

      if (!response.ok) {
        throw new Error("Search failed")
      }

      const data = await response.json()

      if (data.success) {
        setResults(data.results)
        setSuggestions(data.suggestions || [])
        setSearchTime(Date.now() - startTime)
        setShowResults(true)

        if (onResults) {
          onResults(data.results)
        }
      }
    } catch (error) {
      console.error("Search error:", error)
      setResults([])
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setShowResults(false)
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setSuggestions([])
    setShowResults(false)
  }

  const getMatchTypeColor = (matchType: string) => {
    switch (matchType) {
      case "exact":
        return "bg-green-100 text-green-800"
      case "artist":
        return "bg-blue-100 text-blue-800"
      case "category":
        return "bg-purple-100 text-purple-800"
      case "material":
        return "bg-orange-100 text-orange-800"
      case "semantic":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMatchTypeLabel = (matchType: string) => {
    switch (matchType) {
      case "exact":
        return "Exact Match"
      case "artist":
        return "Artist Match"
      case "category":
        return "Category Match"
      case "material":
        return "Material Match"
      case "semantic":
        return "Related"
      default:
        return "Match"
    }
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-12 pr-16 py-4 text-lg rounded-full border-2 border-amber-200 focus:border-amber-400"
        />
        {query && (
          <Button
            size="icon"
            variant="ghost"
            onClick={clearSearch}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <Button
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-amber-600 hover:bg-amber-700"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {showResults && query.trim().length > 2 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-0">
            {loading ? (
              <div className="p-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="h-4 w-4 animate-spin text-amber-600" />
                  <span className="text-sm text-gray-600">Searching with AI...</span>
                </div>
              </div>
            ) : (
              <>
                {results.length > 0 && (
                  <div className="p-3 border-b bg-gray-50">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Found {results.length} results</span>
                      <span>{searchTime}ms</span>
                    </div>
                  </div>
                )}

                {suggestions.length > 0 && (
                  <div className="p-3 border-b">
                    <p className="text-sm font-medium text-gray-700 mb-2">Suggestions:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {results.length > 0 ? (
                  <div className="max-h-64 overflow-y-auto">
                    {results.map((result) => (
                      <div key={result.id} className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0">
                        <div className="flex items-center space-x-3">
                          <img
                            src={result.image || "/placeholder.svg"}
                            alt={result.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-sm truncate">{result.name}</h4>
                              <Badge className={`text-xs ${getMatchTypeColor(result.matchType)}`}>
                                {getMatchTypeLabel(result.matchType)}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600">by {result.artist}</p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-sm font-bold text-teal-600">${result.price}</span>
                              <div className="flex items-center text-xs text-gray-500">
                                <span>★ {result.rating}</span>
                                <span className="ml-1">({result.reviews})</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : query.trim().length > 2 && !loading ? (
                  <div className="p-4 text-center text-gray-500">
                    <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No results found for "{query}"</p>
                    <p className="text-xs mt-1">Try different keywords or browse categories</p>
                  </div>
                ) : null}
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
