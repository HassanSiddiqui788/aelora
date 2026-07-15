"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Package } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface OrderRecord {
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
  items: OrderItem[];
}

export default function OrderHistoryPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("aelora_user_session");
      if (!session) {
        router.push("/login");
        return;
      }

      const savedOrders = localStorage.getItem("aelora_orders");
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    }
    setLoading(false);
  }, [router]);

  const formatPrice = (val: number, cur = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cur,
    }).format(val);
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
      <div className="max-w-[55rem] mx-auto px-4 md:px-6 space-y-10">
        
        {/* Navigation Action */}
        <div>
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 text-[10px] uppercase font-label tracking-widest text-neutral-450 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={12} /> Back to Dashboard
          </Link>
        </div>

        {/* Header */}
        <div className="border-b border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 pb-6">
          <h1 className="text-2xl font-display font-light uppercase tracking-widest text-neutral-950 dark:text-white">
            Order Registry
          </h1>
          <p className="text-xs uppercase tracking-widest font-label font-light text-neutral-400 mt-1">
            Tracking invoice history on file
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-[#FAFAF8] dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 space-y-4">
            <Package size={32} className="mx-auto text-neutral-300 stroke-1" />
            <p className="text-xs font-body font-light text-neutral-540">No purchase records registered under your profile.</p>
            <Link
              href="/collections"
              className="inline-flex h-10 px-6 items-center justify-center bg-neutral-900 text-neutral-0 dark:bg-neutral-50 dark:text-neutral-1000 text-[10px] font-label uppercase tracking-widest"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order.orderId} className="bg-[#FAFAF8] dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 p-6 space-y-6 rounded-sm">
                
                {/* Order Top Bar details */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EDE6DB]/20 dark:border-[#2C2C2C]/20 pb-4 gap-4 text-xs font-label">
                  <div className="space-y-1">
                    <span className="text-neutral-400 uppercase text-[9px] tracking-wider block">Order ID</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">{order.orderId}</span>
                  </div>
                  <div className="flex gap-6">
                    <div className="space-y-1">
                      <span className="text-neutral-400 uppercase text-[9px] tracking-wider block">Purchased Date</span>
                      <span className="text-neutral-800 dark:text-neutral-200">{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-neutral-400 uppercase text-[9px] tracking-wider block">Grand Total</span>
                      <span className="font-semibold text-neutral-900 dark:text-white">
                        {formatPrice(order.totals.grandTotal, order.totals.currency)}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-neutral-400 uppercase text-[9px] tracking-wider block">Status</span>
                      <span className="bg-primary-500/20 text-[#8B6914] px-2 py-0.5 rounded-sm font-medium uppercase text-[8px] tracking-wider">
                        Completed
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items and Address details */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Items List */}
                  <div className="md:col-span-7 space-y-4">
                    <h4 className="text-[10px] uppercase tracking-widest font-label text-neutral-400">Order Items</h4>
                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="relative aspect-[3/4] w-12 bg-neutral-100 dark:bg-neutral-800 overflow-hidden flex-shrink-0">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 text-[8px] font-label text-neutral-400">NO IMG</div>
                            )}
                          </div>
                          <div className="flex-1 flex flex-col justify-between py-0.5 text-xs font-label">
                            <div>
                              <h5 className="font-display font-light uppercase tracking-wide text-neutral-900 dark:text-neutral-50 line-clamp-1">
                                {item.name}
                              </h5>
                              <p className="text-[9px] text-neutral-400 font-light mt-0.5">Quantity: {item.quantity}</p>
                            </div>
                            <span className="text-neutral-850 dark:text-neutral-300 font-light">
                              {formatPrice(item.price * item.quantity, order.totals.currency)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery address recap */}
                  <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-[#EDE6DB]/20 dark:border-[#2C2C2C]/20 pt-4 md:pt-0 md:pl-6 space-y-3 text-xs font-label">
                    <h4 className="text-[10px] uppercase tracking-widest font-label text-neutral-400">Shipping Details</h4>
                    <div className="text-neutral-600 dark:text-neutral-401 leading-relaxed">
                      <strong className="block text-neutral-900 dark:text-neutral-50 uppercase font-medium">{order.shippingAddress.name}</strong>
                      {order.shippingAddress.address}<br />
                      {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                      {order.shippingAddress.country}
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
