import type { ComponentPropsWithoutRef, ReactElement } from "react";

import { ContactCta } from "@/components/contact-cta";
import { ChatIcon, ShieldCheckIcon, SmartphoneIcon, TruckIcon } from "@/components/icons";
import { Section } from "@/components/section";
import { Heading, Text } from "@/components/typography";
import { SERVICES, type ServiceId } from "@/lib/services";

type IconComponent = (props: ComponentPropsWithoutRef<"svg">) => ReactElement;

const SERVICE_ICONS: Record<ServiceId, IconComponent> = {
  catalog: SmartphoneIcon,
  shipping: TruckIcon,
  warranty: ShieldCheckIcon,
  advice: ChatIcon,
};

export function ServicesSection(): ReactElement {
  return (
    <Section id="services" className="scroll-mt-16">
      <Heading level={2}>Nuestros servicios</Heading>
      <Text tone="muted" className="mt-2 max-w-2xl">
        Más que una tienda: te acompañamos antes, durante y después de tu compra.
      </Text>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {SERVICES.map((service) => {
          const Icon = SERVICE_ICONS[service.id];
          return (
            <li key={service.id} className="flex flex-col items-start gap-4 rounded-lg border border-border bg-surface p-6">
              <span className="flex size-12 items-center justify-center rounded-md bg-secondary text-foreground [&_svg]:size-6">
                <Icon />
              </span>
              <Heading level={3}>{service.title}</Heading>
              <Text tone="muted" className="flex-1">
                {service.description}
              </Text>
              <ContactCta message={service.whatsappMessage} whatsappLabel="Contáctanos por WhatsApp" />
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
