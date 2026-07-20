"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { ROUTES } from "@/constants/routes";

const ARTICLES = [
  {
    slug: "como-weaving-limits",
    title: "Inside Como: The Limits of Organic Mulberry Silk Weaving",
    excerpt: "A deep dive into our partner mills in Lombardy, where traditional shuttle looms meet modern weight metrics to create Aelora drapes.",
    coverImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800",
    category: "Behind the Scenes",
    readTime: "6 min read",
    date: "July 08, 2026",
    featured: true,
  },
  {
    slug: "sculpting-silhouettes",
    title: "Sculpting Quiet Elegance: A Study in Pinless Modest Draping",
    excerpt: "How our design team engineers weight along the structural hems to ensure scarves hold stable position without rely on steel pins.",
    coverImage: "https://images.unsplash.com/photo-158403037081-f37b7bb4fa8e?q=80&w=800",
    category: "Design Journal",
    readTime: "4 min read",
    date: "June 24, 2026",
    featured: false,
  },
  {
    slug: "cashmere-nomadic-sourcing",
    title: "Mongolian Nomadic Sourcing: Traceable Grassland Shepherd Cycles",
    excerpt: "Tracing our organic cashmere back to autonomous herder associations in the steppes of Gobi, preserving ancient grazing lands.",
    coverImage: "https://images.unsplash.com/photo-1472851294608-062f824d296e?q=80&w=800",
    category: "Sustainability",
    readTime: "8 min read",
    date: "June 12, 2026",
    featured: false,
  },
  {
    slug: "textural-geometry",
    title: "Textural Geometry: Styling Modest Separates in Mid-Summer",
    excerpt: "An editorial styling catalog showcasing asymmetric wraps, layered chiffon fabrics, and neutral tones designed to reflect heat.",
    coverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800",
    category: "Editorial Styling",
    readTime: "5 min read",
    date: "May 28, 2026",
    featured: false,
  }
];

export default function JournalPage() {
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Behind the Scenes", "Design Journal", "Sustainability", "Editorial Styling"];
  
  const filteredArticles = filter === "All" 
    ? ARTICLES 
    : ARTICLES.filter(art => art.category === filter);

  const featuredArticle = ARTICLES.find(art => art.featured && (filter === "All" || art.category === filter));
  const gridArticles = filteredArticles.filter(art => art.slug !== featuredArticle?.slug);

  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-1000 min-h-screen pt-28 pb-24">
      <div className="max-w-[80rem] mx-auto px-4 md:px-12 space-y-16">
        
        {/* Column intro header */}
        <div className="border-b border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 pb-10 space-y-4">
          <span className="text-[#8B6914] text-xs uppercase tracking-[0.25em] font-label font-medium block">
            Aelora Chronicles
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-light uppercase tracking-wider text-neutral-905 dark:text-neutral-50 leading-tight">
            The Journal
          </h1>
          <p className="text-xs font-body font-light text-neutral-500 max-w-xl">
            Essays on design philosophy, material sourcing trips, craftsmanship highlights, and collections styling catalogs.
          </p>
        </div>

        {/* Category filtering bar controls */}
        <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-none border-b border-[#EDE6DB]/20 dark:border-[#2C2C2C]/20 text-[10px] font-label uppercase tracking-widest">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 border transition-colors flex-shrink-0 ${
                filter === cat
                  ? "bg-neutral-900 border-neutral-900 text-white dark:bg-white dark:border-white dark:text-neutral-1000 font-medium"
                  : "bg-white border-neutral-200 text-neutral-600 dark:bg-black dark:border-neutral-850 hover:border-neutral-900 dark:hover:border-neutral-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Big Article Card */}
        {featuredArticle && (
          <div className="group relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white dark:bg-neutral-950 p-6 border border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40">
            <div className="relative aspect-[16/10] bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
              <Image
                src={featuredArticle.coverImage}
                alt={featuredArticle.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1500ms] group-hover:scale-102"
              />
            </div>
            
            <div className="space-y-6 lg:p-6">
              <div className="flex items-center gap-4 text-[10px] font-label text-neutral-400 uppercase tracking-widest">
                <span className="text-primary-500 font-medium">{featuredArticle.category}</span>
                <span className="flex items-center gap-1"><Clock size={10} /> {featuredArticle.readTime}</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-display font-light uppercase tracking-wider text-neutral-900 dark:text-neutral-50 leading-tight group-hover:text-primary-500 transition-colors">
                <Link href={ROUTES.journalArticle(featuredArticle.slug)}>
                  {featuredArticle.title}
                </Link>
              </h2>
              
              <p className="text-xs font-body font-light text-neutral-605 dark:text-neutral-400 leading-relaxed">
                {featuredArticle.excerpt}
              </p>
              
              <div className="pt-2">
                <Link
                  href={ROUTES.journalArticle(featuredArticle.slug)}
                  className="inline-flex items-center gap-2 text-[10px] font-label uppercase tracking-widest border-b border-neutral-900 dark:border-neutral-50 pb-0.5"
                >
                  Read Investigation <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Grid List below */}
        {gridArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gridArticles.map((art) => (
              <div key={art.slug} className="group space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                    <Link href={ROUTES.journalArticle(art.slug)}>
                      <Image
                        src={art.coverImage}
                        alt={art.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-[1500ms] group-hover:scale-102"
                      />
                    </Link>
                  </div>

                  <div className="flex items-center gap-4 text-[9px] font-label text-neutral-400 uppercase tracking-widest">
                    <span className="text-[#8B6914]">{art.category}</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="text-base font-display uppercase tracking-wider text-neutral-900 dark:text-neutral-50 hover:text-primary-500 transition-colors line-clamp-2">
                    <Link href={ROUTES.journalArticle(art.slug)}>
                      {art.title}
                    </Link>
                  </h3>

                  <p className="text-[11px] font-body font-light text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href={ROUTES.journalArticle(art.slug)}
                    className="inline-flex items-center gap-1.5 text-[9px] font-label uppercase tracking-widest text-[#8B6914] hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    Read Essay <ArrowRight size={10} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-20 text-xs text-neutral-400 uppercase tracking-widest font-label font-light">
            No chronicles written inside this category yet.
          </div>
        )}

      </div>
    </div>
  );
}
