import Link from "next/link";
import type { ReactElement } from "react";

import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/components/button";
import { whatsappUrl } from "@/lib/contact";

interface ContactCtaProps {
  readonly message: string;
  readonly label: string;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
}

/** WhatsApp with a prefilled message when configured; /contact otherwise. */
export function ContactCta({
  message,
  label,
  variant = "secondary",
  size = "md",
}: ContactCtaProps): ReactElement {
  const whatsapp = whatsappUrl(message);
  const classes = buttonClasses(variant, size);
  if (whatsapp === null) {
    return (
      <Link href="/contact" className={classes}>
        {label}
      </Link>
    );
  }
  return (
    <a href={whatsapp} target="_blank" rel="noreferrer" className={classes}>
      {label}
    </a>
  );
}
