"use client";

import { useState } from "react";

interface TrackingData {
  trackingNumber: string;
  status: string;
  location: string;
  lastUpdate: string;
  estimatedDelivery: string;
  recipient: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  details: {
    type: string;
    contents: string;
    sender: string;
  };
  history: Array<{
    date: string;
    location: string;
    status: string;
  }>;
  irsHold?: {
    amount: number;
    paymentStatus: string;
    verificationCode?: string;
  };
}

export default function TrackPage() {
  const [trackingCode, setTrackingCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [error, setError] = useState<string>("");
  const [paymentCode, setPaymentCode] = useState<string>("");
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (trackingCode.toUpperCase() === "A836HE") {
        setTrackingData({
          trackingNumber: "A836HE",
          status: "IRS Hold",
          location: "Nashville, Tennessee",
          lastUpdate: "2024-03-09 14:30 PM",
          estimatedDelivery: "Pending IRS Clearance",
          recipient: {
            name: "Harrison Myers",
            address: "319 Osage Street",
            city: "Front Royal",
            state: "Virginia",
            zip: "22630"
          },
          details: {
            type: "Cash Delivery",
            contents: "Physical cash of $85,000.00 plus $13,000 add ons on returned payments",
            sender: "Cash Loading Program"
          },
          irsHold: {
            amount: 2700,
            paymentStatus: "Pending"
          },
          history: [
            { date: "2024-03-09 14:30 PM", location: "Nashville, Tennessee", status: "IRS Hold - Tax Payment Required" },
            { date: "2024-03-09 10:15 AM", location: "Nashville, Tennessee", status: "Arrived at Warehouse" },
            { date: "2024-03-08 18:45 PM", location: "Arkansas", status: "Order in Transit" },
            { date: "2024-03-08 12:20 PM", location: "Texas", status: "Order Processed" },
            { date: "2024-03-08 08:30 AM", location: "Texas", status: "Scheduled for Departure" },
            { date: "2024-03-07 14:15 PM", location: "Texas", status: "Order Received at Warehouse" },
            { date: "2024-03-07 10:00 AM", location: "System", status: "No Delivery Order Found" },
          ],
        });
      } else {
        setTrackingData(null);
        setError("No order found yet for this tracking code .");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handlePayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (paymentCode !== "44SJDU2JBE234442") {
      setError("Invalid verification code. Please check and try again.");
      return;
    }
    setError("");
    setShowSuccessPopup(true);
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100/80 to-orange-200/70 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Track Your Package</h1>
          <p className="text-gray-600 text-lg">Enter your tracking number to get real-time updates</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mb-12 bg-white/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={trackingCode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTrackingCode(e.target.value)}
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
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Tracking...
                </div>
              ) : "Track"}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 sm:p-6 mb-8 text-center">
            {error}
          </div>
        )}

        {trackingData?.irsHold && (
          <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-yellow-800 mb-4">IRS Hold Notice</h3>
            <p className="text-yellow-700 mb-4">
              Due to cash delivery amount exceeding $10,000.00, an IRS hold has been placed.
              Required tax payment: ${trackingData.irsHold.amount.toLocaleString()}
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
                className="w-full bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
              >
                Submit Payment Verification
              </button>
            </form>
          </div>
        )}

        {trackingData && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 divide-y divide-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Tracking #{trackingData.trackingNumber}
              </h2>
              <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                {trackingData.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 py-8">
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Current Location</h3>
                  <p className="text-lg sm:text-xl font-semibold text-gray-900">{trackingData.location}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Last Update</h3>
                  <p className="text-lg sm:text-xl font-semibold text-gray-900">{trackingData.lastUpdate}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Estimated Delivery</h3>
                  <p className="text-lg sm:text-xl font-semibold text-gray-900">{trackingData.estimatedDelivery}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Type</h3>
                  <p className="text-lg sm:text-xl font-semibold text-gray-900">{trackingData.details.type}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 py-8">
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipient Details</h3>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">{trackingData.recipient.name}</p>
                  <p className="text-gray-600">{trackingData.recipient.address}</p>
                  <p className="text-gray-600">
                    {trackingData.recipient.city}, {trackingData.recipient.state} {trackingData.recipient.zip}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipment Details</h3>
                <div className="space-y-2">
                  <p className="text-gray-600"><span className="font-medium">Contents:</span> {trackingData.details.contents}</p>
                  <p className="text-gray-600"><span className="font-medium">Sender:</span> {trackingData.details.sender}</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Tracking History</h3>
              <div className="space-y-6">
                {trackingData.history.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4"
                  >
                    <div className="relative">
                      <div className="h-4 w-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      </div>
                      {index !== trackingData.history.length - 1 && (
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
        )}
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
                <p className="text-sm text-gray-500">Your payment is being verified and the package status will be updated soon.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}