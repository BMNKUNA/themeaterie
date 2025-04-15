"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { OrderSection } from "@/components/order-section"
import { PageHero } from "@/components/page-hero"

export default function OrderPage() {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 })
  }, [controls])

  return (
    <main className="flex min-h-screen flex-col pt-16">
      <PageHero
        title="How to Order"
        description="Quick and easy ordering for collection"
        image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
      />

      <motion.div initial={{ opacity: 0, y: 50 }} animate={controls} transition={{ duration: 0.5, delay: 0.2 }}>
        <OrderSection />
      </motion.div>
    </main>
  )
}
