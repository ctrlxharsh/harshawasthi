---
name: Harsh Awasthi Portfolio
description: A warm, editorial single-page portfolio with playful interactive details.
colors:
  paper: "#faf7f5"
  ink: "#111111"
  muted: "#67635f"
  line: "#292724"
  sheet: "#fffdfa"
  feature-warm: "#ebe9e6"
  feature-cool: "#e9eceb"
  focus: "#a56b42"
typography:
  hindi:
    fontFamily: "Noto Sans Devanagari, DM Sans, sans-serif"
    fontSize: "clamp(45px, 7.1vw, 104px)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  display:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(45px, 7.1vw, 104px)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(38px, 5vw, 64px)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  title:
    fontFamily: "PT Serif, Georgia, serif"
    fontSize: "clamp(18px, 1.55vw, 22px)"
    fontWeight: 400
    lineHeight: 1.3
  body:
    fontFamily: "PT Serif, Georgia, serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "11px"
    fontWeight: 600
spacing:
  section-inline: "clamp(24px, 5vw, 75px)"
  row-content: "24px clamp(20px, 3vw, 45px)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.sheet}"
    padding: "10px 16px"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "7px 12px"
---

# Design System: Harsh Awasthi Portfolio

## Overview

**Creative North Star: "The Interactive Editorial Portfolio"**

A restrained, warm paper canvas carries a spacious typographic portfolio. Thin rules and numbered rows provide the structure, while a bilingual reveal and small pixel-art character add personality. The visual reference is [MiMo](https://mimo.xiaomi.com/); the content and character are Harsh's own.

**Key Characteristics:**

- Warm monochrome surfaces and fine black dividing lines.
- Bold sans-serif headlines paired with readable serif copy.
- Large editorial spacing, numbered rows, and a short typographic interlude.
- Playful motion with explicit touch and keyboard alternatives.

## Colors

Warm paper, dark ink, and subdued neutrals carry the interface; the focus ring uses a restrained warm brown.

### Primary
- **Ink:** Main text, rules, inverted row states, and primary actions.

### Neutral
- **Paper:** Page and dialog background.
- **Muted:** Supporting text and secondary labels.
- **Line:** Structural borders and dividers.
- **Sheet:** The About panel and form fields.
- **Feature warm / feature cool:** Quiet contrast behind the two featured projects.
- **Focus:** The visible keyboard focus outline.

## Typography

**Display Font:** DM Sans, with a sans-serif fallback.
**Body Font:** PT Serif, with Georgia and serif fallbacks.
**Hindi Font:** Noto Sans Devanagari, with the sans-serif stack as fallback.

Bold, tightly tracked headings contrast with more literary row titles and body text. Small sans-serif labels and navigation provide a functional counterpoint.

### Hierarchy
- **Display:** The large bilingual hero greeting.
- **Headline:** Section titles; generous space surrounds them.
- **Title:** Serif work-row names.
- **Body:** Descriptions and introductory copy; About copy is capped at 68 characters per line.
- **Label:** Compact navigation, resource links, and editor controls.

## Layout

A sticky header sits above full-width sections. A typographic interlude leads into bordered, numbered rows; section introductions have spacious horizontal padding. At 1100px and below, navigation collapses into a two-column menu. At 650px and below, the header becomes 58px tall, spacing and row columns tighten, and the hero fits within the small viewport. Contact links wrap naturally.

## Elevation & Depth

The public page is flat: boundaries come from borders, background tones, and hover inversion. A shadow and dark backdrop distinguish open dialogs from the page.

## Shapes

Straight edges, square controls, and one-pixel rules form the structural language. The circular pointer lens is a distinctive exception, revealing white Hindi lettering on black. Pixel-art characters remain crisp with pixelated image rendering.

## Components

### Buttons and inputs

Outline controls use a fine border and square corners; the primary form action inverts to ink with light text. Inputs use a light sheet surface and a thin neutral border. Interactive elements have a 3px warm focus outline with a 3px offset.

### Navigation

The wordmark stays left, with section links and login on the right. At smaller widths a menu button opens the navigation. Links underline on hover; the login control inverts on hover.

### Hero and About

A centered greeting sits over repeating, pale letterforms. A short trailing pointer lens reveals the other language against an inverted surface; a language button provides a touch and keyboard alternative. The About button flips the hero to a light bordered sheet, which closes with the close button, Escape, or an outside click. Motion respects reduced-motion preferences.

### Work rows

Numbered rows contain a title, description, optional image, metadata, and links. Hover or focus within a row inverts it to dark ink with light text. Each section shows its first three entries, with the rest accessible via View more; editing shows all entries. Media can open in a dialog.

### Dialogs

Dialogs use square borders, a sticky header, and a darkened backdrop. Forms stack labels and fields; status messages are compact and high contrast.

## Do's and Don'ts

### Do:
- **Do** preserve the warm paper and ink contrast and the thin structural rules.
- **Do** give section headings generous space and keep descriptive copy readable.
- **Do** provide keyboard and touch access to interactions and respect reduced motion.
- **Do** use the supplied pixel character sparingly as an interactive detail.

### Don't:
- **Don't** replace the bilingual reveal with an interaction available only to a pointer.
- **Don't** turn the numbered editorial rows into heavy rounded cards.
- **Don't** rely on color alone to communicate focus or error states.
