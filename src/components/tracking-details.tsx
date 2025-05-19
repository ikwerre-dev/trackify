import type { Shipping } from "@/lib/definitions"

export default function TrackingDetails({ shipping }: { shipping: Shipping }) {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 divide-y divide-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Tracking #{shipping.trackingNumber}</h2>
        <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
          {shipping.status}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 py-8">
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Current Location</h3>
            <p className="text-lg sm:text-xl font-semibold text-gray-900">{shipping.location}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Last Update</h3>
            <p className="text-lg sm:text-xl font-semibold text-gray-900">{shipping.lastUpdate}</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Estimated Delivery</h3>
            <p className="text-lg sm:text-xl font-semibold text-gray-900">{shipping.estimatedDelivery}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Type</h3>
            <p className="text-lg sm:text-xl font-semibold text-gray-900">{shipping.details.type}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 py-8">
        <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipient Details</h3>
          <div className="space-y-2">
            <p className="font-medium text-gray-900">{shipping.recipient.name}</p>
            <p className="text-gray-600">{shipping.recipient.address}</p>
            <p className="text-gray-600">
              {shipping.recipient.city}, {shipping.recipient.state} {shipping.recipient.zip}
            </p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipment Details</h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Contents:</span> {shipping.details.contents}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Sender:</span> {shipping.details.sender}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Tracking History</h3>
        <div className="space-y-6">
          {shipping.history.map((event, index) => (
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
          ))}
        </div>
      </div>
    </div>
  )
}
