export const PAYMENT_PROVIDERS = ['stripe', 'steam'] as const

export type PaymentProviderName = typeof PAYMENT_PROVIDERS[number]

export const PAYMENT_ORDER_STATUSES = ['pending', 'paid', 'canceled', 'expired'] as const

export type PaymentOrderStatus = typeof PAYMENT_ORDER_STATUSES[number]

export type ClaimStatus = 'paid' | 'canceled' | 'expired'

/**
 * Channel claim for a pending `payment_order`.
 *
 * The channel maps a verified provider event onto this receipt.
 * CORE claims by `paymentOrderId`.
 */
export interface ClaimReceipt {
  kind: 'claim'
  provider: 'stripe' | 'steam'
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
