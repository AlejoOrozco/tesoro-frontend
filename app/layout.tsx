import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";

import { SkipToContent } from "@/components/skip-to-content";
import { ThemeInitScript } from "@/components/theme-init-script";
import { SEEDS } from "@/scripts/tokens/scale-config";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-montserrat",
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
    // ThemeInitScript sets data-theme on <html> before hydration (no-flash). That
    // attribute is expected to differ from the SSR markup; suppress only this node.
    <html lang="es" className={montserrat.variable} suppressHydrationWarning>
      <body className="bg-background font-sans font-medium text-foreground">
        <ThemeInitScript />
        <SkipToContent />
        {children}
      </body>
    </html>
  );
}
