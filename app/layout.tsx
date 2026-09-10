import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";

import { SkipToContent } from "@/components/skip-to-content";
import { ThemeInitScript } from "@/components/theme-init-script";
import { SEEDS } from "@/scripts/tokens/scale-config";

import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tesoroglobalsas.com"),
  title: {
    default: "Tesoro Global SAS",
    template: "%s | Tesoro Global SAS",
  },
  description: "Conectando al mundo. Tecnología y accesorios con Tesoro Global SAS.",
  applicationName: "Tesoro Global SAS",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: SEEDS.navy,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={outfit.variable}>
      <body className="bg-background font-sans text-foreground">
        <ThemeInitScript />
        <SkipToContent />
        {children}
      </body>
    </html>
  );
}
