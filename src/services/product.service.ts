import type { ApiResponse } from "@/types/common";
import type { Product, ProductCardData, ProductFilters } from "@/types/product";
import type { Collection, CollectionCardData } from "@/types/collection";

/**
 * Product service — abstraction layer for commerce API.
 * Replace mock implementations with headless commerce (Shopify/Medusa) in Phase 2.
 */
export interface ProductService {
  getProducts(filters?: ProductFilters): Promise<ApiResponse<ProductCardData[]>>;
  getProductBySlug(slug: string): Promise<ApiResponse<Product | null>>;
  searchProducts(query: string): Promise<ApiResponse<ProductCardData[]>>;
}

export interface CollectionService {
  getCollections(): Promise<ApiResponse<CollectionCardData[]>>;
  getCollectionBySlug(slug: string): Promise<ApiResponse<Collection | null>>;
}



const MOCK_COLLECTIONS: Collection[] = [
  {
    id: "col_1",
    slug: "silk-scarves",
    name: "Pure Silk Scarves",
    description: "Lustrous Italian mulberry silk, finished with delicate hand-rolled hems.",
    image: {
      src: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1200",
      alt: "Pure Mulberry Silk scarves draped elegantly",
      width: 1200,
      height: 800,
    },
    isPublished: true,
    sortOrder: 1,
  },
  {
    id: "col_2",
    slug: "premium-chiffon",
    name: "Fine Chiffon Hijabs",
    description: "Featherlight, breathable double-sided chiffon offering graceful drapes and rich textures.",
    image: {
      src: "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?q=80&w=1200",
      alt: "Graceful chiffon fabrics",
      width: 1200,
      height: 800,
    },
    isPublished: true,
    sortOrder: 2,
  },
  {
    id: "col_3",
    slug: "signature-abayas",
    name: "Signature Abayas",
    description: "Flowing silhouettes crafted from premium crepe and linen, tailored for modern sophistication.",
    image: {
      src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200",
      alt: "Signature tailored abayas",
      width: 1200,
      height: 800,
    },
    isPublished: true,
    sortOrder: 3,
  },
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod_1",
    slug: "melange-silk-scarf",
    name: "Mélange Silk Scarf",
    description: "Woven from 100% pure mulberry silk, this scarf features a subtle hand-rolled hem and a multi-dimensional weave. Its rich drape catches the light beautifully, making it a timeless addition to any modest wardrobe.",
    shortDescription: "Pure mulberry silk with hand-rolled hems.",
    category: "scarves",
    material: "100% Mulberry Silk",
    price: { amount: 120, currency: "USD", formatted: "$120.00" },
    availability: "in_stock",
    isNew: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: [
      {
        src: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=600",
        alt: "Mélange Silk Scarf Close-up",
      },
      {
        src: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=600",
        alt: "Mélange Silk Scarf Details",
      },
    ],
    variants: [
      { id: "var_1_1", name: "Alabaster White", color: "White", colorHex: "#F2EFEB", sku: "MS-WHT-01", availability: "in_stock" },
      { id: "var_1_2", name: "Pale Sand", color: "Oatmeal", colorHex: "#E5DEC9", sku: "MS-SND-02", availability: "in_stock" },
      { id: "var_1_3", name: "Sienna Bronze", color: "Bronze", colorHex: "#8B5A2B", sku: "MS-BRZ-03", availability: "in_stock" },
    ],
    tags: ["silk", "scarf", "luxury", "new"],
    sku: "AEL-MS-001",
  },
  {
    id: "prod_2",
    slug: "aura-wool-cashmere-stole",
    name: "Aura Cashmere Stole",
    description: "An ultra-soft mix of fine Tibetan cashmere and organic wool. Light enough for layering, yet exceptionally warm, this stole is distinguished by its raw-fringe detailing.",
    shortDescription: "Ultra-fine wool-cashmere blend with raw fringe finishes.",
    category: "scarves",
    material: "70% Organic Wool, 30% Cashmere",
    price: { amount: 180, currency: "USD", formatted: "$180.00" },
    compareAtPrice: { amount: 220, currency: "USD", formatted: "$220.00" },
    availability: "in_stock",
    isLimited: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: [
      {
        src: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?q=80&w=600",
        alt: "Aura Cashmere Stole draped style",
      },
    ],
    variants: [
      { id: "var_2_1", name: "Charcoal Grey", color: "Charcoal", colorHex: "#2C2C2C", sku: "AW-CHR-01", availability: "in_stock" },
      { id: "var_2_2", name: "Oatmeal Heather", color: "Oatmeal", colorHex: "#D7CDBC", sku: "AW-OAT-02", availability: "in_stock" },
    ],
    tags: ["cashmere", "wool", "stole", "limited"],
    sku: "AEL-AW-002",
  },
  {
    id: "prod_3",
    slug: "aether-pleated-chiffon-hijab",
    name: "Aether Pleated Chiffon Hijab",
    description: "Features delicate micropuckered pleats crafted from soft double-chiffon fabric. Creates an airy, voluminous drape without slipping. Perfect for both everyday luxury and special occasions.",
    shortDescription: "Micropuckered lightweight chiffon hijab.",
    category: "hijabs",
    material: "Premium Georgette Chiffon",
    price: { amount: 48, currency: "USD", formatted: "$48.00" },
    availability: "in_stock",
    isNew: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: [
      {
        src: "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?q=80&w=600",
        alt: "Aether Pleated Chiffon Hijab",
      },
    ],
    variants: [
      { id: "var_3_1", name: "Blush Pink", color: "Blush", colorHex: "#EACAC6", sku: "AP-BLS-01", availability: "in_stock" },
      { id: "var_3_2", name: "Sage Green", color: "Sage", colorHex: "#9CB09B", sku: "AP-SGE-02", availability: "in_stock" },
      { id: "var_3_3", name: "Classic Noir", color: "Black", colorHex: "#0D0D0D", sku: "AP-BLK-03", availability: "in_stock" },
    ],
    tags: ["chiffon", "hijab", "pleated"],
    sku: "AEL-AP-003",
  },
  {
    id: "prod_4",
    slug: "noura-silk-satin-scarf",
    name: "Noura Silk Satin Scarf",
    description: "A luminous silk satin scarf offering rich, jewel-tone shades. Features a glossy finish on one side and a textured matte finish on the reverse, allowing for versatile styling options.",
    shortDescription: "Double-finished silk satin scarf with rich sheen.",
    category: "scarves",
    material: "100% Silk Satin",
    price: { amount: 110, currency: "USD", formatted: "$110.00" },
    availability: "in_stock",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: [
      {
        src: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=600",
        alt: "Noura Silk Satin Scarf draping details",
      },
    ],
    variants: [
      { id: "var_4_1", name: "Emerald Glaze", color: "Emerald", colorHex: "#0F4C3A", sku: "NS-EMR-01", availability: "in_stock" },
      { id: "var_4_2", name: "Warm Honey", color: "Honey", colorHex: "#D4AF37", sku: "NS-HNY-02", availability: "in_stock" },
    ],
    tags: ["silk", "satin", "scarf"],
    sku: "AEL-NS-004",
  },
  {
    id: "prod_5",
    slug: "lumina-cotton-silk-hijab",
    name: "Lumina Cotton-Silk Hijab",
    description: "A refined blend of premium long-staple cotton and soft brushed silk. Light, soft to the skin, and completely opaque, this is the ultimate daily comfort wear.",
    shortDescription: "Ultra-comfy cotton-silk daily hijab.",
    category: "hijabs",
    material: "60% Cotton, 40% Brushed Silk",
    price: { amount: 38, currency: "USD", formatted: "$38.00" },
    availability: "in_stock",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: [
      {
        src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600",
        alt: "Lumina Cotton-Silk Hijab lifestyle",
      },
    ],
    variants: [
      { id: "var_5_1", name: "Taupe Dust", color: "Taupe", colorHex: "#B3A296", sku: "LC-TPE-01", availability: "in_stock" },
      { id: "var_5_2", name: "Rose Quartz", color: "Rose", colorHex: "#DEC3C3", sku: "LC-RSE-02", availability: "in_stock" },
    ],
    tags: ["cotton", "silk", "hijab"],
    sku: "AEL-LC-005",
  },
  {
    id: "prod_6",
    slug: "minimalist-linen-abaya",
    name: "Minimalist Linen Abaya",
    description: "Tailored from pure organic flax linen, featuring relaxed kimono sleeves, discrete side pockets, and clean hidden-button closures. Unlined and incredibly airy for summers.",
    shortDescription: "100% organic flax linen minimal abaya.",
    category: "abayas",
    material: "100% Organic Flax Linen",
    price: { amount: 240, currency: "USD", formatted: "$240.00" },
    availability: "in_stock",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: [
      {
        src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600",
        alt: "Minimalist Linen Abaya full layout",
      },
    ],
    variants: [
      { id: "var_6_1", name: "Sand Flax", color: "Sand", colorHex: "#E3D5C1", sku: "ML-SND-01", availability: "in_stock" },
      { id: "var_6_2", name: "Midnight Ash", color: "Black", colorHex: "#1E1E1E", sku: "ML-BLK-02", availability: "in_stock" },
    ],
    tags: ["linen", "abaya", "organic"],
    sku: "AEL-ML-006",
  },
  {
    id: "prod_7",
    slug: "elysian-crepe-abaya",
    name: "Elysian Crepe Abaya",
    description: "A premium Moroccan crepe abaya with an elegant structural drape. Finished with satin piping along the lapel and cuffs, complete with a matching chiffon under-scarf.",
    shortDescription: "Moroccan crepe abaya with satin piping details.",
    category: "abayas",
    material: "Premium Moroccan Crepe",
    price: { amount: 290, currency: "USD", formatted: "$290.00" },
    availability: "preorder",
    isLimited: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: [
      {
        src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600",
        alt: "Elysian Crepe Abaya draped look",
      },
    ],
    variants: [
      { id: "var_7_1", name: "Onyx Black", color: "Black", colorHex: "#0A0A0A", sku: "EC-BLK-01", availability: "preorder" },
      { id: "var_7_2", name: "Muted Olive", color: "Olive", colorHex: "#5E5F48", sku: "EC-OLV-02", availability: "preorder" },
    ],
    tags: ["crepe", "abaya", "luxury", "preorder"],
    sku: "AEL-EC-007",
  },
];

