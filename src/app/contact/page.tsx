"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, HelpCircle, Check } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Where are Aelora pieces crafted and shipped from?",
    answer: "Our luxury garments are woven in Como, Italy and cashmere regions. Finished pieces are packed and dispatched from our primary distribution showroom in London, UK.",
  },
  {
    question: "Do you offer custom dimensions or bespoke cuts?",
    answer: "Yes. Our private client concierge offers customization on length, fabric density, and hem finishings for signature abayas and special orders. Please complete our form with details.",
  },
  {
    question: "What is your shipping and return policy?",
    answer: "We offer complimentary worldwide express shipping on all orders over $250. Returns are accepted within 14 days of delivery receipt in original unworn condition with tags attached.",
  },
  {
    question: "How do I care for my silk pieces?",
    answer: "Como mulberry silk is highly delicate. We advise dry cleaning only. If iron is necessary, select the silk/low temperature settings and iron from the reverse side to prevent gloss damage.",
  }
];

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", subjective: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: "", email: "", subjective: "", message: "" });
    }, 3000);
  };

  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-1000 min-h-screen pt-28 pb-24">
      <div className="max-w-[75rem] mx-auto px-4 md:px-12 space-y-24">
        
        {/* Concierge Intro Hero */}
        <div className="border-b border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 pb-12 space-y-4">
          <span className="text-[#8B6914] text-xs uppercase tracking-[0.25em] font-label font-medium block">
            Private Client Concierge
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-light uppercase tracking-wider text-neutral-905 dark:text-neutral-50 leading-tight">
            Contact Us & Concierge
          </h1>
          <p className="text-xs font-body font-light text-neutral-500 max-w-xl">
            Have questions regarding fabric weight, customized lengths, or private appointments at our London showroom? Reach out to our concierge representative.
          </p>
        </div>

        {/* Form and Store Showrooms Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Subtle Contact Form */}
          <div className="bg-white dark:bg-neutral-950 p-8 border border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 space-y-6">
            <h2 className="text-xl font-display uppercase tracking-widest text-neutral-900 dark:text-neutral-50 border-b border-neutral-100 dark:border-neutral-900 pb-4">
              Write Concierge
            </h2>
            
            {submitted ? (
              <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-500 rounded-full">
                  <Check size={24} />
                </div>
                <h3 className="text-sm font-display uppercase tracking-wider">Message Received</h3>
                <p className="text-xs font-body font-light text-neutral-500">
                  Our private client concierge will respond within 12 standard business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-xs font-label">
                
                <div className="space-y-1.5">
                  <label className="uppercase tracking-widest text-[9.5px] text-neutral-400 block" htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full h-11 px-4 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 rounded-none transition-colors"
                    placeholder="e.g. Eleanor Vance"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="uppercase tracking-widest text-[9.5px] text-neutral-400 block" htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full h-11 px-4 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 rounded-none transition-colors"
                    placeholder="concierge@example.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="uppercase tracking-widest text-[9.5px] text-neutral-400 block" htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    value={formState.subjective}
                    onChange={(e) => setFormState({ ...formState, subjective: e.target.value })}
                    className="w-full h-11 px-4 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 rounded-none transition-colors"
                    placeholder="Custom abaya lengths, silk variants..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="uppercase tracking-widest text-[9.5px] text-neutral-405 block" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full p-4 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 rounded-none transition-colors resize-none"
                    placeholder="Enter details here..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-neutral-950 dark:bg-neutral-50 text-neutral-0 dark:text-neutral-1000 tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-neutral-900 dark:hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  Submit Selection <Send size={12} />
                </button>

              </form>
            )}
          </div>

          {/* Right Column: Contact Details, FAQ, Showrooms info */}
          <div className="space-y-8">
            
            {/* Showrooms directory */}
            <div className="space-y-6">
              <h2 className="text-xl font-display uppercase tracking-widest text-neutral-900 dark:text-neutral-50 border-b border-neutral-100 dark:border-neutral-900 pb-4">
                Boutique Locations
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-[11px] font-body text-neutral-600 dark:text-neutral-400">
                <div className="space-y-2">
                  <h4 className="font-display text-xs uppercase text-neutral-900 dark:text-neutral-50 tracking-wider">London Concierge</h4>
                  <div className="flex gap-2 items-start">
                    <MapPin size={14} className="flex-shrink-0 text-[#8B6914] mt-0.5" />
                    <span>32 Bruton Street, Mayfair, London, W1J 6QT</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Phone size={12} className="flex-shrink-0 text-[#8B6914]" />
                    <span>+44 20 7946 0910</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display text-xs uppercase text-neutral-900 dark:text-neutral-50 tracking-wider">Paris Boutique</h4>
                  <div className="flex gap-2 items-start">
                    <MapPin size={14} className="flex-shrink-0 text-[#8B6914] mt-0.5" />
                    <span>18 Rue de Sévigné, Marais, 75004 Paris</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Phone size={12} className="flex-shrink-0 text-[#8B6914]" />
                    <span>+33 1 42 27 78 90</span>
                  </div>
                </div>
              </div>
            </div>

            {/* General Contact options */}
            <div className="p-6 bg-neutral-100 dark:bg-neutral-900/40 border border-[#EDE6DB]/20 dark:border-[#2C2C2C]/20 flex flex-col sm:flex-row justify-between gap-4 text-[11px] font-label uppercase tracking-widest text-[#8B6914]">
              <span className="flex items-center gap-1.5"><Mail size={14} /> concierge@aelora.com</span>
              <span className="flex items-center gap-1.5"><Phone size={14} /> concierge text: +44 7977 123456</span>
            </div>

            {/* General FAQ block */}
            <div className="space-y-4">
              <h2 className="text-xl font-display uppercase tracking-widest text-neutral-900 dark:text-neutral-50 border-b border-neutral-100 dark:border-neutral-900 pb-4">
                Assistance FAQ
              </h2>
              
              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx}
                      className="border border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 bg-white dark:bg-neutral-950"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4 flex items-center justify-between gap-4 text-left transition-colors"
                      >
                        <span className="text-[11px] font-display uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                          {faq.question}
                        </span>
                        <HelpCircle size={14} className="text-[#8B6914] flex-shrink-0" />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-[11px] font-body text-neutral-500 leading-relaxed border-t border-neutral-100 dark:border-neutral-900 pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
