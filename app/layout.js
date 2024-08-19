"use client";  // Ensures the component renders client-side
import { Outfit } from "next/font/google";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import "./globals.css";
import Header from "./_components/Header";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";
import { UpdateCartContext } from "./_context/UpdateCartContext";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [updateCart, setUpdateCart] = useState(false);
  
  // Determine if the Header should be shown or hidden
  const showHeader = !(pathname === "/sign-in" || pathname === "/create-account");

  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID , currency:"USD"  }}
    >
    <html lang="en">
      <body className={outfit.className}>
        <UpdateCartContext.Provider value={{ updateCart, setUpdateCart }}>
          {showHeader && <Header />}
          {children}
          <Toaster />
        </UpdateCartContext.Provider>
      </body>
    </html>
    </PayPalScriptProvider>
  );
}
