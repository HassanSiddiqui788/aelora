"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-1000 min-h-screen pt-28 pb-24 text-neutral-808 dark:text-neutral-200">
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
          <span className="text-[10px] uppercase tracking-[0.25em] font-label text-neutral-400 block">Terms of Service</span>
          <h1 className="text-2xl font-display font-light uppercase tracking-widest text-neutral-950 dark:text-white">
            Client Agreement
          </h1>
          <p className="text-[10px] font-label text-neutral-450 mt-1 uppercase">Last updated: July 2026</p>
        </div>

        {/* Content body */}
        <div className="space-y-6 text-xs font-body font-light leading-relaxed text-neutral-600 dark:text-neutral-400">
          <p>
            Welcome to the Aelora digital atelier. By browsing our selections or submitting order requests, you agree to comply with and be bound by the following digital terms of service.
          </p>

          <h3 className="text-xs uppercase tracking-widest font-label font-medium text-neutral-900 dark:text-neutral-50 pt-2">
            1. Purchases and Pricing
          </h3>
          <p>
            All price listings are compiled in U.S. Dollars (USD) or regional equivalent currencies. House retains rights to modify listing prices or cancel transactions due to stock discrepancies at its discretion.
          </p>

          <h3 className="text-xs uppercase tracking-widest font-label font-medium text-neutral-900 dark:text-neutral-50 pt-2">
            2. Intellectual Property
          </h3>
          <p>
            All media, descriptions, site frameworks, layouts, and custom shaders are protected copyright elements owned exclusively by the Aelora Brand House. Reproduction without consent is strictly prohibited.
          </p>

          <h3 className="text-xs uppercase tracking-widest font-label font-medium text-neutral-950 dark:text-neutral-50 pt-2">
            3. Governing Law
          </h3>
          <p>
            These terms are governed in accordance with international commercial commerce guidelines. Any arbitration disputes shall be resolved in local civil corporate courts.
          </p>
        </div>

      </div>
    </div>
  );
}
