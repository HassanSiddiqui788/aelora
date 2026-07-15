"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Check } from "lucide-react";
import { productService } from "@/services/product.service";
import { useCartStore, type CartState } from "@/store/cart-store";
import { useWishlistStore, type WishlistState } from "@/store/wishlist-store";
import type { ProductCardData } from "@/types/product";
import { ROUTES } from "@/constants/routes";

export default function ShopAllPage() {
  const [products, setProducts] = useState<ProductCardData[]>([]);
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
        const res = await productService.getProducts();
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-1000 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-1000 min-h-screen pt-28 pb-24">
      <div className="max-w-[90rem] mx-auto px-4 md:px-12 space-y-12">
        
        {/* Editorial Title Header */}
        <div className="space-y-4 max-w-2xl">
          <span className="text-[10px] uppercase tracking-[0.25em] font-label text-[#8B6914] font-medium">Ready-To-Wear</span>
          <h1 className="text-4xl md:text-5xl font-display font-light uppercase tracking-wider text-neutral-900 dark:text-neutral-50 leading-tight">
            The Full Catalog
          </h1>
          <p className="text-xs font-body font-light text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Discover our entire range of pure silk scarves, featherlight chiffon hijabs, and sophisticated minimalist abayas, crafted for modern luxury.
          </p>
        </div>

        {/* Products Grid list */}
        <div className="space-y-8">
          <div className="border-b border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 pb-4">
            <h3 className="text-xs uppercase tracking-widest font-label font-light text-neutral-400">
              Showing {products.length} pieces
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((p) => {
              const isWishlisted = wishlistProductIds.includes(p.id);
              const isAdding = addingId === p.id;

              return (
                <div key={p.id} className="group relative flex flex-col space-y-3">
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                    
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

                    {/* Image views */}
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
                        className="w-full h-11 bg-neutral-900/90 dark:bg-neutral-50/90 backdrop-blur-sm text-neutral-0 dark:text-neutral-1000 text-[10px] tracking-widest font-label uppercase flex items-center justify-center gap-2 hover:bg-neutral-950 dark:hover:bg-neutral-50 transition-colors cursor-pointer"
                      >
                        {isAdding ? <Check size={12} /> : <ShoppingBag size={12} />}
                        {isAdding ? "ADDED" : p.availability === "out_of_stock" ? "SOLD OUT" : "QUICK ADD"}
                      </button>
                    </div>
                  </div>

                  {/* Metadata */}
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
        </div>

      </div>
    </div>
  );
}
