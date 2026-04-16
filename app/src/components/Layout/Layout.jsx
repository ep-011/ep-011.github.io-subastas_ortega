import React from "react";
import Header from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartProvider";
import UserProvider from "@/context/UserProvider";

export function Layout() {
  return (
    <UserProvider>
      <CartProvider>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <Header />
          <main className="flex-1 pt-16">
            <Toaster position="bottom-right" />
            <Outlet />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </UserProvider>
  );
}
