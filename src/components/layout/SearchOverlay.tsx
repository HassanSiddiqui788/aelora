"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Search, Clock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUiStore } from "@/store/ui-store";
import { productService } from "@/services/product.service";
import type { ProductCardData } from "@/types/product";
import { ROUTES } from "@/constants/routes";

const POPULAR_SEARCHES = ["Mulberry Silk", "Chiffon Hijab", "Signature Abaya", "Mélange"];

export default function SearchOverlay() {
  const isSearchOpen = useUiStore((state) => state.isSearchOpen);
  const closeSearch = useUiStore((state) => state.closeSearch);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductCardData[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("aelora_recent_searches");
      if (saved) setRecentSearches(JSON.parse(saved));
    }
  }, [isSearchOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setResults([]);
    }
  }, [isSearchOpen]);

  // Handle instant search queries
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await productService.searchProducts(query);
        setResults(res.data);
      } catch (err) {
        console.error("Search query error:", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return;
    const cleanTerm = term.trim();
    const updated = [cleanTerm, ...recentSearches.filter((s) => s !== cleanTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("aelora_recent_searches", JSON.stringify(updated));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveRecentSearch(query);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("aelora_recent_searches");
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-white/95 dark:bg-neutral-1000/95 backdrop-blur-md z-[200] overflow-y-auto"
        >
          {/* Top Bar controls */}
          <div className="max-w-[90rem] mx-auto px-4 md:px-12 py-6 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.25em] font-label text-neutral-450">
              Aelora search portal
            </span>
            <button
              onClick={closeSearch}
              className="p-2 border border-neutral-200 dark:border-neutral-800 rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
              aria-label="Close search overlay"
            >
              <X size={16} />
            </button>
          </div>

          <div className="max-w-4xl mx-auto px-4 pt-10 pb-20 space-y-12">
            {/* Search Input Bar form */}
            <form onSubmit={handleSearchSubmit} className="relative border-b border-neutral-300 dark:border-neutral-800 pb-3 flex items-center gap-4">
              <Search className="text-neutral-400 flex-shrink-0" size={24} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-xl sm:text-2xl font-display font-light placeholder-neutral-300 dark:placeholder-neutral-800 text-neutral-900 dark:text-neutral-50 focus:outline-none"
                placeholder="What are you searching for?"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-xs uppercase tracking-widest font-label font-medium text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                >
                  Clear
                </button>
              )}
            </form>

            {/* Recommendations & Logs block (Visible if search query is empty) */}
            {!query && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-6">
                
                {/* Popular searches suggestions */}
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-widest font-label text-neutral-400">Popular Searches</h4>
                  <ul className="space-y-2">
                    {POPULAR_SEARCHES.map((term) => (
                      <li key={term}>
                        <button
                          onClick={() => {
                            setQuery(term);
                            saveRecentSearch(term);
                          }}
                          className="inline-flex items-center gap-2 text-sm font-display text-neutral-700 dark:text-neutral-300 hover:text-primary-500 transition-colors"
                        >
                          <ArrowRight size={12} className="stroke-1 text-primary-500" />
                          {term}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recent search queries */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[10px] uppercase tracking-widest font-label text-neutral-400">Recent Searches</h4>
                    {recentSearches.length > 0 && (
                      <button
                        onClick={clearRecentSearches}
                        className="text-[9px] uppercase tracking-widest font-label text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  {recentSearches.length === 0 ? (
                    <p className="text-xs font-body font-light text-neutral-400">Your search queries history is empty.</p>
                  ) : (
                    <ul className="space-y-2.5">
                      {recentSearches.map((term, index) => (
                        <li key={index} className="flex items-center gap-2.5 text-xs font-body font-light text-neutral-600 dark:text-neutral-400">
                          <Clock size={12} className="text-neutral-400 stroke-1" />
                          <button
                            onClick={() => setQuery(term)}
                            className="hover:text-primary-555 text-left flex-1"
                          >
                            {term}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

              </div>
            )}

            {/* Search Results Display Area */}
            {query && (
              <div className="space-y-6 pt-6">
                
                {/* Result header count */}
                <div className="flex justify-between items-center border-b border-neutral-100 dark:border-neutral-900 pb-3">
                  <span className="text-[10px] uppercase tracking-widest font-label text-neutral-400">
                    {loading ? "Searching..." : `${results.length} results matching selection`}
                  </span>
                </div>

                {/* Empty State */}
                {!loading && results.length === 0 && (
                  <div className="text-center py-20 space-y-2">
                    <p className="text-xs uppercase tracking-widest font-label text-neutral-400">No results found for &quot;{query}&quot;</p>
                    <p className="text-[11px] font-body font-light text-neutral-500">Please check spelling or choose another product category.</p>
                  </div>
                )}

                {/* Results grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {results.slice(0, 8).map((p) => (
                    <div key={p.id} className="group space-y-3 flex flex-col justify-between">
                      <div className="relative aspect-[3/4] bg-neutral-50 dark:bg-neutral-900 overflow-hidden">
                        <Link href={ROUTES.product(p.slug)} onClick={closeSearch}>
                          <Image
                            src={p.image.src}
                            alt={p.image.alt || p.name}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-cover transition-transform duration-[1500ms] group-hover:scale-103"
                          />
                        </Link>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[9px] uppercase tracking-widest text-[#8B6914] font-label block">{p.material}</span>
                        <Link
                          href={ROUTES.product(p.slug)}
                          onClick={closeSearch}
                          className="text-xs font-display uppercase tracking-wide text-neutral-900 dark:text-neutral-50 hover:text-primary-500 transition-colors line-clamp-1"
                        >
                          {p.name}
                        </Link>
                        <span className="text-[10px] font-label text-neutral-500 font-light">{p.price.formatted}</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
