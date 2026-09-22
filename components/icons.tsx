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

/** User — account / sign in. */
export function UserIcon(props: IconProps): ReactElement {
  return (
    <svg {...baseProps(props)}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
    </svg>
  );
}

/** Magnifying glass — site search. */
export function SearchIcon(props: IconProps): ReactElement {
  return (
    <svg {...baseProps(props)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

/** Shopping cart — basket. */
export function CartIcon(props: IconProps): ReactElement {
  return (
    <svg {...baseProps(props)}>
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

/** Chevron left — carousel previous. */
export function ChevronLeftIcon(props: IconProps): ReactElement {
  return (
    <svg {...baseProps(props)}>
      <path d="m15 6-6 6 6 6" />
    </svg>
  );
}

/** Chevron right — carousel next. */
export function ChevronRightIcon(props: IconProps): ReactElement {
  return (
    <svg {...baseProps(props)}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

/** Chevron down — disclosure / categories. */
export function ChevronDownIcon(props: IconProps): ReactElement {
  return (
    <svg {...baseProps(props)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** Instagram — social profile. */
export function InstagramIcon(props: IconProps): ReactElement {
  return (
    <svg {...baseProps(props)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** TikTok — social profile. */
export function TikTokIcon(props: IconProps): ReactElement {
  return (
    <svg {...baseProps(props)}>
      <path d="M14.5 4v11.2a3.6 3.6 0 1 1-3-3.55V9.2A7 7 0 0 0 17.5 11" />
      <path d="M14.5 4c1.3 2.6 3.4 3.8 6.2 4.1" />
    </svg>
  );
}

/** Map pin — delivery location. */
export function MapPinIcon(props: IconProps): ReactElement {
  return (
    <svg {...baseProps(props)}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
