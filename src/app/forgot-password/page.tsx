"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-1000 min-h-screen pt-28 pb-24 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-[#FAFAF8] dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 p-8 space-y-8 rounded-sm">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] font-label text-neutral-450 block">Aelora Support</span>
            <h1 className="text-2xl font-display font-light uppercase tracking-widest text-neutral-955 dark:text-white">Recover Password</h1>
            <p className="text-xs font-body font-light text-neutral-500">Provide registration email address to receive password instructions.</p>
          </div>

          {submitted ? (
            <div className="space-y-6 text-center">
              <div className="p-4 bg-success-bg border border-success/30 text-success text-xs font-body flex items-center justify-center gap-2 rounded-sm">
                <Check size={14} /> Password instructions dispatched
              </div>
              <p className="text-xs text-neutral-500 font-body leading-normal">
                If the email is associated with an active profile, password retrieval details have been sent.
              </p>
              <div className="pt-2">
                <Link
                  href="/login"
                  className="inline-flex h-11 px-8 items-center justify-center bg-neutral-905 text-neutral-0 dark:bg-neutral-50 dark:text-neutral-1000 text-[10px] font-label uppercase tracking-widest"
                >
                  Return to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-label text-neutral-455 block">Email Address</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="amina@aeloradesign.com"
                  className="w-full h-11 px-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-label focus:outline-none focus:border-neutral-950 dark:focus:border-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-12 bg-neutral-900 dark:bg-neutral-50 text-neutral-0 dark:text-neutral-1000 text-xs tracking-widest font-label uppercase flex items-center justify-center hover:bg-opacity-95"
                >
                  SEND RECOVERY EMAIL
                </button>
              </div>

              <div className="text-center pt-2">
                <Link href="/login" className="inline-flex items-center gap-1 text-[10px] font-label uppercase tracking-widest text-[#8B6914] hover:underline">
                  <ArrowLeft size={10} /> Back to Sign In
                </Link>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
