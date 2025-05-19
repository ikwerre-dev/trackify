"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { Shipping, ShippingFormData } from "@/lib/definitions"
import { updateShipping, deleteShipping, addHistoryEntry } from "@/lib/actions"

export default function ShippingModal({
  shipping,
  isOpen,
  onClose,
}: {
  shipping: Shipping
  isOpen: boolean
  onClose: () => void
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("details")
  const [newHistoryEntry, setNewHistoryEntry] = useState({
    status: "",
    location: "",
    date: new Date().toISOString().slice(0, 16),
  })

  const [formData, setFormData] = useState<ShippingFormData>({
    trackingNumber: shipping.trackingNumber,
    status: shipping.status,
    location: shipping.location,
    estimatedDelivery: shipping.estimatedDelivery,
    recipient: { ...shipping.recipient },
    details: { ...shipping.details },
    hasIrsHold: !!shipping.irsHold,
    irsHoldAmount: shipping.irsHold?.amount || 0,
    irsVerificationCode: shipping.irsHold?.verificationCode || "",
  })

  useEffect(() => {
    if (shipping) {
      setFormData({
        trackingNumber: shipping.trackingNumber,
        status: shipping.status,
        location: shipping.location,
        estimatedDelivery: shipping.estimatedDelivery,
        recipient: { ...shipping.recipient },
        details: { ...shipping.details },
        hasIrsHold: !!shipping.irsHold,
        irsHoldAmount: shipping.irsHold?.amount || 0,
        irsVerificationCode: shipping.irsHold?.verificationCode || "",
      })
    }
  }, [shipping])

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

  const handleHistoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewHistoryEntry({
      ...newHistoryEntry,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await updateShipping(shipping.id, formData)
       router.refresh()
      onClose()
    } catch (err) {
      console.error(err)
      setError("Failed to update shipping. Please try again.")
    } finally {
      setIsLoading(false)
 
    }
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this shipping?")) {
      setIsLoading(true)
      setError("")

      try {
        await deleteShipping(shipping.id)
        router.refresh()
        onClose()
      } catch (err) {
        console.error(err)
        setError("Failed to delete shipping. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleAddHistory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await addHistoryEntry(shipping.id, newHistoryEntry)
      router.refresh()
      setNewHistoryEntry({
        status: "",
        location: "",
        date: new Date().toISOString().slice(0, 16),
      })
  
      // Refresh the shipping data
      router.refresh()
    } catch (err) {
      console.error(err)
      setError("Failed to add history entry. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Edit Shipping #{shipping.trackingNumber}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("details")}
                className={`${
                  activeTab === "details"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`${
                  activeTab === "history"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                History
              </button>
              <button
                onClick={() => setActiveTab("irsHold")}
                className={`${
                  activeTab === "irsHold"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                IRS Hold
              </button>
            </nav>
          </div>

          {error && <div className="mt-4 bg-red-50 border border-red-200 text-red-600 rounded-md p-4">{error}</div>}

          {activeTab === "details" && (
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
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

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          )}

          {activeTab === "history" && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Tracking History</h3>

              <form onSubmit={handleAddHistory} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-md font-medium text-gray-700 mb-4">Add New History Entry</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <input
                      type="text"
                      name="status"
                      id="status"
                      required
                      value={newHistoryEntry.status}
                      onChange={handleHistoryChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      required
                      value={newHistoryEntry.location}
                      onChange={handleHistoryChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                      Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      name="date"
                      id="date"
                      required
                      value={newHistoryEntry.date}
                      onChange={handleHistoryChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
                  >
                    {isLoading ? "Adding..." : "Add Entry"}
                  </button>
                </div>
              </form>

              <div className="space-y-6">
                {shipping.history.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No history entries yet</p>
                ) : (
                  shipping.history.map((event, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="relative">
                        <div className="h-4 w-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                        {index !== shipping.history.length - 1 && (
                          <div className="absolute top-4 left-2 w-0.5 h-full -ml-[2px] bg-gradient-to-b from-orange-500 to-orange-100"></div>
                        )}
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 flex-1">
                        <p className="font-medium text-gray-900">{event.status}</p>
                        <p className="text-sm text-gray-500">{event.location}</p>
                        <p className="text-sm text-gray-500">{event.date}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "irsHold" && (
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
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
                <div className="space-y-6">
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
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
