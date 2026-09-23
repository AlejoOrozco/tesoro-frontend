import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import type { ReactElement } from "react";

import { PageIntro } from "@/components/page-intro";
import { SkipToContent } from "@/components/skip-to-content";
import { ThemeInitScript } from "@/components/theme-init-script";
import { ThemeProvider } from "@/components/theme-provider";
import { SEEDS } from "@/scripts/tokens/scale-config";

import "./globals.css";
import "@/components/page-intro.css";

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
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">): ReactElement {
  // ThemeInitScript may set data-theme on this element before hydration.
  return (
    <html lang="es" className={montserrat.variable} suppressHydrationWarning>
      <body className="bg-background font-sans font-medium text-foreground">
        <ThemeInitScript />
        <ThemeProvider>
          <PageIntro>
            <SkipToContent />
            {children}
          </PageIntro>
        </ThemeProvider>
      </body>
    </html>
  );
}
