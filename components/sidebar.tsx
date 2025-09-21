"use client"
import { X, Heart, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  type: "favorites" | "cart"
  favorites: string[]
  cart: { id: string; quantity: number }[]
  onToggleFavorite: (productId: string) => void
  onUpdateCartQuantity: (productId: string, quantity: number) => void
  onRemoveFromCart: (productId: string) => void
}

const products = [
  {
    id: "handwoven-silk-scarf",
    name: "Handwoven Silk Scarf",
    artist: "Elena Rodriguez",
    location: "Barcelona, Spain",
    price: 145,
    image: "/handwoven-silk-scarf-with-traditional-patterns.jpg",
  },
  {
    id: "ceramic-tea-set",
    name: "Ceramic Tea Set",
    artist: "Kenji Tanaka",
    location: "Kyoto, Japan",
    price: 89,
    image: "/japanese-ceramic-tea-set-with-traditional-glazing.jpg",
  },
  {
    id: "sterling-silver-ring",
    name: "Sterling Silver Ring",
    artist: "Maya Patel",
    location: "Jaipur, India",
    price: 220,
    image: "/sterling-silver-ring-with-intricate-indian-design.jpg",
  },
  {
    id: "reclaimed-wood-bowl",
    name: "Reclaimed Wood Bowl",
    artist: "Thomas Miller",
    location: "Portland, USA",
    price: 67,
    image: "/reclaimed-wood-bowl-with-natural-grain-patterns.jpg",
  },
]

export default function Sidebar({
  isOpen,
  onClose,
  type,
  favorites,
  cart,
  onToggleFavorite,
  onUpdateCartQuantity,
  onRemoveFromCart,
}: SidebarProps) {
  const favoriteProducts = products.filter((product) => favorites.includes(product.id))
  const cartProducts = cart.map((cartItem) => ({
    ...products.find((product) => product.id === cartItem.id)!,
    quantity: cartItem.quantity,
  }))

  const cartTotal = cartProducts.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              {type === "favorites" ? (
                <>
                  <Heart className="h-5 w-5 text-red-500" />
                  Favorites ({favorites.length})
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5 text-teal-600" />
                  Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
                </>
              )}
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {type === "favorites" ? (
              <>
                {favoriteProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No favorites yet</p>
                    <p className="text-sm text-gray-400">Start exploring to add items you love!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {favoriteProducts.map((product) => (
                      <Card key={product.id} className="overflow-hidden">
                        <CardContent className="p-3">
                          <div className="flex gap-3">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate">{product.name}</h4>
                              <p className="text-xs text-gray-500 truncate">by {product.artist}</p>
                              <p className="text-sm font-semibold text-amber-700">${product.price}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => onToggleFavorite(product.id)}
                            >
                              <Heart className="h-4 w-4 fill-current" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                {cartProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                    <p className="text-sm text-gray-400">Add some beautiful crafts to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartProducts.map((product) => (
                      <Card key={product.id} className="overflow-hidden">
                        <CardContent className="p-3">
                          <div className="flex gap-3">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate">{product.name}</h4>
                              <p className="text-xs text-gray-500 truncate">by {product.artist}</p>
                              <p className="text-sm font-semibold text-amber-700">${product.price}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-6 w-6 bg-transparent"
                                  onClick={() => onUpdateCartQuantity(product.id, Math.max(1, product.quantity - 1))}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="text-sm font-medium w-8 text-center">{product.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-6 w-6 bg-transparent"
                                  onClick={() => onUpdateCartQuantity(product.id, product.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => onRemoveFromCart(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          {type === "cart" && cartProducts.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total:</span>
                <span className="text-xl font-bold text-amber-700">${cartTotal.toFixed(2)}</span>
              </div>
              <Button className="w-full bg-teal-600 hover:bg-teal-700">Proceed to Checkout</Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
