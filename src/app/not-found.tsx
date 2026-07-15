"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-1000 min-h-screen pt-28 pb-24 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center space-y-8">
        
        {/* Error code */}
        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.3em] font-label text-[#8B6914] font-medium block">
            Maison Error 404
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-light uppercase tracking-[0.2em] text-neutral-900 dark:text-neutral-50">
            Lost Ethos
          </h1>
          <p className="text-xs font-body font-light text-neutral-500 max-w-xs mx-auto leading-relaxed">
            The page you requested is not recognized by our servers or has been archived from our current collection lines.
          </p>
        </div>

        {/* CTA link */}
        <div className="pt-4 flex flex-col gap-3 max-w-[240px] mx-auto">
          <Link
            href={ROUTES.home}
            className="w-full h-11 bg-neutral-900 dark:bg-neutral-50 text-neutral-0 dark:text-neutral-1000 text-[10px] tracking-widest font-label uppercase flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            Maison Homepage
          </Link>
          <Link
            href="/collections"
            className="w-full h-11 border border-neutral-300 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 text-[10px] tracking-widest font-label uppercase flex items-center justify-center gap-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            Explore Scarves <ArrowRight size={10} />
          </Link>
        </div>

      </div>
    </div>
  );
}
