import type { ComponentPropsWithoutRef, ReactElement } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div">;

/** Page-width wrapper: shared max-width, horizontal padding from the spacing scale (16/32px). */
export function Container({ className, ...rest }: ContainerProps): ReactElement {
  return <div className={["mx-auto w-full max-w-6xl px-4 sm:px-8", className].filter(Boolean).join(" ")} {...rest} />;
}
