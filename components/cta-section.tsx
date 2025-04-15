"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"

export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20 bg-red-600 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Experience Authentic Soweto Braai?</h2>
          <p className="text-xl mb-8">Order now for collection and enjoy the best braied kasi meat in Soweto.</p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Button
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all"
              asChild
            >
              <Link href="/menu">View Menu</Link>
            </Button>
            <Button
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all"
              asChild
            >
              <Link href="/order">Order Now</Link>
            </Button>
            <Button
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all"
              asChild
            >
              <Link href="/location">Find Us</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
