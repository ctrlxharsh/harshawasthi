"use client";

import { motion, MotionConfig, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function Reveal({
  children,
  className,
  delay = 0,
  enter = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  enter?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={enter && reduced === false ? { y: 10, opacity: 0 } : false}
      animate={enter ? { y: 0, opacity: 1 } : undefined}
      whileInView={
        enter || reduced ? undefined : { y: [32, 0], opacity: [0.35, 1] }
      }
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduced ? 0 : enter ? 0.3 : 0.55,
        ease: "easeOut",
        delay: reduced ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export function HoverCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      whileHover={reduced ? undefined : { y: -8 }}
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
    >
      {children}
    </motion.div>
  );
}
