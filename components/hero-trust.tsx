import type { ComponentPropsWithoutRef, ReactElement } from "react";

import { InertCta } from "@/components/inert-cta";
import { CreditCardIcon, ShieldCheckIcon, SmartphoneIcon, TruckIcon } from "@/components/icons";
import { SOFT_CARD_CLASSES } from "@/components/soft-card";

type IconComponent = (props: ComponentPropsWithoutRef<"svg">) => ReactElement;

interface TrustItem {
  readonly id: string;
  readonly icon: IconComponent;
  readonly title: string;
  readonly description: string;
  readonly cta: string;
}

const TRUST_ITEMS: readonly TrustItem[] = [
  {
    id: "delivery",
    icon: TruckIcon,
    title: "Recibe en 3 días",
    description: "Pedidos listos para salir a cualquier ciudad de Colombia.",
    cta: "Conocer envíos",
  },
  {
    id: "wompi",
    icon: CreditCardIcon,
    title: "Paga seguro con Wompi",
    description: "Checkout encriptado con los medios de pago que ya usas.",
    cta: "Conocer Wompi",
  },
  {
    id: "originals",
    icon: SmartphoneIcon,
    title: "Productos originales",
    description: "Tecnología y accesorios auténticos, de las marcas que buscas.",
    cta: "Ver productos",
  },
  {
    id: "warranty",
    icon: ShieldCheckIcon,
    title: "Hasta 2 años de garantía",
    description: "Te acompañamos después de la compra, según el producto.",
    cta: "Ver garantía",
  },
];

export function HeroTrust(): ReactElement {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {TRUST_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.id}>
            <article className={`${SOFT_CARD_CLASSES} flex h-full flex-col gap-3`}>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-medium">{item.title}</h3>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-surface text-foreground [&_svg]:size-5">
                  <Icon />
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted">{item.description}</p>
              <div className="mt-auto">
                <InertCta>{item.cta}</InertCta>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
