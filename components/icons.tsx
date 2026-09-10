import type { ComponentPropsWithoutRef, ReactElement } from "react";

/**
 * Shared icon style for empty/error states (docs/design/empty-and-error-states.md):
 * one consistent stroke look, colored via currentColor. All icons here are
 * decorative — consumers wrap them in an aria-hidden container.
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
