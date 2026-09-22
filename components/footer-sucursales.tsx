import type { ReactElement } from "react";

import { FOOTER_HEADING_CLASSES, FOOTER_LINK_CLASSES } from "@/components/footer-styles";
import { SUCURSALES } from "@/lib/sucursales";

/** Store names. Each link opens the location in Google Maps. */
export function FooterSucursales(): ReactElement {
  return (
    <nav id="sucursales" aria-label="Sucursales" className="relative z-10 lg:translate-y-8 lg:justify-self-end">
      <h2 className={FOOTER_HEADING_CLASSES}>Sucursales</h2>
      <ul className="mt-2">
        {SUCURSALES.map((sucursal) => (
          <li key={sucursal.id}>
            <a href={sucursal.mapsUrl} className={FOOTER_LINK_CLASSES} target="_blank" rel="noreferrer">
              {sucursal.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
