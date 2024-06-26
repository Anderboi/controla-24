import type { Metadata } from "next";
import { Rubik as FontSans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/utils/utils";
import { ThemeProvider } from "@/app/dashboard/_components/theme-provider";
import { dark } from "@clerk/themes";
import { ruRU } from "@clerk/localizations";
import Header from "./dashboard/_components/header";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({ subsets: ["cyrillic"], variable: "--font-sans" });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Controla",
  description: "Design under control",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ruRU} appearance={{baseTheme: [dark]}}>
      <html lang="ru" suppressHydrationWarning>
        <body
          className={cn(
            "font-sans antialiased dark:bg-neutral-950 bg-neutral-100",
            fontSans.className,
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
