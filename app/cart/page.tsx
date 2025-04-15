"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CartPage() {
  const controls = useAnimation()
  const { items, removeItem, updateQuantity, getTotal, sendToWhatsApp, clearCart } = useCart()

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 })
  }, [controls])

  return (
    <main className="flex min-h-screen flex-col pt-28 pb-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8">Your Cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-16 bg-gray-900 rounded-lg">
              <ShoppingBag className="mx-auto h-16 w-16 text-gray-500 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-400 mb-6">Looks like you haven't added any items to your cart yet.</p>
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href="/menu">Browse Menu</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="bg-gray-900 rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="divide-y divide-gray-800">
                  {items.map((item, index) => (
                    <div key={`${item.id}-${item.size}-${item.flavor}-${index}`} className="p-4 flex items-center">
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-400">
                          Size: {item.size} | Flavor: {item.flavor}
                        </p>
                        <p className="text-red-500 font-medium">{item.price}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.flavor, item.quantity - 1)}
                          className="p-1 rounded-full bg-gray-800 hover:bg-gray-700"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <span className="w-8 text-center">{item.quantity}</span>

                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.flavor, item.quantity + 1)}
                          className="p-1 rounded-full bg-gray-800 hover:bg-gray-700"
                        >
                          <Plus className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => removeItem(item.id, item.size, item.flavor)}
                          className="p-1 ml-2 text-red-500 hover:text-red-400"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg shadow-sm p-6 mb-8">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-xl">{getTotal()}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={sendToWhatsApp} className="flex-1 bg-green-600 hover:bg-green-700">
                    Order via WhatsApp
                  </Button>

                  <Button
                    onClick={clearCart}
                    variant="outline"
                    className="flex-1 border-red-600 text-red-500 hover:bg-red-900/30"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <Link href="/menu" className="text-red-500 hover:text-red-400 font-medium">
                  Continue Shopping
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </main>
  )
}
