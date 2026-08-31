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

/**
 * Channel request to insert a pending `payment_order`.
 *
 * The channel resolves the pack. CORE snapshots flux on the row.
 */
export interface OpenPendingInput {
  userId: string
  provider: string
  packKey: string
  fluxAmount: number
  currency?: string
}

export interface PendingPaymentOrder {
  id: string
  /** Live `provider_account` for this user and provider, when one exists. */
  providerCustomerId?: string
}

export interface BindProviderOrderInput {
  providerOrderId: string
  amount?: number
  currency?: string
}
