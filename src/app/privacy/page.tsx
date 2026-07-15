"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-1000 min-h-screen pt-28 pb-24 text-neutral-805 dark:text-neutral-200">
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
          <span className="text-[10px] uppercase tracking-[0.25em] font-label text-neutral-400 block">Legal Documents</span>
          <h1 className="text-2xl font-display font-light uppercase tracking-widest text-neutral-950 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-[10px] font-label text-neutral-450 mt-1 uppercase">Last updated: July 2026</p>
        </div>

        {/* Content body */}
        <div className="space-y-6 text-xs font-body font-light leading-relaxed text-neutral-600 dark:text-neutral-400">
          <p>
            At Aelora, we hold your personal classification information with maximum editorial confidentiality. This policy outlines how the House processes client digital footprints during your browse and purchase timelines.
          </p>

          <h3 className="text-xs uppercase tracking-widest font-label font-medium text-neutral-900 dark:text-neutral-50 pt-2">
            1. Information Collection
          </h3>
          <p>
            We collect data required to fulfill luxury selections, including email addresses, shipping destinations, and billing parameters. Technical session data (cookies, viewport scaling) is processed solely to render customized responsive storefront layouts.
          </p>

          <h3 className="text-xs uppercase tracking-widest font-label font-medium text-neutral-900 dark:text-neutral-50 pt-2">
            2. Safety and Transaction Shielding
          </h3>
          <p>
            All financial logs are encrypted via Secure Socket Layering (SSL/TLS). Raw credit card credentials are never archived under Aelora database registries; transactions are vaulted through accredited payment gateways.
          </p>

          <h3 className="text-xs uppercase tracking-widest font-label font-medium text-neutral-900 dark:text-neutral-50 pt-2">
            3. Client Rights
          </h3>
          <p>
            Clients reserves terms to ask for deletion, revision, or copies of all stored parameters on file. To file requests, please email our support concierge desk.
          </p>
        </div>

      </div>
    </div>
  );
}
