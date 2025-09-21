import { type NextRequest, NextResponse } from "next/server"

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

// Mock search database
const searchableProducts = [
  {
    id: "1",
    name: "Handcrafted Ceramic Bowl",
    artist: "Kenji Tanaka",
    category: "Ceramics",
    subcategory: "Bowls",
    price: 78,
    materials: ["Clay", "Glaze"],
    tags: ["handmade", "traditional", "japanese", "pottery"],
    description: "Beautiful handcrafted ceramic bowl made using traditional Japanese techniques",
    rating: 4.9,
    reviews: 127,
    image: "/japanese-ceramic-tea-set-with-traditional-glazing.jpg",
    location: "Kyoto, Japan",
  },
  {
    id: "2",
    name: "Silver Pendant Necklace",
    artist: "Maya Patel",
    category: "Jewelry",
    subcategory: "Necklaces",
    price: 165,
    materials: ["Silver", "Gemstone"],
    tags: ["handmade", "indian", "traditional", "jewelry"],
    description: "Elegant silver pendant necklace with intricate Indian metalworking",
    rating: 4.8,
    reviews: 89,
    image: "/sterling-silver-ring-with-intricate-indian-design.jpg",
    location: "Jaipur, India",
  },
  {
    id: "3",
    name: "Woven Wall Hanging",
    artist: "Elena Rodriguez",
    category: "Textiles",
    subcategory: "Wall Hangings",
    price: 120,
    materials: ["Silk", "Cotton"],
    tags: ["handmade", "spanish", "traditional", "weaving"],
    description: "Beautiful woven wall hanging using traditional Spanish weaving techniques",
    rating: 4.9,
    reviews: 156,
    image: "/handwoven-silk-scarf-with-traditional-patterns.jpg",
    location: "Barcelona, Spain",
  },
  {
    id: "4",
    name: "Reclaimed Wood Sculpture",
    artist: "Thomas Miller",
    category: "Woodwork",
    subcategory: "Sculptures",
    price: 89,
    materials: ["Reclaimed Wood", "Natural Oil"],
    tags: ["handmade", "sustainable", "modern", "eco-friendly"],
    description: "Modern sculpture crafted from reclaimed wood with sustainable practices",
    rating: 4.7,
    reviews: 73,
    image: "/reclaimed-wood-bowl-with-natural-grain-patterns.jpg",
    location: "Portland, USA",
  },
]

