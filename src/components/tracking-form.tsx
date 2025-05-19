"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getShippingByTrackingNumber } from "@/lib/actions"

export default function TrackingForm() {
  const [trackingCode, setTrackingCode] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const shipping = await getShippingByTrackingNumber(trackingCode)

      if (shipping) {
        document.location = (`/track/${shipping.trackingNumber}`)
      } else {
        setError("No order found yet for this tracking code .")
      }
    } catch (err) {
      setError("An error occurred while tracking your package. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mb-12 bg-white/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            placeholder="Enter tracking number"
            className="flex-1 px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white transition-all duration-300"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 sm:py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Tracking...
              </div>
            ) : (
              "Track"
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 sm:p-6 mb-8 text-center">
          {error}
        </div>
      )}
    </>
  )
}
