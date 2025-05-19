import Link from "next/link"
import AddShippingForm from "@/components/add-shipping-form"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-orange-600">Shipping Admin</h1>
              </div>
              <nav className="ml-6 flex space-x-8">
                <Link
                  href="/dashboard"
                  className="border-orange-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Add Shipping
                </Link>
                <Link
                  href="/dashboard/list"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  List All
                </Link>
              </nav>
            </div>
            <div className="flex items-center">
              <Link
                href="/"
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200"
              >
                Back to Tracking
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Add New Shipping</h2>
            <AddShippingForm />
          </div>
        </div>
      </div>
    </div>
  )
}
