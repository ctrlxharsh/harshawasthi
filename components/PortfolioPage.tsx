"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimate,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { MotionProvider, Reveal, HoverCard } from "@/components/Animated";
import BlurText from "@/components/BlurText";
import type { CaseStudy, Media, Portfolio, TimelineEntry } from "@/lib/types";
import { httpUrl, selectionFromParams } from "@/lib/links";

type Selection = { kind: "project" | "research"; slug: string };

const heroTransition = { duration: 0.48, ease: [0.22, 1, 0.36, 1] } as const;

const organizationLogos: Record<string, string> = {
  "BMW Group · Munich, Germany": "/organizations/bmw.png",
  "Andromeida Maritime Solutions": "/organizations/andromeida.svg",
  "Indian Institute of Technology (BHU)": "/organizations/iit-bhu.png",
};
const archivedCovers: Record<string, Media> = {
  lagps: {
    url: "/work/lagps.webp",
    alt: "The LaGPS architecture connects a semantic interpreter to a symbolic executor that produces a segmentation mask.",
    caption: "LaGPS architecture, from the MusIML workshop presentation.",
  },
  "air-quality-estimation": {
    url: "/work/pm.webp",
    alt: "Air quality estimation project artwork",
  },
  newssure: { url: "/work/newssure.webp", alt: "NewsSure project artwork" },
  "agenda-ai": { url: "/work/agendaai.webp", alt: "Agenda AI project artwork" },
  "auv-perception-control": {
    url: "/work/sea5.webp",
    alt: "Autonomous underwater vehicle project artwork",
  },
};

function coverFor(item: CaseStudy) {
  return item.image?.url ? item.image : archivedCovers[item.slug];
}

const PortableComponents: PortableTextComponents = {
  types: {
    media: ({ value }: { value: Media }) =>
      value.url ? (
        <figure>
          <img src={value.url} alt={value.alt || ""} />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      ) : null,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "";
      return /^https?:\/\//i.test(href) ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        <>{children}</>
      );
    },
  },
};

function Card({
  item,
  kind,
  index,
  onOpen,
  delay = 0,
  compact = false,
  newlyShown = false,
}: {
  item: CaseStudy;
  kind: Selection["kind"];
  index: number;
  onOpen: (selection: Selection, target: HTMLElement) => void;
  delay?: number;
  compact?: boolean;
  newlyShown?: boolean;
}) {
  const cover = coverFor(item);
  return (
    <Reveal className="card-shell" delay={delay} enter={newlyShown}>
      <HoverCard>
        <a
          className={compact ? "work-card work-card-compact" : "work-card"}
          href={`/?${kind}=${encodeURIComponent(item.slug)}`}
          onClick={(event) => {
            if (
              event.metaKey ||
              event.ctrlKey ||
              event.shiftKey ||
              event.altKey ||
              event.button !== 0
            )
              return;
            event.preventDefault();
            onOpen({ kind, slug: item.slug }, event.currentTarget);
          }}
        >
          {!compact && (
            <div className="card-art-frame">
              <div className={`card-art art-${item.accent || "blue"}`}>
                {cover?.url ? (
                  <img src={cover.url} alt={cover.alt || ""} loading="lazy" />
                ) : (
                  <>
                    <div className="art-ring art-ring-one" />
                    <div className="art-ring art-ring-two" />
                    <span className="art-mark">
                      {kind === "research" ? "R" : "P"}
                      <small> / {String(index + 1).padStart(2, "0")}</small>
                    </span>
                    <span className="art-sub">{item.category}</span>
                  </>
                )}
              </div>
              <span className="card-arrow" aria-hidden="true">
                <ArrowUpRight size={19} strokeWidth={1.7} />
              </span>
            </div>
          )}
          <div className="card-copy">
            <div className="card-meta">
              <span>{item.category}</span>
              <span>{item.date}</span>
            </div>
            <h3>{item.title}</h3>
            {item.venue && <p className="card-venue">{item.venue}</p>}
            <p>{item.summary}</p>
            <span className="card-link">
              Explore {kind === "research" ? "research" : "project"}{" "}
              <ArrowRight size={15} />
            </span>
          </div>
        </a>
      </HoverCard>
    </Reveal>
  );
}

function SectionHeading({
  label,
  title,
  intro,
}: {
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="section-kicker">{label}</span>
        <h2>{title}</h2>
      </div>
      {intro && <p>{intro}</p>}
    </div>
  );
}

