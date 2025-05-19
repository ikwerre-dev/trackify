"use server"

import { revalidatePath } from "next/cache"
import type { Shipping, ShippingFormData } from "./definitions"
import { query, transaction } from "./db"

// Helper function to retry database operations
async function withRetry<T>(operation: () => Promise<T>, maxRetries = 3, delay = 500): Promise<T> {
  let lastError: any

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error: any) {
      lastError = error

      // If it's a connection error, wait and retry
      if (
        error.code === "ER_TOO_MANY_USER_CONNECTIONS" ||
        error.code === "ECONNREFUSED" ||
        error.code === "PROTOCOL_CONNECTION_LOST"
      ) {
        console.log(`Database connection error, retrying (${attempt}/${maxRetries})...`)

        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, delay * attempt))
        continue
      }

      // For other errors, throw immediately
      throw error
    }
  }

  // If we've exhausted all retries
  throw lastError
}

export async function getShippingByTrackingNumber(trackingNumber: string): Promise<Shipping | null> {
  return withRetry(async () => {
    try {
      // Get shipping data
      const shippings = (await query(`SELECT * FROM shipping WHERE trackingNumber = ?`, [trackingNumber])) as any[]

      if (shippings.length === 0) {
        return null
      }

      const shipping = shippings[0]

      // Get recipient data
      const recipients = (await query(`SELECT * FROM recipient WHERE shippingId = ?`, [shipping.id])) as any[]

      // Get details data
      const details = (await query(`SELECT * FROM shipment_details WHERE shippingId = ?`, [shipping.id])) as any[]

      // Get history data
      const history = (await query(`SELECT * FROM history_entry WHERE shippingId = ? ORDER BY date DESC`, [
        shipping.id,
      ])) as any[]

      // Get IRS hold data
      const irsHolds = (await query(`SELECT * FROM irs_hold WHERE shippingId = ?`, [shipping.id])) as any[]

      // Format the data to match our Shipping type
      const formattedShipping: Shipping = {
        id: shipping.id,
        trackingNumber: shipping.trackingNumber,
        status: shipping.status,
        location: shipping.location,
        lastUpdate: new Date(shipping.lastUpdate).toISOString(),
        estimatedDelivery: shipping.estimatedDelivery,
        recipient:
          recipients.length > 0
            ? {
                name: recipients[0].name,
                address: recipients[0].address,
                city: recipients[0].city,
                state: recipients[0].state,
                zip: recipients[0].zip,
              }
            : {
                name: "",
                address: "",
                city: "",
                state: "",
                zip: "",
              },
        details:
          details.length > 0
            ? {
                type: details[0].type,
                contents: details[0].contents,
                sender: details[0].sender,
              }
            : {
                type: "",
                contents: "",
                sender: "",
              },
        history: history.map((entry) => ({
          date: new Date(entry.date).toISOString(),
          location: entry.location,
          status: entry.status,
        })),
      }

      // Add IRS hold if it exists
      if (irsHolds.length > 0) {
        formattedShipping.irsHold = {
          amount: Number.parseFloat(irsHolds[0].amount),
          paymentStatus: irsHolds[0].paymentStatus,
          verificationCode: irsHolds[0].verificationCode || undefined,
        }
      }

      return formattedShipping
    } catch (error) {
      console.error("Database error:", error)
      throw new Error("Failed to fetch shipping")
    }
  })
}

