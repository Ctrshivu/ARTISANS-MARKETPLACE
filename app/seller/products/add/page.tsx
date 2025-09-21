"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Upload, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    story: "",
    category: "",
    subcategory: "",
    price: "",
    compareAtPrice: "",
    costPerItem: "",
    sku: "",
    barcode: "",
    trackQuantity: true,
    quantity: "",
    allowBackorders: false,
    weight: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    materials: [] as string[],
    tags: [] as string[],
    seoTitle: "",
    seoDescription: "",
    isActive: true,
    isFeatured: false,
  })

  const [images, setImages] = useState<string[]>([])
  const [currentMaterial, setCurrentMaterial] = useState("")
  const [currentTag, setCurrentTag] = useState("")

  const categories = ["Ceramics", "Textiles", "Jewelry", "Woodwork", "Metalwork", "Glasswork", "Leather", "Sculpture"]

  const subcategories = {
    Ceramics: ["Pottery", "Vases", "Bowls", "Plates", "Decorative"],
    Textiles: ["Scarves", "Blankets", "Wall Hangings", "Clothing", "Bags"],
    Jewelry: ["Necklaces", "Rings", "Earrings", "Bracelets", "Brooches"],
    Woodwork: ["Furniture", "Bowls", "Sculptures", "Utensils", "Decorative"],
    Metalwork: ["Sculptures", "Jewelry", "Utensils", "Decorative", "Tools"],
    Glasswork: ["Vases", "Bowls", "Decorative", "Lighting", "Jewelry"],
    Leather: ["Bags", "Wallets", "Belts", "Accessories", "Clothing"],
    Sculpture: ["Abstract", "Figurative", "Modern", "Traditional", "Mixed Media"],
  }

  const handleInputChange = (field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const addMaterial = () => {
    if (currentMaterial.trim() && !formData.materials.includes(currentMaterial.trim())) {
      setFormData((prev) => ({
        ...prev,
        materials: [...prev.materials, currentMaterial.trim()],
      }))
      setCurrentMaterial("")
    }
  }

  const removeMaterial = (material: string) => {
    setFormData((prev) => ({
      ...prev,
      materials: prev.materials.filter((m) => m !== material),
    }))
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  const handleImageUpload = () => {
    // Mock image upload - in real app would handle file upload
    const mockImageUrl = `/placeholder.svg?key=${Math.random().toString(36).substr(2, 9)}`
    setImages((prev) => [...prev, mockImageUrl])
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Product data:", { ...formData, images })
    // Handle form submission
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/seller/dashboard" className="flex items-center text-amber-800 hover:text-amber-900">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Save as Draft</Button>
              <Button onClick={handleSubmit} className="bg-amber-600 hover:bg-amber-700">
                Publish Product
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your product's features, materials, and craftsmanship"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="story">Artisan Story</Label>
                  <Textarea
                    id="story"
                    placeholder="Share the story behind this piece - your inspiration, process, or cultural significance"
                    rows={3}
                    value={formData.story}
                    onChange={(e) => handleInputChange("story", e.target.value)}
                  />
                  <p className="text-sm text-gray-500">
                    This helps customers connect with your craft and understand its value
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Product ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      {index === 0 && (
                        <Badge className="absolute bottom-2 left-2 bg-amber-600 text-white text-xs">Main</Badge>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="h-32 border-dashed border-2 flex flex-col items-center justify-center bg-transparent"
                    onClick={handleImageUpload}
                  >
                    <Upload className="h-6 w-6 mb-2" />
                    <span className="text-sm">Add Image</span>
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  Add up to 10 images. The first image will be your main product photo.
                </p>
              </CardContent>
            </Card>

            {/* Materials and Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Materials & Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Materials Used</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., Silk, Cotton, Silver"
                      value={currentMaterial}
                      onChange={(e) => setCurrentMaterial(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addMaterial())}
                    />
                    <Button type="button" onClick={addMaterial}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.materials.map((material) => (
                      <Badge key={material} className="bg-amber-100 text-amber-800">
                        {material}
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="h-4 w-4 ml-1 hover:bg-amber-200"
                          onClick={() => removeMaterial(material)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., handmade, vintage, eco-friendly"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} className="bg-teal-100 text-teal-800">
                        {tag}
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="h-4 w-4 ml-1 hover:bg-teal-200"
                          onClick={() => removeTag(tag)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (grams)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="0"
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Dimensions (cm)</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="length" className="text-sm">
                        Length
                      </Label>
                      <Input
                        id="length"
                        type="number"
                        placeholder="0"
                        value={formData.dimensions.length}
                        onChange={(e) => handleInputChange("dimensions.length", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="width" className="text-sm">
                        Width
                      </Label>
                      <Input
                        id="width"
                        type="number"
                        placeholder="0"
                        value={formData.dimensions.width}
                        onChange={(e) => handleInputChange("dimensions.width", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="height" className="text-sm">
                        Height
                      </Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="0"
                        value={formData.dimensions.height}
                        onChange={(e) => handleInputChange("dimensions.height", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Product Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isActive">Active</Label>
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="isFeatured">Featured</Label>
                  <Switch
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => handleInputChange("isFeatured", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Category */}
            <Card>
              <CardHeader>
                <CardTitle>Category</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.category && (
                  <div className="space-y-2">
                    <Label>Subcategory</Label>
                    <Select
                      value={formData.subcategory}
                      onValueChange={(value) => handleInputChange("subcategory", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        {subcategories[formData.category as keyof typeof subcategories]?.map((subcategory) => (
                          <SelectItem key={subcategory} value={subcategory}>
                            {subcategory}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="pl-8"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="compareAtPrice">Compare at Price</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="compareAtPrice"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="pl-8"
                      value={formData.compareAtPrice}
                      onChange={(e) => handleInputChange("compareAtPrice", e.target.value)}
                    />
                  </div>
                  <p className="text-sm text-gray-500">Show customers the original price</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="costPerItem">Cost per Item</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="costPerItem"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="pl-8"
                      value={formData.costPerItem}
                      onChange={(e) => handleInputChange("costPerItem", e.target.value)}
                    />
                  </div>
                  <p className="text-sm text-gray-500">For profit tracking (not shown to customers)</p>
                </div>
              </CardContent>
            </Card>

            {/* Inventory */}
            <Card>
              <CardHeader>
                <CardTitle>Inventory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    placeholder="e.g., SCARF-001"
                    value={formData.sku}
                    onChange={(e) => handleInputChange("sku", e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="trackQuantity">Track Quantity</Label>
                  <Switch
                    id="trackQuantity"
                    checked={formData.trackQuantity}
                    onCheckedChange={(checked) => handleInputChange("trackQuantity", checked)}
                  />
                </div>

                {formData.trackQuantity && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="0"
                        value={formData.quantity}
                        onChange={(e) => handleInputChange("quantity", e.target.value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="allowBackorders">Allow Backorders</Label>
                      <Switch
                        id="allowBackorders"
                        checked={formData.allowBackorders}
                        onCheckedChange={(checked) => handleInputChange("allowBackorders", checked)}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  )
}
