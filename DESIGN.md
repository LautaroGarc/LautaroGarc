---
name: Lautaro García
description: Software Developer portfolio built like industrial tool packaging and a machine rating plate.
colors:
  hazard: "#ffc20e"
  hazard-ink: "#4a3b00"
  ink: "#141414"
  ink-2: "#222222"
  rule: "#3a3a3a"
  steel: "#8a9097"
  steel-ink: "#5c636b"
  label: "#f4f4f0"
  label-rule: "#d6d6cf"
typography:
  display:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.1rem, 11.5vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 6vw, 4.75rem)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    letterSpacing: "0.025em"
    fontVariation: "'wdth' 112"
  body:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    letterSpacing: "0.14em"
    fontVariation: "'wdth' 112"
  data:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    fontFeature: "'tnum', 'zero'"
rounded:
  stamp: "2px"
  cell: "3px"
  die: "4px"
  plate: "6px"
spacing:
  gutter: "1rem"
  gutter-wide: "2rem"
  plate-x: "1.75rem"
  field-y: "0.75rem"
  section-y: "6rem"
  section-y-wide: "8rem"
components:
  button-die-solid:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.hazard}"
    rounded: "{rounded.die}"
    padding: "0 1.4rem"
    height: "3.25rem"
  button-die-solid-on-ink:
    backgroundColor: "{colors.hazard}"
    textColor: "{colors.ink}"
    rounded: "{rounded.die}"
    padding: "0 1.4rem"
    height: "3.25rem"
  button-die-line:
    textColor: "{colors.ink}"
    rounded: "{rounded.die}"
    padding: "0 1.4rem"
    height: "3.25rem"
  plate:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.label}"
    rounded: "{rounded.plate}"
  plate-field-label:
    textColor: "{colors.steel}"
    typography: "{typography.label}"
  stamp-ok:
    backgroundColor: "{colors.hazard}"
    textColor: "{colors.ink}"
    rounded: "{rounded.stamp}"
    padding: "0.125rem 0.375rem"
  verdict-cell:
    backgroundColor: "{colors.hazard}"
    textColor: "{colors.ink}"
    rounded: "{rounded.cell}"
    padding: "0.5rem 0.75rem"
  nav-link:
    textColor: "{colors.steel}"
    typography: "{typography.label}"
    rounded: "{rounded.cell}"
    padding: "0.5rem 0.75rem"
  nav-link-hover:
    backgroundColor: "{colors.ink-2}"
    textColor: "{colors.hazard}"
  destination-bar:
    backgroundColor: "{colors.ink-2}"
    textColor: "{colors.label}"
    rounded: "{rounded.cell}"
    padding: "0.875rem 1rem"
  destination-bar-hover:
    backgroundColor: "{colors.hazard}"
    textColor: "{colors.ink}"
---

# Design System: Lautaro García

## Overview

**Creative North Star: "The Rating Plate"**

Every surface ships like an industrial tool in its packaging: safety yellow owns whole regions, carbon-black plates carry the facts in fixed fields, and white label stock holds dense reading. Nothing is decorative except structure itself; engraved rules, corner rivets, field labels, serial numbers and stamped verdicts are the ornament because they are also the information.

Density is deliberate and bimodal. Fields of color are vast and quiet (a full-bleed yellow hero, a black method band, a label-white parts list), while the plates inside them are compact, tabular and ruled. The maker's mark is Archivo pushed to its widest and heaviest; prose drops back to Archivo at normal width; JetBrains Mono appears only where a value would be printed on a plate: serials, step numbers, URLs, part names.

The world rejects the dark developer portfolio with neon cards and terminal costume. Black here is steel plate on a yellow ground, never a dark-mode canvas.

**Key Characteristics:**
- Three grounds only: hazard yellow, carbon ink, white label stock. Each section owns one ground edge to edge.
- Plates: black, 6px corners, double engraved inset rule, flat engraved-ring rivets, labels in fixed left columns.
- Type in three voices: expanded black maker's mark, normal-width prose, mono spec values.
- Motion is inspection: a sweep across each row, then an OK stamp, then the verdict.
- One plate lit at a time: hovering a project drops its siblings to steel.

## Colors

A hazard-signage palette: one saturated yellow, carbon blacks, steel grays, and off-white label stock. No other hues.

### Primary
- **Hazard Yellow** (`hazard`): owns entire regions (hero, contact, page background, theme-color), and on black surfaces it is the single lit signal: OK stamps, the verdict cell, the logo block, the header CV button, step numbers, plate titles and project nameplates. Selection inverts to ink on yellow.
- **Hazard Umber** (`hazard-ink`): secondary text on yellow (summaries, supporting paragraphs). Never used on any other ground.

