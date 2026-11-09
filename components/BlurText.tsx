"use client";

import { motion, useReducedMotion } from "motion/react";

// Adapted from the React Bits BlurText component for a single decorative label.
export default function BlurText({ text }: { text: string }) {
  const reduced = useReducedMotion();
  return (
    <span>
      {text.split(" ").map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          style={{ display: "inline-block", marginRight: "0.3em" }}
          initial={false}
          animate={
            reduced
              ? undefined
              : { filter: ["blur(2px)", "blur(0px)"], opacity: [0.7, 1] }
          }
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
