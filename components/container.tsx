import type { ComponentPropsWithoutRef, ReactElement } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div">;

/** Page-width wrapper. 84rem is the 7.5xl slot (6xl=72rem, 7xl=80rem; no named 7.5). */
export function Container({ className, ...rest }: ContainerProps): ReactElement {
  return <div className={["mx-auto w-full max-w-[84rem] px-4 sm:px-8", className].filter(Boolean).join(" ")} {...rest} />;
}
