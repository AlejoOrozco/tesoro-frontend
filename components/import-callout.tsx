import type { ReactElement } from "react";

import { ContactCta } from "@/components/contact-cta";
import { PromoStrip } from "@/components/promo-strip";

const IMPORT_WHATSAPP_MESSAGE = "Hola, quiero cotizar una importación.";

/** Gold import strip — same type scale as the collection rails, no icon. */
export function ImportCallout(): ReactElement {
  return (
    <PromoStrip
      className="bg-secondary"
      title={
        <>
          ¿No lo encuentras aquí?{" "}
          <span className="font-medium">Lo traemos por ti desde EE.UU. y China</span>
        </>
      }
      description="Servicio de importación personalizado. Conseguimos lo que necesitas al mejor costo."
      descriptionClassName="text-xs leading-relaxed text-muted"
    >
      <ContactCta
        message={IMPORT_WHATSAPP_MESSAGE}
        label="Cotiza tu importación"
        variant="secondary"
        size="sm"
      />
    </PromoStrip>
  );
}
