"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your credentials.");
      return;
    }

    // Set a mock user session
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "aelora_user_session",
        JSON.stringify({
          email,
          firstName: "Fatima",
          lastName: "Al-Sayed",
          addresses: [
            {
              id: "addr_1",
              name: "Fatima Al-Sayed",
              address: "142 Al-Mirqab Tower",
              city: "Doha",
              postalCode: "00000",
              country: "Qatar",
              isDefault: true,
            },
          ],
        })
      );
    }

    // Redirect to account dashboard
    router.push("/account");
  };

  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-1000 min-h-screen pt-28 pb-24 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-[#FAFAF8] dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 p-8 space-y-8 rounded-sm">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] font-label text-neutral-450 block">Aelora Maison</span>
            <h1 className="text-2xl font-display font-light uppercase tracking-widest text-neutral-950 dark:text-white">Sign In</h1>
            <p className="text-xs font-body font-light text-neutral-500">Access your orders dashboard and saved selections.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <p className="text-[10px] text-error font-body text-center">{error}</p>
            )}

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-label text-neutral-400">Email Address</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="amina@aeloradesign.com"
                className="w-full h-11 px-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-label focus:outline-none focus:border-neutral-950 dark:focus:border-white"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase tracking-widest font-label text-neutral-400">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-[9px] uppercase tracking-widest font-label text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-label focus:outline-none focus:border-neutral-950 dark:focus:border-white"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full h-12 bg-neutral-900 dark:bg-neutral-50 text-neutral-0 dark:text-neutral-1000 text-xs tracking-widest font-label uppercase flex items-center justify-center hover:bg-opacity-95"
              >
                SIGN IN
              </button>
            </div>
          </form>

          {/* Footer Account creation link */}
          <div className="border-t border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 pt-4 text-center">
            <p className="text-xs font-body font-light text-neutral-500">
              New client to Aelora?{" "}
              <Link href="/register" className="text-neutral-900 dark:text-neutral-100 hover:underline">
                Create Account
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
