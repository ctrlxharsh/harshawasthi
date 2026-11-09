"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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
  large = false,
}: {
  item: CaseStudy;
  kind: Selection["kind"];
  index: number;
  onOpen: (selection: Selection, target: HTMLElement) => void;
  large?: boolean;
}) {
  const query = kind === "project" ? "project" : "research";
  return (
    <HoverCard className={`card-shell ${large ? "card-shell-large" : ""}`}>
      <a
        className="work-card"
        href={`/?${query}=${encodeURIComponent(item.slug)}`}
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
        <div className={`card-art art-${item.accent || "blue"}`}>
          {item.image?.url ? (
            <img
              src={item.image.url}
              alt={item.image.alt || ""}
              loading="lazy"
            />
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
          <span className="card-arrow" aria-hidden="true">
            <ArrowUpRight size={19} strokeWidth={1.7} />
          </span>
        </div>
        <div className="card-copy">
          <div className="card-meta">
            <span>{item.category}</span>
            <span>{item.date}</span>
          </div>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
          <span className="card-link">
            Explore {kind === "research" ? "research" : "project"}{" "}
            <ArrowRight size={15} />
          </span>
        </div>
      </a>
    </HoverCard>
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

function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="timeline">
      {entries.map((entry) => (
        <div className="timeline-row" key={entry._id}>
          <div className="timeline-date">{entry.date}</div>
          <div className="timeline-main">
            <h3>{entry.title}</h3>
            <p className="timeline-org">{entry.organization}</p>
            {entry.description && <p>{entry.description}</p>}
          </div>
          <ArrowUpRight
            className="timeline-mark"
            size={17}
            aria-hidden="true"
          />
        </div>
      ))}
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
  const trigger = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const selected = selection
    ? (selection.kind === "project" ? data.projects : data.publications).find(
        (item) => item.slug === selection.slug,
      )
    : undefined;
  const featured = useMemo(
    () =>
      data.projects
        .filter((project) => project.featuredOnHome)
        .sort((a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999))
        .slice(0, 4),
    [data.projects],
  );
  const allProjects = useMemo(
    () =>
      [...data.projects].sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
    [data.projects],
  );

  useEffect(() => {
    const update = () =>
      setSelection(
        selectionFromParams(new URLSearchParams(window.location.search)),
      );
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  const open = useCallback((next: Selection, element: HTMLElement) => {
    trigger.current = element;
    const url = new URL(window.location.href);
    url.searchParams.delete("project");
    url.searchParams.delete("research");
    url.searchParams.set(next.kind, next.slug);
    window.history.pushState({ portfolioDialog: true }, "", url);
    setSelection(next);
  }, []);

  const close = useCallback(() => {
    if (window.history.state?.portfolioDialog) {
      window.history.back();
    } else {
      const url = new URL(window.location.href);
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
            [data.settings.projectsLabel, "#projects"],
            [data.settings.experienceLabel, "#experience"],
            [data.settings.aboutLabel, "#about"],
          ].map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenu(false)}>
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
        <section className="hero" id="top">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" />{" "}
              <span aria-hidden="true">
                <BlurText text={data.settings.eyebrow} />
              </span>
              <span className="sr-only">{data.settings.eyebrow}</span>
            </div>
            <h1>{data.settings.headline}</h1>
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
          <div className="hero-art">
            <img
              src={data.settings.heroImage?.url || "/research-form.webp"}
              alt={data.settings.heroImage?.alt || ""}
              fetchPriority="high"
            />
            <span className="hero-art-caption">
              AN EXPLORATION IN
              <br />
              INTELLIGENT SYSTEMS
            </span>
          </div>
          <div className="hero-foot">
            <span>HARSH AWASTHI</span>
            <span>RESEARCH & ENGINEERING</span>
            <span>SCROLL TO EXPLORE ↓</span>
          </div>
        </section>

        <section className="section research-section" id="research">
          <div className="container">
            <Reveal>
              <SectionHeading
                label={data.settings.researchLabel}
                title={data.settings.researchTitle}
                intro={data.settings.researchIntro}
              />
            </Reveal>
            <div className="research-grid">
              {data.publications.map((item, index) => (
                <Card
                  key={item._id}
                  item={item}
                  kind="research"
                  index={index}
                  onOpen={open}
                  large={index === 0}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="container">
            <Reveal>
              <SectionHeading
                label={data.settings.selectedLabel}
                title={data.settings.projectsTitle}
                intro={data.settings.projectsIntro}
              />
            </Reveal>
            <div className="project-grid">
              {featured.map((item, index) => (
                <Card
                  key={item._id}
                  item={item}
                  kind="project"
                  index={index}
                  onOpen={open}
                />
              ))}
            </div>
            <div className="archive-heading">
              <div>
                <span className="section-kicker">
                  {data.settings.archiveLabel}
                </span>
                <h3>{data.settings.archiveTitle}</h3>
              </div>
              <button
                className="pill pill-outline"
                type="button"
                aria-expanded={expanded}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded
                  ? data.settings.archiveCollapseAction
                  : data.settings.archiveExpandAction}{" "}
                <ArrowDown size={16} className={expanded ? "turned" : ""} />
              </button>
            </div>
            <div className="archive-list" id="all-projects">
              {(expanded ? allProjects : allProjects.slice(0, 3)).map(
                (item, index) => (
                  <a
                    key={item._id}
                    href={`/?project=${encodeURIComponent(item.slug)}`}
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
                      open(
                        { kind: "project", slug: item.slug },
                        event.currentTarget,
                      );
                    }}
                  >
                    <span className="archive-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="archive-name">{item.title}</span>
                    <span className="archive-category">{item.category}</span>
                    <ArrowUpRight size={19} />
                  </a>
                ),
              )}
            </div>
            <noscript>
              <div className="archive-list">
                {allProjects.slice(3).map((item) => (
                  <a
                    key={item._id}
                    href={`/?project=${encodeURIComponent(item.slug)}`}
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </noscript>
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
            <Timeline entries={data.experience} />
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
            <div className="education-grid" id="journey">
              <div>
                <span className="section-kicker">
                  {data.settings.educationLabel}
                </span>
                <h2>{data.settings.educationTitle}</h2>
              </div>
              <Timeline entries={data.education} />
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

      <Dialog
        open={!!selected}
        onOpenChange={(next) => {
          if (!next) close();
        }}
      >
        <AnimatePresence>
          {selected && (
            <DialogContent
              className="case-dialog"
              onCloseAutoFocus={(event) => {
                if (trigger.current) {
                  event.preventDefault();
                  trigger.current.focus();
                }
              }}
            >
              <motion.article
                key={selected._id}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="case-header">
                  <span className="section-kicker">
                    {selected.category} {selected.date && `· ${selected.date}`}
                  </span>
                  <DialogTitle>{selected.title}</DialogTitle>
                  <DialogDescription>{selected.summary}</DialogDescription>
                  {(selected.authors || selected.venue) && (
                    <p className="case-byline">
                      {[selected.authors, selected.venue]
                        .filter(Boolean)
                        .join(" · ")}
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
                <div className={`case-visual art-${selected.accent || "blue"}`}>
                  {selected.image?.url ? (
                    <img
                      src={selected.image.url}
                      alt={selected.image.alt || ""}
                    />
                  ) : (
                    <>
                      <div className="art-ring art-ring-one" />
                      <div className="art-ring art-ring-two" />
                      <span>{selected.category}</span>
                    </>
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
              </motion.article>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
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
