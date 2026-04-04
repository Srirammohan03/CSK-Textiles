"use client";

import { useState, useRef, useEffect } from "react";
import { Filter, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  filters: string[];
  activeFilter: string;
  setActiveFilter: (val: string) => void;
}

export const FilterDropdown = ({
  filters,
  activeFilter,
  setActiveFilter,
}: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full sm:w-[260px]">
      {/* Trigger */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 h-11 transition-all"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-white/70" />
          <span className="text-sm text-white font-medium">{activeFilter}</span>
        </div>

        <ChevronDown
          className={cn(
            "w-4 h-4 text-white/60 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 mt-2 rounded-xl border border-white/10 bg-[#111111] shadow-2xl overflow-hidden z-[100]"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 text-sm transition-all",
                  activeFilter === filter
                    ? "bg-white text-black"
                    : "text-white/70 hover:bg-white/10 hover:text-white",
                )}
              >
                {filter}

                {activeFilter === filter && <Check className="w-4 h-4" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
