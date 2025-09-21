import { NextRequest, NextResponse } from "next/server"

// Mock AI recommendation engine
interface UserPreferences {
  categories: string[]
  priceRange: { min: number; max: number }
  materials: string[]
  styles: string[]
  purchaseHistory: string[]
  viewHistory: string[]
  favoriteArtisans: string[]
}

interface Product {
  id: string
  name: string
  artist: string
  category: string
  subcategory: string
  price: number
  materials: string[]
  tags: string[]
  rating: number
  reviews: number
  image: string
  location: string
  views: number
  sales: number
}

// Mock product database
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Handcrafted Ceramic Bowl",
    artist: "Kenji Tanaka",
    category: "Ceramics",
    subcategory: "Bowls",
    price: 78,
    materials: ["Clay", "Glaze"],
    tags: ["handmade", "traditional", "japanese"],
    rating: 4.9,
    reviews: 127,
    image: "/japanese-ceramic-tea-set-with-traditional-glazing.jpg",
    location: "Kyoto, Japan",
    views: 1250,
    sales: 45,
  },
  {
    id: "2",
    name: "Silver Pendant Necklace",
    artist: "Maya Patel",
    category: "Jewelry",
    subcategory: "Necklaces",
    price: 165,
    materials: ["Silver", "Gemstone"],
    tags: ["handmade", "indian", "traditional"],
    rating: 4.8,
    reviews: 89,
    image: "/sterling-silver-ring-with-intricate-indian-design.jpg",
    location: "Jaipur, India",
    views: 980,
    sales: 32,
  },
  {
    id: "3",
    name: "Woven Wall Hanging",
    artist: "Elena Rodriguez",
    category: "Textiles",
    subcategory: "Wall Hangings",
    price: 120,
    materials: ["Silk", "Cotton"],
    tags: ["handmade", "spanish", "traditional"],
    rating: 4.9,
    reviews: 156,
    image: "/handwoven-silk-scarf-with-traditional-patterns.jpg",
    location: "Barcelona, Spain",
    views: 1450,
    sales: 67,
  },
  {
    id: "4",
    name: "Reclaimed Wood Sculpture",
    artist: "Thomas Miller",
    category: "Woodwork",
    subcategory: "Sculptures",
    price: 89,
    materials: ["Reclaimed Wood", "Natural Oil"],
    tags: ["handmade", "sustainable", "modern"],
    rating: 4.7,
    reviews: 73,
    image: "/reclaimed-wood-bowl-with-natural-grain-patterns.jpg",
    location: "Portland, USA",
    views: 890,
    sales: 28,
  },
]

// AI recommendation algorithms
class RecommendationEngine {
  // Collaborative filtering - based on similar users
  static getCollaborativeRecommendations(userPreferences: UserPreferences, products: Product[]): Product[] {
    return products
      .filter(
        (product) =>
          userPreferences.categories.includes(product.category) ||
          product.materials.some((material) => userPreferences.materials.includes(material)),
      )
      .sort((a, b) => b.rating * b.reviews - a.rating * a.reviews)
      .slice(0, 4)
  }

