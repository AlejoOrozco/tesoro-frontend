import Link from "next/link";
import type { ReactElement } from "react";

import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/components/button";
import { whatsappUrl } from "@/lib/contact";

interface ContactCtaProps {
  readonly message: string;
  readonly whatsappLabel: string;
  readonly fallbackLabel?: string;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
}

/** WhatsApp with a prefilled message when configured; /contact otherwise. */
export function ContactCta({
  message,
  whatsappLabel,
  fallbackLabel = "Contáctanos",
  variant = "secondary",
  size = "md",
}: ContactCtaProps): ReactElement {
  const whatsapp = whatsappUrl(message);
  const classes = buttonClasses(variant, size);
  if (whatsapp === null) {
    return (
      <Link href="/contact" className={classes}>
        {fallbackLabel}
      </Link>
    );
  }
  return (
    <a href={whatsapp} target="_blank" rel="noreferrer" className={classes}>
      {whatsappLabel}
    </a>
  );
}
