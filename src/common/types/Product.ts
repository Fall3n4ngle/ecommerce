import { Image } from "sanity";

export type Filter = {
  id: string;
  name: string;
  slug: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  images: Image[];
  categories: Filter[];
  sizes: Filter[];
  colors: Filter[];
  description: string;
  price: number;
  countInStock: number;
  currency: string;
  sku: string;
};
