import { getShippingByTrackingNumber } from "@/lib/actions"
import { notFound } from "next/navigation"
import TrackingDetails from "@/components/tracking-details"
import IrsHoldForm from "@/components/irs-hold-form"

export default async function TrackPage({ params }: { params: { trackingNumber: string } }) {
  const { trackingNumber } = params
  const shipping = await getShippingByTrackingNumber(trackingNumber)

  if (!shipping) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100/80 to-orange-200/70 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Track Your Package</h1>
          <p className="text-gray-600 text-lg">Tracking details for {shipping.trackingNumber}</p>
        </div>

        {shipping.irsHold && (
          <IrsHoldForm
            trackingNumber={shipping.trackingNumber}
            amount={shipping.irsHold.amount}
            verificationCode={shipping.irsHold.verificationCode || ""}
          />
        )}

        <TrackingDetails shipping={shipping} />
      </div>
    </div>
  )
}
