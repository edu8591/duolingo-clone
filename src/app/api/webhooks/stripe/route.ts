import { createUserSubscription, renewUserSubscription } from "@/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (e: any) {
    return new NextResponse(`Webhook error: ${e.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    if (!session?.metadata?.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    await createUserSubscription(
      session.metadata.userId,
      subscription.id,
      subscription.customer as string,
      subscription.items.data[0].price.id,
      new Date(subscription.current_period_end * 1000)
    );
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    await renewUserSubscription(
      subscription.items.data[0].price.id,
      new Date(subscription.current_period_end * 1000),
      subscription.id
    );
  }
  return new NextResponse(null, { status: 200 });
}