class SmartSearchEngine {
  // Exact match search
  static exactMatch(query: string, products: any[]): SearchResult[] {
    const lowerQuery = query.toLowerCase()
    return products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(lowerQuery) || product.artist.toLowerCase().includes(lowerQuery),
      )
      .map((product) => ({
        ...product,
        relevanceScore: this.calculateExactScore(product, lowerQuery),
        matchType: "exact" as const,
      }))
  }

  // Semantic search (simplified - in real app would use embeddings)
  static semanticSearch(query: string, products: any[]): SearchResult[] {
    const semanticKeywords = this.extractSemanticKeywords(query)

    return products
      .map((product) => ({
        ...product,
        relevanceScore: this.calculateSemanticScore(product, semanticKeywords),
        matchType: "semantic" as const,
      }))
      .filter((product) => product.relevanceScore > 0)
  }

  // Category-based search
  static categorySearch(query: string, products: any[]): SearchResult[] {
    const categories = ["ceramics", "pottery", "jewelry", "textiles", "woodwork", "sculpture"]
    const matchedCategory = categories.find((cat) => query.toLowerCase().includes(cat))

    if (!matchedCategory) return []

    return products
      .filter(
        (product) =>
          product.category.toLowerCase().includes(matchedCategory) ||
          product.subcategory.toLowerCase().includes(matchedCategory),
      )
      .map((product) => ({
        ...product,
        relevanceScore: 0.8,
        matchType: "category" as const,
      }))
  }

  // Material-based search
  static materialSearch(query: string, products: any[]): SearchResult[] {
    const materials = ["silk", "cotton", "silver", "gold", "clay", "wood", "glass", "leather"]
    const matchedMaterial = materials.find((material) => query.toLowerCase().includes(material))

    if (!matchedMaterial) return []

    return products
      .filter((product) =>
        product.materials.some((material: string) => material.toLowerCase().includes(matchedMaterial)),
      )
      .map((product) => ({
        ...product,
        relevanceScore: 0.7,
        matchType: "material" as const,
      }))
  }

  // Artist search
  static artistSearch(query: string, products: any[]): SearchResult[] {
    return products
      .filter((product) => product.artist.toLowerCase().includes(query.toLowerCase()))
      .map((product) => ({
        ...product,
        relevanceScore: 0.9,
        matchType: "artist" as const,
      }))
  }

  private static calculateExactScore(product: any, query: string): number {
    let score = 0

    if (product.name.toLowerCase().includes(query)) score += 1.0
    if (product.artist.toLowerCase().includes(query)) score += 0.8
    if (product.description.toLowerCase().includes(query)) score += 0.6
    if (product.tags.some((tag: string) => tag.toLowerCase().includes(query))) score += 0.4

    return score
  }

  private static calculateSemanticScore(product: any, keywords: string[]): number {
    let score = 0

    keywords.forEach((keyword) => {
      if (product.name.toLowerCase().includes(keyword)) score += 0.3
      if (product.description.toLowerCase().includes(keyword)) score += 0.2
      if (product.tags.some((tag: string) => tag.toLowerCase().includes(keyword))) score += 0.1
    })

    return score
  }

  private static extractSemanticKeywords(query: string): string[] {
    // Simple keyword extraction - in real app would use NLP
    const synonyms: { [key: string]: string[] } = {
      bowl: ["dish", "vessel", "container"],
      necklace: ["jewelry", "pendant", "chain"],
      handmade: ["crafted", "artisan", "handcrafted"],
      traditional: ["classic", "heritage", "cultural"],
      modern: ["contemporary", "current", "new"],
    }

    const words = query.toLowerCase().split(" ")
    const keywords: string[] = []

    words.forEach((word) => {
      keywords.push(word)
      if (synonyms[word]) {
        keywords.push(...synonyms[word])
      }
    })

    return [...new Set(keywords)]
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q") || ""
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const category = searchParams.get("category")
    const minPrice = Number.parseFloat(searchParams.get("minPrice") || "0")
    const maxPrice = Number.parseFloat(searchParams.get("maxPrice") || "10000")

    if (!query.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Search query is required",
        },
        { status: 400 },
      )
    }

    // Apply filters
    let filteredProducts = searchableProducts

    if (category) {
      filteredProducts = filteredProducts.filter((product) => product.category.toLowerCase() === category.toLowerCase())
    }

    filteredProducts = filteredProducts.filter((product) => product.price >= minPrice && product.price <= maxPrice)

    // Perform different types of searches
    const exactResults = SmartSearchEngine.exactMatch(query, filteredProducts)
    const semanticResults = SmartSearchEngine.semanticSearch(query, filteredProducts)
    const categoryResults = SmartSearchEngine.categorySearch(query, filteredProducts)
    const materialResults = SmartSearchEngine.materialSearch(query, filteredProducts)
    const artistResults = SmartSearchEngine.artistSearch(query, filteredProducts)

    // Combine and deduplicate results
    const allResults = [...exactResults, ...semanticResults, ...categoryResults, ...materialResults, ...artistResults]

    const uniqueResults = allResults.filter(
      (result, index, self) => index === self.findIndex((r) => r.id === result.id),
    )

    // Sort by relevance score and match type priority
    const sortedResults = uniqueResults.sort((a, b) => {
      const typeOrder = { exact: 5, artist: 4, category: 3, material: 2, semantic: 1 }
      const aTypeScore = typeOrder[a.matchType] || 0
      const bTypeScore = typeOrder[b.matchType] || 0

      if (aTypeScore !== bTypeScore) {
        return bTypeScore - aTypeScore
      }

      return b.relevanceScore - a.relevanceScore
    })

    const results = sortedResults.slice(0, limit)

    // Add search suggestions
    const suggestions = SmartSearchEngine.generateSuggestions(query, searchableProducts)

    return NextResponse.json({
      success: true,
      query,
      results,
      totalCount: results.length,
      suggestions,
      searchTime: Math.random() * 100 + 50, // Mock search time
      filters: {
        categories: [...new Set(searchableProducts.map((p) => p.category))],
        priceRange: {
          min: Math.min(...searchableProducts.map((p) => p.price)),
          max: Math.max(...searchableProducts.map((p) => p.price)),
        },
      },
    })
  } catch (error) {
    console.error("Smart search API error:", error)
    return NextResponse.json({ success: false, error: "Search failed" }, { status: 500 })
  }
}

// Add suggestion generation method to SmartSearchEngine
SmartSearchEngine.generateSuggestions = (query: string, products: any[]): string[] => {
  const suggestions: string[] = []

  // Add popular searches based on query
  if (query.toLowerCase().includes("ceramic")) {
    suggestions.push("ceramic bowls", "ceramic vases", "pottery")
  }

  if (query.toLowerCase().includes("jewelry")) {
    suggestions.push("silver jewelry", "handmade necklaces", "artisan rings")
  }

  if (query.toLowerCase().includes("textile")) {
    suggestions.push("woven textiles", "silk scarves", "wall hangings")
  }

  // Add artist suggestions
  const artists = [...new Set(products.map((p) => p.artist))]
  artists.forEach((artist) => {
    if (artist.toLowerCase().includes(query.toLowerCase())) {
      suggestions.push(artist)
    }
  })

  return suggestions.slice(0, 5)
}
