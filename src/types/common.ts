export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

export interface Price {
  amount: number;
  currency: string;
  formatted?: string;
}

export interface SeoMeta {
  title?: string;
  description?: string;
  keywords?: string[];
}

export type Availability = "in_stock" | "out_of_stock" | "preorder" | "coming_soon";

export type SortOption =
  | "featured"
  | "newest"
  | "price_asc"
  | "price_desc"
  | "name_asc";

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
  error?: string;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}
