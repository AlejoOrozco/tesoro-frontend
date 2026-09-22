export interface GlobeMarker {
  readonly id: string;
  readonly location: readonly [number, number];
  readonly size?: number;
  readonly label?: string;
}

export interface GlobeArc {
  readonly id: string;
  readonly from: readonly [number, number];
  readonly to: readonly [number, number];
  /** Pulls the route across this corridor instead of the short Pacific chord. */
  readonly control?: readonly [number, number];
}

function coord(lat: number, lng: number): readonly [number, number] {
  return [lat, lng];
}

const USA = coord(34.0522, -118.2437);
const CHINA = coord(31.2304, 121.4737);
const COLOMBIA = coord(6.2476, -75.5658);
/** Pulls China→Colombia across North Africa so the curve stays on the visible face. */
const SAHARA = coord(20.0, 15.0);

/** Import routes shown on the footer globe. */
export const TRADE_MARKERS: readonly GlobeMarker[] = [
  { id: "usa", location: USA, label: "USA", size: 0.045 },
  { id: "china", location: CHINA, label: "China", size: 0.045 },
  { id: "colombia", location: COLOMBIA, label: "Colombia", size: 0.05 },
];

export const TRADE_ARCS: readonly GlobeArc[] = [
  { id: "usa-colombia", from: USA, to: COLOMBIA },
  { id: "china-colombia", from: CHINA, to: COLOMBIA, control: SAHARA },
  { id: "usa-china", from: USA, to: CHINA },
];
