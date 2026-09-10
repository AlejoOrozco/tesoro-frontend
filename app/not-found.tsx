import type { Metadata } from "next";

import { ButtonLink } from "@/components/button";
import { EmptyState } from "@/components/empty-state";
import { CompassIcon } from "@/components/icons";
import { Section } from "@/components/section";
import { MAIN_CONTENT_ID } from "@/lib/landmarks";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <main id={MAIN_CONTENT_ID} tabIndex={-1} className="flex min-h-dvh items-center">
      <Section className="w-full">
        <EmptyState
          icon={<CompassIcon />}
          title="No encontramos esta página"
          description="Puede que el enlace haya cambiado o que la página ya no exista. Te llevamos de vuelta a un lugar seguro."
          action={<ButtonLink href="/">Volver al inicio</ButtonLink>}
        />
      </Section>
    </main>
  );
}
