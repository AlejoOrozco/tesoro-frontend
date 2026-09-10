import type { ComponentPropsWithoutRef, ReactElement } from "react";

type HeadingLevel = 1 | 2 | 3;

const HEADING_CLASSES: Record<HeadingLevel, string> = {
  1: "text-4xl font-bold tracking-tight text-balance sm:text-5xl",
  2: "text-2xl font-semibold tracking-tight sm:text-3xl",
  3: "text-lg font-semibold sm:text-xl",
};

type HeadingProps = { readonly level: HeadingLevel } & ComponentPropsWithoutRef<"h1">;

export function Heading({ level, className, ...rest }: HeadingProps): ReactElement {
  const Tag = `h${level}` as const;
  return <Tag className={[HEADING_CLASSES[level], className].filter(Boolean).join(" ")} {...rest} />;
}

type TextTone = "default" | "muted";

const TEXT_TONE_CLASSES: Record<TextTone, string> = {
  default: "text-foreground",
  muted: "text-muted",
};

type TextProps = { readonly tone?: TextTone } & ComponentPropsWithoutRef<"p">;

export function Text({ tone = "default", className, ...rest }: TextProps): ReactElement {
  return <p className={["text-base leading-relaxed", TEXT_TONE_CLASSES[tone], className].filter(Boolean).join(" ")} {...rest} />;
}