  // Content-based filtering - based on product attributes
  static getContentBasedRecommendations(userPreferences: UserPreferences, products: Product[]): Product[] {
    return products
      .map((product) => ({
        ...product,
        score: this.calculateContentScore(product, userPreferences),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
  }

  // Trending recommendations - based on popularity
  static getTrendingRecommendations(products: Product[]): Product[] {
    return products
      .map((product) => ({
        ...product,
        trendingScore: product.views * 0.3 + product.sales * 0.7 + product.rating * product.reviews * 0.4,
      }))
      .sort((a, b) => b.trendingScore - a.trendingScore)
      .slice(0, 4)
  }

  // Location-based recommendations
  static getLocationBasedRecommendations(userLocation: string, products: Product[]): Product[] {
    // Simple location matching - in real app would use geolocation
    return products
      .filter((product) => product.location.includes(userLocation) || Math.random() > 0.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4)
  }

  private static calculateContentScore(product: Product, preferences: UserPreferences): number {
    let score = 0

    // Category match
    if (preferences.categories.includes(product.category)) score += 30

    // Price range match
    if (product.price >= preferences.priceRange.min && product.price <= preferences.priceRange.max) score += 20

    // Material match
    const materialMatches = product.materials.filter((material) => preferences.materials.includes(material)).length
    score += materialMatches * 15

    // Tag/style match
    const tagMatches = product.tags.filter((tag) => preferences.styles.includes(tag)).length
    score += tagMatches * 10

    // Quality score (rating * reviews)
    score += (product.rating * product.reviews) / 10

    return score
  }

  // Generate recommendation reasons
  static getRecommendationReason(product: Product, userPreferences: UserPreferences): string {
    if (userPreferences.categories.includes(product.category)) {
      return `Based on your interest in ${product.category.toLowerCase()}`
    }

    const materialMatch = product.materials.find((material) => userPreferences.materials.includes(material))
    if (materialMatch) {
      return `You've shown interest in ${materialMatch.toLowerCase()} items`
    }

    if (userPreferences.favoriteArtisans.includes(product.artist)) {
      return `From artisans you follow`
    }

    if (product.rating >= 4.8) {
      return `Highly rated by other customers`
    }

    return `Trending in your area`
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, type, userPreferences, userLocation } = await request.json()

    // Mock user preferences - in real app would fetch from database
    const defaultPreferences: UserPreferences = {
      categories: ["Ceramics", "Textiles"],
      priceRange: { min: 50, max: 200 },
      materials: ["Silk", "Clay", "Silver"],
      styles: ["traditional", "handmade"],
      purchaseHistory: ["1", "3"],
      viewHistory: ["1", "2", "3", "4"],
      favoriteArtisans: ["Elena Rodriguez", "Kenji Tanaka"],
    }

    const preferences = userPreferences || defaultPreferences

    let recommendations: Product[] = []
    let recommendationType = ""

    switch (type) {
      case "collaborative":
        recommendations = RecommendationEngine.getCollaborativeRecommendations(preferences, mockProducts)
        recommendationType = "Based on similar customers"
        break

      case "content":
        recommendations = RecommendationEngine.getContentBasedRecommendations(preferences, mockProducts)
        recommendationType = "Personalized for you"
        break

      case "trending":
        recommendations = RecommendationEngine.getTrendingRecommendations(mockProducts)
        recommendationType = "Trending now"
        break

      case "location":
        recommendations = RecommendationEngine.getLocationBasedRecommendations(userLocation || "USA", mockProducts)
        recommendationType = "Popular in your area"
        break

      default:
        // Hybrid approach - combine multiple algorithms
        const collaborative = RecommendationEngine.getCollaborativeRecommendations(preferences, mockProducts)
        const contentBased = RecommendationEngine.getContentBasedRecommendations(preferences, mockProducts)
        const trending = RecommendationEngine.getTrendingRecommendations(mockProducts)

        // Merge and deduplicate
        const combined = [...collaborative, ...contentBased, ...trending]
        const unique = combined.filter((product, index, self) => index === self.findIndex((p) => p.id === product.id))

        recommendations = unique.slice(0, 8)
        recommendationType = "Recommended for you"
    }

    // Add recommendation reasons
    const recommendationsWithReasons = recommendations.map((product) => ({
      ...product,
      reason: RecommendationEngine.getRecommendationReason(product, preferences),
      confidence: Math.random() * 0.3 + 0.7, // Mock confidence score
    }))

    return NextResponse.json({
      success: true,
      type: recommendationType,
      recommendations: recommendationsWithReasons,
      totalCount: recommendationsWithReasons.length,
    })
  } catch (error) {
    console.error("Recommendation API error:", error)
    return NextResponse.json({ success: false, error: "Failed to generate recommendations" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get("type") || "hybrid"
  const userId = searchParams.get("userId")

  // Default GET request for quick recommendations
  return POST(
    new NextRequest(request.url, {
      method: "POST",
      body: JSON.stringify({ userId, type }),
    }),
  )
}
