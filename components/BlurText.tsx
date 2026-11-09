"use client";

import { useEffect } from "react";
import { stagger, useAnimate, useReducedMotion } from "motion/react";

// Adapted from the React Bits BlurText component for a single decorative label.
export default function BlurText({ text }: { text: string }) {
  const [scope, animate] = useAnimate<HTMLSpanElement>();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced !== false || window.location.hash || !text.trim()) return;
    const reveal = animate(
      "span",
      { filter: ["blur(2px)", "blur(0px)"], opacity: [0.7, 1] },
      { duration: 0.3, delay: stagger(0.04) },
    );
    return () => reveal.stop();
  }, [animate, reduced, text]);

  return (
    <span ref={scope}>
      {text.split(" ").map((word, index) => (
        <span
          key={index}
          style={{ display: "inline-block", marginRight: "0.3em" }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
