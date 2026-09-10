import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactElement } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";

/** md = 44px general minimum; lg = 56px for primary CTAs (docs/design/forms.md). */
export type ButtonSize = "md" | "lg";

interface ButtonStyleProps {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
}

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-micro " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary " +
  "disabled:pointer-events-none disabled:bg-neutral-200 disabled:text-neutral-500";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
  secondary: "border border-border bg-surface text-foreground hover:border-secondary-border hover:bg-secondary",
  /** Outline for navy chrome (hero). Raw navy/gold steps are the documented chrome-adjacent exception. */
  ghost:
    "border border-navy-700 bg-transparent text-chrome-foreground hover:border-gold-200 hover:bg-navy-800 hover:text-gold-200",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  md: "h-11 px-4 text-sm",
  lg: "h-14 px-6 text-base",
};

/** Exported for plain `<a>` CTAs (tel/mailto/WhatsApp) that can't use next/link. */
export function buttonClasses(variant: ButtonVariant, size: ButtonSize, className?: string): string {
  return [BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className].filter(Boolean).join(" ");
}

type ButtonProps = ButtonStyleProps & ComponentPropsWithoutRef<"button">;

export function Button({ variant = "primary", size = "md", className, type = "button", ...rest }: ButtonProps): ReactElement {
  return <button type={type} className={buttonClasses(variant, size, className)} {...rest} />;
}

type ButtonLinkProps = ButtonStyleProps & ComponentPropsWithoutRef<typeof Link>;

/** A link that looks like a button — for CTAs that navigate. */
export function ButtonLink({ variant = "primary", size = "md", className, ...rest }: ButtonLinkProps): ReactElement {
  return <Link className={buttonClasses(variant, size, className)} {...rest} />;
}
