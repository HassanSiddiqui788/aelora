"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, MapPin, Package, Heart, LogOut, ArrowRight } from "lucide-react";

interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  addresses: Array<{
    id: string;
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  }>;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderRecord {
  orderId: string;
  date: string;
  totals: {
    grandTotal: number;
    currency: string;
  };
  items: OrderItem[];
}

export default function AccountPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Address add form local states
  const [showAddAddr, setShowAddAddr] = useState(false);
  const [newAddr, setNewAddr] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "United States",
  });

  // Newsletter Preference logs
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("aelora_user_session");
      if (!session) {
        // Unauthenticated -> redirect to login
        router.push("/login");
        return;
      }
      setProfile(JSON.parse(session));

      // Fetch simulated orders
      const savedOrders = localStorage.getItem("aelora_orders");
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("aelora_user_session");
    }
    router.push("/login");
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    const newAddressObj = {
      id: `addr_${Date.now()}`,
      name: `${profile.firstName} ${profile.lastName}`,
      address: newAddr.address,
      city: newAddr.city,
      postalCode: newAddr.postalCode,
      country: newAddr.country,
      isDefault: profile.addresses.length === 0,
    };

    const updatedProfile = {
      ...profile,
      addresses: [...profile.addresses, newAddressObj],
    };

    setProfile(updatedProfile);
    if (typeof window !== "undefined") {
      localStorage.setItem("aelora_user_session", JSON.stringify(updatedProfile));
    }

    setNewAddr({ address: "", city: "", postalCode: "", country: "United States" });
    setShowAddAddr(false);
  };

  const formatPrice = (val: number, cur = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cur,
    }).format(val);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-1000 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-1000 min-h-screen pt-28 pb-24">
      <div className="max-w-[75rem] mx-auto px-4 md:px-12 space-y-12">
        
        {/* Header client info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 pb-6 gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.25em] font-label text-neutral-400">Welcome Back</span>
            <h1 className="text-2xl font-display font-light uppercase tracking-widest text-neutral-950 dark:text-white">
              {profile.firstName} {profile.lastName}
            </h1>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-[10px] uppercase font-label tracking-widest text-neutral-460 hover:text-red-500 transition-colors border border-neutral-300 dark:border-neutral-800 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              <LogOut size={12} /> Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Column 1: Profile & Newsletter */}
          <div className="space-y-8 lg:col-span-1">
            
            {/* Account Details */}
            <div className="bg-[#FAFAF8] dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 p-6 space-y-5 rounded-sm">
              <h3 className="text-xs uppercase tracking-widest font-label font-light text-neutral-400 border-b border-[#EDE6DB]/20 pb-3 flex items-center gap-2">
                <User size={14} className="stroke-1 text-[#8B6914]" /> Profile Credentials
              </h3>
              <div className="text-xs space-y-2.5 font-label text-neutral-600 dark:text-neutral-405">
                <div>
                  <span className="text-[9px] text-neutral-400 uppercase tracking-wider block">First Name</span>
                  <span className="text-neutral-950 dark:text-white text-sm font-light uppercase">{profile.firstName}</span>
                </div>
                <div>
                  <span className="text-[9px] text-neutral-400 uppercase tracking-wider block">Last Name</span>
                  <span className="text-neutral-950 dark:text-white text-sm font-light uppercase">{profile.lastName}</span>
                </div>
                <div>
                  <span className="text-[9px] text-neutral-400 uppercase tracking-wider block">Email Address</span>
                  <span className="text-neutral-950 dark:text-white font-light">{profile.email}</span>
                </div>
              </div>
            </div>

            {/* Newsletter Preferences */}
            <div className="bg-[#FAFAF8] dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 p-6 space-y-4 rounded-sm">
              <h3 className="text-xs uppercase tracking-widest font-label font-light text-neutral-400 border-b border-[#EDE6DB]/20 pb-2">
                Preferences
              </h3>
              <div className="flex items-center justify-between text-xs font-label">
                <span className="text-neutral-600 dark:text-neutral-400">Maison Newsletter Info</span>
                <input
                  type="checkbox"
                  checked={subscribeNewsletter}
                  onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                  className="w-4 h-4 accent-[#8B6914] cursor-pointer"
                />
              </div>
              <p className="text-[10px] text-neutral-400 font-body leading-normal">
                Receive visual lookbooks, seasonal drops announcements, and direct client private discounts.
              </p>
            </div>

          </div>

          {/* Column 2: Order logs History summary */}
          <div className="space-y-6 lg:col-span-1">
            <div className="bg-[#FAFAF8] dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 p-6 space-y-5 rounded-sm">
              <div className="flex justify-between items-center border-b border-[#EDE6DB]/20 pb-3">
                <h3 className="text-xs uppercase tracking-widest font-label font-light text-neutral-400 flex items-center gap-2">
                  <Package size={14} className="stroke-1 text-[#8B6914]" /> Recent Orders ({orders.length})
                </h3>
                {orders.length > 0 && (
                  <Link
                    href="/account/orders"
                    className="text-[9px] uppercase tracking-widest font-label text-neutral-500 hover:text-neutral-950 dark:hover:text-white flex items-center gap-0.5"
                  >
                    View All <ArrowRight size={10} />
                  </Link>
                )}
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-8 space-y-2">
                  <p className="text-xs font-body font-light text-neutral-450">You haven&apos;t placed any orders yet.</p>
                  <Link
                    href="/collections"
                    className="inline-block text-[10px] font-label uppercase tracking-widest border-b border-neutral-900 pb-0.5"
                  >
                    Explore Catalog
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 3).map((item) => (
                    <div key={item.orderId} className="border-b border-[#EDE6DB]/20 last:border-0 pb-3 last:pb-0 space-y-1.5 text-xs font-label">
                      <div className="flex justify-between font-medium">
                        <span className="text-neutral-900 dark:text-neutral-50">{item.orderId}</span>
                        <span className="text-[#8B6914]">{formatPrice(item.totals.grandTotal, item.totals.currency)}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-400">
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                        <span className="uppercase text-[9px] bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 font-medium rounded-sm">
                          Completed
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist Shortcut page */}
            <div className="bg-[#FAFAF8] dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 p-6 space-y-4 rounded-sm">
              <h3 className="text-xs uppercase tracking-widest font-label font-light text-neutral-400 border-b border-[#EDE6DB]/20 pb-3 flex items-center gap-2">
                <Heart size={14} className="stroke-1 text-[#8B6914]" /> Wishlist Directory
              </h3>
              <p className="text-xs font-body font-light text-neutral-500 leading-normal">
                View or purchase from your pre-selected modest items and design lines.
              </p>
              <Link
                href="/wishlist"
                className="w-full h-10 border border-neutral-300 dark:border-neutral-800 text-[10px] tracking-widest font-label uppercase flex items-center justify-center gap-1.5 hover:bg-neutral-905 click:bg-amber-600 hover:text-white dark:hover:text-black dark:hover:bg-white transition-all rounded-sm"
              >
                Open Saved Selections
              </Link>
            </div>
          </div>

          {/* Column 3: Shipping Addresses */}
          <div className="space-y-6 lg:col-span-1">
            <div className="bg-[#FAFAF8] dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 p-6 space-y-5 rounded-sm">
              <h3 className="text-xs uppercase tracking-widest font-label font-light text-neutral-400 border-b border-[#EDE6DB]/20 pb-3 flex items-center gap-2">
                <MapPin size={14} className="stroke-1 text-[#8B6914]" /> Saved Addresses
              </h3>

              {profile.addresses.length === 0 ? (
                <p className="text-xs font-body font-light text-neutral-450 text-center py-4">No shipping addresses on file.</p>
              ) : (
                <div className="space-y-4">
                  {profile.addresses.map((addr) => (
                    <div key={addr.id} className="text-xs font-label space-y-1 pb-3 border-b border-[#EDE6DB]/25 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-neutral-900 dark:text-neutral-50 uppercase">{addr.name}</span>
                        {addr.isDefault && (
                          <span className="text-[8px] bg-primary-500/20 text-[#8B6914] px-1 text-[8px] uppercase font-semibold">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-neutral-500 leading-normal">
                        {addr.address}<br />
                        {addr.city}, {addr.postalCode}<br />
                        {addr.country}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Address CTA */}
              {!showAddAddr ? (
                <button
                  onClick={() => setShowAddAddr(true)}
                  className="w-full text-center text-[10px] uppercase tracking-widest font-label border border-dashed border-neutral-300 dark:border-neutral-700 py-2.5 text-neutral-450 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  + Add New Address
                </button>
              ) : (
                <form onSubmit={handleAddAddress} className="space-y-3 pt-2">
                  <input
                    required
                    type="text"
                    placeholder="Street Address"
                    value={newAddr.address}
                    onChange={(e) => setNewAddr((prev) => ({ ...prev, address: e.target.value }))}
                    className="w-full h-9 px-3 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-label focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      required
                      type="text"
                      placeholder="City"
                      value={newAddr.city}
                      onChange={(e) => setNewAddr((prev) => ({ ...prev, city: e.target.value }))}
                      className="h-9 px-3 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-label focus:outline-none"
                    />
                    <input
                      required
                      type="text"
                      placeholder="Postal Code"
                      value={newAddr.postalCode}
                      onChange={(e) => setNewAddr((prev) => ({ ...prev, postalCode: e.target.value }))}
                      className="h-9 px-3 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-805 text-xs font-label focus:outline-none"
                    />
                  </div>
                  <select
                    value={newAddr.country}
                    onChange={(e) => setNewAddr((prev) => ({ ...prev, country: e.target.value }))}
                    className="w-full h-9 px-2 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-805 text-xs font-label focus:outline-none"
                  >
                    <option>United States</option>
                    <option>Qatar</option>
                    <option>United Arab Emirates</option>
                    <option>Saudi Arabia</option>
                    <option>UK</option>
                  </select>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 h-9 bg-neutral-900 dark:bg-neutral-50 text-neutral-0 dark:text-neutral-1000 text-[10px] tracking-widest font-label uppercase"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddAddr(false)}
                      className="h-9 px-4 border border-neutral-300 dark:border-neutral-802 text-[10px] tracking-widest font-label uppercase text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-850"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
