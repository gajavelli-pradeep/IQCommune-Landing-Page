"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TAGLINES = [
  "Real practitioners. Real sessions. No scripts.",
  "No slides. No pitch. Just conversation.",
  "Insight Quotient — Unleashed.",
  "Not a course. Not a webinar. Something else.",
  "The room is almost ready.",
  "Ask us what IQ really stands for.",
  "No funnel. No upsell. Just people talking.",
  "For the ones still in the room, doing the work.",
];

export default function TaglineRotator() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TAGLINES.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      className="relative flex flex-col items-center justify-center my-8 md:my-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="h-10 md:h-12 flex items-center justify-center overflow-hidden px-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-sm md:text-base font-medium tracking-wide text-[#e0c870] text-center"
          >
            {TAGLINES[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center gap-2 mt-3">
        {TAGLINES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Jump to punchline ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index
                ? "w-6 bg-[#c9982a] shadow-[0_0_8px_rgba(201,152,42,0.6)]"
                : "w-1.5 bg-[#9496a1]/30 hover:bg-[#9496a1]/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
