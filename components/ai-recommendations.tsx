"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Star, Sparkles, TrendingUp, MapPin, Users } from "lucide-react"

interface Recommendation {
  id: string
  name: string
  artist: string
  category: string
  price: number
  rating: number
  reviews: number
  image: string
  location: string
  reason: string
  confidence: number
  materials?: string[]
  tags?: string[]
}

interface AIRecommendationsProps {
  userId?: string
  type?: "hybrid" | "collaborative" | "content" | "trending" | "location"
  limit?: number
  className?: string
}

export default function AIRecommendations({
  userId,
  type = "hybrid",
  limit = 4,
  className = "",
}: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [recommendationType, setRecommendationType] = useState("")
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [cart, setCart] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    fetchRecommendations()
  }, [userId, type, limit])

  const fetchRecommendations = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          type,
          userPreferences: {
            categories: ["Ceramics", "Textiles"],
            priceRange: { min: 50, max: 200 },
            materials: ["Silk", "Clay", "Silver"],
            styles: ["traditional", "handmade"],
            purchaseHistory: [],
            viewHistory: [],
            favoriteArtisans: [],
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations")
      }

      const data = await response.json()

      if (data.success) {
        setRecommendations(data.recommendations.slice(0, limit))
        setRecommendationType(data.type)
      } else {
        throw new Error(data.error || "Failed to load recommendations")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const getRecommendationIcon = () => {
    switch (type) {
      case "trending":
        return <TrendingUp className="h-4 w-4" />
      case "location":
        return <MapPin className="h-4 w-4" />
      case "collaborative":
        return <Users className="h-4 w-4" />
      default:
        return <Sparkles className="h-4 w-4" />
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "bg-green-100 text-green-800"
    if (confidence >= 0.6) return "bg-yellow-100 text-yellow-800"
    return "bg-gray-100 text-gray-800"
  }

  const toggleFavorite = (itemId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId)
      } else {
        newFavorites.add(itemId)
      }
      // Update global favorites count
      const event = new CustomEvent("favoritesUpdated", {
        detail: { count: newFavorites.size },
      })
      window.dispatchEvent(event)
      return newFavorites
    })
  }

  const addToCart = (item: Recommendation) => {
    setCart((prev) => {
      const newCart = { ...prev }
      newCart[item.id] = (newCart[item.id] || 0) + 1

      // Update global cart count and items
      const cartItems = Object.values(newCart).reduce((sum, qty) => sum + qty, 0)
      const event = new CustomEvent("cartUpdated", {
        detail: {
          count: cartItems,
          item: {
            id: item.id,
            name: item.name,
            artist: item.artist,
            price: item.price,
            image: item.image,
            quantity: newCart[item.id],
          },
        },
      })
      window.dispatchEvent(event)
      return newCart
    })
  }

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-300 rounded animate-pulse" />
          <div className="w-32 h-4 bg-gray-300 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: limit }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="w-full h-48 bg-gray-300 animate-pulse" />
              <CardContent className="p-4 space-y-2">
                <div className="w-full h-4 bg-gray-300 rounded animate-pulse" />
                <div className="w-3/4 h-3 bg-gray-300 rounded animate-pulse" />
                <div className="w-1/2 h-3 bg-gray-300 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-red-600 mb-4">Failed to load recommendations: {error}</p>
        <Button onClick={fetchRecommendations} variant="outline">
          Try Again
        </Button>
      </div>
    )
  }

  if (recommendations.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No recommendations available at the moment.</p>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getRecommendationIcon()}
          <h3 className="text-xl font-bold text-gray-900">{recommendationType || "AI Recommendations"}</h3>
          <Badge className="bg-purple-100 text-purple-800">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Powered
          </Badge>
        </div>
        <Button variant="outline" size="sm" onClick={fetchRecommendations}>
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-3 right-3 rounded-full bg-white/80 hover:bg-white"
                onClick={() => toggleFavorite(item.id)}
              >
                <Heart
                  className={`h-4 w-4 ${favorites.has(item.id) ? "text-red-500 fill-current" : "text-gray-600"}`}
                />
              </Button>
              <Badge className={`absolute top-3 left-3 ${getConfidenceColor(item.confidence)}`}>
                {Math.round(item.confidence * 100)}% match
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="mb-2">
                <Badge className="bg-teal-50 text-teal-700 text-xs mb-2">{item.reason}</Badge>
              </div>
              <h4 className="font-bold text-lg mb-1 line-clamp-1">{item.name}</h4>
              <p className="text-gray-600 text-sm mb-2">by {item.artist}</p>
              <div className="flex items-center mb-2">
                <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                <span className="text-xs text-gray-500">{item.location}</span>
              </div>
              <div className="flex items-center mb-3">
                <div className="flex items-center mr-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm ml-1">{item.rating}</span>
                </div>
                <span className="text-xs text-gray-500">({item.reviews} reviews)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-teal-600">${item.price}</span>
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700" onClick={() => addToCart(item)}>
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
