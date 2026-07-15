"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, ArrowLeft, Plus, Minus, Truck, RefreshCw, ZoomIn, Check } from "lucide-react";
import { productService } from "@/services/product.service";
import { useCartStore, type CartState } from "@/store/cart-store";
import { useWishlistStore, type WishlistState } from "@/store/wishlist-store";
import type { ProductCardData, Product } from "@/types/product";
import { ROUTES } from "@/constants/routes";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [recommended, setRecommended] = useState<ProductCardData[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState<"fabric" | "care" | "shipping">("fabric");
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  const addItemToCart = useCartStore((state: CartState) => state.addItem);
  const openCart = useCartStore((state: CartState) => state.openCart);
  const wishlistProductIds = useWishlistStore((state: WishlistState) => state.productIds);
  const toggleWishlistItem = useWishlistStore((state: WishlistState) => state.toggleItem);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await productService.getProductBySlug(slug);
        const itemData = res.data;
        if (itemData) {
          setProduct(itemData);
          setSelectedImage(itemData.images[0]?.src || "");

          // Fetch recommendation: filter same category but exclude current id
          const recommendsRes = await productService.getProducts({ category: itemData.category });
          const recommendsList = recommendsRes.data.filter((item) => item.id !== itemData.id).slice(0, 4);
          setRecommended(recommendsList);
        }
      } catch (err) {
        console.error("Error loaded product data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-1000 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-1000 flex flex-col items-center justify-center space-y-4">
        <h2 className="text-xl font-display uppercase tracking-widest text-neutral-900 dark:text-neutral-50">Piece Not Found</h2>
        <Link href={ROUTES.shop || "/collections"} className="text-xs uppercase tracking-widest font-label border-b border-neutral-905 pb-0.5">
          Back to Ready-To-Wear
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlistProductIds.includes(product.id);

  const handleAddToCart = () => {
    setAdding(true);
    addItemToCart({
      id: `${product.id}-default`,
      productId: product.id,
      variantId: `${product.id}-default`,
      name: product.name,
      slug: product.slug,
      image: product.images[0]?.src || "",
      price: product.price.amount,
      currency: product.price.currency || "USD",
      quantity: quantity,
    });
    setTimeout(() => {
      setAdding(false);
      openCart();
    }, 800);
  };

  const imagesList = product.images.length > 0 ? product.images : [{ src: "/placeholder.png", alt: "Product placeholder" }];

  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-1000 min-h-screen pt-28 pb-24">
      <div className="max-w-[85rem] mx-auto px-4 md:px-12">

        {/* Back Link */}
        <div className="mb-10">
          <Link
            href={ROUTES.shop || "/collections"}
            className="inline-flex items-center gap-2 text-[10px] uppercase font-label tracking-widest text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={12} /> Back to Catalog
          </Link>
        </div>

        {/* Dynamic Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left Column: Premium Photo Gallery */}
          <div className="space-y-6">

            {/* Main Stage Image Zoom wrapper */}
            <div className="relative aspect-[3/4] bg-neutral-100 dark:bg-neutral-900 overflow-hidden group">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={`object-cover transition-transform duration-700 ease-luxury cursor-zoom-in ${isZoomed ? "scale-150" : "scale-100"
                  }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />

              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="absolute bottom-4 right-4 p-2 bg-white/70 dark:bg-black/50 backdrop-blur-md rounded-full text-neutral-800 dark:text-neutral-200 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Toggle Image Zoom"
              >
                <ZoomIn size={16} />
              </button>
            </div>

            {/* Thumbnail Navigation Bar */}
            {imagesList.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img.src)}
                    className={`relative w-20 aspect-[3/4] overflow-hidden bg-neutral-200 border-b-2 flex-shrink-0 transition-luxury ${selectedImage === img.src ? "border-primary-500" : "border-transparent"
                      }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt || `${product.name} image thumbnail`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Premium Details details specs */}
          <div className="space-y-8 lg:sticky lg:top-24">

            {/* Header info */}
            <div className="space-y-3">
              <span className="text-[#8B6914] text-xs font-label uppercase tracking-[0.25em] font-medium">
                {product.material} — {product.category}
              </span>
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl md:text-4xl font-display font-light uppercase tracking-wider text-neutral-900 dark:text-neutral-50 leading-tight">
                  {product.name}
                </h1>
                <button
                  onClick={() => toggleWishlistItem(product.id)}
                  className={`p-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 transition-colors ${isWishlisted ? "bg-primary-500 text-neutral-0 border-primary-500" : "hover:text-primary-500 bg-white dark:bg-black"
                    }`}
                  aria-label="Add to wishlist"
                >
                  <Heart size={16} className={isWishlisted ? "fill-current" : ""} />
                </button>
              </div>
              <p className="text-xl font-label text-neutral-950 dark:text-neutral-50 font-light pt-2">
                {product.price.formatted}
              </p>
            </div>

            <hr className="border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40" />

            {/* Description Paragraph */}
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest font-label text-neutral-400">Description</p>
              <p className="text-sm font-body font-light text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {product.description || "An exemplary execution of modern modest design. Made with refined hand craftsmanship and tailored detailing, drape this piece to elevate your minimalist aesthetic effortlessly."}
              </p>
            </div>

            {/* Sizing & Quantity selector */}
            <div className="grid grid-cols-2 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-label text-neutral-400 block">Sizing</label>
                <div className="h-11 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black flex items-center px-4 text-xs font-label text-neutral-700 dark:text-neutral-300">
                  One Size (Draping Fit)
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-label text-neutral-405 block">Quantity</label>
                <div className="h-11 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black flex items-center justify-between px-3 text-xs font-label">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:text-primary-500"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-neutral-800 dark:text-neutral-200">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:text-primary-500"
                    aria-label="Increase quantity"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            </div>

            {/* Purchase Options Actions buttons */}
            <div className="pt-2">
              {product.availability === "out_of_stock" ? (
                <button
                  disabled
                  className="w-full h-12 bg-neutral-200 text-neutral-400 text-xs tracking-widest font-label uppercase cursor-not-allowed"
                >
                  OUT OF STOCK
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={adding}
                  className="w-full h-12 bg-neutral-950 dark:bg-neutral-50 text-neutral-0 dark:text-neutral-1000 text-xs tracking-widest font-label uppercase flex items-center justify-center gap-2 hover:bg-neutral-900 dark:hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  {adding ? <Check size={14} /> : <ShoppingBag size={14} />}
                  {adding ? "ADDING TO SELECTION" : "ADD TO SELECTION"}
                </button>
              )}
            </div>

            <hr className="border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40" />

            {/* Editorial Accordion specs */}
            <div className="space-y-4 pt-2">

              {/* Accordion Tabs Header */}
              <div className="flex border-b border-neutral-200 dark:border-neutral-800 relative">
                {(["fabric", "care", "shipping"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 pb-3 text-[10px] uppercase font-label tracking-widest text-center transition-luxury border-b-2 ${activeTab === tab
                        ? "text-neutral-900 dark:text-neutral-50 border-neutral-900 dark:border-neutral-50 font-medium"
                        : "text-neutral-400 border-transparent hover:text-neutral-600"
                      }`}
                  >
                    {tab === "fabric" ? "Material & Design" : tab === "care" ? "Care Guide" : "Delivery"}
                  </button>
                ))}
              </div>

              {/* Accordion Details Content */}
              <div className="text-xs font-body font-light text-neutral-600 dark:text-neutral-400 leading-relaxed pt-2 min-h-[80px]">
                {activeTab === "fabric" && (
                  <div className="space-y-2">
                    <p>Designed in house using 100% fine organic filaments, prioritizing weight drapes and light reflectivity. Crafted with raw hem details and luxury double-stitch reinforcement.</p>
                    <p className="font-label text-[10px] uppercase text-[#8B6914]">Luminosity Rating: Subtle Gloss</p>
                  </div>
                )}
                {activeTab === "care" && (
                  <div className="space-y-2">
                    <p>We advise dry cleaning to conserve the soft weave and texture of organic mulberry silk and fine wool fibers. Iron on low/silk settings inside-out. Do not machine tumble dry.</p>
                  </div>
                )}
                {activeTab === "shipping" && (
                  <div className="space-y-2 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Truck size={14} className="text-[#8B6914]" />
                      <span>Complimentary standard shipping on all international orders above $250.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RefreshCw size={14} className="text-[#8B6914]" />
                      <span>Enjoy a 14-day return window from the delivery arrival date.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic Recommendations Section */}
        {recommended.length > 0 && (
          <div className="border-t border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 pt-20 mt-20 space-y-10">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest font-label text-neutral-400">Complete The Ethos</span>
              <h3 className="text-2xl font-display font-light uppercase tracking-widest text-neutral-900 dark:text-neutral-50">Recommended Pieces</h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {recommended.map((item) => (
                <div key={item.id} className="group flex flex-col space-y-3">
                  <div className="relative aspect-[3/4] bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                    <Link href={ROUTES.product(item.slug)}>
                      <Image
                        src={item.image.src}
                        alt={item.image.alt || item.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                      />
                    </Link>
                  </div>
                  <div className="flex flex-col space-y-0.5">
                    <Link href={ROUTES.product(item.slug)} className="text-xs font-display uppercase tracking-wide text-neutral-900 dark:text-neutral-50 hover:text-primary-500 transition-colors line-clamp-1">
                      {item.name}
                    </Link>
                    <span className="text-[10px] font-label text-neutral-505 font-light">{item.price.formatted}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
