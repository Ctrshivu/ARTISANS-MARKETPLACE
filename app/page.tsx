"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Heart, ShoppingCart, User, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import SmartSearch from "@/components/smart-search"
import AIRecommendations from "@/components/ai-recommendations"
import ArtisanStoryModal from "@/components/artisan-story-modal"
import Sidebar from "@/components/sidebar"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [navbarSearchOpen, setNavbarSearchOpen] = useState(false)
  const [navbarSearchQuery, setNavbarSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<string[]>(["ceramic-tea-set"])
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([])
  const [selectedArtisan, setSelectedArtisan] = useState<any>(null)
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarType, setSidebarType] = useState<"favorites" | "cart">("cart")
  const [globalFavoritesCount, setGlobalFavoritesCount] = useState(0)
  const [globalCartCount, setGlobalCartCount] = useState(0)

  useEffect(() => {
    const handleFavoritesUpdate = (event: CustomEvent) => {
      setGlobalFavoritesCount(event.detail.count)
    }

    const handleCartUpdate = (event: CustomEvent) => {
      setGlobalCartCount(event.detail.count)
      // Also update local cart state if needed
      const { item } = event.detail
      setCart((prev) => {
        const existingItem = prev.find((cartItem) => cartItem.id === item.id)
        if (existingItem) {
          return prev.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: item.quantity } : cartItem))
        }
        return [...prev, { id: item.id, quantity: item.quantity }]
      })
    }

    window.addEventListener("favoritesUpdated", handleFavoritesUpdate as EventListener)
    window.addEventListener("cartUpdated", handleCartUpdate as EventListener)

    return () => {
      window.removeEventListener("favoritesUpdated", handleFavoritesUpdate as EventListener)
      window.removeEventListener("cartUpdated", handleCartUpdate as EventListener)
    }
  }, [])

  const artisans = [
    {
      name: "Elena Rodriguez",
      location: "Barcelona, Spain",
      specialty: "Traditional Weaving",
      followers: "2,347",
      products: "23",
      rating: "4.9",
      image: "/female-artisan-weaving-textiles-in-workshop.jpg",
      story: [
        {
          year: "2020",
          title: "The Discovery",
          description: "Elena discovered traditional indigo dyeing techniques in a small village outside Barcelona.",
          image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SPFKyhZovbMPF4vW2wLLofLhHB0JLO.png",
        },
        {
          year: "2021",
          title: "Learning the Craft",
          description: "She spent months learning from master dyer Carmen Vidal, mastering ancient techniques.",
          image: "/female-artisan-weaving-textiles-in-workshop.jpg",
        },
        {
          year: "2022",
          title: "First Collection",
          description: "Launched her first indigo collection, combining traditional methods with contemporary design.",
          image: "/female-artisan-weaving-textiles-in-workshop.jpg",
        },
        {
          year: "2024",
          title: "Master Artisan",
          description:
            "Recognized as a master artisan, now teaching others and leading sustainable textile initiatives.",
          image: "/female-artisan-weaving-textiles-in-workshop.jpg",
        },
      ],
    },
    // ... other artisans with similar story structure
  ]

  const products = [
    {
      id: "handwoven-silk-scarf",
      name: "Handwoven Silk Scarf",
      artist: "Elena Rodriguez",
      location: "Barcelona, Spain",
      price: "$145",
      image: "/handwoven-silk-scarf-with-traditional-patterns.jpg",
    },
    {
      id: "ceramic-tea-set",
      name: "Ceramic Tea Set",
      artist: "Kenji Tanaka",
      location: "Kyoto, Japan",
      price: "$89",
      image: "/japanese-ceramic-tea-set-with-traditional-glazing.jpg",
    },
    {
      id: "sterling-silver-ring",
      name: "Sterling Silver Ring",
      artist: "Maya Patel",
      location: "Jaipur, India",
      price: "$220",
      image: "/sterling-silver-ring-with-intricate-indian-design.jpg",
    },
    {
      id: "reclaimed-wood-bowl",
      name: "Reclaimed Wood Bowl",
      artist: "Thomas Miller",
      location: "Portland, USA",
      price: "$67",
      image: "/reclaimed-wood-bowl-with-natural-grain-patterns.jpg",
      tags: ["Woodwork", "Sustainable"],
    },
  ]

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const addToCart = (productId: string) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === productId)
      if (existingItem) {
        return prev.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { id: productId, quantity: 1 }]
    })
  }

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const openStoryModal = (artisan: any) => {
    setSelectedArtisan(artisan)
    setIsStoryModalOpen(true)
  }

  const toggleNavbarSearch = () => {
    setNavbarSearchOpen(!navbarSearchOpen)
    if (!navbarSearchOpen) {
      // Focus the input after it's rendered
      setTimeout(() => {
        const searchInput = document.getElementById("navbar-search-input")
        if (searchInput) {
          searchInput.focus()
        }
      }, 100)
    }
  }

  const handleNavbarSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (navbarSearchQuery.trim()) {
      // Perform search logic here
      console.log("[v0] Searching for:", navbarSearchQuery)
      // You can add actual search functionality here
      // For now, we'll scroll to marketplace and filter
      scrollToSection("marketplace")
      setNavbarSearchOpen(false)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const openFavorites = () => {
    setSidebarType("favorites")
    setSidebarOpen(true)
  }

  const openCart = () => {
    setSidebarType("cart")
    setSidebarOpen(true)
  }

  const totalCartItems = Math.max(
    cart.reduce((total, item) => total + item.quantity, 0),
    globalCartCount,
  )

  const totalFavorites = Math.max(favorites.length, globalFavoritesCount)

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <img
                  src="/loomis-logo-transparent.png"
                  alt="Loomis"
                  className="h-16 w-auto hover:opacity-80 transition-opacity"
                />
              </button>
              <nav className="hidden md:flex space-x-6">
                <button
                  onClick={() => scrollToSection("marketplace")}
                  className="text-gray-600 hover:text-amber-800 transition-colors"
                >
                  Marketplace
                </button>
                <button
                  onClick={() => scrollToSection("featured-artisans")}
                  className="text-gray-600 hover:text-amber-800 transition-colors"
                >
                  Artisans
                </button>
                <button
                  onClick={() => scrollToSection("artisan-stories")}
                  className="text-gray-600 hover:text-amber-800 transition-colors"
                >
                  Stories
                </button>
                <button
                  onClick={() => scrollToSection("about-loomis")}
                  className="text-gray-600 hover:text-amber-800 transition-colors"
                >
                  About
                </button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={toggleNavbarSearch}>
                {navbarSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" className="relative" onClick={openFavorites}>
                <Heart className="h-5 w-5" />
                {totalFavorites > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    {totalFavorites}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon" className="relative" onClick={openCart}>
                <ShoppingCart className="h-5 w-5" />
                {totalCartItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-teal-600 text-white text-xs">
                    {totalCartItems}
                  </Badge>
                )}
              </Button>
              <Link href="/auth">
                <Button variant="outline" className="hidden sm:flex bg-transparent">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
          {navbarSearchOpen && (
            <div className="mt-4 border-t pt-4">
              <form onSubmit={handleNavbarSearch} className="flex gap-2 max-w-md mx-auto">
                <Input
                  id="navbar-search-input"
                  type="text"
                  placeholder="Search artisan creations, stories, or makers..."
                  value={navbarSearchQuery}
                  onChange={(e) => setNavbarSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                  Search
                </Button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <img src="/loomis-logo-transparent.png" alt="Loomis" className="h-32 w-auto mx-auto mb-6" />
          <h2 className="text-5xl font-bold text-red-800 mb-6 text-balance">Discover Authentic Artisan Treasures</h2>
          <p className="text-xl text-gray-700 mb-4 max-w-2xl mx-auto text-pretty">
            <span className="text-red-600 font-semibold">Connect directly with master craftspeople</span> from around
            the world. Each handcrafted piece tells a unique story of tradition, passion, and generations of refined
            artistry.
          </p>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto text-pretty">
            From ancient weaving techniques to modern ceramic innovations - experience the beauty of authentic
            craftsmanship.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8" id="hero-search">
            <SmartSearch />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["Ceramics", "Textiles", "Jewelry", "Woodwork", "Metalwork", "Glasswork", "Leather", "Sculpture"].map(
              (category) => (
                <Button
                  key={category}
                  variant="outline"
                  className="rounded-full px-6 py-2 hover:bg-amber-100 hover:border-amber-300 bg-transparent"
                >
                  {category}
                </Button>
              ),
            )}
          </div>
        </div>
      </section>

      {/* AI Recommendations Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <AIRecommendations type="hybrid" limit={4} />
        </div>
      </section>

      {/* Featured Artisans */}
      <section id="featured-artisans" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900">Featured Artisans</h3>
            <Button variant="outline">View All</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {artisans.map((artisan) => (
              <Card key={artisan.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={artisan.image || "/placeholder.svg"}
                    alt={artisan.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-amber-600">⭐ {artisan.rating}</Badge>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-bold text-lg mb-1">{artisan.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">📍 {artisan.location}</p>
                  <p className="text-gray-700 mb-3">{artisan.specialty}</p>
                  <p className="text-sm text-gray-500 mb-4">Specializes in {artisan.specialty.toLowerCase()}</p>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>⭐ {artisan.rating}</span>
                    <span>👥 {artisan.followers} followers</span>
                    <span>📦 {artisan.products} products</span>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-amber-600 hover:bg-amber-700" onClick={() => openStoryModal(artisan)}>
                      View Story
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Follow
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section id="marketplace" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Marketplace</h3>
              <p className="text-gray-600">({products.length} items)</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline">Map View</Button>
              <Button variant="outline">Grid</Button>
              <Button variant="outline">List</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className={`absolute top-3 right-3 rounded-full ${
                      favorites.includes(product.id) ? "text-red-500 bg-white" : "text-gray-400 bg-white/80"
                    } hover:bg-white`}
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-current" : ""}`} />
                  </Button>
                  {product.tags && (
                    <div className="absolute bottom-3 left-3 flex gap-1">
                      {product.tags.map((tag) => (
                        <Badge key={tag} className="bg-white/90 text-gray-700 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h4 className="font-bold text-lg mb-1">{product.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    by {product.artist} • {product.location}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-amber-700">{product.price}</span>
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white" onClick={() => addToCart(product.id)}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Stories Section */}
      <section id="artisan-stories" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Artisan Stories</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-pretty">
            Discover the rich heritage and masterful craftsmanship behind each creation. Every piece tells a story of
            tradition, passion, and artistry.
          </p>
          <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3">Explore Stories</Button>
        </div>
      </section>

      {/* About Loomis Section */}
      <section id="about-loomis" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">About Loomis</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 text-center">
              <h4 className="text-xl font-bold text-teal-700 mb-4">Our Mission</h4>
              <p className="text-gray-600 text-pretty">
                To connect the world's most talented artisans with discerning collectors who appreciate authentic
                craftsmanship and timeless beauty.
              </p>
            </Card>
            <Card className="p-8 text-center">
              <h4 className="text-xl font-bold text-amber-700 mb-4">Our Vision</h4>
              <p className="text-gray-600 text-pretty">
                A world where traditional crafts thrive in the modern era, preserving cultural heritage while creating
                sustainable livelihoods for artisans.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        type={sidebarType}
        favorites={favorites}
        cart={cart}
        onToggleFavorite={toggleFavorite}
        onUpdateCartQuantity={updateCartQuantity}
        onRemoveFromCart={removeFromCart}
      />

      {selectedArtisan && (
        <ArtisanStoryModal
          isOpen={isStoryModalOpen}
          onClose={() => setIsStoryModalOpen(false)}
          artisan={selectedArtisan}
        />
      )}
    </div>
  )
}
