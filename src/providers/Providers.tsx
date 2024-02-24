"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider } from "./Theme";
import { CartProvider } from "./Cart";
import { Toaster } from "./Toaster";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <CartProvider>{children}</CartProvider>
      <Toaster />
    </ThemeProvider>
  );
}
