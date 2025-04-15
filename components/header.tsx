"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X, Flame, ShoppingCart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/hooks/use-cart"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { items } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
    open: {
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
  }

  const menuItemVariants = {
    closed: { opacity: 0, y: 10 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 + i * 0.05,
        duration: 0.3,
      },
    }),
  }

  const flameAnimation = {
    animate: {
      filter: [
        "drop-shadow(0 0 8px #ff4d4d) drop-shadow(0 0 12px #ff4d4d)",
        "drop-shadow(0 0 4px #ff4d4d) drop-shadow(0 0 8px #ff4d4d)",
      ],
      scale: [1, 1.1, 1],
      transition: {
        filter: {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse" as const,
          duration: 1.5,
        },
        scale: {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse" as const,
          duration: 2,
        },
      },
    },
  }

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Order", path: "/order" },
    { name: "Location", path: "/location" },
    { name: "Catering", path: "#", comingSoon: true },
    { name: "Events", path: "#", comingSoon: true },
    { name: "Loyalty", path: "#", comingSoon: true },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/20 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="z-50 relative">
          <Image src="/themeateriewhite.png" alt="The Meaterie" width={220} height={110} className="h-20 w-auto" />
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative z-50">
            <ShoppingCart className="h-6 w-6 text-white" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>

          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="z-50 relative flex items-center justify-center"
            aria-label="Toggle menu"
            variants={flameAnimation}
            animate="animate"
          >
            {isMenuOpen ? <X className="h-8 w-8 text-white" /> : <Flame className="h-8 w-8 text-red-500" />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="absolute top-0 left-0 right-0 h-20 bg-transparent z-40 flex items-center justify-center"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <nav className="flex items-center justify-center space-x-6 px-4">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    custom={i}
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="relative"
                  >
                    <Link
                      href={item.path}
                      className={`text-sm md:text-base hover:text-red-600 transition-colors relative block py-2 ${
                        pathname === item.path ? "text-red-600" : "text-white"
                      }`}
                    >
                      {item.name}
                      {item.comingSoon && (
                        <span className="absolute -top-2 -right-2 text-[10px] bg-red-600 text-white px-1 py-0.5 rounded-full">
                          Soon
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
