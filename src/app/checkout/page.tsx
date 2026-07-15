"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, ShieldCheck } from "lucide-react";
import { useCartStore, type CartState } from "@/store/cart-store";

interface FormState {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state: CartState) => state.items);
  const clearCart = useCartStore((state: CartState) => state.clearCart);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const currency = items[0]?.currency || "USD";
  const shipping = subtotal > 150 ? 0 : 15;
  const grandTotal = subtotal + shipping;

  const [step, setStep] = useState<"shipping" | "payment">("shipping");
  const [formData, setFormData] = useState<FormState>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    country: "United States",
    phone: "",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "shipping") {
      setStep("payment");
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate placing order: compile fields and save to local simulated order history.
    const orderId = `AEL-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderId,
      date: new Date().toISOString(),
      items: items.map((i) => ({
        id: i.productId,
        name: i.name,
        quantity: i.quantity,
        price: i.price,
        image: i.image,
      })),
      totals: {
        subtotal,
        shipping,
        grandTotal,
        currency,
      },
      shippingAddress: {
        name: `${formData.firstName} ${formData.lastName}`,
        address: formData.address,
        apartment: formData.apartment,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
    };

    if (typeof window !== "undefined") {
      const existingRaw = localStorage.getItem("aelora_orders");
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      localStorage.setItem("aelora_orders", JSON.stringify([newOrder, ...existing]));
      localStorage.setItem("aelora_last_order", JSON.stringify(newOrder));
    }

    // Clear cart & route to confirmation
    clearCart();
    router.push("/checkout/confirmation");
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(val);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-1000 flex flex-col items-center justify-center space-y-4">
        <h2 className="text-sm font-display uppercase tracking-widest text-neutral-900 dark:text-neutral-50">Checkout is empty</h2>
        <Link href="/collections" className="text-xs uppercase tracking-widest font-label border-b border-neutral-950 pb-0.5">
          Go back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-1000 min-h-screen pt-28 pb-24">
      <div className="max-w-[75rem] mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Side columns */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Steps Guide Indicator */}
            <div className="flex items-center gap-6 text-[10px] font-label uppercase tracking-widest border-b border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 pb-4">
              <span className={step === "shipping" ? "text-neutral-900 dark:text-neutral-50 font-semibold" : "text-neutral-400"}>
                01. Shipping Details
              </span>
              <span className="text-neutral-300">/</span>
              <span className={step === "payment" ? "text-neutral-900 dark:text-neutral-50 font-semibold" : "text-neutral-400"}>
                02. Payment Architecture
              </span>
            </div>

            {/* Step 1: Shipping Details */}
            {step === "shipping" && (
              <form onSubmit={handleNextStep} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xs uppercase tracking-widest font-label text-neutral-400">Customer Identity</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full h-11 px-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-label focus:outline-none focus:border-neutral-900 dark:focus:border-white"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs uppercase tracking-widest font-label text-neutral-400">Shipping Destination</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      required
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="h-11 px-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-label focus:outline-none focus:border-neutral-900 dark:focus:border-white"
                    />
                    <input
                      required
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="h-11 px-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-label focus:outline-none focus:border-neutral-900 dark:focus:border-white"
                    />
                  </div>
                  <input
                    required
                    type="text"
                    name="address"
                    placeholder="Address, Building, Street"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full h-11 px-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-label focus:outline-none focus:border-neutral-900 dark:focus:border-white"
                  />
                  <input
                    type="text"
                    name="apartment"
                    placeholder="Apartment, Suite, Unit (Optional)"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="w-full h-11 px-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-label focus:outline-none focus:border-neutral-900 dark:focus:border-white"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      required
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="h-11 px-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-label focus:outline-none focus:border-neutral-900 dark:focus:border-white"
                    />
                    <input
                      required
                      type="text"
                      name="postalCode"
                      placeholder="Postal Code"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="h-11 px-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-label focus:outline-none focus:border-neutral-900 dark:focus:border-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="h-11 px-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-label focus:outline-none focus:border-neutral-900 dark:focus:border-white"
                    >
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>United Arab Emirates</option>
                      <option>Saudi Arabia</option>
                      <option>France</option>
                      <option>Canada</option>
                    </select>
                    <input
                      required
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="h-11 px-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-label focus:outline-none focus:border-neutral-900 dark:focus:border-white"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <Link href="/cart" className="inline-flex items-center gap-1.5 text-[10px] uppercase font-label tracking-widest text-neutral-450 hover:text-neutral-900 dark:hover:text-white transition-colors">
                    <ArrowLeft size={12} /> Return to Cart
                  </Link>
                  <button
                    type="submit"
                    className="h-12 px-8 bg-neutral-900 dark:bg-neutral-50 text-neutral-0 dark:text-neutral-1000 text-xs tracking-widest font-label uppercase hover:bg-opacity-95"
                  >
                    CONTINUE TO PAYMENT
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Payment Details */}
            {step === "payment" && (
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs uppercase tracking-widest font-label text-neutral-400">Secure Payment Details</h3>
                    <div className="flex gap-2 text-neutral-400">
                      <CreditCard size={18} />
                      <ShieldCheck size={18} />
                    </div>
                  </div>

                  <div className="border border-neutral-200 dark:border-neutral-805 p-6 bg-white dark:bg-neutral-950 space-y-4 rounded-sm">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest font-label text-neutral-400 block">Name on Card</label>
                      <input
                        required
                        type="text"
                        name="cardName"
                        placeholder="e.g. AMINA KAUR"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="w-full h-11 px-4 bg-transparent border border-neutral-200 dark:border-neutral-800 text-xs font-label focus:outline-none focus:border-neutral-950 dark:focus:border-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest font-label text-neutral-400 block">Card Number</label>
                      <input
                        required
                        type="text"
                        name="cardNumber"
                        placeholder="XXXX XXXX XXXX XXXX"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full h-11 px-4 bg-transparent border border-neutral-200 dark:border-neutral-800 text-xs font-label focus:outline-none focus:border-neutral-950 dark:focus:border-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-label text-neutral-400 block">Expiration Date</label>
                        <input
                          required
                          type="text"
                          name="cardExpiry"
                          placeholder="MM / YY"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          className="w-full h-11 px-4 bg-transparent border border-neutral-200 dark:border-neutral-800 text-xs font-label focus:outline-none focus:border-neutral-950 dark:focus:border-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-label text-neutral-400 block">CVV</label>
                        <input
                          required
                          type="text"
                          name="cardCvv"
                          placeholder="XXX"
                          value={formData.cardCvv}
                          onChange={handleInputChange}
                          className="w-full h-11 px-4 bg-transparent border border-neutral-200 dark:border-neutral-800 text-xs font-label focus:outline-none focus:border-neutral-950 dark:focus:border-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep("shipping")}
                    className="inline-flex items-center gap-1.5 text-[10px] uppercase font-label tracking-widest text-neutral-450 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    <ArrowLeft size={12} /> Edit Shipping Details
                  </button>
                  <button
                    type="submit"
                    className="h-12 px-8 bg-[#8B6914] text-neutral-0 text-xs tracking-widest font-label uppercase hover:bg-opacity-90"
                  >
                    PLACE ORDER & CONTINUE
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* Order Summary Recap Side */}
          <div className="lg:col-span-5 bg-[#FAFAF8] dark:bg-neutral-900 border border-neutral-205/50 dark:border-neutral-805/50 p-6 space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-label text-neutral-400 border-b border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 pb-3">
              Your Order Selection ({items.length})
            </h3>

            {/* List items */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative aspect-[3/4] w-12 bg-neutral-100 dark:bg-neutral-800 overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <h4 className="text-[11px] font-display font-light uppercase tracking-wide text-neutral-900 dark:text-neutral-50 line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-[9px] font-label text-neutral-400 uppercase tracking-widest mt-0.5">
                        Qty: {item.quantity}  /  {item.variantId.includes("default") ? "Standard" : item.color || "Default"}
                      </p>
                    </div>
                    <span className="text-[10px] font-label font-light text-neutral-800 dark:text-neutral-200">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary lines */}
            <div className="border-t border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 pt-4 space-y-2.5 text-xs font-label">
              <div className="flex justify-between text-neutral-500">
                <span>Subtotal</span>
                <span className="text-neutral-900 dark:text-neutral-100">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Shipping Carrier</span>
                <span className="text-neutral-900 dark:text-neutral-100">
                  {shipping === 0 ? "Complimentary Express" : formatPrice(shipping)}
                </span>
              </div>
              <div className="border-t border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 pt-3 flex justify-between text-sm uppercase tracking-widest">
                <span>Grand Total</span>
                <span className="font-semibold text-neutral-950 dark:text-white">{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
