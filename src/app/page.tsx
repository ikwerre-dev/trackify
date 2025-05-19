'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export default function Home() {
  return (
    <AnimatePresence>
      <div className="min-h-screen bg-white">
        <main className="mx-auto">
          <div className="min-h-screen flex flex-col justify-center items-center relative bg-gradient-to-br from-orange-50 via-orange-100/80 to-orange-200/70 backdrop-blur-3xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-center max-w-3xl mx-auto relative"
            >
              <motion.span
                {...fadeIn}
                className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-6"
              >
                Secure Cash Delivery Monitoring
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold text-black mb-8 tracking-tight"
              >
                Track Your Cash Deliveries
                <span className="text-orange-500 block mt-2">Safely & Accurately</span>
              </motion.h1>
              <p className="text-gray-600 text-lg md:text-xl mb-12 leading-relaxed">
                Get real-time updates and full visibility on the status, location, and handling of your cash-in-transit packages.
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="/track"
                  className="group inline-flex items-center bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-600 transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
                >
                  Track Cash Package
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>

          <div className="px-6">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="py-32"
            >
              <motion.div
                variants={fadeIn}
                className="text-center mb-20"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for Cash Delivery</h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">Precision tracking for high-value and cash-in-transit logistics</p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  {
                    title: "Secure Real-Time Monitoring",
                    description: "Get instant updates on your cash package location, status, and any route deviations.",
                    icon: "M13 10V3L4 14h7v7l9-11h-7z"
                  },
                  {
                    title: "Tamper Alerts & Route Logs",
                    description: "Track vehicle routes, delivery checkpoints, and get alerts on suspicious activity or tampering.",
                    icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  },
                  {
                    title: "Delivery Verification & Analytics",
                    description: "Ensure delivery authentication with proof-of-handling and analytics on drop efficiency.",
                    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    variants={fadeIn}
                    whileHover={{ scale: 1.02 }}
                    className="group relative"
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                      <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="py-32 relative"
            >
              <div className="bg-orange-500 rounded-3xl overflow-hidden">
                <motion.div
                  variants={staggerContainer}
                  className="relative p-12"
                >
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Our Cash Delivery Footprint</h2>
                    <p className="text-orange-100 text-lg">Thousands of secured cash movements tracked daily</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                      { number: "20K+", label: "Cash Deliveries Monthly" },
                      { number: "300+", label: "Delivery Vehicles" },
                      { number: "98%", label: "Tamper-Free Rate" },
                      { number: "24/7", label: "Monitoring & Alerts" }
                    ].map((stat, i) => (
                      <div key={i} className="text-center group">
                        <p className="text-5xl md:text-6xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                          {stat.number}
                        </p>
                        <p className="text-orange-100 text-lg">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </AnimatePresence>
  );
}