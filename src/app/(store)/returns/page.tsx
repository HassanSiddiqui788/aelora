"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-1000 min-h-screen pt-28 pb-24 text-neutral-805 dark:text-neutral-200">
      <div className="max-w-[42rem] mx-auto px-4 space-y-10">
        
        {/* Navigation Action */}
        <div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-[10px] uppercase font-label tracking-widest text-[#8B6914] hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={12} /> Contact Concierge
          </Link>
        </div>

        {/* Title */}
        <div className="border-b border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 pb-6">
          <span className="text-[10px] uppercase tracking-[0.25em] font-label text-neutral-400 block">Returns & Exchanges</span>
          <h1 className="text-2xl font-display font-light uppercase tracking-widest text-neutral-955 dark:text-white">
            Returns Policy
          </h1>
          <p className="text-[10px] font-label text-neutral-500 mt-1 uppercase">Refunds and exchanges guidelines</p>
        </div>

        {/* Content body */}
        <div className="space-y-6 text-xs font-body font-light leading-relaxed text-neutral-600 dark:text-neutral-400">
          <p>
            We take pride in the design integrity of every Aelora piece. If you wish to request a return or package exchange, we offer complimentary collection parameters within 14 calendar days of your receipt.
          </p>

          <h3 className="text-xs uppercase tracking-widest font-label font-medium text-neutral-900 dark:text-neutral-50 pt-2">
            Return Requirements
          </h3>
          <p>
            To qualify for a refund, all items must remain in original conditions:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 font-light text-neutral-500 dark:text-neutral-400">
            <li>Unworn, unwashed, and unmodified.</li>
            <li>Branded security tags intact and attached.</li>
            <li>Returned inside standard Aelora gift boxes and original protective packaging wrappers.</li>
          </ul>

          <h3 className="text-xs uppercase tracking-widest font-label font-medium text-neutral-900 dark:text-neutral-50 pt-2">
            How to File Returns
          </h3>
          <p>
            To initiate returns collections, please sign into your Customer Dashboard or contact our support desk with your order number. A pre-paid shipping courier airway bill will then be sent to you.
          </p>
        </div>

      </div>
    </div>
  );
}
