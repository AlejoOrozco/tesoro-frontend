import type { ComponentPropsWithoutRef, ReactElement } from "react";

import { ChatIcon, ShieldCheckIcon, SmartphoneIcon, TruckIcon } from "@/components/icons";

type IconComponent = (props: ComponentPropsWithoutRef<"svg">) => ReactElement;

const TRUST_ITEMS: readonly { readonly icon: IconComponent; readonly label: string }[] = [
  { icon: TruckIcon, label: "Envíos a todo el país" },
  { icon: SmartphoneIcon, label: "Producto original" },
  { icon: ChatIcon, label: "Asesoría personalizada" },
  { icon: ShieldCheckIcon, label: "Garantía incluida" },
];

/** Compact proof row on the navy hero — matches the approved mocks, without payment claims the shop doesn't support yet. */
export function HeroTrust(): ReactElement {
  return (
    <ul className="mt-12 grid gap-4 border-t border-navy-700 pt-8 sm:grid-cols-2 lg:grid-cols-4">
      {TRUST_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.label} className="flex items-center gap-3 text-sm text-neutral-300">
            <span className="flex size-8 shrink-0 items-center justify-center text-gold-200 [&_svg]:size-6">
              <Icon />
            </span>
            {item.label}
          </li>
        );
      })}
    </ul>
  );
}
