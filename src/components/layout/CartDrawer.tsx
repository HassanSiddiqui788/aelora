"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore, type CartState } from "@/store/cart-store";
import { ROUTES } from "@/constants/routes";

export default function CartDrawer() {
  const isOpen = useCartStore((state: CartState) => state.isOpen);
  const closeCart = useCartStore((state: CartState) => state.closeCart);
  
  const items = useCartStore((state: CartState) => state.items);
  const updateQuantity = useCartStore((state: CartState) => state.updateQuantity);
  const removeItem = useCartStore((state: CartState) => state.removeItem);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const currency = items[0]?.currency || "USD";

  const formattedSubtotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-neutral-1000/40 backdrop-blur-sm z-cart-backdrop"
          />

          {/* Drawer Slide-in Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-neutral-1000 shadow-2xl z-cart flex flex-col"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-neutral-900 dark:text-neutral-50" />
                <h2 className="text-sm font-display font-light uppercase tracking-widest text-neutral-905 dark:text-neutral-50">
                  Your Selection ({items.length})
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-1 hover:text-primary-500 transition-colors"
                aria-label="Close cart drawer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 text-center">
                  <ShoppingBag size={32} className="text-neutral-300 dark:text-neutral-700 stroke-1" />
                  <p className="text-xs uppercase tracking-widest font-label text-neutral-400">
                    Your shopping bag is empty
                  </p>
                  <button
                    onClick={closeCart}
                    className="text-[10px] uppercase tracking-widest font-label font-medium text-neutral-900 dark:text-neutral-50 border-b border-neutral-900 dark:border-neutral-50 pb-0.5"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-neutral-100 dark:border-neutral-900 pb-6">
                    {/* Item Image */}
                    <div className="relative aspect-[3/4] w-20 bg-neutral-50 dark:bg-neutral-900 overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div className="space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-display font-light uppercase tracking-wide text-neutral-900 dark:text-neutral-50 line-clamp-1">
                            {item.name}
                          </h4>
                          <span className="text-xs font-label font-light text-neutral-900 dark:text-neutral-50">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: item.currency,
                            }).format(item.price)}
                          </span>
                        </div>
                        <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-label">
                          {item.variantId.includes("default") ? "Standard" : item.color || "Default"}
                        </p>
                      </div>

                      {/* Quantity Controller & Delete */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-neutral-200 dark:border-neutral-800 text-[10px]">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1.5 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="px-3 font-label text-neutral-800 dark:text-neutral-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                            aria-label="Increase quantity"
                          >
                            <Plus size={10} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer Subtotal & Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 bg-neutral-50 dark:bg-neutral-1000 space-y-4">
                <div className="flex justify-between items-center text-xs uppercase tracking-widest font-label text-neutral-800 dark:text-neutral-300">
                  <span>Subtotal</span>
                  <span className="text-sm font-medium text-neutral-950 dark:text-neutral-50">
                    {formattedSubtotal}
                  </span>
                </div>
                <p className="text-[10px] font-body font-light text-neutral-400 dark:text-neutral-500 leading-normal">
                  Shipping and taxes calculated at checkout. Enjoy complimentary shipping on purchases over $250.
                </p>
                <div className="pt-2">
                  <Link
                    href={ROUTES.checkout || "/checkout"}
                    onClick={closeCart}
                    className="w-full h-12 bg-neutral-900 dark:bg-neutral-50 text-neutral-0 dark:text-neutral-1000 text-xs tracking-widest font-label uppercase flex items-center justify-center hover:bg-opacity-90 transition-opacity"
                  >
                    PROCEED TO CHECKOUT
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
