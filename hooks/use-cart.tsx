"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type CartItem = {
  id: string
  name: string
  price: string
  size: string
  flavor: string
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string, size: string, flavor: string) => void
  updateQuantity: (id: string, size: string, flavor: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => string
  sendToWhatsApp: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on client side
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items])

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      // Check if item with same id, size and flavor already exists
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id && item.size === newItem.size && item.flavor === newItem.flavor,
      )

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += 1
        return updatedItems
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...newItem, quantity: 1 }]
      }
    })
  }

  const removeItem = (id: string, size: string, flavor: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.size === size && item.flavor === flavor)),
    )

    // If cart is empty after removal, clear localStorage
    if (items.length === 1) {
      localStorage.removeItem("cart")
    }
  }

  const updateQuantity = (id: string, size: string, flavor: string, quantity: number) => {
    if (quantity < 1) return

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size === size && item.flavor === flavor ? { ...item, quantity } : item,
      ),
    )
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem("cart")
  }

  const getTotal = () => {
    const total = items.reduce((sum, item) => {
      const priceValue = Number.parseFloat(item.price.replace(/[^0-9.]/g, ""))
      return sum + priceValue * item.quantity
    }, 0)

    return `R${total.toFixed(2)}`
  }

  const sendToWhatsApp = () => {
    if (items.length === 0) return

    const orderText = items
      .map((item) => `- ${item.quantity}x ${item.name}\n  Size: ${item.size} (${item.price})\n  Flavor: ${item.flavor}`)
      .join("\n\n")

    const message = `I'd like to place an order:\n\n${orderText}\n\nTotal: ${getTotal()}`
    window.open(`https://wa.me/+27616235271?text=${encodeURIComponent(message)}`, "_blank")

    // Optionally clear cart after sending
    // clearCart()
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        sendToWhatsApp,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