export async function getAllShippings(): Promise<Shipping[]> {
  return withRetry(async () => {
    try {
      // Get all shipping records
      const shippings = (await query(`SELECT * FROM shipping ORDER BY createdAt DESC`)) as any[]

      // Map over each shipping record and get its related data
      const formattedShippings = await Promise.all(
        shippings.map(async (shipping) => {
          // Get recipient data
          const recipients = (await query(`SELECT * FROM recipient WHERE shippingId = ?`, [shipping.id])) as any[]

          // Get details data
          const details = (await query(`SELECT * FROM shipment_details WHERE shippingId = ?`, [shipping.id])) as any[]

          // Get history data
          const history = (await query(`SELECT * FROM history_entry WHERE shippingId = ? ORDER BY date DESC`, [
            shipping.id,
          ])) as any[]

          // Get IRS hold data
          const irsHolds = (await query(`SELECT * FROM irs_hold WHERE shippingId = ?`, [shipping.id])) as any[]

          // Format the data to match our Shipping type
          const formattedShipping: Shipping = {
            id: shipping.id,
            trackingNumber: shipping.trackingNumber,
            status: shipping.status,
            location: shipping.location,
            lastUpdate: new Date(shipping.lastUpdate).toISOString(),
            estimatedDelivery: shipping.estimatedDelivery,
            recipient:
              recipients.length > 0
                ? {
                    name: recipients[0].name,
                    address: recipients[0].address,
                    city: recipients[0].city,
                    state: recipients[0].state,
                    zip: recipients[0].zip,
                  }
                : {
                    name: "",
                    address: "",
                    city: "",
                    state: "",
                    zip: "",
                  },
            details:
              details.length > 0
                ? {
                    type: details[0].type,
                    contents: details[0].contents,
                    sender: details[0].sender,
                  }
                : {
                    type: "",
                    contents: "",
                    sender: "",
                  },
            history: history.map((entry) => ({
              date: new Date(entry.date).toISOString(),
              location: entry.location,
              status: entry.status,
            })),
          }

          // Add IRS hold if it exists
          if (irsHolds.length > 0) {
            formattedShipping.irsHold = {
              amount: Number.parseFloat(irsHolds[0].amount),
              paymentStatus: irsHolds[0].paymentStatus,
              verificationCode: irsHolds[0].verificationCode || undefined,
            }
          }

          return formattedShipping
        }),
      )

      return formattedShippings
    } catch (error) {
      console.error("Database error:", error)
      throw new Error("Failed to fetch shippings")
    }
  })
}

