import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import SmoothScroll from "@/components/layout/SmoothScroll";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SmoothScroll>
        <Header />
        <CartDrawer />
        <SearchOverlay />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
