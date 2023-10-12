import { Image } from "sanity";

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Size = Category;

export type Color = Category;

export type Product = Category & {
  images: Image[];
  categories: Category[];
  sizes: Size[];
  colors: Color[];
  description: string;
  price: number;
  countInStock: number;
  currency: string;
  sku: string;
};

export type ShippingAddress = {
  city: string;
  country: string;
  line1: string;
  line2: string | null;
  postal_code: string;
  state: string;
};

export type CustomerDetails = {
  email: string;
  name: string;
  address: ShippingAddress;
};

type OrderItem = {
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
};

export type Order = {
  orderItems: (OrderItem | undefined)[];
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  customerDetails: CustomerDetails;
  paymentStatus: string;
  paymentDate: Date;
  deliveryStatus: string;
  deliveryDate: Date | null;
};
