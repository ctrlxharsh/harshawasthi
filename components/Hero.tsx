'use client';
import { useEffect, useRef, useState } from 'react';
import type { Portfolio } from '@/lib/content';
import { coverRadius, lensPath } from '@/lib/lens';

export default function Hero({ profile, open, setOpen, canEdit, onEdit }: { profile: Portfolio['profile']; open: boolean; setOpen: (open: boolean) => void; canEdit: boolean; onEdit: () => void }) {
  const hero = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const aboutButton = useRef<HTMLButtonElement>(null);
  const aboutPaper = useRef<HTMLDivElement>(null);
  const lens = useRef<SVGPathElement>(null);
  const reveal = useRef<HTMLDivElement>(null);
  const switching = useRef(false);
  const position = useRef({ x: 0, y: 0, tailX: 0, tailY: 0, frame: 0 });
  useEffect(() => { if (open) closeButton.current?.focus(); }, [open]);
  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => { if (!aboutPaper.current?.contains(event.target as Node)) setOpen(false); };
    const closeEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); aboutButton.current?.focus(); } };
    document.addEventListener('pointerdown', closeOutside); document.addEventListener('keydown', closeEscape);
    return () => { document.removeEventListener('pointerdown', closeOutside); document.removeEventListener('keydown', closeEscape); };
  }, [open, setOpen]);
  useEffect(() => () => cancelAnimationFrame(position.current.frame), []);
  const [showHindi, setShowHindi] = useState(false);
  const switchLanguage = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (switching.current || !hero.current || !reveal.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShowHindi(value => !value); return; }
    const box = hero.current.getBoundingClientRect(), button = event.currentTarget.getBoundingClientRect();
    const x = button.left + button.width / 2 - box.left, y = button.top + button.height / 2 - box.top;
    const radius = coverRadius(x, y, box.width, box.height);
    switching.current = true;
    const animation = reveal.current.animate([
      { clipPath: `circle(0px at ${x}px ${y}px)`, opacity: 1 },
      { clipPath: `circle(${radius}px at ${x}px ${y}px)`, opacity: 1 },
    ], { duration: 650, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'forwards' });
    void animation.finished.then(() => {
      setShowHindi(value => !value);
      requestAnimationFrame(() => { animation.cancel(); switching.current = false; });
    });
  };
  const drawLens = () => {
    const p = position.current, radius = Math.min(240, Math.max(130, window.innerWidth * .17));
    const dx = p.x - p.tailX, dy = p.y - p.tailY, distance = Math.hypot(dx, dy);
    const trail = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : Math.min(distance, 80);
    lens.current?.setAttribute('d', lensPath(p.x, p.y, p.tailX, p.tailY, radius, trail));
    p.tailX += dx * .25; p.tailY += dy * .25;
    p.frame = trail && distance > .5 ? requestAnimationFrame(drawLens) : 0;
  };
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect(), p = position.current;
    p.x = event.clientX - rect.left; p.y = event.clientY - rect.top;
    cancelAnimationFrame(p.frame); drawLens();
  };
  const pattern = <div className="hero-pattern" aria-hidden="true">{Array.from({ length: 10 }, (_, i) => <div key={i}>H A R S H A W A S T H I &nbsp; H A R S H A W A S T H I</div>)}</div>;
  return <section id="about" className={`hero ${open ? 'is-open' : ''}`}>
    <div className="hero-flip">
      <div className={`hero-face hero-front ${showHindi ? 'hindi-active' : ''}`} ref={hero} inert={open} onPointerMove={event => { if (event.pointerType === 'mouse') move(event); }} onPointerEnter={event => { if (event.pointerType === 'mouse') { const rect = event.currentTarget.getBoundingClientRect(); position.current.tailX = event.clientX - rect.left; position.current.tailY = event.clientY - rect.top; move(event); hero.current?.classList.add('pointer-active'); } }} onPointerLeave={() => hero.current?.classList.remove('pointer-active')}>
        {pattern}
        <h1 aria-live="polite" lang={showHindi ? 'hi' : undefined}>{showHindi ? profile.hindi : profile.greeting}</h1>
        <svg className="lens-defs" aria-hidden="true"><defs><clipPath id="hero-lens" clipPathUnits="userSpaceOnUse"><path ref={lens} /></clipPath></defs></svg>
        <div className="hero-reveal" ref={reveal} aria-hidden="true">{pattern}<span lang={showHindi ? undefined : 'hi'}>{showHindi ? profile.greeting : profile.hindi}</span></div>
        <button className="hindi-toggle" type="button" onClick={switchLanguage} aria-pressed={showHindi}>{showHindi ? 'English' : 'हिन्दी'}</button>
        <button className="about-trigger" ref={aboutButton} type="button" onClick={() => setOpen(true)}>About me <span aria-hidden="true">↓</span></button>
        <img className="pet pet-peek" src="/pets/peeking.webp" alt="" />
      </div>
      <div className="hero-face hero-back" inert={!open}>
        <div className="about-paper" ref={aboutPaper}>
          <div className="about-top"><span>ABOUT ME</span><button ref={closeButton} type="button" onClick={() => { setOpen(false); requestAnimationFrame(() => aboutButton.current?.focus()); }}>Close <span aria-hidden="true">×</span></button></div>
          <div className="about-copy">{profile.about.split('\n').filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}</div>
          <div className="about-signature">Harsh Awasthi</div>
          {canEdit && <button className="edit-button" type="button" onClick={onEdit}>Edit introduction</button>}
        </div>
      </div>
    </div>
  </section>;
}
