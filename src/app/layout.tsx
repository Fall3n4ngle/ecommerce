import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header, Cart } from "@/app/components";
import { Providers } from "@/providers";
import type { Viewport } from "next";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="container flex-grow pb-10 pt-6">{children}</main>
          </div>
          <Cart />
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    default: "Ecommerce",
    template: "%s - Ecommerce",
  },
  description:
    "Discover the latest in fashion at our store! Unleash your style with our unique, high-quality clothing for affordable prices",
  twitter: {
    card: "summary_large_image",
  },
  keywords: [
    "Online Clothing Shop, Women's Apparel, Men's Apparel, Kids' Clothing, Fashion Accessories, Trendy Outfits, Summer Dresses, Winter Coats, Designer Clothing, Affordable Fashion",
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f97316" },
    { media: "(prefers-color-scheme: dark)", color: "#ea580c" },
  ],
  colorScheme: "dark light",
};