function Timeline({
  entries,
  experience = false,
}: {
  entries: TimelineEntry[];
  experience?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start 82%", "end 64%"],
  });

  return (
    <div
      className={`timeline ${experience ? "timeline-experience" : ""}`}
      ref={track}
    >
      {experience && (
        <motion.span
          aria-hidden="true"
          className="timeline-progress"
          style={{ scaleY: scrollYProgress }}
        />
      )}
      {entries.map((entry) => {
        const logo =
          entry.logo?.url || organizationLogos[entry.organization || ""];
        return (
          <div className="timeline-row" key={entry._id}>
            {experience && (
              <motion.span
                className={`timeline-logo ${logo === organizationLogos["Andromeida Maritime Solutions"] ? "timeline-logo-dark" : ""}`}
                aria-hidden="true"
                initial={false}
                whileInView={{ borderColor: ["#dce5f5", "#7599e4"] }}
                viewport={{ once: true, margin: "0px 0px -25% 0px" }}
                transition={{ duration: 0.28 }}
              >
                {logo ? (
                  <img src={logo} alt="" loading="lazy" />
                ) : (
                  entry.organization
                    ?.split(/\W+/)
                    .slice(0, 2)
                    .map((word) => word[0])
                    .join("")
                )}
              </motion.span>
            )}
            <div className="timeline-main">
              <h3>{entry.title}</h3>
              <p className="timeline-org">{entry.organization}</p>
              {entry.description && <p>{entry.description}</p>}
              {experience && !!entry.highlights?.length && (
                <ul className="timeline-highlights">
                  {entry.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="timeline-date">{entry.date}</div>
          </div>
        );
      })}
    </div>
  );
}

export function PortfolioPage({
  data,
  initial,
}: {
  data: Portfolio;
  initial: Selection | null;
}) {
  const [selection, setSelection] = useState<Selection | null>(initial);
  const [menu, setMenu] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const closing = useRef(false);
  const trigger = useRef<HTMLElement | null>(null);
  const moreProjects = useRef<HTMLButtonElement>(null);
  const projectsGrid = useRef<HTMLDivElement>(null);
  const focusMoreProject = useRef(false);
  const researchHeading = useRef<HTMLElement>(null);
  const projectsHeading = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [hero, animateHero] = useAnimate<HTMLElement>();

  useEffect(() => {
    if (reduced !== false || initial || window.location.hash) return;
    const entrance = animateHero([
      ["h1", { y: [32, 0], opacity: [0.5, 1] }, heroTransition],
      [
        ".hero-details",
        { y: [22, 0], opacity: [0.62, 1] },
        { ...heroTransition, at: 0.08 },
      ],
      [
        ".hero-art",
        { y: [24, 0], opacity: [0.58, 1] },
        { ...heroTransition, at: 0.12 },
      ],
    ]);
    return () => entrance.stop();
  }, [animateHero, initial, reduced]);

  const selected = selection
    ? (selection.kind === "project" ? data.projects : data.publications).find(
        (item) => item.slug === selection.slug,
      )
    : undefined;

  const allProjects = [...data.projects].sort(
    (a, b) => (a.order ?? 999) - (b.order ?? 999),
  );
  const featured = allProjects
    .filter((project) => project.featuredOnHome)
    .sort((a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999))
    .slice(0, 4);
  const featuredSlugs = new Set(featured.map((item) => item.slug));
  const orderedProjects = [
    ...featured,
    ...allProjects.filter((item) => !featuredSlugs.has(item.slug)),
  ];
  const remainingProjects = orderedProjects.slice(4);
  const papers = data.publications.filter(
    (item) => item.category?.toLowerCase() !== "presentation",
  );
  const presentations = data.publications.filter(
    (item) => item.category?.toLowerCase() === "presentation",
  );

  useEffect(() => {
    if (expanded && focusMoreProject.current) {
      focusMoreProject.current = false;
      projectsGrid.current?.querySelectorAll("a")[4]?.focus();
    }
  }, [expanded]);

  useEffect(() => {
    const update = () => {
      closing.current = false;
      setSelection(
        selectionFromParams(new URLSearchParams(window.location.search)),
      );
    };
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  const open = useCallback((next: Selection, element: HTMLElement) => {
    trigger.current = element;
    closing.current = false;
    const url = new URL(window.location.href);
    url.searchParams.delete("project");
    url.searchParams.delete("research");
    url.searchParams.set(next.kind, next.slug);
    window.history.pushState({ portfolioDialog: true }, "", url);
    setSelection(next);
  }, []);

  const close = useCallback(() => {
    const url = new URL(window.location.href);
    if (closing.current || !selectionFromParams(url.searchParams)) return;
    if (window.history.state?.portfolioDialog) {
      closing.current = true;
      window.history.back();
    } else {
      url.searchParams.delete("project");
      url.searchParams.delete("research");
      window.history.replaceState(null, "", url);
      setSelection(null);
    }
  }, []);

  return (
    <MotionProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Harsh Awasthi, home">
          <span className="wordmark-symbol">
            h<span>.</span>
          </span>
          <span>{data.profile.name}</span>
        </a>
        <nav
          className={`nav-links ${menu ? "nav-open" : ""}`}
          aria-label="Main navigation"
        >
          {[
            [data.settings.researchLabel, "#research"],
            [data.settings.experienceLabel, "#experience"],
            [data.settings.educationLabel, "#journey"],
            [data.settings.projectsLabel, "#projects"],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenu(false)}>
              {label}
            </a>
          ))}
          <a
            className="nav-contact"
            href="#contact"
            onClick={() => setMenu(false)}
          >
            {data.settings.contactLabel} <ArrowUpRight size={15} />
          </a>
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menu ? "Close menu" : "Open menu"}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main id="main">
        <section className="hero" id="top" ref={hero}>
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" />{" "}
              <span aria-hidden="true">
                <BlurText text={data.settings.eyebrow} />
              </span>
              <span className="sr-only">{data.settings.eyebrow}</span>
            </div>
            <h1>{data.settings.headline}</h1>
            <div className="hero-details">
              <p className="hero-intro">{data.settings.intro}</p>
              <div className="hero-actions">
                <a className="pill pill-dark" href="#research">
                  {data.settings.heroPrimaryAction} <ArrowDown size={16} />
                </a>
                <a className="text-action" href="#about">
                  {data.settings.heroSecondaryAction} <ArrowRight size={16} />
                </a>
              </div>
              <p className="availability">
                <span />
                {data.settings.availability}
              </p>
            </div>
          </div>
          <figure className="hero-art">
            <img
              src={
                data.settings.heroImage?.url || "/work/marine-perception.webp"
              }
              alt={
                data.settings.heroImage?.url
                  ? data.settings.heroImage.alt || ""
                  : "Illustrated underwater research vehicle above mapped seabed contours"
              }
              width={1536}
              height={1024}
              fetchPriority="high"
            />
            {!data.settings.heroImage?.url && (
              <>
                <svg
                  className="hero-sonar"
                  viewBox="0 0 1536 1024"
                  aria-hidden="true"
                  fill="none"
                >
                  <motion.path
                    d="M 684 727 Q 896 764 1041 606"
                    stroke="#8ceaff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={false}
                    whileInView={
                      reduced === false
                        ? { pathLength: [0, 1], opacity: [0, 0.95, 0.65] }
                        : undefined
                    }
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{
                      duration: 0.65,
                      ease: "easeOut",
                      delay: 0.24,
                    }}
                  />
                </svg>
                <figcaption className="hero-art-caption">
                  Illustration · Marine perception
                </figcaption>
              </>
            )}
          </figure>
          <div className="hero-foot">
            <span>HARSH AWASTHI</span>
            <span>RESEARCH & ENGINEERING</span>
            <span>SCROLL TO EXPLORE ↓</span>
          </div>
        </section>

        <section
          className="section research-section"
          id="research"
          ref={researchHeading}
          tabIndex={-1}
        >
          <div className="container">
            <Reveal>
              <SectionHeading
                label={data.settings.researchLabel}
                title={data.settings.researchTitle}
                intro={data.settings.researchIntro}
              />
            </Reveal>
            {papers.length > 0 && (
              <div className="research-grid">
                {papers.map((item, index) => (
                  <Card
                    key={item._id}
                    item={item}
                    kind="research"
                    index={index}
                    onOpen={open}
                  />
                ))}
              </div>
            )}
            {presentations.length > 0 && (
              <div className="research-presentations">
                <p className="section-kicker">Presentations</p>
                {presentations.map((item, index) => (
                  <Card
                    key={item._id}
                    item={item}
                    kind="research"
                    index={index}
                    onOpen={open}
                    compact
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="section experience-section" id="experience">
          <div className="container split-section">
            <Reveal>
              <div className="sticky-heading">
                <span className="section-kicker">
                  {data.settings.experienceLabel}
                </span>
                <h2>{data.settings.experienceTitle}</h2>
                <p>{data.settings.experienceIntro}</p>
              </div>
            </Reveal>
            <Timeline entries={data.experience} experience />
          </div>
        </section>

        <section className="section education-section" id="journey">
          <div className="container">
            <div className="education-grid">
              <div>
                <span className="section-kicker">
                  {data.settings.educationLabel}
                </span>
                <h2>{data.settings.educationTitle}</h2>
              </div>
              <Timeline entries={data.education} />
            </div>
          </div>
        </section>

        <section
          className="section projects-section"
          id="projects"
          ref={projectsHeading}
          tabIndex={-1}
        >
          <div className="container">
            <Reveal>
              <SectionHeading
                label={data.settings.projectsLabel}
                title={data.settings.projectsTitle}
                intro={data.settings.projectsIntro}
              />
            </Reveal>
            <div className="project-grid" id="all-projects" ref={projectsGrid}>
              {(expanded ? orderedProjects : orderedProjects.slice(0, 4)).map(
                (item, index) => (
                  <Card
                    key={item._id}
                    item={item}
                    kind="project"
                    index={index}
                    onOpen={open}
                    newlyShown={index >= 4}
                    delay={index >= 4 ? Math.min(index - 4, 5) * 0.05 : 0}
                  />
                ),
              )}
            </div>
            {remainingProjects.length > 0 && (
              <>
                <div className="projects-actions">
                  <button
                    className="pill pill-outline"
                    type="button"
                    aria-controls="all-projects"
                    aria-expanded={expanded}
                    ref={moreProjects}
                    onClick={() => {
                      focusMoreProject.current = !expanded;
                      setExpanded(!expanded);
                    }}
                  >
                    {expanded
                      ? data.settings.archiveCollapseAction
                      : "Show more projects"}
                    <ArrowDown size={16} className={expanded ? "turned" : ""} />
                  </button>
                </div>
                <noscript>
                  <style>{".projects-actions { display: none }"}</style>
                  <div className="project-grid projects-actions-fallback">
                    {remainingProjects.map((item, index) => (
                      <Card
                        key={item._id}
                        item={item}
                        kind="project"
                        index={index + 4}
                        onOpen={open}
                      />
                    ))}
                  </div>
                </noscript>
              </>
            )}
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="container">
            <div className="about-grid">
              <div className="about-intro">
                <span className="section-kicker">
                  {data.settings.aboutLabel}
                </span>
                <h2>{data.settings.aboutTitle}</h2>
              </div>
              <div className="about-copy">
                {data.profile.portrait?.url && (
                  <img
                    className="about-portrait"
                    src={data.profile.portrait.url}
                    alt={data.profile.portrait.alt || data.profile.name}
                    loading="lazy"
                  />
                )}
                <p>{data.profile.biography}</p>
                <a className="inline-link" href="#contact">
                  Get in touch <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
            <div className="skills-grid" id="skills">
              {data.skills.map((skill) => (
                <div key={skill._id}>
                  <span className="section-kicker">{skill.title}</span>
                  <p>{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section awards-section" id="achievements">
          <div className="container">
            <span id="activities" />
            <Reveal>
              <SectionHeading
                label={data.settings.awardsLabel}
                title={data.settings.awardsTitle}
                intro={data.settings.awardsIntro}
              />
            </Reveal>
            <div className="awards-grid">
              {data.awards.map((award) => (
                <div className="award" key={award._id}>
                  <span className="award-date">{award.date}</span>
                  <h3>{award.title}</h3>
                  <p>{award.organization}</p>
                  <span>{award.description}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container contact-inner">
            <span className="section-kicker">{data.settings.contactLabel}</span>
            <h2>{data.settings.contactTitle}</h2>
            <p>{data.settings.contactIntro}</p>
            <a
              className="pill pill-light"
              href={`mailto:${data.profile.email}`}
            >
              {data.settings.contactAction} <ArrowUpRight size={17} />
            </a>
            <div className="contact-bottom">
              <a href={`mailto:${data.profile.email}`}>{data.profile.email}</a>
              <div>
                {data.profile.socialLinks
                  .filter((link) => httpUrl(link.url))
                  .map((link) => (
                    <a
                      href={httpUrl(link.url)}
                      key={link.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label} <ArrowUpRight size={13} />
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <span>
          © {new Date().getFullYear()} {data.profile.name}
        </span>
        <a href="#top">Back to top ↑</a>
      </footer>

      <AnimatePresence mode="wait">
        {selected && selection && (
          <CaseDialog
            key={`${selection.kind}:${selection.slug}`}
            selected={selected}
            onClose={close}
            onRestoreFocus={() => {
              if (
                selectionFromParams(new URLSearchParams(window.location.search))
              )
                return;
              const source = trigger.current;
              const targetHref = `/?${selection.kind}=${encodeURIComponent(selection.slug)}`;
              if (
                source?.getAttribute("href") === targetHref &&
                source.getClientRects().length
              ) {
                source.focus({ preventScroll: true });
              } else {
                const section =
                  selection.kind === "research"
                    ? researchHeading.current
                    : projectsHeading.current;
                const card = section?.querySelector<HTMLElement>(
                  `a[href="${targetHref}"]`,
                );
                (card?.getClientRects().length ? card : section)?.focus({
                  preventScroll: false,
                });
              }
            }}
          />
        )}
      </AnimatePresence>
      {selected && (
        <noscript>
          <article className="container noscript-article">
            <h2>{selected.title}</h2>
            <p>{selected.summary}</p>
            {selected.body && (
              <PortableText
                value={selected.body}
                components={PortableComponents}
              />
            )}
            {selected.proofLinks
              ?.filter((link) => httpUrl(link.url))
              .map((link) => (
                <p key={link.url}>
                  <a href={httpUrl(link.url)}>{link.label}</a>
                </p>
              ))}
          </article>
        </noscript>
      )}
    </MotionProvider>
  );
}

function CaseDialog({
  selected,
  onClose,
  onRestoreFocus,
}: {
  selected: CaseStudy;
  onClose: () => void;
  onRestoreFocus: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: panel,
    trackContentSize: true,
  });
  const selectedCover = coverFor(selected);

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        ref={panel}
        className="case-dialog"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          onRestoreFocus();
        }}
      >
        <motion.div
          aria-hidden="true"
          className="case-progress"
          style={{ scaleX: scrollYProgress }}
        />
        <article key={selected._id}>
          <div className={`case-visual art-${selected.accent || "blue"}`}>
            {selectedCover?.url ? (
              <img src={selectedCover.url} alt={selectedCover.alt || ""} />
            ) : (
              <>
                <div className="art-ring art-ring-one" />
                <div className="art-ring art-ring-two" />
                <span>{selected.category}</span>
              </>
            )}
          </div>
          {selectedCover?.caption && (
            <p className="case-caption">{selectedCover.caption}</p>
          )}
          <div className="case-header">
            <span className="section-kicker">
              {selected.category} {selected.date && `· ${selected.date}`}
            </span>
            <DialogTitle>{selected.title}</DialogTitle>
            <DialogDescription>{selected.summary}</DialogDescription>
            {(selected.authors || selected.venue) && (
              <p className="case-byline">
                {[selected.authors, selected.venue].filter(Boolean).join(" · ")}
              </p>
            )}
            {!!selected.proofLinks?.length && (
              <div className="case-links">
                {selected.proofLinks
                  .filter((link) => httpUrl(link.url))
                  .map((link) => (
                    <a
                      className="pill pill-outline"
                      key={link.url}
                      href={httpUrl(link.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label} <ArrowUpRight size={15} />
                    </a>
                  ))}
              </div>
            )}
          </div>
          <div className="case-body">
            {!!selected.technology?.length && (
              <div className="case-tags">
                {selected.technology.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}
            {selected.body && (
              <PortableText
                value={selected.body}
                components={PortableComponents}
              />
            )}
            {httpUrl(selected.videoUrl) && (
              <p>
                <a
                  href={httpUrl(selected.videoUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch demo video ↗
                </a>
              </p>
            )}
            {!!selected.gallery?.length && (
              <div className="case-gallery">
                {selected.gallery.map(
                  (image, i) =>
                    image.url && (
                      <figure key={image.url + i}>
                        <img
                          src={image.url}
                          alt={image.alt || ""}
                          loading="lazy"
                        />
                        {image.caption && (
                          <figcaption>{image.caption}</figcaption>
                        )}
                      </figure>
                    ),
                )}
              </div>
            )}
          </div>
        </article>
      </DialogContent>
    </Dialog>
  );
}
