"use client"

import { useState } from "react"
import type { Shipping } from "@/lib/definitions"
import ShippingModal from "@/components/shipping-modal"

export default function ShippingList({ shippings }: { shippings: Shipping[] }) {
  const [selectedShipping, setSelectedShipping] = useState<Shipping | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = (shipping: Shipping) => {
    setSelectedShipping(shipping)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedShipping(null)
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tracking #
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Recipient
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Location
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Est. Delivery
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                IRS Hold
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {shippings.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                  No shipments found
                </td>
              </tr>
            ) : (
              shippings.map((shipping) => (
                <tr
                  key={shipping.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleOpenModal(shipping)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {shipping.trackingNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        shipping.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : shipping.status === "IRS Hold"
                            ? "bg-red-100 text-red-800"
                            : shipping.status === "In Transit"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {shipping.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipping.recipient.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipping.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipping.estimatedDelivery}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shipping.irsHold ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenModal(shipping)
                      }}
                      className="text-orange-600 hover:text-orange-900"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedShipping && (
        <ShippingModal shipping={selectedShipping} isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  )
}
