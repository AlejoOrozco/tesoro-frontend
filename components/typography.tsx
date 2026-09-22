import type { ComponentPropsWithoutRef, ReactElement } from "react";

type HeadingLevel = 1 | 2;

const HEADING_CLASSES: Record<HeadingLevel, string> = {
  1: "text-4xl font-bold tracking-tight text-balance sm:text-5xl",
  2: "text-2xl font-bold tracking-tight sm:text-3xl",
};

type HeadingProps = { readonly level: HeadingLevel } & ComponentPropsWithoutRef<"h1">;

export function Heading({ level, className, ...rest }: HeadingProps): ReactElement {
  const classes = [HEADING_CLASSES[level], className].filter(Boolean).join(" ");
  if (level === 1) return <h1 className={classes} {...rest} />;
  return <h2 className={classes} {...rest} />;
}

type TextProps = ComponentPropsWithoutRef<"p">;

export function Text({ className, ...rest }: TextProps): ReactElement {
  return <p className={["text-base leading-relaxed text-muted", className].filter(Boolean).join(" ")} {...rest} />;
}
