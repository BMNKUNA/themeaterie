"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MapPin, Clock, Phone } from "lucide-react"

export function LocationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const mapVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Visit Us</h2>
            <p className="text-xl text-gray-600">Come experience the authentic taste of Soweto at our location</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Our Address</h3>
                      <p className="text-gray-600">123 Vilakazi Street</p>
                      <p className="text-gray-600">Orlando West, Soweto</p>
                      <p className="text-gray-600">Johannesburg, 1804</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Opening Hours</h3>
                      <p className="text-gray-600">Monday - Thursday: 11am - 9pm</p>
                      <p className="text-gray-600">Friday - Saturday: 11am - 11pm</p>
                      <p className="text-gray-600">Sunday: 12pm - 8pm</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Contact Us</h3>
                      <p className="text-gray-600">Phone: 012 345 6789</p>
                      <p className="text-gray-600">Email: info@themeaterie.co.za</p>
                      <p className="text-gray-600">WhatsApp: +27 12 345 6789</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={mapVariants} className="h-[400px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.4776541196477!2d27.9054936!3d-26.2387599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c0a6ffc9379%3A0x3c5ba14c51c47898!2sVilakazi%20St%2C%20Orlando%20West%2C%20Soweto%2C%201804!5e0!3m2!1sen!2sza!4v1650000000000!5m2!1sen!2sza"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
