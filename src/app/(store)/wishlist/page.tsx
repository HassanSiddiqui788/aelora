"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, Heart, Check } from "lucide-react";
import { productService } from "@/services/product.service";
import { useCartStore, type CartState } from "@/store/cart-store";
import { useWishlistStore, type WishlistState } from "@/store/wishlist-store";
import type { ProductCardData } from "@/types/product";

export default function WishlistPage() {
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState<string | null>(null);

  const wishlistProductIds = useWishlistStore((state: WishlistState) => state.productIds);
  const toggleWishlistItem = useWishlistStore((state: WishlistState) => state.toggleItem);
  const addItemToCart = useCartStore((state: CartState) => state.addItem);
  const openCart = useCartStore((state: CartState) => state.openCart);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      setLoading(true);
      try {
        const res = await productService.getProducts();
        // Filter those products in the wishlist
        const filtered = res.data.filter((p) => wishlistProductIds.includes(p.id));
        setProducts(filtered);
      } catch (err) {
        console.error("Error loaded wishlist products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlistItems();
  }, [wishlistProductIds]);

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
      <div className="max-w-[75rem] mx-auto px-4 md:px-12 space-y-12">
        
        {/* Editorial Title */}
        <div className="text-center space-y-2 max-w-lg mx-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] font-label text-neutral-400">Your Selection</span>
          <h1 className="text-3xl font-display font-light uppercase tracking-widest text-neutral-900 dark:text-neutral-50">Saved Pieces</h1>
          <p className="text-xs font-body font-light text-neutral-500">A curation of pieces you desire for your modesty wardrobe.</p>
        </div>

        {/* Empty state check */}
        {products.length === 0 ? (
          <div className="text-center py-24 space-y-6 max-w-sm mx-auto">
            <Heart size={40} className="mx-auto text-neutral-350 stroke-1 dark:text-neutral-700" />
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest font-label text-neutral-400 font-medium">Your Wishlist of Pieces is Empty</p>
              <p className="text-[11px] font-body font-light text-neutral-550">Select heart indicators on any product page or catalog block to collect items here.</p>
            </div>
            <div className="pt-2">
              <Link
                href="/collections"
                className="inline-flex h-11 px-8 items-center justify-center bg-neutral-900 text-neutral-0 dark:bg-neutral-50 dark:text-neutral-1000 text-[10px] font-label uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                Explore Collections
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => {
              const isAdding = addingId === p.id;
              return (
                <div key={p.id} className="group relative bg-[#FAFAF8] dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 p-4 space-y-4 flex flex-col justify-between">
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                    <button
                      onClick={() => toggleWishlistItem(p.id)}
                      className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-black/50 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={13} />
                    </button>
                    <Image
                      src={p.image.src}
                      alt={p.image.alt || p.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 30vw"
                      className="object-cover transition-transform duration-[1500ms] group-hover:scale-102"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-widest text-[#8B6914] font-label font-medium block">
                        {p.material}
                      </span>
                      <h3 className="text-sm font-display font-light uppercase tracking-wide text-neutral-900 dark:text-neutral-50 line-clamp-1">
                        {p.name}
                      </h3>
                      <p className="text-xs font-label text-neutral-550">{p.price.formatted}</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleQuickAdd(p)}
                        className="flex-1 h-10 bg-neutral-900 dark:bg-neutral-50 text-neutral-0 dark:text-neutral-1000 text-[10px] tracking-widest font-label uppercase flex items-center justify-center gap-1.5 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                      >
                        {isAdding ? <Check size={11} /> : <ShoppingBag size={11} />}
                        {isAdding ? "ADDED" : "ADD TO BAG"}
                      </button>
                    </div>
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
