import type { ReactElement } from "react";

import { ContactCta } from "@/components/contact-cta";
import { ImportRoute } from "@/components/import-route";
import { PromoStrip } from "@/components/promo-strip";

const IMPORT_WHATSAPP_MESSAGE = "Hola, quiero cotizar una importación.";

/** Gold import strip — same type scale as the collection rails, with a small route loop. */
export function ImportCallout(): ReactElement {
  return (
    <PromoStrip
      className="import-callout"
      decoration={<ImportRoute />}
      title={
        <>
          ¿No lo encuentras aquí?{" "}
          <span className="font-medium">Lo traemos por ti desde EE.UU. y China</span>
        </>
      }
      description="Servicio de importación personalizado. Conseguimos lo que necesitas al mejor costo."
      descriptionClassName="text-xs leading-relaxed text-navy-800"
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
