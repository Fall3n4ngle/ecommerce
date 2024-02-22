import { CheckoutSession } from "@/app/success/components";
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

  if (!checkoutSession.customer_details) {
    return notFound();
  }

  return (
    <div className="h-full pt-[5%]">
      <CheckoutSession customerDetails={checkoutSession.customer_details} />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Success",
  robots: {
    index: false,
    follow: true,
  },
};
