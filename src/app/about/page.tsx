'use client';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100/80 to-orange-200/70">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial="initial"
          animate="animate"
          className="text-center mb-20"
        >
          <motion.h1
            variants={fadeIn}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            About Trackify
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Revolutionizing package tracking for businesses worldwide
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20"
        >
          <motion.div variants={fadeIn} className="space-y-6">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2020, Trackify emerged from a simple observation: businesses needed a better way to track and manage their shipments. What started as a small team with a big vision has grown into a leading logistics technology provider trusted by thousands of companies worldwide.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to bring transparency and efficiency to the logistics industry through innovative technology solutions. We believe that every package has a story, and we&lsquo;re here to help tell it.
            </p>
          </motion.div>
          
          <motion.div variants={fadeIn} className="bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-6">Company Values</h3>
            <div className="space-y-6">
              {[
                {
                  title: "Innovation",
                  description: "Constantly pushing the boundaries of what's possible in logistics technology."
                },
                {
                  title: "Reliability",
                  description: "Providing consistent, accurate tracking information you can count on."
                },
                {
                  title: "Transparency",
                  description: "Open communication and clear insights into every shipment's journey."
                },
                {
                  title: "Customer Focus",
                  description: "Putting our customers' needs at the heart of everything we do."
                }
              ].map((value, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                      {i + 1}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">{value.title}</h4>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {[
            { number: "50+", label: "Countries Served" },
            { number: "1000+", label: "Enterprise Clients" },
            { number: "24/7", label: "Customer Support" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              className="bg-white rounded-2xl p-8 text-center shadow-xl"
            >
              <p className="text-4xl font-bold text-orange-500 mb-2">{stat.number}</p>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="bg-orange-500 rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
            Be part of the future of logistics technology. Let&lsquo;s transform package tracking together.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center bg-white text-orange-500 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all"
            >
              Contact Us
            </a>
            <a
              href="/careers"
              className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all"
            >
              Careers
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}