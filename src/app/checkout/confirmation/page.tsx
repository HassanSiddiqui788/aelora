"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";

interface OrderSummary {
  orderId: string;
  date: string;
  totals: {
    subtotal: number;
    shipping: number;
    grandTotal: number;
    currency: string;
  };
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

export default function CheckoutConfirmationPage() {
  const [order, setOrder] = useState<OrderSummary | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const lastOrder = localStorage.getItem("aelora_last_order");
      if (lastOrder) {
        setOrder(JSON.parse(lastOrder));
      }
    }
  }, []);

  const formatPrice = (val: number, cur = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cur,
    }).format(val);
  };

  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-1000 min-h-screen pt-28 pb-24 flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto px-4 md:px-6">
        
        {/* Card Panel wrapper */}
        <div className="bg-[#FAFAF8] dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-808/60 p-8 space-y-8 text-center rounded-sm">
          
          {/* Status Symbol */}
          <div className="space-y-3">
            <CheckCircle2 size={48} className="mx-auto text-success" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-label text-neutral-400 font-medium">Order Completed</span>
            <h1 className="text-2xl sm:text-3xl font-display font-light uppercase tracking-wider text-neutral-950 dark:text-white">
              Thank You For Your Selection
            </h1>
            <p className="text-xs font-body font-light text-neutral-500 leading-normal max-w-sm mx-auto">
              Your order request is processed. A confirmation email and tracking invoice will be dispatched shortly.
            </p>
          </div>

          {/* Details details Summary (renders if local data found) */}
          {order ? (
            <div className="text-left border-t border-b border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 py-6 space-y-4 text-xs font-label">
              <div className="flex justify-between items-center text-neutral-550 border-b border-[#EDE6DB]/20 dark:border-[#2C2C2C]/20 pb-3">
                <span>ORDER NUMBER</span>
                <span className="font-semibold text-neutral-900 dark:text-white">{order.orderId}</span>
              </div>
              <div className="flex justify-between items-center text-neutral-550 border-b border-[#EDE6DB]/20 dark:border-[#2C2C2C]/20 pb-3">
                <span>ORDER DATE</span>
                <span className="text-neutral-900 dark:text-white">{new Date(order.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center text-neutral-550 border-b border-[#EDE6DB]/20 dark:border-[#2C2C2C]/20 pb-3">
                <span>DELIVERY DESTINATION</span>
                <span className="text-neutral-950 dark:text-neutral-50 font-normal">
                  {order.shippingAddress.name}, {order.shippingAddress.city}, {order.shippingAddress.country}
                </span>
              </div>
              <div className="flex justify-between items-center text-neutral-550 pt-1">
                <span>GRAND TOTAL</span>
                <span className="font-semibold text-neutral-950 dark:text-white">
                  {formatPrice(order.totals.grandTotal, order.totals.currency)}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-left border-t border-b border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 py-4 text-center">
              <p className="text-xs text-neutral-400 font-body font-light">Loading order statistics...</p>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/collections"
              className="flex-1 h-12 bg-neutral-900 dark:bg-neutral-50 text-neutral-0 dark:text-neutral-1000 text-xs tracking-widest font-label uppercase flex items-center justify-center gap-1.5 hover:bg-opacity-90 transition-opacity"
            >
              <ShoppingBag size={12} /> Continue Shopping
            </Link>
            <Link
              href="/account"
              className="flex-1 h-12 border border-neutral-300 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs tracking-widest font-label uppercase flex items-center justify-center gap-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              View Dashboard <ArrowRight size={12} />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
