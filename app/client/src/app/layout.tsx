import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Box, Container, ScrollArea, Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";

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
          grayColor="gray"
          panelBackground="solid"
          scaling="100%"
          radius="large"
        >
          <Box className="max-w-screen w-screen max-h-screen overflow-hidden h-full  flex flex-col">
            <Navbar />
            <ScrollArea
              type="auto"
              scrollbars="vertical"
              size="2"
              style={{
                minHeight: "100%",
                height: "100%",
              }}
              className="flex-1 h-full"
            >
              <Container className="p-2">{children}</Container>
            </ScrollArea>
          </Box>
        </Theme>
      </body>
    </html>
  );
}
