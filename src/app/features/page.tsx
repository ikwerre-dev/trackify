'use client';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100/80 to-orange-200/70">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Powerful Features
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover how our advanced tracking capabilities can transform your logistics operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {[
            {
              title: "Real-Time Tracking",
              description: "Monitor your shipments with millisecond-accurate updates and instant notifications about status changes.",
              icon: "M13 10V3L4 14h7v7l9-11h-7z",
              features: [
                "Live location updates",
                "Instant status notifications",
                "Accurate delivery estimates",
                "Custom alert settings"
              ]
            },
            {
              title: "Advanced Analytics",
              description: "Gain valuable insights into your shipping operations with our comprehensive analytics platform.",
              icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
              features: [
                "Performance metrics",
                "Trend analysis",
                "Custom reporting",
                "Data visualization"
              ]
            },
            {
              title: "Route Optimization",
              description: "Optimize delivery routes with AI-powered algorithms for maximum efficiency and cost savings.",
              icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
              features: [
                "AI-powered routing",
                "Traffic prediction",
                "Multi-stop optimization",
                "Real-time adjustments"
              ]
            },
            {
              title: "Integration Ecosystem",
              description: "Seamlessly connect with your existing systems and popular e-commerce platforms.",
              icon: "M13 10V3L4 14h7v7l9-11h-7z",
              features: [
                "API access",
                "E-commerce plugins",
                "Custom webhooks",
                "Third-party integrations"
              ]
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">{feature.title}</h2>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <ul className="space-y-3">
                {feature.features.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-orange-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-orange-500 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Tracking?</h2>
          <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust our platform for their logistics needs.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="inline-flex items-center bg-white text-orange-500 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all"
            >
              Get Started Free
            </a>
            <a
              href="/demo"
              className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all"
            >
              Request Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}