"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { LocationSection } from "@/components/location-section"
import { PageHero } from "@/components/page-hero"

export default function LocationPage() {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 })
  }, [controls])

  return (
    <main className="flex min-h-screen flex-col pt-16">
      <PageHero
        title="Find Us"
        description="Visit us in the heart of Soweto"
        image="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
      />

      <motion.div initial={{ opacity: 0, y: 50 }} animate={controls} transition={{ duration: 0.5, delay: 0.2 }}>
        <LocationSection />
      </motion.div>
    </main>
  )
}
