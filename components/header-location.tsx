import type { ReactElement } from "react";

import { MapPinIcon } from "@/components/icons";

const LOCATION_CLASSES =
  "header-dept inline-flex min-h-11 max-w-40 items-center gap-2 rounded-md text-left " +
  "transition-colors duration-micro transition-transform duration-micro active:scale-[0.97] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

/** Delivery pin under the lockup — picker wires up with the store. */
export function HeaderLocation(): ReactElement {
  return (
    <button type="button" className={LOCATION_CLASSES} aria-label="Ingresa tu ubicación">
      <MapPinIcon className="size-5 shrink-0" />
      <span className="text-xs leading-tight">
        Ingresa tu
        <br />
        ubicación
      </span>
    </button>
  );
}
