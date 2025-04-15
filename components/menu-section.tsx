"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"

type MenuItem = {
  id: string
  name: string
  description: string
  prices: { size: string; price: string }[]
  flavors: string[]
  image: string
}

const menuItems: MenuItem[] = [
  {
    id: "chicken",
    name: "Chicken",
    description: "Tender, juicy chicken grilled to perfection",
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
    id: "ribs",
    name: "BBQ Ribs",
    description: "Succulent ribs with our signature BBQ sauce",
    prices: [
      { size: "Small", price: "R30" },
      { size: "Large", price: "R60" },
    ],
    flavors: ["Lemon & Herbs", "Mild", "Hot"],
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
  },
  {
    id: "steak",
    name: "Steak",
    description: "Premium cuts of beef grilled to your preference",
    prices: [
      { size: "Small", price: "R30" },
      { size: "Medium", price: "R60" },
      { size: "Large", price: "R120" },
    ],
    flavors: ["Lemon & Herbs", "Mild", "Hot"],
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "boerewors",
    name: "Boerewors",
    description: "Traditional South African sausage with our special spice blend",
    prices: [
      { size: "Regular", price: "R40" },
      { size: "Large", price: "R75" },
    ],
    flavors: ["Traditional", "Spicy"],
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: "lamb-chops",
    name: "Lamb Chops",
    description: "Tender lamb chops marinated in our special herbs and spices",
    prices: [
      { size: "Small (4 pieces)", price: "R80" },
      { size: "Large (8 pieces)", price: "R150" },
    ],
    flavors: ["Lemon & Herbs", "Mild", "Hot"],
    image:
      "https://images.unsplash.com/photo-1608500218890-c4f9019eef7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "pap-and-sauce",
    name: "Pap and Sauce",
    description: "Traditional South African maize porridge with our signature chakalaka sauce",
    prices: [
      { size: "Small", price: "R20" },
      { size: "Large", price: "R35" },
    ],
    flavors: ["Mild", "Spicy"],
    image:
      "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "combo-platter",
    name: "Combo Platter",
    description: "A selection of our best meats with sides",
    prices: [
      { size: "Small (2-3 people)", price: "R180" },
      { size: "Large (4-6 people)", price: "R320" },
    ],
    flavors: ["Mixed"],
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  },
]

export function MenuSection() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedFlavor, setSelectedFlavor] = useState<string>("")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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

  const handleOrderClick = (item: MenuItem) => {
    const size = selectedSize || item.prices[0].size
    const flavor = selectedFlavor || item.flavors[0]
    const price = item.prices.find((p) => p.size === size)?.price || item.prices[0].price

    const message = `I'd like to order:\n- ${item.name}\n- Size: ${size} (${price})\n- Flavor: ${flavor}`
    window.open(`https://wa.me/+27123456789?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group"
              onClick={() => {
                setSelectedItem(item)
                setSelectedSize(item.prices[0].size)
                setSelectedFlavor(item.flavors[0])
              }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                <p className="opacity-90 mb-2">{item.description}</p>
                <p className="text-sm">From {item.prices[0].price} • Tap to order</p>
              </div>
            </motion.div>
          ))}
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
              className="bg-white rounded-lg max-w-2xl w-full overflow-hidden"
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
                <p className="text-gray-600 mb-4">{selectedItem.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-2">Select Size & Price</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedItem.prices.map((price) => (
                      <div
                        key={price.size}
                        className={`flex justify-between border p-2 rounded cursor-pointer transition-all ${
                          selectedSize === price.size
                            ? "border-red-600 bg-red-50"
                            : "border-gray-200 hover:border-red-300"
                        }`}
                        onClick={() => setSelectedSize(price.size)}
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
                          selectedFlavor === flavor ? "bg-red-600 text-white" : "bg-gray-100 hover:bg-gray-200"
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

                <button
                  className="w-full py-3 bg-red-600 hover:bg-transparent hover:text-red-600 border-2 border-red-600 text-white rounded-lg font-medium transition-all"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleOrderClick(selectedItem)
                  }}
                >
                  Order via WhatsApp
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
