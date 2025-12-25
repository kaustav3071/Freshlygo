import type { Metadata } from "next";
import "./globals.css";
import motion from "motion/react";
import Provider from "@/provider"
import StoreProvider from "@/redux/storeProvider"
import InitUser from "@/InitUser";

export const metadata: Metadata = {
  title: "FreshlyGo",
  description: "10 minutes to fresh groceries and healthy lifestyle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full min-h-screen bg-gradient-to-b from-purple-50 via-violet-50 to-indigo-50">
        <Provider>
          <StoreProvider>
        <InitUser/>
            {children}
          </StoreProvider>
        </Provider>
      </body>
    </html>
  );
}
