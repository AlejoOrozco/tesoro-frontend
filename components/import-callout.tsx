import type { ReactElement } from "react";

import { ContactCta } from "@/components/contact-cta";
import { GlobeIcon } from "@/components/icons";
import { Section } from "@/components/section";
import { Heading, Text } from "@/components/typography";

const IMPORT_WHATSAPP_MESSAGE = "Hola, quiero cotizar una importación.";

/** Gold band from the approved mocks — import-on-demand, no fake catalog. */
export function ImportCallout(): ReactElement {
  return (
    <Section className="bg-secondary">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex max-w-2xl items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-background text-foreground [&_svg]:size-6">
            <GlobeIcon />
          </span>
          <div className="flex flex-col gap-2">
            <Heading level={2}>¿No lo encuentras aquí?</Heading>
            <Text tone="muted">Lo traemos por ti desde el exterior. Importación personalizada, segura y confiable.</Text>
          </div>
        </div>
        <ContactCta
          message={IMPORT_WHATSAPP_MESSAGE}
          whatsappLabel="Cotiza la importación"
          fallbackLabel="Cotiza la importación"
          variant="primary"
          size="lg"
        />
      </div>
    </Section>
  );
}
