import { boolean, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { nanoid } from '../utils/id'

// NOTICE:
// These tables are unused at runtime. They keep the pre-payment_order Stripe
// rows after 0024 renamed the live names. drizzle-kit generate diffs this
// schema and emits DROP if they are removed.
// Source: server/apps/api/drizzle/0024_rename_stripe_tables.sql
// Removal condition: a later SQL migration drops the archive tables when
// the copied rows are no longer needed.
export const stripeCustomer = pgTable('legacy_stripe_customer', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  userId: text('user_id').notNull(),
  stripeCustomerId: text('stripe_customer_id').notNull().unique(),
  email: text('email'),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
})

export const stripeCheckoutSession = pgTable('legacy_stripe_checkout_session', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  userId: text('user_id').notNull(),
  stripeSessionId: text('stripe_session_id').notNull().unique(),
  stripeCustomerId: text('stripe_customer_id'),
  mode: text('mode').notNull(),
  status: text('status'),
  paymentStatus: text('payment_status'),
  amountTotal: integer('amount_total'),
  currency: text('currency'),
  successUrl: text('success_url'),
  cancelUrl: text('cancel_url'),
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  fluxCredited: boolean('flux_credited').notNull().default(false),
  metadata: text('metadata'),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
})

export const stripeSubscription = pgTable('legacy_stripe_subscription', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  userId: text('user_id').notNull(),
  stripeSubscriptionId: text('stripe_subscription_id').notNull().unique(),
  stripeCustomerId: text('stripe_customer_id').notNull(),
  stripePriceId: text('stripe_price_id'),
  status: text('status').notNull(),
  currentPeriodStart: timestamp('current_period_start'),
  currentPeriodEnd: timestamp('current_period_end'),
  cancelAtPeriodEnd: boolean('cancel_at_period_end'),
  canceledAt: timestamp('canceled_at'),
  endedAt: timestamp('ended_at'),
  metadata: text('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
})

export const stripeInvoice = pgTable('legacy_stripe_invoice', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  userId: text('user_id').notNull(),
  stripeInvoiceId: text('stripe_invoice_id').notNull().unique(),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  status: text('status'),
  amountDue: integer('amount_due'),
  amountPaid: integer('amount_paid'),
  currency: text('currency'),
  invoiceUrl: text('invoice_url'),
  invoicePdf: text('invoice_pdf'),
  periodStart: timestamp('period_start'),
  periodEnd: timestamp('period_end'),
  paidAt: timestamp('paid_at'),
  fluxCredited: boolean('flux_credited').notNull().default(false),
  metadata: text('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
})
