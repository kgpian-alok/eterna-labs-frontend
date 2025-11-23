import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import Providers from "@/lib/providers"; // Import the new wrapper
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Token Trading Table",
  description: "Real-time token discovery and analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black min-h-screen relative overflow-x-hidden`}
      >
        <Providers>
          <BackgroundEffects />
          <main className="relative z-10">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
