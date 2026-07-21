"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Eye } from "lucide-react";
import { ROUTES } from "@/constants/routes";

const TIMELINE = [
  {
    year: "2022",
    title: "The Conception",
    description: "Founded on the principles of quiet confidence, Aelora was born to bridge the gap between contemporary minimalism and traditional modesty, weaving subtle luminosity into structural designs.",
  },
  {
    year: "2023",
    title: "Como Silk & Cashmere Discovery",
    description: "We established direct partnerships with historic family mills in Como, Italy and organic cashmere farms in Inner Mongolia, securing traceably-sourced raw fabrics that feel lightweight and drape naturally.",
  },
  {
    year: "2024",
    title: "Signature Line Debut",
    description: "Launch of our capsule line of modular scarves, engineered to fall with elegant drape structure without the use of pins, defining a new vocabulary in luxury draping.",
  },
  {
    year: "2025",
    title: "The Zero-Waste Devotion",
    description: "Commitment to small-batch production runs to eliminate static warehousing overhead, donating all left-over luxury silk fibers to artisanal weavers to craft modular accessories.",
  }
];

export default function AboutPage() {
  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-1000 min-h-screen pt-28 pb-24">
      <div className="max-w-[75rem] mx-auto px-4 md:px-12 space-y-24">
        
        {/* Section 1: Intro Story Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[#8B6914] text-xs uppercase tracking-[0.25em] font-label font-medium block">
              Ethos & Philosophy
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-light uppercase tracking-wider text-neutral-905 dark:text-neutral-50 leading-tight">
              Quiet Elegance, Made to Move
            </h1>
            <p className="text-sm font-body font-light text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We design luxury scarves, hijabs, and abayas for the discerning international collector. Our philosophy lies at the intersection of structural precision and fluid movement — garments that drape effortlessly, presenting subtle luminosity with every stride.
            </p>
            <p className="text-sm font-body font-light text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Every curve, hem, and stitch is calculated to respond to body dynamics, creating garments that convey confidence in quiet, understated tones.
            </p>
          </div>
          
          <div className="relative aspect-[4/5] bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1699537317988-b0d94b666661?q=80&w=800"
              alt="Luxury fabric detail draping"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[2000ms] hover:scale-105"
            />
            <div className="absolute inset-0 bg-neutral-950/10" />
          </div>
        </div>

        {/* Section 2: Craftsmanship Pillars Cards */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl md:text-3xl font-display font-light uppercase tracking-widest">Our Three Foundations</h2>
            <p className="text-xs font-body font-light text-neutral-500">How we refine luxury modest garment-making.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <div className="bg-white dark:bg-neutral-950 p-8 border border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3 bg-neutral-50 dark:bg-neutral-900 w-fit text-[#8B6914]">
                  <Sparkles size={20} />
                </div>
                <h3 className="text-base font-display uppercase tracking-wider text-neutral-900 dark:text-neutral-50"> Como Mulberry Silk</h3>
                <p className="text-xs font-body font-light text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  We use premium high-filament mulberry silk woven by historical Como family mills. The weaves provide a delicate drape structure, resisting slippage while catching lights smoothly.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white dark:bg-neutral-950 p-8 border border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3 bg-neutral-50 dark:bg-neutral-900 w-fit text-[#8B6914]">
                  <Shield size={20} />
                </div>
                <h3 className="text-base font-display uppercase tracking-wider text-neutral-900 dark:text-neutral-50">Traceable Organic Sourcing</h3>
                <p className="text-xs font-body font-light text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  We verify every yard of fabric. From organic Mongolian cashmere farms that safeguard local grasslands, to OEKO-TEX certified dyes that save water cycles during washings.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white dark:bg-neutral-950 p-8 border border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3 bg-neutral-50 dark:bg-neutral-900 w-fit text-[#8B6914]">
                  <Eye size={20} />
                </div>
                <h3 className="text-base font-display uppercase tracking-wider text-neutral-900 dark:text-neutral-50">Pinless Structural Draping</h3>
                <p className="text-xs font-body font-light text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Through custom weighting along the seams and refined grain cuttings, our scarves and wraps drape dynamically. They hold their shape without reliance on pins, keeping fabric clean.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Section 3: Chronicles Chronology Timeline List */}
        <div className="border-t border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 pt-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:max-w-xs space-y-4 lg:sticky lg:top-28">
            <span className="text-[#8B6914] text-[10px] uppercase tracking-widest font-label font-medium block">
              The Journey
            </span>
            <h2 className="text-3xl font-display font-light uppercase tracking-wider text-neutral-905 dark:text-neutral-50">
              Chronicles
            </h2>
            <p className="text-xs font-body font-light text-neutral-500 leading-relaxed">
              Four years of exploring weaving limits, refining draping metrics, and building sustainable direct supply routes.
            </p>
          </div>

          <div className="lg:col-span-2 space-y-12">
            {TIMELINE.map((item, idx) => (
              <div 
                key={idx}
                className="flex flex-col sm:flex-row gap-4 sm:gap-12 pb-8 border-b border-[#EDE6DB]/20 dark:border-[#2C2C2C]/20 last:border-b-0"
              >
                <span className="text-2xl font-label text-[#8B6914] font-medium tracking-wider w-16 flex-shrink-0">
                  {item.year}
                </span>
                <div className="space-y-2">
                  <h4 className="text-sm font-display uppercase tracking-wider text-neutral-900 dark:text-neutral-50 font-medium">
                    {item.title}
                  </h4>
                  <p className="text-xs font-body font-light text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Section 4: Call To Action to Collections */}
        <div className="relative aspect-[21/9] bg-neutral-900 flex items-center justify-center text-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1457545195570-67f207084966?q=80&w=800"
            alt="Sourcing cashmere yarns"
            fill
            sizes="100vw"
            className="object-cover opacity-30 select-none pointer-events-none"
          />
          <div className="relative p-6 space-y-6 max-w-xl z-20">
            <h3 className="text-xl md:text-3xl font-display font-light uppercase text-white tracking-widest leading-relaxed">
              Experience the Craftsmanship In Person
            </h3>
            <Link
              href={ROUTES.shop || "/collections"}
              className="inline-flex items-center gap-2 px-6 py-3 border border-white text-xs uppercase tracking-widest font-label font-medium text-white hover:bg-white hover:text-neutral-1000 transition-colors"
            >
              Explore Our Collection <ArrowRight size={12} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
