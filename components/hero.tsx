"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"

export function Hero() {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 })
  }, [controls])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
          alt="Barbecue"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>
      <div className="container mx-auto px-4 z-10 text-white flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20 -mt-20" // Moved up and increased bottom margin
          >
            <Image src="/themeateriewhite.png" alt="The Meaterie" width={400} height={200} className="w-auto h-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-8" // Increased gap between buttons
          >
            <Button
              size="lg"
              className="bg-red-600 hover:bg-transparent hover:text-white border-2 border-red-600 transition-all"
              asChild
            >
              <a href="/menu">View Menu</a>
            </Button>
            <Button
              size="lg"
              className="bg-red-600 hover:bg-transparent hover:text-white border-2 border-red-600 transition-all"
              asChild
            >
              <a href="/order">Order Now</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
