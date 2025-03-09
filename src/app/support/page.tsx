'use client';
import { useState } from 'react';
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

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');

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
            Support Center
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            We're here to help you with any questions or concerns
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles..."
              className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent pl-12"
            />
            <svg
              className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          {[
            {
              title: "Popular Articles",
              icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
              items: [
                { title: "How to track a package", href: "/support/tracking-guide" },
                { title: "Understanding tracking statuses", href: "/support/tracking-status" },
                { title: "Shipping notifications setup", href: "/support/notifications" },
                { title: "Account management", href: "/support/account" }
              ]
            },
            {
              title: "FAQs",
              icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              items: [
                { title: "What do I need to start tracking?", href: "/support/faq/getting-started" },
                { title: "How accurate is the tracking?", href: "/support/faq/accuracy" },
                { title: "Can I track multiple packages?", href: "/support/faq/bulk-tracking" },
                { title: "Pricing and plans", href: "/support/faq/pricing" }
              ]
            }
          ].map((section, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              className="bg-white rounded-2xl p-8 shadow-xl"
            >
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={section.icon} />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">{section.title}</h2>
              </div>
              <ul className="space-y-4">
                {section.items.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="flex items-center text-gray-600 hover:text-orange-500 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {[
            {
              title: "Email Support",
              description: "Get help via email with response within 24 hours",
              icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
              action: { label: "Email Us", href: "mailto:support@trackify.com" }
            },
            {
              title: "Live Chat",
              description: "Chat with our support team in real-time",
              icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
              action: { label: "Start Chat", href: "/support/chat" }
            },
            {
              title: "Phone Support",
              description: "Call us directly for urgent matters",
              icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
              action: { label: "Call Now", href: "tel:+1-555-123-4567" }
            }
          ].map((contact, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              className="bg-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={contact.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
              <p className="text-gray-600 mb-6">{contact.description}</p>
              <a
                href={contact.action.href}
                className="inline-flex items-center justify-center w-full bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all"
              >
                {contact.action.label}
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="bg-white rounded-2xl p-8 shadow-xl text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-gray-600 mb-6">
            Our support team is available 24/7 to assist you with any questions or concerns.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-600 transition-all"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  );
}