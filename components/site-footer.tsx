import Link from "next/link";
import type { ReactElement } from "react";

import { Container } from "@/components/container";
import { FooterBrand } from "@/components/footer-brand";
import { FooterCredit } from "@/components/footer-credit";
import { FooterGlobe } from "@/components/footer-globe";
import { FooterSucursales } from "@/components/footer-sucursales";
import { FOOTER_HEADING_CLASSES, FOOTER_LINK_CLASSES } from "@/components/footer-styles";
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
      : {
          href: `tel:${contact.phoneTel}`,
          label: contact.phoneDisplay === "" ? contact.phoneTel : contact.phoneDisplay,
          isExternal: false,
        },
    contact.email === "" ? null : { href: `mailto:${contact.email}`, label: contact.email, isExternal: false },
  ];
  return channels.filter((channel): channel is ContactChannel => channel !== null);
}

function FooterLinkColumn({
  title,
  items,
}: {
  readonly title: string;
  readonly items: readonly NavItem[];
}): ReactElement {
  return (
    <nav aria-label={title} className="relative z-10">
      <h2 className={FOOTER_HEADING_CLASSES}>{title}</h2>
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

function FooterContact({ channels }: { readonly channels: readonly ContactChannel[] }): ReactElement | null {
  if (channels.length === 0) return null;
  return (
    <div>
      <h2 className={FOOTER_HEADING_CLASSES}>Contacto</h2>
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
  );
}

export function SiteFooter(): ReactElement {
  const channels = contactChannels();
  const year = new Date().getFullYear();

  return (
    <footer className="footer-float bg-chrome text-chrome-foreground">
      <Container className="pt-16 pb-8 sm:pt-20">
        <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
          <div className="relative z-10 flex flex-col gap-6 lg:translate-y-8">
            <FooterBrand />
            <FooterContact channels={channels} />
          </div>
          <FooterLinkColumn title="Navegación" items={NAV_ITEMS} />
          <FooterLinkColumn title="Legal" items={LEGAL_ITEMS} />
          <FooterSucursales />
          <div className="relative z-0 flex justify-center sm:col-span-2 lg:col-span-4 lg:-mt-32">
            <FooterGlobe />
          </div>
        </div>
        <div className="relative z-10 mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-300">© {year} Tesoro Global SAS. Todos los derechos reservados.</p>
          <FooterCredit />
        </div>
      </Container>
    </footer>
  );
}
