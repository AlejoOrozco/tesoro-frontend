import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import "./globals.css";

// Geometric sans close to the TESORO lockup; `latin` covers Spanish (ñ, áéíóú).
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tesoro Global SAS",
  description: "Conectando al mundo",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={outfit.variable}>
      <body className="bg-background font-sans text-foreground">{children}</body>
    </html>
  );
}
