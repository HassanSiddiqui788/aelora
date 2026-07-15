"use client";

import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function BrandNarrative() {
  return (
    <section className="py-28 bg-[#FAF7F2] dark:bg-neutral-1000 overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:items-center">
          
          {/* Photos Grid Column (Left) */}
          <div className="lg:col-span-6 relative flex flex-col md:flex-row gap-6 md:items-center justify-center">
            
            {/* Main Visual Card */}
            <div className="relative aspect-[3/4] w-full md:w-72 bg-neutral-200 dark:bg-neutral-900 overflow-hidden shadow-sm flex-shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?q=80&w=800"
                alt="Aelora luxury scarf fabric detail"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover transition-transform duration-[2000ms] hover:scale-105"
              />
            </div>

            {/* Offset Visual Card */}
            <div className="relative aspect-[3/4] w-full md:w-60 bg-neutral-200 dark:bg-neutral-900 overflow-hidden shadow-md md:translate-y-12 flex-shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800"
                alt="Brushing fine cotton-silk fabrics"
                fill
                sizes="(max-width: 768px) 100vw, 240px"
                className="object-cover transition-transform duration-[2000ms] hover:scale-105"
              />
            </div>

          </div>

          {/* Core Copy & Philosophy Column (Right) */}
          <div className="lg:col-span-6 space-y-8 lg:pl-8">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.25em] font-label text-primary-500 font-medium">
                Our Philosophy
              </p>
              <h2 className="text-4.5xl font-display font-light uppercase tracking-wider text-neutral-905 dark:text-neutral-50 leading-tight">
                Luminous by Nature. <br />
                Crafted by Hand.
              </h2>
            </div>

            <p className="text-sm font-body font-light text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-lg">
              Aelora represents the intersection of premium organic textiles and modest luxury values. Each piece in our collection is born from fine natural fibers: long-staple Egyptian cotton, hand-rolled Italian mulberry silk, and raw Tibetan cashmere.
            </p>

            {/* Ethos elements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-widest font-label font-medium text-neutral-900 dark:text-neutral-100">
                  Ethical Finishes
                </h4>
                <p className="text-xs font-body font-light text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  We partner directly with certified weaving mills in Como and Biella, respecting artisans and environmental parameters alike.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-widest font-label font-medium text-neutral-900 dark:text-neutral-100">
                  Made to Endure
                </h4>
                <p className="text-xs font-body font-light text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Refusing the cycle of fast fashion, our products deliver structural density and timeless designs that preserve their texture for decades.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href={ROUTES.about}
                className="inline-block text-xs uppercase tracking-[0.2em] font-label text-neutral-900 dark:text-neutral-50 border-b-2 border-neutral-900 dark:border-neutral-50 pb-1 hover:text-primary-500 hover:border-primary-500 transition-luxury"
              >
                OUR CRAFTSMANSHIP JOURNAL
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
