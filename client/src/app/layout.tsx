import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Box, Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Teapost | Home",
  description: "Your daily tea-time current affair news portal",
  keywords: "blog post samad.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
