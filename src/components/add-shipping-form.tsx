"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createShipping } from "@/lib/actions"
import type { ShippingFormData } from "@/lib/definitions"

export default function AddShippingForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState<ShippingFormData>({
    trackingNumber: "",
    status: "Processing",
    location: "",
    estimatedDelivery: "",
    recipient: {
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
    },
    details: {
      type: "",
      contents: "",
      sender: "",
    },
    hasIrsHold: false,
    irsHoldAmount: 0,
    irsVerificationCode: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...(formData[parent as keyof typeof formData] as Record<string, any>),
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await createShipping(formData)
      router.push("/dashboard/list")
      router.refresh()
    } catch (err) {
      console.error(err)
      setError("Failed to create shipping. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-md p-4">{error}</div>}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700">
            Tracking Number
          </label>
          <input
            type="text"
            name="trackingNumber"
            id="trackingNumber"
            required
            value={formData.trackingNumber}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            id="status"
            required
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="Processing">Processing</option>
            <option value="In Transit">In Transit</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="IRS Hold">IRS Hold</option>
            <option value="Delayed">Delayed</option>
          </select>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Current Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            required
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label htmlFor="estimatedDelivery" className="block text-sm font-medium text-gray-700">
            Estimated Delivery
          </label>
          <input
            type="text"
            name="estimatedDelivery"
            id="estimatedDelivery"
            required
            value={formData.estimatedDelivery}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recipient Information</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="recipient.name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="recipient.name"
              id="recipient.name"
              required
              value={formData.recipient.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label htmlFor="recipient.address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="recipient.address"
              id="recipient.address"
              required
              value={formData.recipient.address}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label htmlFor="recipient.city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="recipient.city"
              id="recipient.city"
              required
              value={formData.recipient.city}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="recipient.state" className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                name="recipient.state"
                id="recipient.state"
                required
                value={formData.recipient.state}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="recipient.zip" className="block text-sm font-medium text-gray-700">
                ZIP
              </label>
              <input
                type="text"
                name="recipient.zip"
                id="recipient.zip"
                required
                value={formData.recipient.zip}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Shipment Details</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="details.type" className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <input
              type="text"
              name="details.type"
              id="details.type"
              required
              value={formData.details.type}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label htmlFor="details.sender" className="block text-sm font-medium text-gray-700">
              Sender
            </label>
            <input
              type="text"
              name="details.sender"
              id="details.sender"
              required
              value={formData.details.sender}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="details.contents" className="block text-sm font-medium text-gray-700">
              Contents
            </label>
            <textarea
              name="details.contents"
              id="details.contents"
              required
              value={formData.details.contents}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">IRS Hold Information</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="hasIrsHold"
                name="hasIrsHold"
                type="checkbox"
                checked={formData.hasIrsHold}
                onChange={handleCheckboxChange}
                className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="hasIrsHold" className="font-medium text-gray-700">
                Has IRS Hold
              </label>
              <p className="text-gray-500">Check if this shipment has an IRS hold.</p>
            </div>
          </div>

          {formData.hasIrsHold && (
            <>
              <div>
                <label htmlFor="irsHoldAmount" className="block text-sm font-medium text-gray-700">
                  IRS Hold Amount
                </label>
                <input
                  type="number"
                  name="irsHoldAmount"
                  id="irsHoldAmount"
                  required={formData.hasIrsHold}
                  value={formData.irsHoldAmount}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div>
                <label htmlFor="irsVerificationCode" className="block text-sm font-medium text-gray-700">
                  IRS Verification Code
                </label>
                <input
                  type="text"
                  name="irsVerificationCode"
                  id="irsVerificationCode"
                  required={formData.hasIrsHold}
                  value={formData.irsVerificationCode}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
        >
          {isLoading ? "Creating..." : "Create Shipping"}
        </button>
      </div>
    </form>
  )
}
