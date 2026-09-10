"use client";

import type { FormEvent, ReactElement } from "react";

import { MailIcon } from "@/components/icons";
import { Section } from "@/components/section";
import { Heading } from "@/components/typography";

/** UI-only: no endpoint yet (deferred until backend). Native validation still runs. */
function handleSubscribe(event: FormEvent<HTMLFormElement>): void {
  event.preventDefault();
}

export function NewsletterSignup(): ReactElement {
  return (
    <Section>
      <div className="flex flex-col gap-6 rounded-lg bg-chrome p-6 text-chrome-foreground sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex max-w-xl items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center text-gold-200 [&_svg]:size-8">
            <MailIcon />
          </span>
          <div className="flex flex-col gap-2">
            <Heading level={2}>Mantente conectado con nuestras novedades</Heading>
            <p className="text-base leading-relaxed text-neutral-300">
              Recibe ofertas exclusivas, nuevos lanzamientos y mucho más en tu correo.
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubscribe}
          className="flex h-14 w-full max-w-md items-center gap-1 rounded-full border border-navy-700 bg-navy-800 p-1 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary"
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
            className="h-full min-w-0 flex-1 bg-transparent px-4 text-sm text-chrome-foreground outline-none placeholder:text-neutral-300 focus-visible:outline-none"
          />
          <button
            type="submit"
            className="h-full shrink-0 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors duration-micro hover:bg-primary-hover active:bg-primary-active focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Suscribirse
          </button>
        </form>
      </div>
    </Section>
  );
}
