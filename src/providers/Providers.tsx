"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider } from "./Theme";
import { CartProvider } from "./Cart";
import { Toaster } from "@/ui";
import { Check } from "lucide-react";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <CartProvider>{children}</CartProvider>
      <Toaster
        icons={{
          success: (
            <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary">
              <Check className="h-5 w-5 text-[#f8f8f7]" />
            </div>
          ),
        }}
        toastOptions={{
          classNames: {
            title: "ml-4 text-base !font-normal",
          },
          duration: 2000,
          className: "!duration-200 !py-5",
        }}
      />
    </ThemeProvider>
  );
}
