export interface Sucursal {
  readonly id: string;
  readonly name: string;
  readonly city: string;
  readonly address: string;
  /** Google Maps link — omitted while the real address is pending. */
  readonly mapsUrl?: string;
}

/**
 * Static content per PROJECT_PLAN §11 (informational only, no inventory
 * relationship). Real locations are pending from the client — this neutral
 * placeholder carries no invented data and is replaced in the content-refactor
 * pass; the section renders whatever this array holds.
 */
export const SUCURSALES: readonly Sucursal[] = [
  {
    id: "principal",
    name: "Sucursal principal",
    city: "Colombia",
    address: "Dirección y horarios disponibles próximamente",
  },
];
