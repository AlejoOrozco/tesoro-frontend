import type { ComponentPropsWithoutRef, ReactElement } from "react";

import { Container } from "@/components/container";

type SectionProps = ComponentPropsWithoutRef<"section">;

/**
 * Landing-page building block: vertical rhythm from the spacing scale
 * (48/64px) around a width-constrained Container.
 */
export function Section({ className, children, ...rest }: SectionProps): ReactElement {
  return (
    <section className={["py-12 sm:py-16", className].filter(Boolean).join(" ")} {...rest}>
      <Container>{children}</Container>
    </section>
  );
}
