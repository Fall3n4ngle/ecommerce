import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { headers } from "next/headers";
import { safeParse } from "valibot";
import { createOrder } from "./actions/order";
import {
  checkoutDataSchema,
  productDataSchema,
} from "./validations/checkoutData";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || "",
    );
  } catch (err) {
    console.log(err);

    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
      { status: 400 },
    );
  }

  switch (event.type) {
    case "checkout.session.completed":
      if (
        !("id" in event.data.object) ||
        typeof event.data.object.id !== "string"
      ) {
        return NextResponse.json(
          { message: "object id was not found" },
          {
            status: 500,
          },
        );
      }

      const { data: lineItems } = await stripe.checkout.sessions.listLineItems(
        event.data.object.id,
        {
          expand: ["data.price.product"],
        },
      );

      const orderItems = lineItems.map((lineItem) => {
        if (!lineItem.price) {
          return;
        }

        const productData = lineItem.price.product;
        const validatedProductData = safeParse(productDataSchema, productData);

        if (!validatedProductData.success) {
          return;
        }

        return {
          name: validatedProductData.output.name,
          size: validatedProductData.output.metadata.size,
          color: validatedProductData.output.metadata.color,
          price: lineItem.amount_total,
          quantity: lineItem.quantity ?? 0,
        };
      });

      const checkoutData = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
      );

      const validatedData = safeParse(checkoutDataSchema, {
        itemsPrice: checkoutData.amount_subtotal,
        shippingPrice: checkoutData.shipping_cost?.amount_total,
        totalPrice: checkoutData.amount_total,
        paymentStatus: checkoutData.payment_status,
        customerDetails: checkoutData.customer_details,
      });

      if (!validatedData.success) {
        return NextResponse.json(
          { message: "Incomplete checkout data" },
          {
            status: 500,
          },
        );
      }

      try {
        const createdOrder = await createOrder({
          orderItems,
          paymentDate: new Date(Date.now()),
          deliveryDate: null,
          deliveryStatus: "not delivered",
          ...validatedData.output,
        });

        return NextResponse.json(createdOrder);
      } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
      }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({});
}