export async function createShipping(data: ShippingFormData) {
  return withRetry(async () => {
    try {
      const {
        trackingNumber,
        status,
        location,
        estimatedDelivery,
        recipient,
        details,
        hasIrsHold,
        irsHoldAmount,
        irsVerificationCode,
      } = data

      // Use the transaction function
      await transaction(async (connection) => {
        // Insert shipping record
        const [shippingResult] = (await connection.execute(
          `INSERT INTO shipping (trackingNumber, status, location, lastUpdate, estimatedDelivery) 
           VALUES (?, ?, ?, ?, ?)`,
          [trackingNumber, status, location, new Date(), estimatedDelivery],
        )) as any

        const shippingId = shippingResult.insertId

        // Insert recipient record
        await connection.execute(
          `INSERT INTO recipient (shippingId, name, address, city, state, zip) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [shippingId, recipient.name, recipient.address, recipient.city, recipient.state, recipient.zip],
        )

        // Insert details record
        await connection.execute(
          `INSERT INTO shipment_details (shippingId, type, contents, sender) 
           VALUES (?, ?, ?, ?)`,
          [shippingId, details.type, details.contents, details.sender],
        )

        // Insert initial history entry
        await connection.execute(
          `INSERT INTO history_entry (shippingId, date, location, status) 
           VALUES (?, ?, ?, ?)`,
          [shippingId, new Date(), location, status],
        )

        // Insert IRS hold if needed
        if (hasIrsHold) {
          await connection.execute(
            `INSERT INTO irs_hold (shippingId, amount, paymentStatus, verificationCode) 
             VALUES (?, ?, ?, ?)`,
            [shippingId, irsHoldAmount, "Pending", irsVerificationCode],
          )
        }
      })

      revalidatePath("/dashboard/list")
    } catch (error) {
      console.error("Database error:", error)
      throw new Error("Failed to create shipping")
    }
  })
}

export async function updateShipping(id: number, data: ShippingFormData) {
  return withRetry(async () => {
    try {
      const {
        trackingNumber,
        status,
        location,
        estimatedDelivery,
        recipient,
        details,
        hasIrsHold,
        irsHoldAmount,
        irsVerificationCode,
      } = data

      await transaction(async (connection) => {
        // Update shipping record
        await connection.execute(
          `UPDATE shipping 
           SET trackingNumber = ?, status = ?, location = ?, lastUpdate = ?, estimatedDelivery = ? 
           WHERE id = ?`,
          [trackingNumber, status, location, new Date(), estimatedDelivery, id],
        )

        // Update recipient record
        await connection.execute(
          `UPDATE recipient 
           SET name = ?, address = ?, city = ?, state = ?, zip = ? 
           WHERE shippingId = ?`,
          [recipient.name, recipient.address, recipient.city, recipient.state, recipient.zip, id],
        )

        // Update details record
        await connection.execute(
          `UPDATE shipment_details 
           SET type = ?, contents = ?, sender = ? 
           WHERE shippingId = ?`,
          [details.type, details.contents, details.sender, id],
        )

        // Handle IRS hold
        const [irsHolds] = (await connection.execute(`SELECT * FROM irs_hold WHERE shippingId = ?`, [id])) as any[]

        if (hasIrsHold) {
          if (irsHolds.length > 0) {
            // Update existing IRS hold
            await connection.execute(
              `UPDATE irs_hold 
               SET amount = ?, verificationCode = ? 
               WHERE shippingId = ?`,
              [irsHoldAmount, irsVerificationCode, id],
            )
          } else {
            // Create new IRS hold
            await connection.execute(
              `INSERT INTO irs_hold (shippingId, amount, paymentStatus, verificationCode) 
               VALUES (?, ?, ?, ?)`,
              [id, irsHoldAmount, "Pending", irsVerificationCode],
            )
          }
        } else if (irsHolds.length > 0) {
          // Remove IRS hold if it exists
          await connection.execute(`DELETE FROM irs_hold WHERE shippingId = ?`, [id])
        }
      })

      revalidatePath(`/track/${trackingNumber}`)
      revalidatePath("/dashboard/list")
    } catch (error) {
      console.error("Database error:", error)
      throw new Error("Failed to update shipping")
    }
  })
}

export async function deleteShipping(id: number) {
  return withRetry(async () => {
    try {
      // Get shipping record for revalidation
      const shippings = (await query(`SELECT trackingNumber FROM shipping WHERE id = ?`, [id])) as any[]
      const trackingNumber = shippings[0]?.trackingNumber

      await query(`DELETE FROM shipping WHERE id = ?`, [id])

      if (trackingNumber) {
        revalidatePath(`/track/${trackingNumber}`)
      }
      revalidatePath("/dashboard/list")
    } catch (error) {
      console.error("Database error:", error)
      throw new Error("Failed to delete shipping")
    }
  })
}

export async function verifyIrsPayment(trackingNumber: string, verificationCode: string): Promise<boolean> {
  return withRetry(async () => {
    try {
      // Get shipping record
      const shippings = (await query(`SELECT * FROM shipping WHERE trackingNumber = ?`, [trackingNumber])) as any[]

      if (shippings.length === 0) {
        return false
      }

      const shipping = shippings[0]

      // Get IRS hold record
      const irsHolds = (await query(`SELECT * FROM irs_hold WHERE shippingId = ?`, [shipping.id])) as any[]

      if (irsHolds.length === 0) {
        return false
      }

      const irsHold = irsHolds[0]

      // Check if verification code matches
      if (irsHold.verificationCode === verificationCode) {
        await transaction(async (connection) => {
          // Update IRS hold status
          await connection.execute(`UPDATE irs_hold SET paymentStatus = ? WHERE id = ?`, ["Paid", irsHold.id])

          // Update shipping status
          await connection.execute(`UPDATE shipping SET status = ? WHERE id = ?`, ["In Transit", shipping.id])

          // Add history entry
          await connection.execute(
            `INSERT INTO history_entry (shippingId, date, location, status) 
             VALUES (?, ?, ?, ?)`,
            [shipping.id, new Date(), shipping.location, "IRS Hold Cleared - Payment Verified"],
          )
        })

        revalidatePath(`/track/${trackingNumber}`)
        return true
      }

      return false
    } catch (error) {
      console.error("Database error:", error)
      throw new Error("Failed to verify IRS payment")
    }
  })
}

export async function addHistoryEntry(shippingId: number, entry: { status: string; location: string; date: string }) {
  return withRetry(async () => {
    try {
      await transaction(async (connection) => {
        // Create new history entry
        await connection.execute(
          `INSERT INTO history_entry (shippingId, date, location, status) 
           VALUES (?, ?, ?, ?)`,
          [shippingId, new Date(entry.date), entry.location, entry.status],
        )

        // Update shipping last update and status
        await connection.execute(
          `UPDATE shipping 
           SET lastUpdate = ?, status = ?, location = ? 
           WHERE id = ?`,
          [new Date(), entry.status, entry.location, shippingId],
        )
      })

      // Get shipping record for revalidation
      const shippings = (await query(`SELECT trackingNumber FROM shipping WHERE id = ?`, [shippingId])) as any[]

      if (shippings.length > 0) {
        revalidatePath(`/track/${shippings[0].trackingNumber}`)
      }

      revalidatePath("/dashboard/list")
    } catch (error) {
      console.error("Database error:", error)
      throw new Error("Failed to add history entry")
    }
  })
}