class MockProductService implements ProductService {
  async getProducts(filters?: ProductFilters): Promise<ApiResponse<ProductCardData[]>> {
    let filtered = [...MOCK_PRODUCTS];

    if (filters) {
      if (filters.category) {
        filtered = filtered.filter(p => p.category === filters.category);
      }
      if (filters.materials && filters.materials.length > 0) {
        filtered = filtered.filter(p => 
          filters.materials!.some(m => p.material.toLowerCase().includes(m.toLowerCase()))
        );
      }
      if (filters.availability && filters.availability.length > 0) {
        filtered = filtered.filter(p => filters.availability!.includes(p.availability));
      }
    }

    const cardData: ProductCardData[] = filtered.map(p => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      material: p.material,
      price: p.price,
      image: p.images[0]!,
      hoverImage: p.images[1] ?? p.images[0],
      availability: p.availability,
      isNew: p.isNew,
      isLimited: p.isLimited,
    }));

    return {
      data: cardData,
      meta: {
        page: 1,
        pageSize: 12,
        total: cardData.length,
        totalPages: 1,
      }
    };
  }

  async getProductBySlug(slug: string): Promise<ApiResponse<Product | null>> {
    const found = MOCK_PRODUCTS.find(p => p.slug === slug);
    return { data: found || null };
  }

  async searchProducts(query: string): Promise<ApiResponse<ProductCardData[]>> {
    const term = query.toLowerCase();
    const filtered = MOCK_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.description.toLowerCase().includes(term) ||
      p.material.toLowerCase().includes(term)
    );

    const cardData: ProductCardData[] = filtered.map(p => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      material: p.material,
      price: p.price,
      image: p.images[0]!,
      hoverImage: p.images[1] ?? p.images[0],
      availability: p.availability,
      isNew: p.isNew,
      isLimited: p.isLimited,
    }));

    return {
      data: cardData,
      meta: {
        page: 1,
        pageSize: 12,
        total: cardData.length,
        totalPages: 1,
      }
    };
  }
}

