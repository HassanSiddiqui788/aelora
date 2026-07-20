"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Check } from "lucide-react";
import { useCartStore, type CartState } from "@/store/cart-store";
import { ROUTES } from "@/constants/routes";

export default function CartPage() {
  const items = useCartStore((state: CartState) => state.items);
  const updateQuantity = useCartStore((state: CartState) => state.updateQuantity);
  const removeItem = useCartStore((state: CartState) => state.removeItem);

  // Promo Code Code local states
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoApplied, setPromoApplied] = useState("");

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const currency = items[0]?.currency || "USD";

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    const codeClean = promoCode.trim().toUpperCase();
    if (codeClean === "AELORA10") {
      setDiscount(subtotal * 0.1);
      setPromoApplied("AELORA10");
      setPromoCode("");
    } else if (codeClean === "COMPLIMENTARY") {
      setDiscount(subtotal * 0.2);
      setPromoApplied("COMPLIMENTARY");
      setPromoCode("");
    } else {
      setPromoError("Invalid promotional coupon code");
    }
  };

  const clearPromo = () => {
    setDiscount(0);
    setPromoApplied("");
  };

  // Shipping Calculator Architecture placeholder
  const shippingCost = subtotal > 150 ? 0 : 15;
  const grandTotal = subtotal + shippingCost - discount;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(val);
  };

  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-1000 min-h-screen pt-28 pb-24">
      <div className="max-w-[75rem] mx-auto px-4 md:px-12 space-y-12">
        
        {/* Header Title */}
        <div className="border-b border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 pb-6 text-center md:text-left">
          <h1 className="text-3xl font-display font-light uppercase tracking-widest text-neutral-905 dark:text-neutral-50">
            Shopping Cart
          </h1>
          <p className="text-xs uppercase tracking-widest font-label font-light text-neutral-400 mt-1">
            Review your selection ({items.length} items)
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 space-y-6 max-w-sm mx-auto">
            <ShoppingBag size={48} className="mx-auto text-neutral-300 dark:text-neutral-700 stroke-1" />
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest font-label text-neutral-400 font-medium">Your shopping bag is empty</p>
              <p className="text-[11px] font-body font-light text-neutral-550">Browse our collections to find premium scarves and accessories.</p>
            </div>
            <div className="pt-2">
              <Link
                href="/collections"
                className="inline-flex h-11 px-8 items-center justify-center bg-neutral-900 text-neutral-0 dark:bg-neutral-50 dark:text-neutral-1000 text-[10px] font-label uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                Go to Shop
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Left: Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-6 bg-[#FAFAF8] dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 p-4 relative group">
                  {/* Item Image */}
                  <div className="relative aspect-[3/4] w-24 bg-neutral-100 dark:bg-neutral-900 overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  {/* Item Info details */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="text-sm font-display font-light uppercase tracking-wide text-neutral-900 dark:text-neutral-50">
                          {item.name}
                        </h4>
                        <span className="text-sm font-label font-light text-neutral-900 dark:text-neutral-50 flex-shrink-0">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                      <p className="text-[10px] text-neutral-450 uppercase tracking-widest font-label font-light">
                        {item.variantId.includes("default") ? "Standard / Drape" : item.color || "Default"}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      {/* Quantities */}
                      <div className="flex items-center border border-neutral-200 dark:border-neutral-850 text-xs">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-2.5 py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="px-4 font-label text-neutral-800 dark:text-neutral-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      {/* Remove item */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-455 hover:text-red-500 transition-colors flex items-center gap-1.5 text-[10px] font-label uppercase tracking-widest"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Order Recap & Promo Code */}
            <div className="space-y-6">
              
              {/* Checkout details Container */}
              <div className="bg-[#FAFAF8] dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 p-6 space-y-6">
                <h3 className="text-xs uppercase tracking-widest font-label font-light text-neutral-400 border-b border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 pb-3">
                  Order Summary
                </h3>

                <div className="space-y-3 text-xs font-label">
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Subtotal</span>
                    <span className="text-neutral-900 dark:text-white">{formatPrice(subtotal)}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-success font-medium">
                      <span>Promo Discount ({promoApplied})</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Shipping</span>
                    <span className="text-neutral-900 dark:text-white">
                      {shippingCost === 0 ? "Complimentary" : formatPrice(shippingCost)}
                    </span>
                  </div>

                  {shippingCost > 0 && (
                    <p className="text-[10px] font-body text-neutral-400 leading-normal">
                      Spend {formatPrice(150 - subtotal)} more to qualify for complimentary Express shipping.
                    </p>
                  )}

                  <div className="border-t border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 pt-4 flex justify-between text-sm uppercase tracking-widest">
                    <span>Grand Total</span>
                    <span className="font-semibold text-neutral-905 dark:text-white">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={ROUTES.checkout || "/checkout"}
                    className="w-full h-12 bg-neutral-900 dark:bg-neutral-50 text-neutral-0 dark:text-neutral-1000 text-xs tracking-widest font-label uppercase flex items-center justify-center gap-2 hover:bg-opacity-95 transition-opacity"
                  >
                    PROCEED TO CHECKOUT <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              {/* Promo Code Form */}
              <div className="bg-[#FAFAF8] dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] uppercase tracking-widest font-label text-neutral-450">Promotional Code</h4>
                  {promoApplied && (
                    <button
                      onClick={clearPromo}
                      className="text-[9px] uppercase tracking-widest font-label text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
                    >
                      Remove code
                    </button>
                  )}
                </div>

                {promoApplied ? (
                  <div className="p-3 bg-success-bg border border-success/30 text-success text-[11px] font-body flex items-center gap-2">
                    <Check size={12} />
                    <span>Coupon <strong>{promoApplied}</strong> applied successfully.</span>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="e.g. AELORA10"
                      className="flex-1 min-w-0 h-10 px-3 bg-white dark:bg-black border border-neutral-205 dark:border-neutral-800 text-xs font-label uppercase tracking-widest focus:outline-none focus:border-neutral-950 dark:focus:border-white"
                    />
                    <button
                      type="submit"
                      className="h-10 px-4 bg-neutral-900 dark:bg-neutral-550 text-neutral-0 text-xs font-label uppercase tracking-widest hover:bg-opacity-90"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {promoError && (
                  <p className="text-[10px] text-error font-body">{promoError}</p>
                )}
                {!promoApplied && (
                  <p className="text-[9px] font-body text-neutral-400 leading-normal">
                    Enter AELORA10 (10% off) or COMPLIMENTARY (20% off) for demonstration.
                  </p>
                )}
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
