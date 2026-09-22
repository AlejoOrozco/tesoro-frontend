"use client";

import type { FormEvent, ReactElement } from "react";

import { Button } from "@/components/button";
import { PromoStrip } from "@/components/promo-strip";

/** UI-only: no endpoint yet (deferred until backend). Native validation still runs. */
function handleSubscribe(event: FormEvent<HTMLFormElement>): void {
  event.preventDefault();
}

export function NewsletterSignup(): ReactElement {
  return (
    <PromoStrip
      className="bg-chrome text-chrome-foreground"
      title="Mantente conectado con nuestras novedades"
      description="Recibe ofertas exclusivas, nuevos lanzamientos y mucho más en tu correo."
      descriptionClassName="text-xs leading-relaxed text-neutral-300"
    >
      <form
        onSubmit={handleSubscribe}
        className="flex h-9 w-full max-w-sm items-center gap-2"
        aria-label="Novedades por correo"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Tu correo electrónico
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Tu correo electrónico"
          className="h-9 min-w-0 flex-1 rounded-md border border-navy-700 bg-navy-800 px-3 text-xs text-chrome-foreground outline-none placeholder:text-neutral-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
        <Button type="submit" variant="secondary" size="sm">
          Suscribirse
        </Button>
      </form>
    </PromoStrip>
  );
}