class MockCollectionService implements CollectionService {
  async getCollections(): Promise<ApiResponse<CollectionCardData[]>> {
    const cardData: CollectionCardData[] = MOCK_COLLECTIONS.map(c => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      description: c.description,
      image: c.image,
    }));
    return { data: cardData };
  }

  async getCollectionBySlug(slug: string): Promise<ApiResponse<Collection | null>> {
    const colFound = MOCK_COLLECTIONS.find(c => c.slug === slug);
    if (!colFound) return { data: null };

    // Get products belonging to this collection
    let categoryFilter: string | null = null;
    if (slug === "silk-scarves") categoryFilter = "scarves";
    else if (slug === "premium-chiffon") categoryFilter = "hijabs";
    else if (slug === "signature-abayas") categoryFilter = "abayas";

    const relatedProducts = MOCK_PRODUCTS.filter(p => p.category === categoryFilter).map(p => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      material: p.material,
      price: p.price,
      image: p.images[0]!,
      hoverImage: p.images[1] ?? p.images[0],
      availability: p.availability,
      isNew: p.isNew,
      isLimited: p.isLimited,
    }));

    return {
      data: {
        ...colFound,
        products: relatedProducts,
      }
    };
  }
}

export const productService: ProductService = new MockProductService();
export const collectionService: CollectionService = new MockCollectionService();

