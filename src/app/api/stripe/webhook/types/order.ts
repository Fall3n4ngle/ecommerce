type ShippingAddress = {
  city: string;
  country: string;
  line1: string;
  line2: string | null;
  postal_code: string;
  state: string;
};

type CustomerDetails = {
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
