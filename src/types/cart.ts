export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  currency: string;
  quantity: number;
  color?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  currency: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
}