### Neutral
- **Carbon Ink** (`ink`): plates, header, method band, footer, primary die buttons, all text on yellow and label grounds, the focus outline.
- **Machined Ink** (`ink-2`): one step up from ink for interactive fills on black: nav hover, destination bars at rest.
- **Engraved Rule** (`rule`): the fine lines cut into plates: field dividers, dashed inspection rows, the inset border, the gap color of the method grid.
- **Steel** (`steel`): inactive and secondary on black: field labels, serials, nav links at rest, the method intro.
- **Steel Ink** (`steel-ink`): secondary text on label stock.
- **Label Stock** (`label`): the dense-reading ground (projects, parts list) and primary text on plates.
- **Label Rule** (`label-rule`): hairlines and chip outlines on label stock.

### Named Rules
**The Three Grounds Rule.** A section sits on hazard, ink or label, full-bleed. Grounds alternate by section; they never appear as cards floating on another ground except as a plate.

**The Lit Signal Rule.** On black, yellow marks only the thing that is true or actionable now: a stamp, a verdict, a nameplate, a number, an action. Everything else on black is label or steel.

## Typography

**Display Font:** Archivo Variable (width axis), with ui-sans-serif, system-ui
**Body Font:** Archivo Variable at normal width
**Label/Mono Font:** JetBrains Mono (400, 700), with ui-monospace

**Character:** One family carries both the maker's stamp and the instructions, separated purely by width and weight; the mono is the printed value on the plate, never a costume.

### Hierarchy
- **Display** (900, 125% width, clamp(3.1rem, 11.5vw, 6rem), line-height 0.88, uppercase): the name across the hero. One per page.
- **Headline** (900, 125% width, clamp(2.6rem, 6vw, 4.75rem), 0.88, uppercase): section titles. Contact runs larger (up to 6rem); the parts list runs smaller (up to 3.5rem). Project nameplates use the same voice at clamp(1.9rem, 8vw, 3.5rem); method steps at 1.9rem.
- **Promise** (800, 110–118% width, clamp(1.25rem–2.4rem), 1.08): the hero subtitle and one-line promise, set between maker's mark and prose.
- **Title** (700, 112% width, 1rem, slight tracking): row names inside plates, table row headers, the header name.
- **Body** (400, 1.125rem, line-height 1.625, max 38–52ch): prose on every ground. Plate field values use 600 at 0.98rem.
- **Label** (700, 112% width, 0.6875rem, 0.14em tracking, uppercase): engraved field labels, nav links, plate titles, table headers.
- **Data** (JetBrains Mono, tabular and slashed-zero numerals, 0.7–0.875rem): serials (N.º LG-2026), step numbers, OK stamps, URLs, part names.

### Named Rules
**The Maker's Mark Rule.** Expanded black uppercase (900, 125% width) is reserved for names and headings: the person, the sections, the models, the verdict. Never for sentences of prose.

**The Printed Value Rule.** Mono is only for values a machine would print: numbers, serials, identifiers, part names, URLs. Never for headings or prose.

## Layout

A 90rem max-width container with 1rem gutters (2rem from 40rem). Sections stack full-bleed at 6rem vertical padding, 8rem from 64rem. Above 64rem a 12-column grid sets section heads as a 7-column headline with a 4-column intro aligned to its baseline at columns 9–12. The hero puts the rating plate in columns 1–6 and the promise and actions in 8–12; below 64rem the promise comes first and the plate follows.

Plates are field tables: a fixed label column (6.5rem, 8rem from 40rem on the rating plate; 7.5rem on project plates) and a value column, every field divided by an engraved rule. Fields keep the same order on every plate of a kind. Project plates sit two-up above 64rem with a 1.5rem gap. The method is a four-cell grid (two-up from 48rem) whose 1px gaps show the rule color.

The header is a sticky 4rem black bar; below 48rem the anchors move to a second ruled row inside the bar, and scroll padding grows to 7rem to clear it.

## Elevation & Depth

Depth is mostly engraved, not lifted. Plates read as stamped steel through inset rules; only plates and the primary die cast a soft drop shadow onto the ground they sit on.

### Shadow Vocabulary
- **Plate engraving** (`box-shadow: inset 0 0 0 1px #2c2c2c, inset 0 0 0 7px var(--color-ink), inset 0 0 0 8px var(--color-rule), 0 18px 40px -18px rgb(20 20 20 / 0.55)`): outer bevel, a 7px margin, then a 1px engraved border, plus a soft cast shadow below.
- **Rivet ring** (`box-shadow: inset 0 0 0 1px var(--color-steel), inset 0 0 0 3px var(--color-ink), inset 0 0 0 4.5px #3f4347`): a flat 9px engraved ring, no highlight or dome.
- **Die rest** (`box-shadow: 0 10px 22px -12px rgb(20 20 20 / 0.7)`): primary die button.
- **Die lift** (`box-shadow: 0 16px 28px -14px rgb(20 20 20 / 0.75)`): primary die on hover, with a 2px rise.
- **Die outline** (`box-shadow: inset 0 0 0 2px var(--color-ink)`): line die; borders are drawn inset so size never shifts.

