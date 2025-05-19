import Link from "next/link"
import TrackingForm from "@/components/tracking-form"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100/80 to-orange-200/70 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Track Your Package</h1>
          <p className="text-gray-600 text-lg">Enter your tracking number to get real-time updates</p>
        </div>

        <TrackingForm />

        
      </div>
    </div>
  )
}
