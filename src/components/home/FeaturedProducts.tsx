"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { productService } from "@/services/product.service";
import { useCartStore, type CartState } from "@/store/cart-store";
import { useWishlistStore, type WishlistState } from "@/store/wishlist-store";
import type { ProductCardData, ProductCategory } from "@/types/product";
import { ROUTES } from "@/constants/routes";

const CATEGORIES: { label: string; value: ProductCategory | "all" }[] = [
  { label: "All Pieces", value: "all" },
  { label: "Scarves", value: "scarves" },
  { label: "Hijabs", value: "hijabs" },
  { label: "Abayas", value: "abayas" },
];

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [activeTab, setActiveTab] = useState<ProductCategory | "all">("all");
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState<string | null>(null);

  const addItemToCart = useCartStore((state: CartState) => state.addItem);
  const openCart = useCartStore((state: CartState) => state.openCart);
  
  const wishlistProductIds = useWishlistStore((state: WishlistState) => state.productIds);
  const toggleWishlistItem = useWishlistStore((state: WishlistState) => state.toggleItem);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const filter = activeTab !== "all" ? { category: activeTab } : undefined;
        const response = await productService.getProducts(filter);
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeTab]);

  const handleQuickAdd = (p: ProductCardData) => {
    setAddingId(p.id);
    
    addItemToCart({
      id: `${p.id}-default`,
      productId: p.id,
      variantId: `${p.id}-default`,
      name: p.name,
      slug: p.slug,
      image: p.image.src,
      price: p.price.amount,
      currency: p.price.currency || "USD",
      quantity: 1,
    });

    setTimeout(() => {
      setAddingId(null);
      openCart();
    }, 800);
  };

  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="max-w-[90rem] mx-auto px-4 md:px-12 space-y-12">
        
        {/* Title and Filter Categories */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 pb-6">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.2em] font-label text-primary-500">
              Selected Works
            </p>
            <h2 className="text-3xl font-display font-light uppercase tracking-widest text-neutral-900 dark:text-neutral-50">
              Featured Pieces
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-1 text-[11px] uppercase tracking-widest font-label font-light">
            {CATEGORIES.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 border-b-2 transition-all duration-300 ${
                  activeTab === tab.value
                    ? "border-primary-500 text-neutral-950 dark:text-neutral-50 font-medium"
                    : "border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 4, 5].map((n) => (
              <div key={n} className="space-y-4">
                <div className="aspect-[3/4] bg-neutral-100 dark:bg-neutral-900 animate-pulse w-full" />
                <div className="h-4 bg-neutral-100 dark:bg-neutral-900 animate-pulse w-2/3" />
                <div className="h-3 bg-neutral-100 dark:bg-neutral-900 animate-pulse w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-sm text-neutral-500 uppercase tracking-widest font-light">
            No pieces found in this line. Check back soon.
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((p) => {
              const isWishlisted = wishlistProductIds.includes(p.id);
              const isAdding = addingId === p.id;

              return (
                <div key={p.id} className="group relative flex flex-col space-y-4">
                  
                  {/* Photo Container */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-50 dark:bg-neutral-900">
                    
                    {/* Tags */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 text-[8px] tracking-[0.2em] font-label uppercase">
                      {p.isNew && (
                        <span className="bg-primary-500 text-neutral-0 px-2 py-0.5 font-medium">
                          New
                        </span>
                      )}
                      {p.isLimited && (
                        <span className="bg-neutral-900 text-neutral-0 dark:bg-neutral-100 dark:text-neutral-1000 px-2 py-0.5">
                          Limited
                        </span>
                      )}
                    </div>

                    {/* Wishlist Toggle Button */}
                    <button
                      onClick={() => toggleWishlistItem(p.id)}
                      className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-colors ${
                        isWishlisted
                          ? "bg-primary-500 text-neutral-0"
                          : "bg-white/80 dark:bg-black/50 text-neutral-900 dark:text-neutral-50 hover:bg-white dark:hover:bg-black"
                      }`}
                      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart size={14} className={isWishlisted ? "fill-current" : ""} />
                    </button>

                    {/* Product Links and Hover Swap images */}
                    <Link href={ROUTES.product(p.slug)} className="block w-full h-full">
                      {/* Main Image */}
                      <Image
                        src={p.image.src}
                        alt={p.image.alt || p.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className={`object-cover transition-transform duration-[1200ms] ease-luxury group-hover:scale-105 ${
                          p.hoverImage ? "group-hover:opacity-0" : ""
                        }`}
                      />
                      {/* Hover Swap Image */}
                      {p.hoverImage && (
                        <Image
                          src={p.hoverImage.src}
                          alt={p.hoverImage.alt || p.name}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-[1200ms] ease-luxury group-hover:scale-105"
                        />
                      )}
                    </Link>

                    {/* Quick Add Overlay Slide */}
                    <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-luxury hidden md:block">
                      <button
                        onClick={() => handleQuickAdd(p)}
                        disabled={p.availability === "out_of_stock"}
                        className="w-full h-11 bg-neutral-900/90 dark:bg-neutral-50/90 backdrop-blur-sm text-neutral-0 dark:text-neutral-1000 text-[10px] tracking-widest font-label uppercase flex items-center justify-center gap-2 hover:bg-neutral-900 dark:hover:bg-neutral-50 transition-colors cursor-pointer"
                      >
                        {isAdding ? (
                          <>
                            <Check size={12} /> ADDED
                          </>
                        ) : p.availability === "out_of_stock" ? (
                          "SOLD OUT"
                        ) : (
                          <>
                            <ShoppingBag size={12} /> QUICK ADD
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Product Details Info */}
                  <div className="flex flex-col space-y-1.5 flex-1">
                    <div className="flex items-start justify-between text-xs tracking-widest uppercase font-label">
                      <span className="text-[#8B6914] text-[9px] font-medium tracking-[0.25em]">
                        {p.material}
                      </span>
                    </div>
                    <Link
                      href={ROUTES.product(p.slug)}
                      className="text-sm font-display font-light text-neutral-900 dark:text-neutral-50 hover:text-primary-500 dark:hover:text-primary-600 transition-colors uppercase tracking-[0.05em] line-clamp-1"
                    >
                      {p.name}
                    </Link>
                    <span className="text-xs font-label font-light text-neutral-600 dark:text-neutral-400">
                      {p.price.formatted}
                    </span>
                  </div>

                  {/* Mobile Quick Add (visible directly without hover) */}
                  <div className="md:hidden pt-1">
                    <button
                      onClick={() => handleQuickAdd(p)}
                      disabled={p.availability === "out_of_stock"}
                      className="w-full h-9 border border-neutral-300 dark:border-neutral-800 text-[9px] tracking-widest font-label uppercase flex items-center justify-center gap-1.5 hover:bg-neutral-900 hover:text-neutral-0 dark:hover:bg-neutral-50 dark:hover:text-neutral-1000 transition-colors"
                    >
                      {isAdding ? "ADDED" : p.availability === "out_of_stock" ? "SOLD OUT" : "QUICK ADD"}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
