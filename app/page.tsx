"use client"
import { Hero } from "@/components/hero"
import { FeaturedItems } from "@/components/featured-items"
import { AboutSection } from "@/components/about-section"
import { CTASection } from "@/components/cta-section"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <FeaturedItems />
      <AboutSection />
      <CTASection />
    </main>
  )
}
