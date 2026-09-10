/** Union (not plain string) so the icon map in the section stays exhaustive. */
export type ServiceId = "catalog" | "shipping" | "warranty" | "advice";

export interface Service {
  readonly id: ServiceId;
  readonly title: string;
  readonly description: string;
  /** Prefilled WhatsApp text for this service's CTA. */
  readonly whatsappMessage: string;
}

/**
 * Static content per PROJECT_PLAN §11 — no Service entity in the MVP.
 * General copy written for real (client reviews per contract); refined in the
 * content-refactor pass when final wording lands.
 */
export const SERVICES: readonly Service[] = [
  {
    id: "catalog",
    title: "Tecnología y accesorios",
    description: "Celulares, audio y accesorios originales de las marcas que buscas, con stock real.",
    whatsappMessage: "Hola, quiero más información sobre sus productos de tecnología y accesorios.",
  },
  {
    id: "shipping",
    title: "Envíos a todo el país",
    description: "Despachamos tu pedido con transportadoras aliadas para que llegue a cualquier ciudad de Colombia.",
    whatsappMessage: "Hola, quiero más información sobre los envíos.",
  },
  {
    id: "warranty",
    title: "Garantía y soporte",
    description: "Te acompañamos después de la compra: garantía sobre nuestros productos y soporte directo.",
    whatsappMessage: "Hola, necesito ayuda con una garantía o con soporte.",
  },
  {
    id: "advice",
    title: "Asesoría personalizada",
    description: "¿No sabes qué elegir? Te ayudamos a encontrar el producto ideal según tu necesidad y presupuesto.",
    whatsappMessage: "Hola, quiero una asesoría para elegir un producto.",
  },
];
