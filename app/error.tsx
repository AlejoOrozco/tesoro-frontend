"use client";

import type { ReactElement } from "react";

import { Button } from "@/components/button";
import { EmptyState } from "@/components/empty-state";
import { AlertTriangleIcon } from "@/components/icons";
import { Section } from "@/components/section";
import { MAIN_CONTENT_ID } from "@/lib/landmarks";

interface RootErrorProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

/**
 * Root error boundary: plain-language message + retry, never internal details
 * (docs/design/empty-and-error-states.md + loading-states.md rule 6).
 */
export default function RootError({ reset }: RootErrorProps): ReactElement {
  return (
    <main id={MAIN_CONTENT_ID} tabIndex={-1} className="flex min-h-dvh items-center">
      <Section className="w-full">
        <EmptyState
          icon={<AlertTriangleIcon />}
          title="Algo salió mal"
          description="Ocurrió un error inesperado de nuestro lado. Intenta de nuevo; si el problema continúa, vuelve en unos minutos."
          action={<Button onClick={reset}>Intentar de nuevo</Button>}
        />
      </Section>
    </main>
  );
}
