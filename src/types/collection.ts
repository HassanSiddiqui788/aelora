import type { ImageAsset, SeoMeta } from "./common";
import type { ProductCardData } from "./product";

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: ImageAsset;
  products?: ProductCardData[];
  seo?: SeoMeta;
  isPublished: boolean;
  sortOrder: number;
}

export interface CollectionCardData {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image: ImageAsset;
}
