import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { headers } from "next/headers";
import { safeParse } from "valibot";
import { createOrder, updateProductCountInStock } from "./actions";
import {
  checkoutDataSchema,
  productDataSchema,
} from "./validations/checkoutData";
import { redirect } from "next/navigation";

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
    redirect("/checkout/paymentError");
  }

  if (event.type !== "checkout.session.completed") return;

  if (
    !("id" in event.data.object) ||
    typeof event.data.object.id !== "string"
  ) {
    redirect("/checkout/paymentError");
  }

  try {
    const { data: lineItems } = await stripe.checkout.sessions.listLineItems(
      event.data.object.id,
      {
        expand: ["data.price.product"],
      },
    );

    const orderItemsPromises = lineItems.map(async (lineItem) => {
      if (!lineItem.price?.product) {
        throw new Error(`Product not found`);
      }

      const validatedProductData = safeParse(
        productDataSchema,
        lineItem.price.product,
      );

      if (!validatedProductData.success) {
        throw new Error(`Invalid product data`);
      }

      const {
        name,
        metadata: { color, id, size },
      } = validatedProductData.output;

      const item = {
        name,
        size,
        color,
        price: lineItem.amount_total,
        quantity: lineItem.quantity ?? 0,
      };

      // await updateProductCountInStock({ id, value: item.quantity });

      return item;
    });

    const orderItems = await Promise.all(orderItemsPromises);

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
      throw new Error("Invalid checkout data");
    }

    await createOrder({
      orderItems,
      paymentDate: new Date(),
      deliveryDate: null,
      deliveryStatus: "not delivered",
      ...validatedData.output,
    });
  } catch (error: any) {
    try {
      const { payment_intent } = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
      );

      if (!payment_intent) {
        throw new Error(
          "Could not find the ID of the PaymentIntent for Checkout Sessions",
        );
      }

      await stripe.refunds.create({
        payment_intent: payment_intent.toString(),
      });
    } catch (error) {
      redirect("/checkout/refundError");
    }

    redirect("/checkout/refundSuccess");
  }
}
