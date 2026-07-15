"use client";

import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { BRAND } from "@/constants/brand";

export default function Footer() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter sign-up
    alert("Thank you for subscribing to AELORA.");
  };

  return (
    <footer className="bg-neutral-900 text-neutral-300 dark:bg-neutral-1000 border-t border-neutral-850 dark:border-neutral-900">
      {/* Newsletter signup & Brand statement */}
      <div className="max-w-[90rem] mx-auto px-4 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-neutral-800">
        <div className="lg:col-span-6 space-y-6">
          <h3 className="text-xl font-display font-light text-neutral-50 tracking-[0.1em] uppercase">
            The Aelora Journal
          </h3>
          <p className="text-sm text-neutral-400 font-light max-w-md leading-relaxed">
            Subscribe to receive advanced previews of new collections, stories of craftsmanship, and exclusive luxury insights directly.
          </p>
          <form onSubmit={handleSubmit} className="flex max-w-md items-center border-b border-neutral-600 focus-within:border-neutral-50 py-2 transition-colors">
            <input
              type="email"
              required
              placeholder="YOUR EMAIL"
              className="bg-transparent border-none text-xs tracking-widest font-label font-light text-neutral-100 placeholder:text-neutral-500 focus:outline-none w-full uppercase"
            />
            <button
              type="submit"
              className="text-xs uppercase font-label tracking-widest text-neutral-50 hover:text-primary-500 transition-colors ml-4 whitespace-nowrap"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>

        <div className="lg:col-span-6 lg:text-right flex flex-col justify-between space-y-6 lg:space-y-0">
          <div>
            <h2 className="text-3xl font-display font-light text-neutral-50 tracking-[0.2em] uppercase">
              AELORA
            </h2>
            <p className="text-xs font-label text-primary-500 tracking-[0.2em] uppercase mt-2">
              Luminous by nature.
            </p>
          </div>
          <p className="text-sm font-light text-neutral-400 leading-relaxed max-w-sm lg:ml-auto">
            Crafting premium modest luxury fashion using fine silks, wool cashmere, and tailored finishes built to transcend seasons.
          </p>
        </div>
      </div>

      {/* Grid Links */}
      <div className="max-w-[90rem] mx-auto px-4 md:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-neutral-800 text-xs font-label">
        <div className="space-y-4">
          <h4 className="text-neutral-50 uppercase tracking-[0.2em] font-medium">Boutique</h4>
          <ul className="space-y-3 font-light text-neutral-400">
            <li>
              <Link href={ROUTES.shopScarves} className="hover:text-neutral-50 transition-colors">Scarves</Link>
            </li>
            <li>
              <Link href={ROUTES.shopHijabs} className="hover:text-neutral-50 transition-colors">Hijabs</Link>
            </li>
            <li>
              <Link href={ROUTES.shopAbayas} className="hover:text-neutral-50 transition-colors">Abayas</Link>
            </li>
            <li>
              <Link href={ROUTES.shop} className="hover:text-neutral-50 transition-colors">Shop All</Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-neutral-50 uppercase tracking-[0.2em] font-medium">Inside Aelora</h4>
          <ul className="space-y-3 font-light text-neutral-400">
            <li>
              <Link href={ROUTES.about} className="hover:text-neutral-50 transition-colors">Our Story</Link>
            </li>
            <li>
              <Link href={ROUTES.craftsmanship} className="hover:text-neutral-50 transition-colors">Craftsmanship</Link>
            </li>
            <li>
              <Link href={ROUTES.sustainability} className="hover:text-neutral-50 transition-colors">Sustainability</Link>
            </li>
            <li>
              <Link href={ROUTES.journal} className="hover:text-neutral-50 transition-colors">The Journal</Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-neutral-50 uppercase tracking-[0.2em] font-medium">Assistance</h4>
          <ul className="space-y-3 font-light text-neutral-400">
            <li>
              <Link href={ROUTES.faq} className="hover:text-neutral-50 transition-colors">FAQs</Link>
            </li>
            <li>
              <Link href={ROUTES.shipping} className="hover:text-neutral-50 transition-colors">Shipping & Duties</Link>
            </li>
            <li>
              <Link href={ROUTES.returns} className="hover:text-neutral-50 transition-colors">Returns & Exchanges</Link>
            </li>
            <li>
              <Link href={ROUTES.contact} className="hover:text-neutral-50 transition-colors">Contact Care</Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-neutral-50 uppercase tracking-[0.2em] font-medium">Connect</h4>
          <ul className="space-y-3 font-light text-neutral-400">
            <li>
              <a href={BRAND.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-50 transition-colors">Instagram</a>
            </li>
            <li>
              <a href={BRAND.social.pinterest} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-50 transition-colors">Pinterest</a>
            </li>
            <li>
              <a href={`mailto:${BRAND.contactEmail}`} className="hover:text-neutral-50 transition-colors">hello@aelora.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright line */}
      <div className="max-w-[90rem] mx-auto px-4 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between text-[10px] font-label font-light uppercase tracking-widest text-[#FAFAF7]/50 gap-4">
        <div>
          © {new Date().getFullYear()} AELORA BOUTIQUE. All Rights Reserved.
        </div>
        <div className="flex items-center gap-6">
          <Link href={ROUTES.privacy} className="hover:text-neutral-50 transition-colors">Privacy</Link>
          <Link href={ROUTES.terms} className="hover:text-neutral-50 transition-colors">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
}
