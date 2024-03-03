import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Box, Container, ScrollArea, Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import { LAYOUT_DIMS } from "./LAYOUT_DIMS";

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

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  const theme = cookies().get("teapost-theme")?.value ?? "light";
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <Theme
          // @ts-ignore
          appearance={theme}
          accentColor="cyan"
          // grayColor="gray"
          panelBackground="solid"
          scaling="100%"
          radius="large"
        >
          <Box className="w-screen max-w-screen h-screen max-h-screen overflow-hidden flex flex-col">
            <Navbar heights={LAYOUT_DIMS} />
            <Box
              className={
                "flex-1 border-0 border-blue-500 overflow-hidden relative"
                // + LAYOUT_DIMS.content
              }
            >
              {children}
            </Box>
          </Box>
        </Theme>
      </body>
    </html>
  );
}
