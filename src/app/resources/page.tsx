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

export default function ResourcesPage() {
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
            Resources
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Everything you need to get the most out of Trackify
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {[
            {
              title: "Documentation",
              description: "Comprehensive guides and API documentation",
              icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
              links: [
                { label: "Getting Started", href: "/docs/getting-started" },
                { label: "API Reference", href: "/docs/api" },
                { label: "Best Practices", href: "/docs/best-practices" },
                { label: "Integration Guides", href: "/docs/integration" }
              ]
            },
            {
              title: "Developer Tools",
              description: "SDKs and tools for building with Trackify",
              icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
              links: [
                { label: "SDKs", href: "/tools/sdks" },
                { label: "API Tools", href: "/tools/api" },
                { label: "Code Examples", href: "/tools/examples" },
                { label: "Libraries", href: "/tools/libraries" }
              ]
            },
            {
              title: "Learning Center",
              description: "Tutorials and educational resources",
              icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
              links: [
                { label: "Video Tutorials", href: "/learn/videos" },
                { label: "Webinars", href: "/learn/webinars" },
                { label: "Case Studies", href: "/learn/case-studies" },
                { label: "Blog", href: "/blog" }
              ]
            }
          ].map((resource, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={resource.icon} />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">{resource.title}</h2>
              <p className="text-gray-600 mb-6">{resource.description}</p>
              <ul className="space-y-3">
                {resource.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="flex items-center text-gray-600 hover:text-orange-500 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="bg-orange-500 rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need More Help?</h2>
          <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
            Our support team is here to assist you with any questions or concerns.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="/support"
              className="inline-flex items-center bg-white text-orange-500 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all"
            >
              Contact Support
            </a>
            <a
              href="/community"
              className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all"
            >
              Join Community
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}