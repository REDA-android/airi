export type ClaimStatus = 'paid' | 'canceled' | 'expired'

/**
 * Channel claim for a pending `payment_order`.
 *
 * The channel maps a verified provider event onto this receipt.
 * CORE claims by `paymentOrderId`.
 */
export interface ClaimReceipt {
  kind: 'claim'
  provider: 'stripe'
  paymentOrderId: string
  providerOrderId: string
  status: ClaimStatus
  amount?: number
  currency?: string
  providerCustomerId?: string
  extras?: Record<string, unknown>
}

export type SettleResult
  = | { applied: true, userId: string, fluxAmount: number, balanceAfter: number }
    | { applied: false }
