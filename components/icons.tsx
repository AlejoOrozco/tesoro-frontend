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

/** Smartphone — tech and accessories catalog. */
export function SmartphoneIcon(props: IconProps): ReactElement {
  return (
    <svg {...baseProps(props)}>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}

/** Truck — nationwide shipping. */
export function TruckIcon(props: IconProps): ReactElement {
  return (
    <svg {...baseProps(props)}>
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}

/** Shield with check — warranty and after-sales support. */
export function ShieldCheckIcon(props: IconProps): ReactElement {
  return (
    <svg {...baseProps(props)}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

/** Chat bubble — personalized advice / talk to us. */
export function ChatIcon(props: IconProps): ReactElement {
  return (
    <svg {...baseProps(props)}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

/** Map pin — physical store locations (sucursales). */
export function MapPinIcon(props: IconProps): ReactElement {
  return (
    <svg {...baseProps(props)}>
      <path d="M20 10c0 4.99-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 14.99 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/** Globe — import-on-demand / bringing products from abroad. */
export function GlobeIcon(props: IconProps): ReactElement {
  return (
    <svg {...baseProps(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18" />
      <path d="M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}
