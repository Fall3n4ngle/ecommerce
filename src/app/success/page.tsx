import CheckoutSession from "@/components/success/CheckoutSession";
import { stripe } from "@/lib/stripe";
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
