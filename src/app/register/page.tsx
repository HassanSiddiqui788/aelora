"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!firstName || !lastName || !email || !password) {
      setError("Please fill in all standard credentials fields.");
      return;
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "aelora_user_session",
        JSON.stringify({
          firstName,
          lastName,
          email,
          addresses: [],
        })
      );
    }

    router.push("/account");
  };

  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-1000 min-h-screen pt-28 pb-24 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-[#FAFAF8] dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 p-8 space-y-8 rounded-sm">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] font-label text-neutral-450 block">Aelora Maison</span>
            <h1 className="text-2xl font-display font-light uppercase tracking-widest text-neutral-950 dark:text-white">Create Account</h1>
            <p className="text-xs font-body font-light text-neutral-550">Register to record purchase tracking and wishlist archives.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <p className="text-[10px] text-error font-body text-center">{error}</p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-label text-neutral-400">First Name</label>
                <input
                  required
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Amina"
                  className="w-full h-11 px-4 bg-white dark:bg-neutral-950 border border-neutral-202 dark:border-neutral-800 text-xs font-label focus:outline-none focus:border-neutral-950 dark:focus:border-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-label text-neutral-400">Last Name</label>
                <input
                  required
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Kaur"
                  className="w-full h-11 px-4 bg-white dark:bg-neutral-950 border border-neutral-202 dark:border-neutral-800 text-xs font-label focus:outline-none focus:border-neutral-950 dark:focus:border-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-label text-neutral-400">Email Address</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="amina@aeloradesign.com"
                className="w-full h-11 px-4 bg-white dark:bg-neutral-955 border border-neutral-202 dark:border-neutral-800 text-xs font-label focus:outline-none focus:border-neutral-950 dark:focus:border-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-label text-neutral-400">Password</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create Password"
                className="w-full h-11 px-4 bg-white dark:bg-neutral-955 border border-neutral-202 dark:border-neutral-800 text-xs font-label focus:outline-none focus:border-neutral-950 dark:focus:border-white"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full h-12 bg-neutral-900 dark:bg-neutral-50 text-neutral-0 dark:text-neutral-1000 text-xs tracking-widest font-label uppercase flex items-center justify-center hover:bg-opacity-95"
              >
                CREATE ACCOUNT
              </button>
            </div>
          </form>

          {/* Links */}
          <div className="border-t border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 pt-4 text-center">
            <p className="text-xs font-body font-light text-neutral-500">
              Already registered?{" "}
              <Link href="/login" className="text-neutral-905 dark:text-neutral-100 hover:underline">
                Sign In
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
