import Link from "next/link";
import type { ReactElement } from "react";

import { BrandLockup } from "@/components/brand-lockup";
import { Container } from "@/components/container";
import { contact, whatsappUrl } from "@/lib/contact";
import { LEGAL_ITEMS, NAV_ITEMS, type NavItem } from "@/lib/navigation";

interface ContactChannel {
  readonly href: string;
  readonly label: string;
  readonly isExternal: boolean;
}

/** Only configured channels render — no dead links while env values are pending. */
function contactChannels(): readonly ContactChannel[] {
  const whatsapp = whatsappUrl();
  const channels: Array<ContactChannel | null> = [
    whatsapp === null ? null : { href: whatsapp, label: "WhatsApp", isExternal: true },
    contact.phoneTel === ""
      ? null
      : { href: `tel:${contact.phoneTel}`, label: contact.phoneDisplay === "" ? contact.phoneTel : contact.phoneDisplay, isExternal: false },
    contact.email === "" ? null : { href: `mailto:${contact.email}`, label: contact.email, isExternal: false },
  ];
  return channels.filter((channel): channel is ContactChannel => channel !== null);
}

const FOOTER_LINK_CLASSES =
  "inline-flex min-h-11 items-center text-sm text-neutral-300 transition-colors duration-micro hover:text-gold-200 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm";

function FooterLinkColumn({ title, items }: { readonly title: string; readonly items: readonly NavItem[] }): ReactElement {
  return (
    <nav aria-label={title}>
      <h2 className="text-sm font-semibold tracking-wide text-gold-200">{title}</h2>
      <ul className="mt-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={FOOTER_LINK_CLASSES}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter(): ReactElement {
  const channels = contactChannels();

  return (
    <footer className="bg-chrome text-chrome-foreground">
      <Container className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4 sm:py-16">
        <div className="flex flex-col items-start gap-4">
          <BrandLockup />
          <p className="text-sm text-neutral-300">
            Tecnología y accesorios, sin fronteras. Productos originales con envío a todo el país.
          </p>
        </div>

        <FooterLinkColumn
          title="Navegación"
          items={[...NAV_ITEMS, { href: "/#sucursales", label: "Sucursales" }]}
        />

        <FooterLinkColumn title="Legal" items={LEGAL_ITEMS} />

        {channels.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-gold-200">Contacto</h2>
            <ul className="mt-2">
              {channels.map((channel) => (
                <li key={channel.href}>
                  <a
                    href={channel.href}
                    className={FOOTER_LINK_CLASSES}
                    {...(channel.isExternal && { target: "_blank", rel: "noreferrer" })}
                  >
                    {channel.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>

      <div className="border-t border-navy-700">
        <Container className="flex min-h-11 flex-wrap items-center justify-between gap-2 py-4">
          <p className="text-xs text-neutral-300">
            © {new Date().getFullYear()} Tesoro Global SAS. Todos los derechos reservados.
          </p>
          <p className="text-xs text-neutral-300">Conectando al mundo</p>
        </Container>
      </div>
    </footer>
  );
}
