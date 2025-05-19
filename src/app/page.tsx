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
        <main className="  mx-auto ">
          {/* Hero Section */}
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
                Simplified Package Tracking
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold text-black mb-8 tracking-tight"
              >
                Track Your Packages
                <span className="text-orange-500 block mt-2">With Precision</span>
              </motion.h1>
              <p className="text-gray-600 text-lg md:text-xl mb-12 leading-relaxed">
                Experience real-time tracking with unparalleled accuracy and detailed insights into your shipment&lsquo;s journey.
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="/track"
                  className="group inline-flex items-center bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-600 transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
                >
                  Track Now
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
               
              </div>
            </motion.div >
          </div>

          <div className="px-6">
            {/* Features Grid */}
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
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Powerful Features</h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">Advanced tracking capabilities designed for modern logistics</p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  {
                    title: "Real-Time Updates",
                    description: "Instant notifications and status updates about your package's journey with millisecond accuracy.",
                    icon: "M13 10V3L4 14h7v7l9-11h-7z"
                  },
                  {
                    title: "Live Map Tracking",
                    description: "Interactive 3D map interface with precise location tracking and route optimization.",
                    icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  },
                  {
                    title: "Smart Analytics",
                    description: "Comprehensive logistics data with AI-powered delivery predictions and insights.",
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

            {/* Statistics Section */}
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
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Impact in Numbers</h2>
                    <p className="text-orange-100 text-lg">Trusted by industry leaders worldwide</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                      { number: "50K+", label: "Active Users" },
                      { number: "1M+", label: "Packages Tracked" },
                      { number: "99%", label: "Accuracy Rate" },
                      { number: "24/7", label: "Support" }
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

            {/* Industry Solutions */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="py-32 bg-gradient-to-br from-orange-50/50 via-white to-orange-50/50"
            >
              <motion.div variants={fadeIn} className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Industry Solutions</h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">Tailored tracking solutions for every sector</p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
                {[
                  {
                    industry: "E-commerce",
                    description: "End-to-end visibility for online retail operations",
                    icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  },
                  {
                    industry: "Manufacturing",
                    description: "Supply chain optimization for production lines",
                    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  },
                  {
                    industry: "Healthcare",
                    description: "Critical shipment monitoring for medical supplies",
                    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  },
                  {
                    industry: "Logistics",
                    description: "Fleet management and route optimization",
                    icon: "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  }
                ].map((solution, i) => (
                  <motion.div
                    key={i}
                    variants={scaleIn}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={solution.icon} />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-4">{solution.industry}</h3>
                    <p className="text-gray-600">{solution.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Success Stories */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="py-32"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Success Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
                {[
                  {
                    name: "Sarah Johnson",
                    role: "Logistics Director",
                    company: "TechCorp",
                    quote: "Trackify revolutionized our e-commerce fulfillment. Real-time tracking reduced customer inquiries by 60% and improved satisfaction scores."
                  },
                  {
                    name: "Michael Chen",
                    role: "Operations Manager",
                    company: "Global Shipping Co.",
                    quote: "The analytics dashboard helps us optimize routes and reduce delivery times. We've seen a 30% improvement in efficiency since implementation."
                  },
                  {
                    name: "Emma Williams",
                    role: "Supply Chain Head",
                    company: "Retail Giants",
                    quote: "Integration was seamless, and the predictive analytics have transformed our inventory management. Stock accuracy is now at 99.9%."
                  }
                ].map((testimonial, i) => (
                  <div key={i} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xl font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <p className="font-bold text-lg">{testimonial.name}</p>
                        <p className="text-gray-600">{testimonial.role}</p>
                        <p className="text-orange-500 text-sm">{testimonial.company}</p>
                      </div>
                    </div>
                    <blockquote className="text-gray-600 leading-relaxed italic">
                      &quot;{testimonial.quote}&quot;
                    </blockquote>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Integration Partners */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="py-32 bg-gray-50"
            >
              <div className="max-w-7xl mx-auto px-6">
                <motion.div variants={fadeIn} className="text-center mb-20">
                  <h2 className="text-3xl md:text-5xl font-bold mb-6">Integration Partners</h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">Seamlessly connect with your favorite platforms</p>
                </motion.div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { name: "Shopify", logo: "🛍️" },
                    { name: "WooCommerce", logo: "🛒" },
                    { name: "Amazon", logo: "📦" },
                    { name: "FedEx", logo: "✈️" },
                    { name: "UPS", logo: "🚚" },
                    { name: "DHL", logo: "🌐" },
                    { name: "USPS", logo: "📬" },
                    { name: "Magento", logo: "🎯" }
                  ].map((partner, i) => (
                    <motion.div
                      key={i}
                      variants={scaleIn}
                      className="bg-white rounded-xl p-6 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{partner.logo}</div>
                        <p className="font-semibold text-gray-800">{partner.name}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="py-32"
            >
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern opacity-10"></div>
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to Transform Your Tracking?</h2>
                  <p className="text-xl text-orange-100 mb-12 max-w-2xl mx-auto">
                    Join industry leaders who trust Trackify for their logistics needs.
                  </p>
                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <a
                      href="?page=/signup"
                      className="inline-flex items-center bg-white text-orange-500 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all"
                    >
                      Get Started Free
                    </a>
                    <a
                      href="?page=/demo"
                      className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all"
                    >
                      Request Demo
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </AnimatePresence>

  );
}
