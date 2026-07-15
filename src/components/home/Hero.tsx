"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ROUTES } from "@/constants/routes";

const SilkCanvas = dynamic(() => import("./SilkCanvas"), { ssr: false });

const SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1800",
    title: "Mulberry Silk",
    subtitle: "The Silk Collection",
    description: "Lustrous Italian mulberry silk finished with delicate hand-rolled hems. Crafted to drape with subtle luminosity.",
    link: ROUTES.shopScarves,
    cta: "Explore Silk",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1800",
    title: "Signature Hijabs",
    subtitle: "Aether & Lumina",
    description: "Breathable georgette chiffon and organic cotton-silk blends. Flowing silhouettes designed for everyday elegance.",
    link: ROUTES.shopHijabs,
    cta: "Explore Hijabs",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current]!;

  return (
    <section className="relative w-full h-[calc(100vh-130px)] min-h-[600px] overflow-hidden bg-neutral-100 dark:bg-neutral-1000">
      {/* Interactive Flowing Fabric canvas */}
      <SilkCanvas />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background image overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] ease-out scale-105"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          />
          {/* Rich Dark vignette layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-1000/60 via-neutral-1000/20 to-neutral-1000/30 dark:from-neutral-1000/80 dark:via-neutral-1000/40 dark:to-neutral-1000/50" />

          {/* Slide Text Content Overlay */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-[90rem] mx-auto w-full px-4 md:px-12 flex flex-col justify-center h-full">
              <div className="max-w-xl text-neutral-50 space-y-6">
                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-xs uppercase tracking-[0.2em] font-label text-primary-300 font-light"
                >
                  {slide.subtitle}
                </motion.p>
                
                {/* Main Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.9 }}
                  className="text-4xl sm:text-6xl font-display font-light tracking-[0.1em] uppercase leading-tight"
                >
                  {slide.title}
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="text-sm font-body font-light text-neutral-300 leading-relaxed"
                >
                  {slide.description}
                </motion.p>

                {/* Call-to-action */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="pt-4"
                >
                  <Link
                    href={slide.link}
                    className="inline-flex h-12 items-center justify-center border border-neutral-200 dark:border-neutral-50 px-8 text-xs uppercase tracking-widest font-label hover:bg-neutral-50 hover:text-neutral-900 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 transition-luxury"
                  >
                    {slide.cta}
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slider dots indicators */}
      <div className="absolute bottom-10 left-12 flex space-x-3 z-20">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              current === index ? "bg-primary-500 w-6" : "bg-neutral-400/50 hover:bg-neutral-200"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
