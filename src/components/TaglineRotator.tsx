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
      className="relative flex flex-col items-center justify-center mb-[3.5rem]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="h-[24px] flex items-center justify-center overflow-hidden px-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-[13.5px] font-medium tracking-[0.02em] text-[#e0c870] text-center"
          >
            {TAGLINES[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

