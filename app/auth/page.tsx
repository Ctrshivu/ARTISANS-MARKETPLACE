"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, User, Palette, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function AuthPage() {
  const [userType, setUserType] = useState<"buyer" | "seller" | null>(null)
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    businessName: "",
    location: "",
    specialty: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle authentication logic here
    console.log("Auth submission:", { userType, authMode, formData })
  }

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center text-amber-800 hover:text-amber-900 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Loomis
            </Link>
            <h1 className="text-3xl font-bold text-amber-900 mb-2">Welcome to Loomis</h1>
            <p className="text-gray-600">Choose how you'd like to join our community</p>
          </div>

          <div className="space-y-4">
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-teal-300"
              onClick={() => setUserType("buyer")}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">I'm a Buyer</h3>
                <p className="text-gray-600 text-sm">
                  Discover and purchase unique handcrafted items from talented artisans worldwide
                </p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-amber-300"
              onClick={() => setUserType("seller")}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">I'm an Artisan</h3>
                <p className="text-gray-600 text-sm">
                  Share your craft, tell your story, and connect with customers who appreciate authentic artistry
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <button
            onClick={() => setUserType(null)}
            className="inline-flex items-center text-amber-800 hover:text-amber-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Change account type
          </button>
          <div className="flex items-center justify-center mb-4">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                userType === "buyer" ? "bg-teal-100" : "bg-amber-100"
              }`}
            >
              {userType === "buyer" ? (
                <User className={`h-6 w-6 ${userType === "buyer" ? "text-teal-600" : "text-amber-600"}`} />
              ) : (
                <Palette className={`h-6 w-6 ${userType === "buyer" ? "text-teal-600" : "text-amber-600"}`} />
              )}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {userType === "buyer" ? "Buyer Account" : "Artisan Account"}
          </h1>
          <p className="text-gray-600 text-sm">
            {userType === "buyer" ? "Join our community of craft enthusiasts" : "Share your artistry with the world"}
          </p>
        </div>

        <Card>
          <CardHeader>
            <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as "signin" | "signup")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === "signup" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      required
                    />
                  </div>

                  {userType === "seller" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business/Studio Name</Label>
                        <Input
                          id="businessName"
                          type="text"
                          placeholder="Your workshop or business name"
                          value={formData.businessName}
                          onChange={(e) => handleInputChange("businessName", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          type="text"
                          placeholder="City, Country"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="specialty">Craft Specialty</Label>
                        <Input
                          id="specialty"
                          type="text"
                          placeholder="e.g., Ceramics, Textiles, Jewelry"
                          value={formData.specialty}
                          onChange={(e) => handleInputChange("specialty", e.target.value)}
                          required
                        />
                      </div>
                    </>
                  )}
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {authMode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                  />
                </div>
              )}

              <Button
                type="submit"
                className={`w-full ${
                  userType === "buyer" ? "bg-teal-600 hover:bg-teal-700" : "bg-amber-600 hover:bg-amber-700"
                }`}
              >
                {authMode === "signin" ? "Sign In" : "Create Account"}
              </Button>

              {authMode === "signin" && (
                <div className="text-center">
                  <Button variant="link" className="text-sm text-gray-600">
                    Forgot your password?
                  </Button>
                </div>
              )}
            </form>

            {authMode === "signup" && userType === "seller" && (
              <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                <h4 className="font-semibold text-amber-800 mb-2">Artisan Benefits</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Create your personalized artisan profile</li>
                  <li>• Share your craft story and process</li>
                  <li>• Manage your product listings</li>
                  <li>• Connect directly with customers</li>
                  <li>• Access sales analytics and insights</li>
                </ul>
              </div>
            )}

            {authMode === "signup" && userType === "buyer" && (
              <div className="mt-6 p-4 bg-teal-50 rounded-lg">
                <h4 className="font-semibold text-teal-800 mb-2">Buyer Benefits</h4>
                <ul className="text-sm text-teal-700 space-y-1">
                  <li>• Save your favorite items and artisans</li>
                  <li>• Get personalized recommendations</li>
                  <li>• Track your order history</li>
                  <li>• Follow artisan stories and updates</li>
                  <li>• Early access to new collections</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            By continuing, you agree to our{" "}
            <Link href="#" className="text-amber-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-amber-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
