import type { ComponentPropsWithoutRef, ReactElement } from "react";

/**
 * Shared icon set: one consistent stroke style, colored via currentColor
 * (docs/design/empty-and-error-states.md asks for a single icon style app-wide).
 * All icons are decorative (aria-hidden); interactive consumers must carry
 * their own accessible label.
 */
type IconProps = ComponentPropsWithoutRef<"svg">;

function baseProps(props: IconProps): IconProps {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    ...props,
  };
}

/** Compass — "you are lost" (404 / not found). */
export function CompassIcon(props: IconProps): ReactElement {
  return (
    <svg {...baseProps(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </svg>
  );
}

/** Alert triangle — something failed (error boundary, failed requests). */
export function AlertTriangleIcon(props: IconProps): ReactElement {
  return (
    <svg {...baseProps(props)}>
      <path d="M10.3 4.1 2.9 17a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.7 4.1a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

/** Hamburger — opens the mobile navigation. */
export function MenuIcon(props: IconProps): ReactElement {
  return (
    <svg {...baseProps(props)}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

/** X — closes the mobile navigation. */
export function CloseIcon(props: IconProps): ReactElement {
  return (
    <svg {...baseProps(props)}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

/** Sun — switch to light theme. */
export function SunIcon(props: IconProps): ReactElement {
  return (
    <svg {...baseProps(props)}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

/** Moon — switch to dark theme. */
export function MoonIcon(props: IconProps): ReactElement {
  return (
    <svg {...baseProps(props)}>
      <path d="M20.9 13.1A8.5 8.5 0 1 1 10.9 3.1a7 7 0 0 0 10 10Z" />
    </svg>
  );
}
