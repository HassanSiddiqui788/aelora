import Hero from "@/components/home/Hero";
import CollectionsGrid from "@/components/home/CollectionsGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandNarrative from "@/components/home/BrandNarrative";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Premium Modest Luxury Fashion",
  description: "Explore the collection of crafted scarves, hijabs, and abayas designed to drape with subtle luminosity.",
  path: "/",
});

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <CollectionsGrid />
      <FeaturedProducts />
      <BrandNarrative />
    </div>
  );
}

