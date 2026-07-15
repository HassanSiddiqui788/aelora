"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Bookmark, Share2 } from "lucide-react";
import { ROUTES } from "@/constants/routes";

const ARTICLES_CONTENT = {
  "como-weaving-limits": {
    title: "Inside Como: The Limits of Organic Mulberry Silk Weaving",
    category: "Behind the Scenes",
    readTime: "6 min read",
    date: "July 08, 2026",
    coverImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800",
    paragraphs: [
      "In the historical valleys of Lombardy, the Como silk weaving tradition holds an irreplaceable rank in high fashion. Here, we sat down with the master weavers at Macclesfield-Como mills to explore the mechanical and sculptural limits of organic mulberry silk.",
      "The secret lies in the density. Unlike typical production silk, which is light and calls for synthetic stabilizing sprays during weaving, Aelora uses an exceptionally high thread count (40-momme density). This requires running shuttle looms at slow, specialized gears to prevent needle heat from melting the organic proteins of the raw silk yarn.",
      "The result is a fabric that holds its own weight. Each scarf possesses what we describe as 'subtle luminosity' — a surface that registers light in matte gradients rather than high glass reflections. In this essay, we document the three-month journey to calibrate these looms to achieve pinless draping stability."
    ]
  },
  "sculpting-silhouettes": {
    title: "Sculpting Quiet Elegance: A Study in Pinless Modest Draping",
    category: "Design Journal",
    readTime: "4 min read",
    date: "June 24, 2026",
    coverImage: "https://images.unsplash.com/photo-158403037081-f37b7bb4fa8e?q=80&w=800",
    paragraphs: [
      "Traditional modest draping often depends heavily on pins, clips, and internal under-caps to retain structure. While functional, these additions disrupt the fluid silhouette of high-quality silks and chiffon fabrics.",
      "Our design team approached this from a structural engineering angle. By sewing custom weights (using fine glass microlace micro-beads) directly into the bottom corners and along raw hems, we shifted the center of gravity of the scarf downwards.",
      "When draped over the shoulder, the weight pulls the fabric into architectural folds that resist wind shifts and head movements while allowing the top panels to sit gently. Read on to see our fabric tension test charts."
    ]
  },
  "cashmere-nomadic-sourcing": {
    title: "Mongolian Nomadic Sourcing: Traceable Grassland Shepherd Cycles",
    category: "Sustainability",
    readTime: "8 min read",
    date: "June 12, 2026",
    coverImage: "https://images.unsplash.com/photo-1472851294608-062f824d296e?q=80&w=800",
    paragraphs: [
      "Cashmere is celebrated for its weightless warmth, but the high demand has often triggered intensive overgrazing in Mongolian steppe grasslands. At Aelora, we seek raw cashmere that supports the grassland ecosystem.",
      "We partner directly with nomadic herder cooperatives who cycle grazing zones across seasonal pastures, giving wild sage grasses time to regenerate on the clay plains.",
      "By purchasing directly during spring combings, we ensure herders receive higher premiums while tracking every lot number to the cooperative. This yields a cashmere fabric that is soft, resilient, and traceably honest."
    ]
  },
  "textural-geometry": {
    title: "Textural Geometry: Styling Modest Separates in Mid-Summer",
    category: "Editorial Styling",
    readTime: "5 min read",
    date: "May 28, 2026",
    coverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800",
    paragraphs: [
      "Midsummer requires layers that reflect sun radiation while letting heat escape. Our Summer styling catalog focuses on 'textural geometry'—the art of contrasting different fabric textures.",
      "For a high-end editorial structure, we styling a structured linen abaya wrap paired with a Como silk scarf draped loosely around the neck. The matte linen absorbs highlights while the silk highlights face contours.",
      "We select organic, loose-weave fibers in chalk white, desert clay, and dark charcoal, avoiding dyes that lock synthetic polymers inside the thread cores."
    ]
  }
};

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default function JournalArticlePage({ params }: ArticlePageProps) {
  const { slug } = use(params);
  
  const article = ARTICLES_CONTENT[slug as keyof typeof ARTICLES_CONTENT];

  if (!article) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-1000 flex flex-col items-center justify-center space-y-4">
        <h2 className="text-xl font-display uppercase tracking-widest text-neutral-900 dark:text-neutral-50">Essay Not Found</h2>
        <Link href={ROUTES.journal || "/journal"} className="text-xs uppercase tracking-widest font-label border-b border-neutral-905 pb-0.5">
          Back to Journal
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-1000 min-h-screen pt-28 pb-24">
      <div className="max-w-[50rem] mx-auto px-4 md:px-8 space-y-10">
        
        {/* Back navigation */}
        <div>
          <Link
            href={ROUTES.journal || "/journal"}
            className="inline-flex items-center gap-2 text-[10px] uppercase font-label tracking-widest text-neutral-550 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={12} /> Back to Journal
          </Link>
        </div>

        {/* Article Metadata header */}
        <div className="space-y-4">
          <span className="text-[#8B6914] text-[10px] uppercase tracking-widest font-label font-medium">
            {article.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-light uppercase tracking-wider text-neutral-900 dark:text-neutral-50 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 text-[10px] font-label uppercase tracking-widest text-neutral-400">
            <div className="flex gap-6">
              <span className="flex items-center gap-1.5"><Calendar size={12} /> {article.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={12} /> {article.readTime}</span>
            </div>
            
            <div className="flex gap-4">
              <button className="hover:text-primary-500 transition-colors" aria-label="Bookmark article">
                <Bookmark size={14} />
              </button>
              <button className="hover:text-primary-500 transition-colors" aria-label="Share article">
                <Share2 size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Lead cover image */}
        <div className="relative aspect-[16/9] bg-neutral-200 dark:bg-neutral-900 overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </div>

        {/* Body content essays */}
        <div className="space-y-8 pt-4">
          {article.paragraphs.map((p, idx) => (
            <p 
              key={idx}
              className="text-sm font-body font-light text-neutral-700 dark:text-neutral-350 leading-relaxed text-justify first-letter:text-2xl first-letter:font-display first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:text-primary-550"
            >
              {p}
            </p>
          ))}
        </div>

        {/* Footer recommendation */}
        <div className="border-t border-neutral-200 dark:border-neutral-805 pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 dark:text-neutral-400">
          <span className="text-xs font-body font-light">Thank you for reading the Aelora Chronicles.</span>
          <Link
            href={ROUTES.journal || "/journal"}
            className="text-[10px] uppercase font-label tracking-widest border-b border-[#8B6914] text-[#8B6914] pb-0.5"
          >
            Explore More Essays
          </Link>
        </div>

      </div>
    </div>
  );
}
