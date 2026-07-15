"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Heart, Menu, X } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useUiStore } from "@/store/ui-store";
import { useCartStore, selectCartCount, type CartState } from "@/store/cart-store";
import { useWishlistStore, selectWishlistCount } from "@/store/wishlist-store";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { toggleMobileMenu, isMobileMenuOpen, openSearch, closeMobileMenu } = useUiStore();
  const cartCount = useCartStore(selectCartCount);
  const openCart = useCartStore((state: CartState) => state.openCart);
  
  const wishlistCount = useWishlistStore(selectWishlistCount);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Utility Bar */}
      <div className="w-full bg-[#1A1A1A] text-[#FAFAF7] py-2 text-center text-[10px] uppercase tracking-[0.2em] font-label font-light">
        Free worldwide delivery on orders over $150
      </div>

      <header
        className={`sticky top-0 z-header w-full transition-all duration-500 ease-luxury ${
          isScrolled
            ? "bg-neutral-100/90 dark:bg-neutral-1000/90 backdrop-blur-md border-b border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 py-4 shadow-sm"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-[90rem] mx-auto px-4 md:px-12 flex items-center justify-between">
          {/* Mobile Menu Action */}
          <div className="flex md:hidden items-center justify-start flex-1">
            <button
              onClick={toggleMobileMenu}
              className="text-neutral-900 dark:text-neutral-50 p-1 hover:opacity-75 transition-opacity"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Desktop Navigation Left */}
          <nav className="hidden md:flex items-center gap-8 flex-1 text-xs uppercase tracking-[0.15em] font-label font-light">
            <Link href={ROUTES.shop} className="relative py-1 group text-neutral-800 dark:text-neutral-200">
              Shop
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary-500 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href={ROUTES.collections} className="relative py-1 group text-neutral-800 dark:text-neutral-200">
              Collections
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary-500 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href={ROUTES.about} className="relative py-1 group text-neutral-800 dark:text-neutral-200">
              Our Ethos
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          {/* Center Brand Identity */}
          <div className="flex items-center justify-center flex-shrink-0">
            <Link
              href={ROUTES.home}
              className="text-2xl md:text-3xl font-display font-light tracking-[0.25em] text-neutral-900 dark:text-neutral-50 hover:opacity-90 transition-opacity"
            >
              AELORA
            </Link>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center justify-end flex-1 gap-4 md:gap-6 text-neutral-900 dark:text-neutral-50">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="p-1 hover:text-primary-500 dark:hover:text-primary-600 transition-colors"
              aria-label="Open search drawer"
            >
              <Search size={18} />
            </button>

            {/* Wishlist Link */}
            <Link
              href={ROUTES.wishlist}
              className="p-1 hover:text-primary-500 dark:hover:text-primary-600 transition-colors relative"
              aria-label="View wishlist"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary-500 text-neutral-0 text-[8px] font-semibold flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="p-1 hover:text-primary-500 dark:hover:text-primary-600 transition-colors relative"
              aria-label="Open shopping cart"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary-500 text-neutral-0 text-[8px] font-semibold flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[88px] bottom-0 bg-neutral-100 dark:bg-neutral-1000 z-header border-t border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 animate-fade-in px-8 py-10 flex flex-col justify-between overflow-y-auto">
            <nav className="flex flex-col gap-6 text-lg uppercase tracking-[0.2em] font-display font-light">
              <Link href={ROUTES.shop} onClick={closeMobileMenu} className="text-neutral-900 dark:text-neutral-50 py-2 border-b border-[#EDE6DB]/30">
                Shop All
              </Link>
              <Link href={ROUTES.shopScarves} onClick={closeMobileMenu} className="text-neutral-800 dark:text-neutral-200 text-sm ml-4 py-1">
                Scarves
              </Link>
              <Link href={ROUTES.shopHijabs} onClick={closeMobileMenu} className="text-neutral-800 dark:text-neutral-200 text-sm ml-4 py-1">
                Hijabs
              </Link>
              <Link href={ROUTES.shopAbayas} onClick={closeMobileMenu} className="text-neutral-800 dark:text-neutral-200 text-sm ml-4 py-1">
                Abayas
              </Link>
              <Link href={ROUTES.collections} onClick={closeMobileMenu} className="text-neutral-900 dark:text-neutral-50 py-2 border-b border-[#EDE6DB]/30 mt-2">
                Collections
              </Link>
              <Link href={ROUTES.about} onClick={closeMobileMenu} className="text-neutral-950 dark:text-neutral-50 py-2 border-b border-[#EDE6DB]/30 mt-2">
                Our Ethos
              </Link>
              <Link href={ROUTES.journal} onClick={closeMobileMenu} className="text-neutral-950 dark:text-neutral-50 py-2 border-b border-[#EDE6DB]/30 mt-2">
                Journal
              </Link>
            </nav>
            <div className="pb-8 space-y-4">
              <Link href={ROUTES.account} onClick={closeMobileMenu} className="block text-center w-full py-3 border border-neutral-900 dark:border-neutral-50 text-xs uppercase tracking-widest font-label">
                My Account
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
