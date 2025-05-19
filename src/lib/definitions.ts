export interface Recipient {
  name: string
  address: string
  city: string
  state: string
  zip: string
}

export interface ShipmentDetails {
  type: string
  contents: string
  sender: string
}

export interface HistoryEntry {
  date: string
  location: string
  status: string
}

export interface IrsHold {
  amount: number
  paymentStatus: string
  verificationCode?: string
}

export interface Shipping {
  id: number
  trackingNumber: string
  status: string
  location: string
  lastUpdate: string
  estimatedDelivery: string
  recipient: Recipient
  details: ShipmentDetails
  history: HistoryEntry[]
  irsHold?: IrsHold
}

export interface ShippingFormData {
  trackingNumber: string
  status: string
  location: string
  estimatedDelivery: string
  recipient: Recipient
  details: ShipmentDetails
  hasIrsHold: boolean
  irsHoldAmount: number
  irsVerificationCode: string
}
