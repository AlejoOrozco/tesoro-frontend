import type { ReactElement } from "react";

import { MapPinIcon } from "@/components/icons";
import { Section } from "@/components/section";
import { Heading, Text } from "@/components/typography";
import { SUCURSALES, type Sucursal } from "@/lib/sucursales";

function SucursalCard({ sucursal }: { readonly sucursal: Sucursal }): ReactElement {
  return (
    <li className="flex items-start gap-4 rounded-lg border border-border bg-background p-6">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-secondary text-foreground [&_svg]:size-6">
        <MapPinIcon />
      </span>
      <div className="flex flex-col gap-1">
        <Heading level={3}>{sucursal.name}</Heading>
        <Text tone="muted">{sucursal.city}</Text>
        <Text tone="muted">{sucursal.address}</Text>
        {sucursal.mapsUrl !== undefined && (
          <a
            href={sucursal.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-flex min-h-11 items-center text-sm font-medium text-foreground underline underline-offset-4 transition-colors duration-micro hover:text-muted rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Ver en Google Maps
          </a>
        )}
      </div>
    </li>
  );
}

/** The footer's "Sucursales" link targets this section's id. */
export function SucursalesSection(): ReactElement {
  return (
    <Section id="sucursales" className="scroll-mt-16 bg-surface">
      <Heading level={2}>Nuestras sucursales</Heading>
      <Text tone="muted" className="mt-2 max-w-2xl">
        Visítanos en nuestros puntos de venta. Pronto publicaremos las direcciones y los horarios completos.
      </Text>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {SUCURSALES.map((sucursal) => (
          <SucursalCard key={sucursal.id} sucursal={sucursal} />
        ))}
      </ul>
    </Section>
  );
}
