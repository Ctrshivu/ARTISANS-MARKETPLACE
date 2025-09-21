"use client"

import { useState } from "react"
import {
  BarChart3,
  Package,
  Users,
  Heart,
  TrendingUp,
  Plus,
  Edit,
  Eye,
  Star,
  ShoppingCart,
  MessageCircle,
  Settings,
  Bell,
  Search,
  Filter,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for the dashboard
  const stats = {
    totalProducts: 23,
    totalSales: 1247,
    followers: 2347,
    revenue: 15420,
  }

  const recentOrders = [
    {
      id: "#ORD-001",
      customer: "Sarah Johnson",
      product: "Handwoven Silk Scarf",
      amount: "$145",
      status: "completed",
      date: "2 hours ago",
    },
    {
      id: "#ORD-002",
      customer: "Michael Chen",
      product: "Ceramic Tea Set",
      amount: "$89",
      status: "processing",
      date: "5 hours ago",
    },
    {
      id: "#ORD-003",
      customer: "Emma Wilson",
      product: "Sterling Silver Ring",
      amount: "$220",
      status: "shipped",
      date: "1 day ago",
    },
    {
      id: "#ORD-004",
      customer: "David Brown",
      product: "Reclaimed Wood Bowl",
      amount: "$67",
      status: "completed",
      date: "2 days ago",
    },
  ]

  const products = [
    {
      id: 1,
      name: "Handwoven Silk Scarf",
      price: "$145",
      stock: 8,
      views: 234,
      likes: 45,
      sales: 12,
      image: "/handwoven-silk-scarf-with-traditional-patterns.jpg",
      status: "active",
    },
    {
      id: 2,
      name: "Traditional Ceramic Vase",
      price: "$89",
      stock: 3,
      views: 189,
      likes: 32,
      sales: 8,
      image: "/ceramic-vase.png",
      status: "active",
    },
    {
      id: 3,
      name: "Woven Basket Set",
      price: "$67",
      stock: 0,
      views: 156,
      likes: 28,
      sales: 15,
      image: "/woven-basket.png",
      status: "out_of_stock",
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
              <Badge className="bg-amber-100 text-amber-800">Seller Dashboard</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/female-artisan-weaving-textiles-in-workshop.jpg" />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Elena!</h1>
          <p className="text-gray-600">Here's what's happening with your artisan business today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Package className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">+12%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Sales</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalSales}</p>
                </div>
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-teal-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">+8%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Followers</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.followers.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">+15%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">${stats.revenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">+22%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Recent Orders
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{order.id}</span>
                            <Badge
                              className={
                                order.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "processing"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : order.status === "shipped"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-gray-100 text-gray-800"
                              }
                            >
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{order.customer}</p>
                          <p className="text-sm font-medium">{order.product}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-bold text-amber-600">{order.amount}</span>
                            <span className="text-xs text-gray-500">{order.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start bg-amber-600 hover:bg-amber-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Product
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Edit className="h-4 w-4 mr-2" />
                    Update Profile Story
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Customer Messages
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Your Products</h2>
              <Button className="bg-amber-600 hover:bg-amber-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search products..." className="pl-10" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <Badge
                      className={`absolute top-3 right-3 ${
                        product.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status === "active" ? "Active" : "Out of Stock"}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-amber-600">{product.price}</span>
                      <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                      <div>
                        <div className="flex items-center justify-center mb-1">
                          <Eye className="h-4 w-4 text-gray-400" />
                        </div>
                        <span className="text-sm font-medium">{product.views}</span>
                        <p className="text-xs text-gray-500">Views</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-center mb-1">
                          <Heart className="h-4 w-4 text-red-400" />
                        </div>
                        <span className="text-sm font-medium">{product.likes}</span>
                        <p className="text-xs text-gray-500">Likes</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-center mb-1">
                          <ShoppingCart className="h-4 w-4 text-green-400" />
                        </div>
                        <span className="text-sm font-medium">{product.sales}</span>
                        <p className="text-xs text-gray-500">Sales</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
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
              <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
              <div className="flex gap-2">
                <Button variant="outline">Export</Button>
                <Button variant="outline">Filter</Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.product}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-600">
                            {order.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              className={
                                order.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "processing"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : order.status === "shipped"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-gray-100 text-gray-800"
                              }
                            >
                              {order.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics & Insights</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Sales chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.slice(0, 3).map((product, index) => (
                      <div key={product.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="w-6 h-6 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          <span className="font-medium">{product.name}</span>
                        </div>
                        <span className="text-sm text-gray-500">{product.sales} sales</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Artisan Profile</h2>

            <Card>
              <CardHeader>
                <CardTitle>Your Story</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/female-artisan-weaving-textiles-in-workshop.jpg" />
                    <AvatarFallback>ER</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">Elena Rodriguez</h3>
                    <p className="text-gray-600">Master Weaver • Barcelona, Spain</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm">4.9 (234 reviews)</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm">2,347 followers</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">About Your Craft</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Master weaver with 25 years of experience creating luxury textiles using traditional Spanish
                    techniques passed down through generations. Each piece tells a story of heritage, passion, and
                    meticulous craftsmanship.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-amber-100 text-amber-800">Traditional Weaving</Badge>
                    <Badge className="bg-amber-100 text-amber-800">Silk Textiles</Badge>
                    <Badge className="bg-amber-100 text-amber-800">Spanish Heritage</Badge>
                    <Badge className="bg-amber-100 text-amber-800">Custom Designs</Badge>
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
