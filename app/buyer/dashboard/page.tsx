"use client"

import { useState } from "react"
import {
  Heart,
  ShoppingCart,
  Package,
  Star,
  Filter,
  Search,
  MapPin,
  Clock,
  User,
  Bell,
  Settings,
  Truck,
  Gift,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState("discover")

  // Mock data for buyer dashboard
  const recommendations = [
    {
      id: 1,
      name: "Handcrafted Ceramic Bowl",
      artist: "Kenji Tanaka",
      location: "Kyoto, Japan",
      price: "$78",
      originalPrice: "$95",
      rating: 4.9,
      reviews: 127,
      image: "/japanese-ceramic-tea-set-with-traditional-glazing.jpg",
      isOnSale: true,
      reason: "Based on your interest in ceramics",
    },
    {
      id: 2,
      name: "Silver Pendant Necklace",
      artist: "Maya Patel",
      location: "Jaipur, India",
      price: "$165",
      rating: 4.8,
      reviews: 89,
      image: "/sterling-silver-ring-with-intricate-indian-design.jpg",
      reason: "Similar to items you've liked",
    },
    {
      id: 3,
      name: "Woven Wall Hanging",
      artist: "Elena Rodriguez",
      location: "Barcelona, Spain",
      price: "$120",
      rating: 4.9,
      reviews: 156,
      image: "/handwoven-silk-scarf-with-traditional-patterns.jpg",
      reason: "From artisans you follow",
    },
    {
      id: 4,
      name: "Reclaimed Wood Sculpture",
      artist: "Thomas Miller",
      location: "Portland, USA",
      price: "$89",
      rating: 4.7,
      reviews: 73,
      image: "/reclaimed-wood-bowl-with-natural-grain-patterns.jpg",
      reason: "Trending in your area",
    },
  ]

  const favorites = [
    {
      id: 1,
      name: "Handwoven Silk Scarf",
      artist: "Elena Rodriguez",
      price: "$145",
      image: "/handwoven-silk-scarf-with-traditional-patterns.jpg",
      inStock: true,
    },
    {
      id: 2,
      name: "Ceramic Tea Set",
      artist: "Kenji Tanaka",
      price: "$89",
      image: "/japanese-ceramic-tea-set-with-traditional-glazing.jpg",
      inStock: true,
    },
    {
      id: 3,
      name: "Sterling Silver Ring",
      artist: "Maya Patel",
      price: "$220",
      image: "/sterling-silver-ring-with-intricate-indian-design.jpg",
      inStock: false,
    },
  ]

  const orders = [
    {
      id: "#ORD-2024-001",
      date: "2024-01-15",
      status: "delivered",
      total: "$145",
      items: 1,
      artist: "Elena Rodriguez",
      product: "Handwoven Silk Scarf",
      image: "/handwoven-silk-scarf-with-traditional-patterns.jpg",
    },
    {
      id: "#ORD-2024-002",
      date: "2024-01-10",
      status: "shipped",
      total: "$89",
      items: 1,
      artist: "Kenji Tanaka",
      product: "Ceramic Tea Set",
      image: "/japanese-ceramic-tea-set-with-traditional-glazing.jpg",
    },
    {
      id: "#ORD-2024-003",
      date: "2024-01-05",
      status: "delivered",
      total: "$287",
      items: 2,
      artist: "Maya Patel",
      product: "Sterling Silver Ring + Earrings",
      image: "/sterling-silver-ring-with-intricate-indian-design.jpg",
    },
  ]

  const followedArtisans = [
    {
      name: "Elena Rodriguez",
      specialty: "Traditional Weaving",
      location: "Barcelona, Spain",
      followers: "2.3K",
      newProducts: 3,
      image: "/female-artisan-weaving-textiles-in-workshop.jpg",
    },
    {
      name: "Kenji Tanaka",
      specialty: "Japanese Ceramics",
      location: "Kyoto, Japan",
      followers: "1.9K",
      newProducts: 1,
      image: "/japanese-ceramic-artist-working-with-pottery-wheel.jpg",
    },
    {
      name: "Maya Patel",
      specialty: "Fine Jewelry",
      location: "Jaipur, India",
      followers: "3.1K",
      newProducts: 5,
      image: "/indian-jewelry-designer-crafting-silver-ornaments.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-amber-800">
                Loomis
              </Link>
              <Badge className="bg-teal-100 text-teal-800">Buyer Dashboard</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search artisans, products..." className="pl-10 w-64" />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  {favorites.length}
                </Badge>
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Sarah!</h1>
          <p className="text-gray-600">Discover new treasures from talented artisans around the world.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{favorites.length}</p>
              <p className="text-sm text-gray-600">Favorites</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              <p className="text-sm text-gray-600">Orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{followedArtisans.length}</p>
              <p className="text-sm text-gray-600">Following</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="h-6 w-6 text-amber-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Rewards Points</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Discover Tab */}
          <TabsContent value="discover" className="space-y-8">
            {/* Personalized Recommendations */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
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
                      >
                        <Heart className="h-4 w-4 text-gray-600" />
                      </Button>
                      {item.isOnSale && <Badge className="absolute top-3 left-3 bg-red-500 text-white">Sale</Badge>}
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2">
                        <Badge className="bg-teal-50 text-teal-700 text-xs mb-2">{item.reason}</Badge>
                      </div>
                      <h3 className="font-bold text-lg mb-1">{item.name}</h3>
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
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-teal-600">{item.price}</span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
                          )}
                        </div>
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recently Viewed */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recently Viewed</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {recommendations.slice(0, 3).map((item) => (
                  <Card key={`recent-${item.id}`} className="overflow-hidden hover:shadow-md transition-shadow">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-32 object-cover" />
                    <CardContent className="p-3">
                      <h4 className="font-medium text-sm mb-1 truncate">{item.name}</h4>
                      <p className="text-xs text-gray-600 mb-2">{item.artist}</p>
                      <p className="text-sm font-bold text-teal-600">{item.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Your Favorites</h2>
              <p className="text-gray-600">{favorites.length} items</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="relative">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-3 right-3 rounded-full bg-white text-red-500"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge className="bg-red-500 text-white">Out of Stock</Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">by {item.artist}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-teal-600">{item.price}</span>
                      <Button
                        size="sm"
                        disabled={!item.inStock}
                        className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        {item.inStock ? "Add to Cart" : "Notify Me"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
              <Button variant="outline">Download Receipt</Button>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{order.id}</h3>
                        <p className="text-gray-600 text-sm">Ordered on {order.date}</p>
                      </div>
                      <Badge
                        className={
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {order.status === "delivered" && <Package className="h-3 w-3 mr-1" />}
                        {order.status === "shipped" && <Truck className="h-3 w-3 mr-1" />}
                        {order.status === "processing" && <Clock className="h-3 w-3 mr-1" />}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-4">
                      <img
                        src={order.image || "/placeholder.svg"}
                        alt={order.product}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{order.product}</h4>
                        <p className="text-gray-600 text-sm">by {order.artist}</p>
                        <p className="text-sm text-gray-500">{order.items} item(s)</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{order.total}</p>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">
                            Track
                          </Button>
                          <Button variant="outline" size="sm">
                            Reorder
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Following Tab */}
          <TabsContent value="following" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Artisans You Follow</h2>
              <p className="text-gray-600">{followedArtisans.length} artisans</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {followedArtisans.map((artisan) => (
                <Card key={artisan.name} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={artisan.image || "/placeholder.svg"}
                      alt={artisan.name}
                      className="w-full h-48 object-cover"
                    />
                    {artisan.newProducts > 0 && (
                      <Badge className="absolute top-3 right-3 bg-amber-500 text-white">
                        {artisan.newProducts} new
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1">{artisan.name}</h3>
                    <p className="text-gray-600 text-sm mb-1">{artisan.specialty}</p>
                    <div className="flex items-center mb-3">
                      <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">{artisan.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{artisan.followers} followers</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Shop
                        </Button>
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                          Following
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>

            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="text-xl">SJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">Sarah Johnson</h3>
                    <p className="text-gray-600">sarah.johnson@email.com</p>
                    <p className="text-gray-600">Member since January 2024</p>
                  </div>
                  <Button variant="outline">Edit Profile</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Preferences</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Email notifications</span>
                        <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">SMS updates</span>
                        <Badge className="bg-gray-100 text-gray-800">Disabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Newsletter</span>
                        <Badge className="bg-green-100 text-green-800">Subscribed</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-teal-100 text-teal-800">Ceramics</Badge>
                      <Badge className="bg-teal-100 text-teal-800">Textiles</Badge>
                      <Badge className="bg-teal-100 text-teal-800">Jewelry</Badge>
                      <Badge className="bg-teal-100 text-teal-800">Woodwork</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
