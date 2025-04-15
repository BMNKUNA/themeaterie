"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { ShoppingCart, Check } from "lucide-react"

const featuredItems = [
  {
    id: "chicken-quarter",
    name: "Chicken Quarter",
    description: "Tender, juicy chicken grilled to perfection",
    price: "From R25",
    prices: [
      { size: "Quarter", price: "R25" },
      { size: "Half", price: "R50" },
      { size: "Full", price: "R100" },
    ],
    flavors: ["Lemon & Herbs", "Mild", "Hot"],
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
  },
  {
    id: "chicken-wings",
    name: "Chicken Wings",
    description: "Crispy, flavorful wings with our signature sauce",
    price: "From R45",
    prices: [
      { size: "6 Pieces", price: "R45" },
      { size: "12 Pieces", price: "R85" },
      { size: "24 Pieces", price: "R160" },
    ],
    flavors: ["BBQ", "Peri-Peri", "Lemon & Herbs"],
    image:
      "https://images.unsplash.com/photo-1527477396000-e27163b481c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "ribs",
    name: "BBQ Ribs",
    description: "Succulent ribs with our signature BBQ sauce",
    price: "From R30",
    prices: [
      { size: "Small", price: "R30" },
      { size: "Large", price: "R60" },
    ],
    flavors: ["Lemon & Herbs", "Mild", "Hot"],
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
  },
]

export function FeaturedItems() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedFlavor, setSelectedFlavor] = useState("")
  const [addedToCart, setAddedToCart] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { addItem } = useCart()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  }

  const handleAddToCart = (item) => {
    const size = selectedSize || item.prices[0].size
    const flavor = selectedFlavor || item.flavors[0]
    const price = item.prices.find((p) => p.size === size)?.price || item.prices[0].price

    addItem({
      id: item.id,
      name: item.name,
      price,
      size,
      flavor,
    })

    setAddedToCart(true)

    // Reset after 2 seconds
    setTimeout(() => {
      setAddedToCart(false)
    }, 2000)
  }

  const handleOrderClick = (item) => {
    const size = selectedSize || item.prices[0].size
    const flavor = selectedFlavor || item.flavors[0]
    const price = item.prices.find((p) => p.size === size)?.price || item.prices[0].price

    const message = `I'd like to order:\n- ${item.name}\n- Size: ${size} (${price})\n- Flavor: ${flavor}`
    window.open(`https://wa.me/+27616235271?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-4">
            Featured Menu Items
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our most popular braai selections, made with authentic Soweto flavors
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {featuredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => {
                setSelectedItem(item)
                setSelectedSize(item.prices[0].size)
                setSelectedFlavor(item.flavors[0])
                setAddedToCart(false)
              }}
            >
              <div className="relative h-64">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-white">{item.name}</h3>
                <p className="text-gray-300 mb-4">{item.description}</p>
                <p className="text-red-500 font-semibold mb-4">{item.price}</p>
                <Button
                  className="w-full bg-red-600 hover:bg-transparent hover:text-red-500 border-2 border-red-600 transition-all"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedItem(item)
                    setSelectedSize(item.prices[0].size)
                    setSelectedFlavor(item.flavors[0])
                    setAddedToCart(false)
                  }}
                >
                  View Options
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-12 text-center"
        >
          <Button
            size="lg"
            className="bg-red-600 hover:bg-transparent hover:text-red-500 border-2 border-red-600 transition-all"
            asChild
          >
            <Link href="/menu">View Full Menu</Link>
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-gray-900 rounded-lg max-w-2xl w-full overflow-hidden text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64">
                <Image
                  src={selectedItem.image || "/placeholder.svg"}
                  alt={selectedItem.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-3xl font-bold mb-2">{selectedItem.name}</h3>
                <p className="text-gray-300 mb-4">{selectedItem.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-2">Select Size & Price</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedItem.prices.map((price) => (
                      <div
                        key={price.size}
                        className={`flex justify-between border p-2 rounded cursor-pointer transition-all ${
                          selectedSize === price.size
                            ? "border-red-600 bg-red-900/30"
                            : "border-gray-700 hover:border-red-700"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedSize(price.size)
                        }}
                      >
                        <span>{price.size}</span>
                        <span className="font-bold">{price.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-2">Select Flavor</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.flavors.map((flavor) => (
                      <span
                        key={flavor}
                        className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-all ${
                          selectedFlavor === flavor ? "bg-red-600 text-white" : "bg-gray-800 hover:bg-gray-700"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedFlavor(flavor)
                        }}
                      >
                        {flavor}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    className={`flex-1 py-3 ${
                      addedToCart
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-transparent hover:text-red-500 border-2 border-red-600"
                    } text-white rounded-lg font-medium transition-all flex items-center justify-center`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToCart(selectedItem)
                    }}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="mr-2 h-5 w-5" /> Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                      </>
                    )}
                  </button>

                  <button
                    className="flex-1 py-3 bg-green-600 hover:bg-transparent hover:text-green-500 border-2 border-green-600 text-white rounded-lg font-medium transition-all"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOrderClick(selectedItem)
                    }}
                  >
                    Order via WhatsApp
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
