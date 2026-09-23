import type { ProductImageId } from "@/assets/products";

export interface Product {
  readonly id: string;
  readonly name: string;
  readonly listPrice: number;
  readonly price: number;
  readonly imageId: ProductImageId;
}

export interface ProductCollection {
  readonly id: string;
  readonly title: string;
  readonly productIds: readonly string[];
}

/** One rail page is a row of six; the landing always keeps four pages. */
const RAIL_PAGE_SIZE = 6;
const RAIL_MAX_PAGES = 4;

function padProductIds(ids: readonly string[], length: number): readonly string[] {
  if (ids.length === 0) return ids;
  const padded: string[] = [];
  while (padded.length < length) padded.push(...ids);
  return padded.slice(0, length);
}

export function getRailPages(ids: readonly string[]): readonly (readonly Product[])[] {
  const products = getProductsByIds(padProductIds(ids, RAIL_PAGE_SIZE * RAIL_MAX_PAGES));
  return Array.from({ length: RAIL_MAX_PAGES }, (_, index) =>
    products.slice(index * RAIL_PAGE_SIZE, (index + 1) * RAIL_PAGE_SIZE),
  );
}

/**
 * Landing mock catalog — names and prices are placeholders for the client
 * review. Real SKUs replace this array when inventory lands.
 */
const PRODUCTS: readonly Product[] = [
  {
    id: "power-bank-5000",
    name: "Batería portátil magnética 5000 mAh",
    listPrice: 189_900,
    price: 119_900,
    imageId: "powerBank",
  },
  {
    id: "earbuds-tws",
    name: "Auriculares inalámbricos TWS",
    listPrice: 249_900,
    price: 159_900,
    imageId: "powerBank",
  },
  {
    id: "charger-20w",
    name: "Cargador de pared USB-C 20W",
    listPrice: 89_900,
    price: 59_900,
    imageId: "powerBank",
  },
  {
    id: "cable-usbc",
    name: "Cable USB-C a USB-C 1 m",
    listPrice: 49_900,
    price: 29_900,
    imageId: "powerBank",
  },
  {
    id: "case-magsafe",
    name: "Funda magnética para celular",
    listPrice: 79_900,
    price: 49_900,
    imageId: "powerBank",
  },
  {
    id: "watch-smart",
    name: "Reloj inteligente",
    listPrice: 329_900,
    price: 219_900,
    imageId: "powerBank",
  },
  {
    id: "case-clear",
    name: "Funda transparente para celular",
    listPrice: 59_900,
    price: 34_900,
    imageId: "powerBank",
  },
  {
    id: "case-silicone",
    name: "Funda de silicona",
    listPrice: 69_900,
    price: 39_900,
    imageId: "powerBank",
  },
  {
    id: "glass-9h",
    name: "Vidrio templado 9H",
    listPrice: 39_900,
    price: 19_900,
    imageId: "powerBank",
  },
  {
    id: "charger-30w",
    name: "Cargador de pared USB-C 30W",
    listPrice: 119_900,
    price: 79_900,
    imageId: "powerBank",
  },
  {
    id: "cable-lightning",
    name: "Cable USB-C a Lightning 1 m",
    listPrice: 69_900,
    price: 44_900,
    imageId: "powerBank",
  },
  {
    id: "earbuds-anc",
    name: "Auriculares con cancelación de ruido",
    listPrice: 399_900,
    price: 279_900,
    imageId: "powerBank",
  },
  {
    id: "case-wallet",
    name: "Funda tipo billetera",
    listPrice: 89_900,
    price: 54_900,
    imageId: "powerBank",
  },
  {
    id: "case-rugged",
    name: "Funda reforzada",
    listPrice: 99_900,
    price: 64_900,
    imageId: "powerBank",
  },
  {
    id: "power-bank-10000",
    name: "Batería portátil 10000 mAh",
    listPrice: 219_900,
    price: 149_900,
    imageId: "powerBank",
  },
  {
    id: "charger-car",
    name: "Cargador de carro USB-C",
    listPrice: 79_900,
    price: 49_900,
    imageId: "powerBank",
  },
];

const PRODUCTS_BY_ID = new Map(PRODUCTS.map((product) => [product.id, product]));

function getProductsByIds(ids: readonly string[]): readonly Product[] {
  return ids.map((id) => {
    const product = PRODUCTS_BY_ID.get(id);
    if (product === undefined) {
      throw new Error(`Unknown product id: ${id}`);
    }
    return product;
  });
}

/** Landing rails — four sections, six products per page, four pages. */
export const PRODUCT_COLLECTIONS: readonly ProductCollection[] = [
  {
    id: "offers",
    title: "Ofertas destacadas",
    productIds: [
      "power-bank-5000",
      "earbuds-tws",
      "charger-20w",
      "cable-usbc",
      "watch-smart",
      "earbuds-anc",
      "charger-30w",
      "cable-lightning",
      "power-bank-10000",
      "charger-car",
      "case-magsafe",
      "glass-9h",
    ],
  },
  {
    id: "power",
    title: "Carga y energía",
    productIds: [
      "power-bank-5000",
      "power-bank-10000",
      "charger-20w",
      "charger-30w",
      "charger-car",
      "cable-usbc",
      "cable-lightning",
      "watch-smart",
      "earbuds-tws",
      "glass-9h",
      "case-magsafe",
      "earbuds-anc",
    ],
  },
  {
    id: "cases",
    title: "Fundas y protección",
    productIds: [
      "case-magsafe",
      "case-clear",
      "case-silicone",
      "glass-9h",
      "case-wallet",
      "case-rugged",
      "cable-usbc",
      "cable-lightning",
      "charger-20w",
      "earbuds-tws",
      "watch-smart",
      "power-bank-5000",
    ],
  },
  {
    id: "audio",
    title: "Audio",
    productIds: [
      "earbuds-tws",
      "earbuds-anc",
      "watch-smart",
      "cable-usbc",
      "cable-lightning",
      "charger-20w",
      "charger-30w",
      "power-bank-5000",
      "case-magsafe",
      "glass-9h",
      "charger-car",
      "power-bank-10000",
    ],
  },
];
