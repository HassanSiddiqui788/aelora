"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  title: string;
  items: FaqItem[];
}

const FAQ_DATA: FaqCategory[] = [
  {
    title: "Orders & Selections",
    items: [
      {
        question: "Can I modify my selection after placing an order?",
        answer: "Due to our dedication to swift international fulfillment, orders are processed and prepared for shipping immediately. Once confirmed, we are unable to edit quantities, items, or delivery addresses. Please contact our concierge desk for direct assistance."
      },
      {
        question: "How do I trace my delivery?",
        answer: "A dispatch confirmation email containing a carrier tracking number (DHL Express or FedEx) will be sent as soon as your selection leaves our Atelier. You can also view shipping updates in your Client Account dashboard."
      }
    ]
  },
  {
    title: "Materials & Care",
    items: [
      {
        question: "Where are the Aelora fabrics sourced?",
        answer: "We source our mulberry silk exclusively from Como, Italy, and our cashmere from sustainable cooperatives in Inner Mongolia. Every scarf is finished with hand-rolled hems by local European craftspeople."
      },
      {
        question: "What care instructions do you recommend?",
        answer: "We recommend professional dry clean only for our premium silk and cashmere lines. Avoid using steam directly on hand-rolled edges, and store them flat in Aelora boxes to preserve thread elasticity."
      }
    ]
  },
  {
    title: "International Deliveries",
    items: [
      {
        question: "Does Aelora ship worldwide?",
        answer: "Yes, we offer complimentary express courier delivery worldwide (including North America, Europe, East Asia, and the Gulf Corporation Council region) on all selections exceeding $150."
      },
      {
        question: "Who is responsible for duties and custom taxes?",
        answer: "Delivery Duties Paid (DDP) is applied to all GCC and EU shipments, meaning all clearance taxes are included at checkout. For other countries, customs fees may be assessed upon arrival."
      }
    ]
  }
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleAccordion = (catIdx: number, itemIdx: number) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-1000 min-h-screen pt-28 pb-24">
      <div className="max-w-[50rem] mx-auto px-4 md:px-6 space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] font-label text-neutral-400">Concierge Desk</span>
          <h1 className="text-3xl font-display font-light uppercase tracking-widest text-neutral-900 dark:text-neutral-50">
            Frequently Asked Questions
          </h1>
          <p className="text-xs font-body font-light text-neutral-500 max-w-sm mx-auto">
            Find immediate guidelines on orders, silk care, and shipping options.
          </p>
        </div>

        {/* Accordions list */}
        <div className="space-y-10">
          {FAQ_DATA.map((cat, catIdx) => (
            <div key={catIdx} className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest font-label font-medium text-[#8B6914] border-b border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 pb-2">
                {cat.title}
              </h3>
              
              <div className="space-y-2">
                {cat.items.map((item, itemIdx) => {
                  const itemKey = `${catIdx}-${itemIdx}`;
                  const isOpen = openIndex === itemKey;

                  return (
                    <div
                      key={itemIdx}
                      className="border border-neutral-200/50 dark:border-neutral-800/50 bg-[#FAFAF8] dark:bg-neutral-900 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleAccordion(catIdx, itemIdx)}
                        className="w-full p-4 flex items-center justify-between text-left focus:outline-none"
                      >
                        <span className="text-xs font-display uppercase tracking-wide text-neutral-900 dark:text-neutral-100">
                          {item.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp size={14} className="text-neutral-400" />
                        ) : (
                          <ChevronDown size={14} className="text-neutral-400" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs font-body font-light text-neutral-500 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-850 pt-3">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

        {/* Footer concierge */}
        <div className="border-t border-[#EDE6DB]/40 dark:border-[#2C2C2C]/40 pt-8 text-center space-y-3">
          <p className="text-xs font-body font-light text-neutral-450">Can&apos;t locate your answer?</p>
          <Link
            href="/contact"
            className="inline-flex h-11 px-8 items-center justify-center bg-neutral-900 text-neutral-0 dark:bg-neutral-50 dark:text-neutral-1000 text-[10px] font-label uppercase tracking-widest hover:opacity-90 transition-opacity"
          >
            Contact House Concierge <ArrowRight size={10} className="ml-1" />
          </Link>
        </div>

      </div>
    </div>
  );
}
