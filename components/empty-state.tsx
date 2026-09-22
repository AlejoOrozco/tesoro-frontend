import type { ReactElement, ReactNode } from "react";

import { Heading, Text } from "@/components/typography";

interface EmptyStateProps {
  /** Decorative icon (see components/icons.tsx for the shared style). */
  readonly icon: ReactNode;
  readonly title: string;
  readonly description: string;
  /** One clear next step — usually a Button or ButtonLink. */
  readonly action: ReactNode;
}

/**
 * The one shared pattern for 404 / empty lists / failed requests
 * (docs/design/empty-and-error-states.md): icon + a human sentence + one action.
 */
export function EmptyState({ icon, title, description, action }: EmptyStateProps): ReactElement {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
      <div aria-hidden="true" className="text-muted [&_svg]:size-12">
        {icon}
      </div>
      <Heading level={1}>{title}</Heading>
      <Text>{description}</Text>
      <div className="mt-2">{action}</div>
    </div>
  );
}
