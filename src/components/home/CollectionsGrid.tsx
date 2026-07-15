"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { collectionService } from "@/services/product.service";
import type { CollectionCardData } from "@/types/collection";
import { ROUTES } from "@/constants/routes";

export default function CollectionsGrid() {
  const [collections, setCollections] = useState<CollectionCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await collectionService.getCollections();
        setCollections(response.data);
      } catch (err) {
        console.error("Error loaded collections:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-neutral-50 dark:bg-neutral-1000">
        <div className="max-w-[90rem] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="aspect-[4/5] w-full bg-neutral-200 dark:bg-neutral-900 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-1000">
      <div className="max-w-[90rem] mx-auto px-4 md:px-12 space-y-12">
        {/* Section Header */}
        <div className="text-center md:text-left space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] font-label text-primary-500">
            Curated Lines
          </p>
          <h2 className="text-3xl font-display font-light uppercase tracking-widest text-neutral-900 dark:text-neutral-50">
            The Collections
          </h2>
        </div>

        {/* Collections Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={ROUTES.collection(col.slug)}
              className="group relative block aspect-[4/5] overflow-hidden bg-neutral-200 dark:bg-neutral-900"
            >
              {/* Image component */}
              <Image
                src={col.image.src}
                alt={col.image.alt || col.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[1200ms] ease-luxury group-hover:scale-105"
                priority
              />

              {/* Dark transparent overlay */}
              <div className="absolute inset-0 bg-neutral-1000/30 group-hover:bg-neutral-1000/40 transition-colors duration-500" />

              {/* Text metadata overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-neutral-50">
                <div className="space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-luxury">
                  <h3 className="text-2xl font-display font-light uppercase tracking-wider">
                    {col.name}
                  </h3>
                  
                  {col.description && (
                    <p className="text-xs font-light text-neutral-300 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-luxury">
                      {col.description}
                    </p>
                  )}

                  <span className="inline-block text-[10px] tracking-[0.25em] font-label uppercase text-primary-300 border-b border-primary-300/30 pb-0.5 mt-2">
                    DISCOVER NOW
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
