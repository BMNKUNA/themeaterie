"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"

export function Loading() {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 })
  }, [controls])

  const dotVariants = {
    initial: { opacity: 0.3, y: 0 },
    animate: (i: number) => ({
      opacity: [0.3, 1, 0.3],
      y: [0, -5, 0],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 1.5,
        delay: i * 0.2,
      },
    }),
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-12 -mt-20"
      >
        <Image src="/themeateriewhite.png" alt="The Meaterie" width={400} height={200} className="w-auto h-auto" />
      </motion.div>

      <div className="flex space-x-3 mt-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            custom={i}
            variants={dotVariants}
            initial="initial"
            animate="animate"
            className="w-3 h-3 bg-red-600 rounded-full"
          />
        ))}
      </div>
    </div>
  )
}
