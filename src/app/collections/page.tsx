"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Check, SlidersHorizontal } from "lucide-react";
import { productService, collectionService } from "@/services/product.service";
import { useCartStore, type CartState } from "@/store/cart-store";
import { useWishlistStore, type WishlistState } from "@/store/wishlist-store";
import type { ProductCardData, ProductCategory } from "@/types/product";
import type { CollectionCardData } from "@/types/collection";
import { ROUTES } from "@/constants/routes";

type SortOption = "default" | "price-asc" | "price-desc" | "newest";

export default function CollectionsPage() {
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [collections, setCollections] = useState<CollectionCardData[]>([]);
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState<string | null>(null);

  const addItemToCart = useCartStore((state: CartState) => state.addItem);
  const openCart = useCartStore((state: CartState) => state.openCart);
  const wishlistProductIds = useWishlistStore((state: WishlistState) => state.productIds);
  const toggleWishlistItem = useWishlistStore((state: WishlistState) => state.toggleItem);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const collectionsRes = await collectionService.getCollections();
        setCollections(collectionsRes.data);

        // Fetch products based on category
        const filter = category !== "all" ? { category } : undefined;
        const productsRes = await productService.getProducts(filter);
        const items = [...productsRes.data];

        // Apply client-side sorting
        if (sortBy === "price-asc") {
          items.sort((a, b) => a.price.amount - b.price.amount);
        } else if (sortBy === "price-desc") {
          items.sort((a, b) => b.price.amount - a.price.amount);
        } else if (sortBy === "newest") {
          // Sort with new products first
          items.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        }

        setProducts(items);
      } catch (err) {
        console.error("Error loaded collections page data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category, sortBy]);

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
    <div className="w-full bg-neutral-50 dark:bg-neutral-1000 min-h-screen pt-28 pb-24">
      <div className="max-w-[90rem] mx-auto px-4 md:px-12 space-y-16">
        
        {/* Editorial Page Header Banner */}
        <div className="border-b border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 pb-12 space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-label text-primary-500 font-medium">
              Ready-To-Wear Catalog
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-light uppercase tracking-wider text-neutral-950 dark:text-neutral-50 leading-tight">
              Honest Aesthetics & Modest Luxury
            </h1>
            <p className="text-sm font-body font-light text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Explore our curation of modular silhouettes. Crafted from Italian mulberry silk drapes, georgette chiffon fibers, and structural abaya wraps designed to move with symmetric ease.
            </p>
          </div>
        </div>

        {/* Collections Catalog Quick Switch Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {collections.map((col) => (
            <div 
              key={col.id}
              className="relative aspect-[16/9] overflow-hidden bg-neutral-200 dark:bg-neutral-900 group"
            >
              <Image
                src={col.image.src}
                alt={col.image.alt || col.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[1500ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-neutral-1000/30 group-hover:bg-neutral-1000/40 transition-colors duration-500" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-neutral-50">
                <h3 className="text-lg font-display uppercase tracking-wider">{col.name}</h3>
                <button
                  onClick={() => {
                    if (col.slug.includes("silk")) setCategory("scarves");
                    else if (col.slug.includes("chiffon")) setCategory("hijabs");
                    else if (col.slug.includes("abaya")) setCategory("abayas");
                  }}
                  className="text-[9px] font-label uppercase tracking-widest text-primary-300 mt-1.5 text-left hover:text-white transition-colors"
                >
                  Filter This Line
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Filter and Sorting Header Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#EDE6DB]/20 dark:border-[#2C2C2C]/20 pb-6 gap-6">
          
          {/* Category Switch Tabs */}
          <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-widest font-label font-light">
            {(["all", "scarves", "hijabs", "abayas"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setCategory(tab)}
                className={`px-4 py-2 border border-neutral-200 dark:border-neutral-800 transition-luxury ${
                  category === tab
                    ? "bg-neutral-950 text-white border-neutral-950 dark:bg-white dark:text-neutral-1000 dark:border-white font-medium"
                    : "bg-white text-neutral-600 dark:bg-black dark:text-neutral-400 hover:border-neutral-900 dark:hover:border-neutral-50"
                }`}
              >
                {tab === "all" ? "All Pieces" : tab}
              </button>
            ))}
          </div>

          {/* Sort Controller Dropdown */}
          <div className="flex items-center gap-4 text-xs font-label">
            <span className="text-neutral-400 flex items-center gap-1.5 uppercase tracking-widest text-[9px]">
              <SlidersHorizontal size={10} /> Sort By
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 text-[10px] uppercase tracking-widest py-2 px-3 focus:outline-none focus:border-primary-500 rounded-none cursor-pointer"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>
        </div>

        {/* Products Catalog Display Grid */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="space-y-4">
                <div className="aspect-[3/4] bg-neutral-100 dark:bg-neutral-900 animate-pulse w-full" />
                <div className="h-4 bg-neutral-100 dark:bg-neutral-900 animate-pulse w-2/3" />
                <div className="h-3 bg-neutral-100 dark:bg-neutral-900 animate-pulse w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32 text-xs text-neutral-400 uppercase tracking-widest font-light">
            No collections matching your filter criteria.
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((p) => {
              const isWishlisted = wishlistProductIds.includes(p.id);
              const isAdding = addingId === p.id;

              return (
                <div key={p.id} className="group relative flex flex-col space-y-4">
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-50 dark:bg-neutral-900">
                    
                    {/* Tags overlay */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 text-[8px] tracking-[0.2em] font-label uppercase">
                      {p.isNew && <span className="bg-primary-500 text-neutral-0 px-2 py-0.5 font-medium">New</span>}
                      {p.isLimited && <span className="bg-[#8B6914] text-neutral-0 px-2 py-0.5">Limited</span>}
                    </div>

                    {/* Wishlist Toggle Button */}
                    <button
                      onClick={() => toggleWishlistItem(p.id)}
                      className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-colors ${
                        isWishlisted
                          ? "bg-primary-500 text-neutral-0"
                          : "bg-white/80 dark:bg-black/50 text-neutral-900 dark:text-neutral-50 hover:bg-white dark:hover:bg-black"
                      }`}
                      aria-label="Toggle wishlist"
                    >
                      <Heart size={14} className={isWishlisted ? "fill-current" : ""} />
                    </button>

                    {/* Click details navigation */}
                    <Link href={ROUTES.product(p.slug)} className="block w-full h-full">
                      <Image
                        src={p.image.src}
                        alt={p.image.alt || p.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className={`object-cover transition-transform duration-[1500ms] ease-luxury group-hover:scale-105 ${
                          p.hoverImage ? "group-hover:opacity-0" : ""
                        }`}
                      />
                      {p.hoverImage && (
                        <Image
                          src={p.hoverImage.src}
                          alt={p.hoverImage.alt || p.name}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-[1500ms] ease-luxury group-hover:scale-105"
                        />
                      )}
                    </Link>

                    {/* Quick Add Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-luxury hidden md:block">
                      <button
                        onClick={() => handleQuickAdd(p)}
                        disabled={p.availability === "out_of_stock"}
                        className="w-full h-11 bg-neutral-900/90 dark:bg-neutral-50/90 backdrop-blur-sm text-neutral-0 dark:text-neutral-1000 text-[10px] tracking-widest font-label uppercase flex items-center justify-center gap-2 hover:bg-neutral-905 dark:hover:bg-neutral-50 transition-colors cursor-pointer"
                      >
                        {isAdding ? <Check size={12} /> : <ShoppingBag size={12} />}
                        {isAdding ? "ADDED" : p.availability === "out_of_stock" ? "SOLD OUT" : "QUICK ADD"}
                      </button>
                    </div>
                  </div>

                  {/* Metadata block */}
                  <div className="flex flex-col space-y-1">
                    <span className="text-[#8B6914] text-[9px] uppercase tracking-[0.25em] font-label font-medium">{p.material}</span>
                    <Link
                      href={ROUTES.product(p.slug)}
                      className="text-sm font-display uppercase tracking-[0.05em] text-neutral-900 dark:text-neutral-50 hover:text-primary-500 transition-colors line-clamp-1"
                    >
                      {p.name}
                    </Link>
                    <span className="text-xs font-label text-neutral-600 dark:text-neutral-400 font-light">{p.price.formatted}</span>
                  </div>

                  {/* Mobile Quick Add */}
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
    </div>
  );
}
