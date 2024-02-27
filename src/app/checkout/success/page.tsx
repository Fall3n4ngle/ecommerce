import { CheckoutSession } from "./components";
import { stripe } from "@/lib/stripe";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  searchParams: {
    session_id: string;
  };
};

export default async function Success({ searchParams: { session_id } }: Props) {
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
  if (!checkoutSession.customer_details) notFound();

  return (
    <CheckoutSession
      name={checkoutSession.customer_details.name ?? "Customer"}
      email={checkoutSession.customer_details.email ?? ""}
    />
  );
}

export const metadata: Metadata = {
  title: "Success",
};
