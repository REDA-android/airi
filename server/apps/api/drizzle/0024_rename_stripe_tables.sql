ALTER TABLE "user_flux" DROP COLUMN "stripe_customer_id";--> statement-breakpoint
ALTER TABLE "stripe_checkout_session" RENAME TO "legacy_stripe_checkout_session";--> statement-breakpoint
ALTER TABLE "legacy_stripe_checkout_session" RENAME CONSTRAINT "stripe_checkout_session_stripe_session_id_unique" TO "legacy_stripe_checkout_session_stripe_session_id_unique";--> statement-breakpoint
ALTER TABLE "stripe_customer" RENAME TO "legacy_stripe_customer";--> statement-breakpoint
ALTER TABLE "legacy_stripe_customer" RENAME CONSTRAINT "stripe_customer_stripe_customer_id_unique" TO "legacy_stripe_customer_stripe_customer_id_unique";--> statement-breakpoint
ALTER TABLE "stripe_invoice" RENAME TO "legacy_stripe_invoice";--> statement-breakpoint
ALTER TABLE "legacy_stripe_invoice" RENAME CONSTRAINT "stripe_invoice_stripe_invoice_id_unique" TO "legacy_stripe_invoice_stripe_invoice_id_unique";--> statement-breakpoint
ALTER TABLE "stripe_subscription" RENAME TO "legacy_stripe_subscription";--> statement-breakpoint
ALTER TABLE "legacy_stripe_subscription" RENAME CONSTRAINT "stripe_subscription_stripe_subscription_id_unique" TO "legacy_stripe_subscription_stripe_subscription_id_unique";
