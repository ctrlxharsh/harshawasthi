"use client";

import { motion, MotionConfig, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

const subscribe = () => () => {};
const isClient = () => true;
const isServer = () => false;

export function useHydrated() {
  return useSyncExternalStore(subscribe, isClient, isServer);
}

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

export function AwardWave({ children, className, index }: {
  children: ReactNode;
  className?: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useHydrated();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const start = (index % 3) * 0.08;
  const y = useTransform(scrollYProgress, [start, start + 0.7, 1], [16, 0, 0]);
  const opacity = useTransform(scrollYProgress, [start, start + 0.7, 1], [0.82, 1, 1]);
  return <motion.div ref={ref} className={className} style={mounted && reduced === false ? { y, opacity } : undefined}>{children}</motion.div>;
}
