"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useHydrated } from "./Animated";
import type { Workshop } from "@/lib/types";

export function Workshops(props: { items: Workshop[]; title: string; intro: string }) {
  return props.items.length ? <WorkshopGallery {...props} /> : null;
}

function WorkshopGallery({ items, title, intro }: { items: Workshop[]; title: string; intro: string }) {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [fits, setFits] = useState(false);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    if (!hydrated || reduced !== false || !stage.current || !track.current) return;
    const measure = () => {
      if (!stage.current || !track.current) return;
      section.current?.classList.add("workshops-check");
      const overflow = Math.max(0, track.current.scrollWidth - track.current.clientWidth);
      const fitsViewport = stage.current.scrollHeight <= window.innerHeight;
      section.current?.classList.remove("workshops-check");
      setDistance(overflow);
      setFits(fitsViewport);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(stage.current);
    observer.observe(track.current);
    Array.from(track.current.children).forEach((child) => observer.observe(child));
    window.addEventListener("resize", measure);
    measure();
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, [hydrated, reduced, items]);

  const enabled = hydrated && reduced === false && fits && distance > 0;
  return (
    <section ref={section} className={`workshops-section${enabled ? " workshops-pinned" : ""}`} style={enabled ? { height: `calc(100svh + ${distance}px)` } : undefined}>
      <div ref={stage} className="workshops-stage">
        <div className="container">
          <div className="section-heading"><div><span className="section-kicker">Workshops & teaching</span><h2>{title}</h2></div><p>{intro}</p></div>
          {enabled && <div className="workshops-indicator"><span>Scroll to explore</span><div><motion.span style={{ scaleX: scrollYProgress }} /></div></div>}
          <div className="workshops-window"><motion.div ref={track} className="workshops-track" style={enabled ? { x } : undefined}>
            {items.map((item) => <article className="workshop-card" key={item._id}>
              {item.videoUrl ? <video src={item.videoUrl} controls playsInline preload="metadata" aria-label={`${item.title} video`} /> : item.image?.url ? <img src={item.image.url} alt={item.image.alt || ""} loading="lazy" /> : <div className="workshop-art" aria-hidden="true"><span>{item.role}</span><strong>{item.title}</strong></div>}
              <div className="workshop-meta">{item.role}{item.date && ` · ${item.date}`}</div>
              <h3>{item.title}</h3>{item.organization && <p className="workshop-org">{item.organization}</p>}<p>{item.description}</p>
            </article>)}
          </motion.div></div>
        </div>
      </div>
    </section>
  );
}
