"use client";

import { useState } from "react";

export default function TrackPage() {
  const [trackingCode, setTrackingCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trackingData, setTrackingData] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement actual tracking API integration
    setTimeout(() => {
      setTrackingData({
        status: "In Transit" as const,
        location: "Miami, FL",
        lastUpdate: "2024-02-14 10:30 AM",
        estimatedDelivery: "2024-02-16",
        history: [
          { date: "2024-02-14 10:30 AM", location: "Miami, FL", status: "In Transit" },
          { date: "2024-02-14 08:00 AM", location: "Miami, FL", status: "Arrived at Facility" },
          { date: "2024-02-13 11:00 PM", location: "Atlanta, GA", status: "Departed" },
        ],
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-black mb-4">Track Your Package</h1>
          <p className="text-gray-600">Enter your tracking number to get real-time updates</p>
        </div>

        <form onSubmit={handleSubmit} className="mb-12">
          <div className="flex gap-4">
            <input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder="Enter tracking number"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Tracking..." : "Track"}
            </button>
          </div>
        </form>

        {trackingData && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                <p className="text-lg font-semibold text-black">{trackingData.status}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Current Location</h3>
                <p className="text-lg font-semibold text-black">{trackingData.location}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Last Update</h3>
                <p className="text-lg font-semibold text-black">{trackingData.lastUpdate}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Estimated Delivery</h3>
                <p className="text-lg font-semibold text-black">{trackingData.estimatedDelivery}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Tracking History</h3>
              <div className="space-y-4">
                {trackingData.history.map((event, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="relative">
                      <div className="h-4 w-4 rounded-full bg-orange-500"></div>
                      {index !== trackingData.history.length - 1 && (
                        <div className="absolute top-4 left-2 w-0.5 h-full -ml-[2px] bg-gray-200"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-black">{event.status}</p>
                      <p className="text-sm text-gray-500">{event.location}</p>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}