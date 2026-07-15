import type { Availability, ImageAsset, Price, SeoMeta } from "./common";

export type ProductCategory = "scarves" | "hijabs" | "abayas" | "accessories";

export interface ProductVariant {
  id: string;
  name: string;
  color: string;
  colorHex: string;
  sku: string;
  availability: Availability;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string;
  category: ProductCategory;
  material: string;
  price: Price;
  compareAtPrice?: Price;
  images: ImageAsset[];
  variants: ProductVariant[];
  tags: string[];
  sku: string;
  availability: Availability;
  isNew?: boolean;
  isLimited?: boolean;
  seo?: SeoMeta;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCardData {
  id: string;
  slug: string;
  name: string;
  material: string;
  price: Price;
  image: ImageAsset;
  hoverImage?: ImageAsset;
  availability: Availability;
  isNew?: boolean;
  isLimited?: boolean;
}

export interface ProductFilters {
  category?: ProductCategory;
  materials?: string[];
  colors?: string[];
  priceMin?: number;
  priceMax?: number;
  availability?: Availability[];
}
