"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type QA = { q: string; a: string };

export function Accordion({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-text-strong/12">
            <h3 className="m-0">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-3 border-0 bg-transparent py-5 text-left"
              >
                <span className="font-body text-[clamp(16px,1.6vw,18px)] font-semibold normal-case tracking-normal text-text-strong">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className="flex-none font-body text-[28px] leading-none text-red transition-transform duration-300"
                  style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  +
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-[18px] font-body text-base leading-relaxed text-text-muted">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
