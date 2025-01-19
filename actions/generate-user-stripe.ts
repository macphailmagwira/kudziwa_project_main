"use server";

import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { absoluteUrl } from "@/lib/utils";
import { redirect } from "next/navigation";

export type responseAction = {
  status: "success" | "error";
  stripeUrl?: string;
}

const billingUrl = absoluteUrl("/pricing");

export async function generateUserStripe(priceId: string): Promise<responseAction> {
  try {
    const session = await auth();
    const user = session?.user;

    if (!user || !user.email || !user.id) {
      return {
        status: "error"
      };
    }

    const subscriptionPlan = await getUserSubscriptionPlan(user.id);

    if (subscriptionPlan.isPaid && subscriptionPlan.stripeCustomerId) {
      // User on Paid Plan - Create a portal session to manage subscription.
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId.toString(), // Ensure customer ID is a string
        return_url: billingUrl,
      });

      if (!stripeSession.url) {
        throw new Error("No URL in Stripe session response");
      }

      return {
        status: "success",
        stripeUrl: stripeSession.url
      };
    } 
    
    // User on Free Plan - Create a checkout session to upgrade.
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
      },
    });

    if (!stripeSession.url) {
      throw new Error("No URL in Stripe session response");
    }

    return {
      status: "success",
      stripeUrl: stripeSession.url
    };

  } catch (error) {
    console.error("Stripe session creation failed:", error);
    return {
      status: "error"
    };
  }
}