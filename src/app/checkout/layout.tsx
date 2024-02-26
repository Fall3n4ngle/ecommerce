import { Metadata } from "next";
import { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return <div className="fixed left-0 top-0 h-full w-full">{children}</div>;
}

export const metadata: Metadata = {
  title: "Checkout",
  robots: {
    index: false,
    follow: true,
  },
};
