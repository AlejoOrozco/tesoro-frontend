import type { ReactElement, ReactNode } from "react";

/** Shared gold/navy promo strip: rail title scale, compact copy, action on the right. */
export function PromoStrip({
  className,
  title,
  description,
  descriptionClassName,
  children,
}: {
  readonly className: string;
  readonly title: ReactNode;
  readonly description: string;
  readonly descriptionClassName: string;
  readonly children: ReactNode;
}): ReactElement {
  return (
    <aside
      className={[
        "rail-card flex flex-col gap-4 rounded-lg p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-6",
        className,
      ].join(" ")}
    >
      <div className="flex min-w-0 flex-col gap-1">
        <p className="text-base font-bold tracking-tight sm:text-lg">{title}</p>
        <p className={descriptionClassName}>{description}</p>
      </div>
      <div className="w-full shrink-0 sm:w-auto sm:self-center">{children}</div>
    </aside>
  );
}