### Named Rules
**The Engraved Not Lifted Rule.** Edges are cut in with inset rules. Cast shadows are soft, blurred, and spread negative so they sit directly under the object; never hard offset blocks.

## Shapes

Small, machined corners on a strict ladder: 2px on stamps and part chips, 3px on cells (logo block, verdict, step numbers, nav and header buttons, nameplate top corners, destination bars), 4px on die buttons, 6px on plates and the method grid. Nothing is pill-shaped except the rivets, which are circles. Rules are 1px solid between fields, 1px dashed between inspection rows, 2px solid ink where a heading or table head is underlined on yellow or label. Icons are 2px-stroke SVG with square caps and miter joins.

## Components

### Buttons (die-cut)
Tactile and stamped, like a cut-out on packaging.
- **Shape:** 4px corners, 3.25rem minimum height, 1.4rem side padding, icon gap 0.65rem.
- **Type:** Archivo 800 at 115% width, 0.95rem, 0.04em tracking, uppercase.
- **Solid:** ink with hazard text and the die rest shadow; inverted (hazard with ink text) inside a black surface. The primary action of a region.
- **Line:** transparent with a 2px inset ink outline; hover fills with 8% ink.
- **States:** solid rises 2px with the deeper shadow on hover; every die presses 1px down on active; focus is a 3px ink outline at 3px offset (hazard on black). Transitions use expo-out at 0.35s and disappear under reduced motion.

### Chips (part tags)
- **Style:** JetBrains Mono at 0.8rem on white with a 1px inset label-rule outline, 2px corners, 0.25rem by 0.5rem padding. Used only to list parts in the parts table.

### Cards / Containers (plates)
- **Corner Style:** 6px.
- **Background:** ink with label text.
- **Shadow Strategy:** plate engraving (see Elevation & Depth).
- **Rivets:** flat engraved rings inset 0.625rem from each corner. The rating plate carries four; project plates carry the bottom two only, because the yellow nameplate fills the top.
- **Internal Padding:** 1.25rem sides, 1.75rem from 40rem (2rem on project fields); fields 0.75–1rem tall-padding.
- **Field labels:** engraved label type in steel in the fixed left column.

### Navigation
- **Style:** sticky 4rem ink bar. Brand is a 2.25rem hazard cell with "LG" in maker's mark beside the name.
- **Links:** engraved label type in steel; hover fills ink-2 and turns hazard. Below 48rem, the links sit in a ruled second row with tighter tracking.
- **CV action:** a hazard cell with ink label text and a download icon, rising 1px on hover.

### Rating Plate (signature)
The hero's data plate: title in hazard label type and serial in mono across the top, three fixed fields (Modelo, Entrada, Salida), a control process of numbered rows each ending in a hazard OK stamp, and a Veredicto row whose value is an unrotated hazard cell set in the maker's mark. On load, each row is swept by a 16% hazard band, its OK stamps in (scale 1.6 to 1 with a blur clearing) at 0.55s intervals, and the verdict stamps last at 3.1s. Below 64rem the animation is paused before it paints until 45% of the plate is in view. Reduced motion shows the final state.

### Project Plate (signature)
A plate whose top is a hazard nameplate (3px top corners, inset 0.5rem) carrying the model name in the maker's mark and N.º in mono, followed by fixed fields Tipo, Problema, Solución and Destino. Destino is an ink-2 bar with the URL in mono and an out-arrow; hover turns it hazard, and the whole plate is the hit area. Hovering or focusing one plate rises it 4px and drops its siblings to grayscale at 60% opacity. New projects are new data on the same plate.

### Method Grid
Four cells on ink separated by 1px rule gaps: a hazard numbered cell joined to a 2px rule line, the verb in the maker's mark, prose at 80% label, and an output pinned to the bottom with a steel label over hazard text.

## Do's and Don'ts

### Do:
- **Do** give every section one full-bleed ground: hazard, ink or label.
- **Do** put facts on plates as fixed label and value fields with engraved rules between them, in the same order on every plate of a kind.
- **Do** keep hazard on black for stamps, verdicts, nameplates, numbers and actions.
- **Do** set names and headings in Archivo 900 at 125% width, uppercase, line-height 0.88.
- **Do** use mono only for printed values: serials, step numbers, URLs, part names.
- **Do** keep corners on the 2/3/4/6px ladder and draw outlines as inset box-shadows.
- **Do** animate as inspection (sweep, stamp, verdict) with expo-out easing, and show the final state under reduced motion.

### Don't:
- **Don't** add hues beyond hazard, the inks, steels and label stock.
- **Don't** turn black into a dark-mode canvas with glowing or neon cards, or dress code in terminal costume.
- **Don't** use hard offset block shadows; cast shadows stay soft and sit directly under the object.
- **Don't** set prose in the maker's mark or headings in mono.
- **Don't** put small labels above section headings; labels belong inside plates and tables as field names.
- **Don't** rotate stamps or the verdict cell, or give rivets a dome or highlight.
