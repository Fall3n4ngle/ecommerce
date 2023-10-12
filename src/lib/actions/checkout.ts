"use server";

import { CartDetails } from "use-shopping-cart/core";
import { validateCartItems } from "@/lib/utils/validateCartItems";
import { getProducts } from "./product";
import { stripe } from "../stripe";
import { headers } from "next/headers";

export const checkout = async (cartDetails: CartDetails) => {
  try {
    const { data } = await getProducts({});
    const line_items = validateCartItems(data, cartDetails);
    const headerList = headers();
    const origin = headerList.get("origin");

    const session = await stripe.checkout.sessions.create({
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      shipping_address_collection: {
        allowed_countries: ["UA", "US"],
      },
      shipping_options: [
        {
          shipping_rate: "shr_1NxCJ4HmKq9gqokNIxXoYBgP",
        },
      ],
      billing_address_collection: "auto",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
    });

    return session;
  } catch (error: any) {
    throw new Error(`Error processing checkout: ${error.message}`);
  }
};
