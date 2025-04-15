"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface PageHeroProps {
  title: string
  description: string
  image: string
}

export function PageHero({ title, description, image }: PageHeroProps) {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover brightness-50" priority />
      </div>
      <div className="container mx-auto px-4 z-10 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{title}</h1>
          <p className="text-xl md:text-2xl">{description}</p>
        </motion.div>
      </div>
    </section>
  )
}
