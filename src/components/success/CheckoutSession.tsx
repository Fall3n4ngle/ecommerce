"use client";

import { useEffect } from "react";
import Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";
import { CheckCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

type Props = {
  customerDetails: Stripe.Checkout.Session.CustomerDetails;
};

export default function CheckoutSession({ customerDetails }: Props) {
  const { clearCart } = useShoppingCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <CheckCheck className="h-10 w-10  dark:text-lime-500" />
      <h2 className="text-3xl font-bold tracking-tight text-lime-500 sm:text-5xl">
        Order successful!
      </h2>
      <h3 className="text-2xl leading-7">
        Thank you,{" "}
        <span className="font-extrabold">{customerDetails.name}</span>
      </h3>
      <p>
        Check your purchase email{" "}
        <span className="mx-1 font-bold text-indigo-400">
          {customerDetails.email}
        </span>{" "}
        for your invoice.
      </p>
      <Link href="/">
        <Button>Go home</Button>
      </Link>
    </div>
  );
}
