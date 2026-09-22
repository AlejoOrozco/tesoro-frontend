export interface Sucursal {
  readonly id: string;
  readonly name: string;
  readonly mapsUrl: string;
}

function mapsUrlFor(lat: number, lng: number): string {
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

/** Physical stores. Coordinates come from the published Google Maps pins. */
export const SUCURSALES: readonly Sucursal[] = [
  {
    id: "llanogrande",
    name: "Jardines de Llanogrande",
    mapsUrl: mapsUrlFor(6.124216393862496, -75.42409712501045),
  },
  {
    id: "san-nicolas",
    name: "San Nicolás",
    mapsUrl: mapsUrlFor(6.147210827422397, -75.38059432533662),
  },
];
