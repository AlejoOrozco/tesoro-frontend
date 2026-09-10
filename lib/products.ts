import type { ProductImageId } from "@/assets/products";

export interface Product {
  readonly id: string;
  readonly name: string;
  readonly listPrice: number;
  readonly price: number;
  readonly imageId: ProductImageId;
}

/**
 * Landing mock catalog — names and prices are placeholders for the client
 * review. Real SKUs replace this array when inventory lands.
 */
export const PRODUCTS: readonly Product[] = [
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
];
