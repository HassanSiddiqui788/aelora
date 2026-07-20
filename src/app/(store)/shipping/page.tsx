"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-1000 min-h-screen pt-28 pb-24 text-neutral-801 dark:text-neutral-200">
      <div className="max-w-[42rem] mx-auto px-4 space-y-10">
        
        {/* Navigation Action */}
        <div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-[10px] uppercase font-label tracking-widest text-neutral-450 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={12} /> Contact Concierge
          </Link>
        </div>

        {/* Title */}
        <div className="border-b border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 pb-6">
          <span className="text-[10px] uppercase tracking-[0.25em] font-label text-neutral-400 block">Deliveries</span>
          <h1 className="text-2xl font-display font-light uppercase tracking-widest text-neutral-950 dark:text-white">
            Shipping Information
          </h1>
          <p className="text-[10px] font-label text-neutral-455 mt-1 uppercase">Courier logistics guide</p>
        </div>

        {/* Content body */}
        <div className="space-y-6 text-xs font-body font-light leading-relaxed text-neutral-600 dark:text-neutral-400">
          <p>
            The House of Aelora dispatches all curated packages globally from our primary distribution hubs in Milan and Doha. We utilize premium carriers (DHL Express, FedEx, Aramex) to ensure secure delivery.
          </p>

          <h3 className="text-xs uppercase tracking-widest font-label font-medium text-neutral-905 dark:text-neutral-50 pt-2">
            International Delivery Rates
          </h3>
          
          <table className="w-full border-collapse border border-neutral-200 dark:border-neutral-800 text-[10px] font-label text-neutral-700 dark:text-neutral-300">
            <thead>
              <tr className="bg-neutral-100 dark:bg-neutral-900">
                <th className="border border-neutral-200 dark:border-neutral-800 p-3 text-left">Destination</th>
                <th className="border border-neutral-200 dark:border-neutral-800 p-3 text-left">Estimated Timeline</th>
                <th className="border border-neutral-200 dark:border-neutral-800 p-3 text-left">Fee</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-neutral-200 dark:border-neutral-800 p-3">GCC Region</td>
                <td className="border border-neutral-200 dark:border-neutral-800 p-3">2 - 3 Business Days</td>
                <td className="border border-neutral-200 dark:border-neutral-800 p-3">Complimentary</td>
              </tr>
              <tr>
                <td className="border border-neutral-200 dark:border-neutral-800 p-3">EU & UK</td>
                <td className="border border-neutral-200 dark:border-neutral-800 p-3">3 - 4 Business Days</td>
                <td className="border border-neutral-200 dark:border-neutral-800 p-3">Complimentary or $15 below $150</td>
              </tr>
              <tr>
                <td className="border border-neutral-200 dark:border-neutral-800 p-3">North America</td>
                <td className="border border-neutral-200 dark:border-neutral-800 p-3">3 - 5 Business Days</td>
                <td className="border border-neutral-200 dark:border-neutral-800 p-3">Complimentary or $15 below $150</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xs uppercase tracking-widest font-label font-medium text-neutral-900 dark:text-neutral-50 pt-2">
            Address Exceptions
          </h3>
          <p>
            Please note that we do not courier orders to APO/FPO coordinates or PO Box locations. All packages require a signature confirmation upon receipt.
          </p>
        </div>

      </div>
    </div>
  );
}
