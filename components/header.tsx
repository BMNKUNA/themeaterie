"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X, Flame } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
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
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
    open: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
  }

  const menuItemVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.4,
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
    { name: "Loyalty Program", path: "#", comingSoon: true },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/40 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="z-50 relative">
          {!isMenuOpen && (
            <Image src="/themeateriewhite.png" alt="The Meaterie" width={220} height={110} className="h-20 w-auto" />
          )}
        </Link>

        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="z-50 relative flex items-center justify-center"
          aria-label="Toggle menu"
          variants={flameAnimation}
          animate="animate"
        >
          {isMenuOpen ? <X className="h-8 w-8 text-black" /> : <Flame className="h-8 w-8 text-red-500" />}
        </motion.button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed md:absolute md:top-0 md:right-0 md:w-96 md:h-auto inset-0 bg-white/95 backdrop-blur-sm z-40"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <div className="container mx-auto px-4 py-20 md:py-10 flex flex-col items-center justify-center h-full">
                <div className="mb-12 md:mb-6">
                  <Image
                    src="/themeateriewhite.png"
                    alt="The Meaterie"
                    width={220}
                    height={110}
                    className="h-20 w-auto"
                  />
                </div>
                <nav className="flex flex-col items-center space-y-8 md:space-y-4 text-3xl md:text-xl font-light w-full max-w-md">
                  {menuItems.map((item, i) => (
                    <motion.div
                      key={item.name}
                      custom={i}
                      variants={menuItemVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="w-full text-center"
                    >
                      <Link
                        href={item.path}
                        className={`hover:text-red-600 transition-colors relative block py-2 ${
                          pathname === item.path ? "text-red-600" : ""
                        }`}
                      >
                        {item.name}
                        {item.comingSoon && (
                          <span className="absolute top-0 -right-16 text-xs bg-red-600 text-white px-2 py-1 rounded-full">
                            Coming Soon
                          </span>
                        )}
                      </Link>
                      <div className="h-px w-full bg-gray-100 mt-2"></div>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
