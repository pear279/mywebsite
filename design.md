# pear279 Portfolio — Design Notes

Living design record for the personal portfolio. Update this file whenever a visual system, interaction pattern, or reusable implementation decision changes.

## 1. Product purpose

The site helps a recruiter or collaborator understand three things quickly:

1. Who Li Huizhen is as an AI product manager.
2. What product problems she has worked on and how she approaches them.
3. How to inspect her work, download her resume, or contact her.

The interface should reward a deeper scroll without making the first scan difficult.

## 2. Visual thesis

**Mood:** an editorial product archive with an experimental graffiti signature.

**Material:** warm off-white paper, near-black ink, charcoal presentation surfaces, fine rules, and one acid-lime signal color.

**Energy:** calm in the surrounding interface, deliberately uncontrolled inside the signature. Movement stays weighted while the lettering feels like a fast physical gesture.

## 3. Content plan

- **Hero:** oversized identity mark, original three-part role label, layered atmospheric depth, scroll cue, and one click-feedback interaction.
- **About / Journey:** compact personal positioning, education, and a right-side chronological index with direct anchors.
- **Experience:** two detailed internships with scroll-linked sticky labels.
- **Projects:** three case summaries with scroll-linked sticky labels and GitHub actions.
- **Capabilities:** two offset, continuous rails of skill tiles; pause and enlarge on hover.
- **Contact:** compact invitation, email, phone, and GitHub.

## 4. Type and hierarchy

- The handwritten `pear 279` mark is the only intentionally large typographic object.
- Section titles remain compact: approximately 28–48px desktop and 26–36px mobile.
- Project and experience names may grow while their item is active, but should never dominate an entire viewport.
- Labels, dates, and indices use a quiet mono voice; body copy remains a neutral sans-serif; editorial titles use a restrained serif.
- Do not reintroduce 80–120px section headings. Use whitespace and rule placement to create importance.

## 5. Spacing system

Base scale: 4, 8, 12, 16, 24, 32, 48, 64, 96.

- Tight groups: 8–16px.
- Content clusters: 24–32px.
- Section transitions: 64–96px with responsive `clamp()` values.
- Page gutters: `clamp(18px, 3.6vw, 56px)`.

## 6. Interaction thesis

1. **One input, one narrative step:** on wide desktop, GSAP Observer normalizes wheel input and advances exactly one outer chapter or one internal work step. Repeated input is locked until the current transition finishes.
2. **Weighted chapter travel:** Lenis moves outer chapters to exact viewport boundaries. Before Observer handles a wheel event, any native wheel momentum is cancelled at the current chapter boundary so internal item switches never drift the page.
3. **Internal work steps:** Experience holds two mutually exclusive panels and Projects holds three. Their chapter canvas stays fixed while the active panel crossfades with a small vertical shift and scale change.
4. **Responsive input model:** tablets and phones do not use wheel capture. They keep natural touch scrolling, proximity snapping, and every work panel remains visible in document order.
5. **Active work label:** a lower-left label names the current experience/project, shows `current / total`, and pulses gently when the internal state changes.
6. **Capability rails:** two continuously looping rows travel in opposite directions; hovering a row pauses it and enlarges the hovered tile slightly.
7. **Hero depth response:** only fine-pointer devices receive a small two-layer parallax. The signature follows by a few pixels while the near haze moves more slowly in the opposite direction; touch devices remain still.

## 7. Motion rules

- Use `transform` and `opacity`; do not animate layout dimensions.
- Primary easing: exponential/power ease-out. Avoid bounce and elastic effects.
- Scroll-linked transformations use GSAP `scrub` and are scoped/cleaned with `useGSAP`.
- The Hero exit is staged: identity label and cue recede first, the signature scales and fades next, then the near haze and lower depth layer disperse.
- Lenis and GSAP share one ticker; avoid competing requestAnimationFrame loops.
- Reduced-motion users keep the same navigation order while chapter and internal transitions become immediate; capability rails become static.
- Hover feedback: 180–280ms. Section entrances: 500–750ms. Scroll scrub lag: about 0.5–0.9s.

## 8. Component patterns

### Signature mark

- The Hero uses the supplied transparent raster artwork `/pear-279-handdrawn.png` as its sole center mark. Its distressed white fill, sketch contours, and alpha channel are part of the artwork and must remain unmodified.
- Keep `P–e` and `7–9` optically separate: no connector may cut through the counters or cross from one glyph into the next. Preserve the irregular silhouettes and distress elsewhere.
- The source contains generous transparent space above and below the lettering. Present it as a centered CSS background inside a `1672:500` visual window rather than letting the full `1672:941` file box determine the role-label position.
- Desktop width is approximately `72vw` with a `1060px` ceiling; mobile uses up to the viewport width with a `460px` ceiling. This keeps the irregular mark prominent without clipping its outer strokes.
- Reveal the raster mark as one object with a restrained opacity/scale transition. Path-drawing motion is no longer appropriate because the Hero artwork is not vector geometry.
- The fixed corner mark and footer remain the existing compact acid SVG on a dark backing. They are navigation-scale identifiers and are intentionally not replaced by the detailed raster artwork.

### Hero atmosphere and role label

- The background is a deep charcoal radial studio light: mineral gray concentrates behind the signature and falls to near-black at every edge. A far haze, smaller near haze, low depth field, and restrained grain prevent it from becoming a generic flat gradient.
- The role label is an original three-part lockup: acid `AI PRODUCT · HUMAN FIRST`, paper-white `AI 产品经理`, and translucent charcoal `把复杂 AI 变成自然体验`. It uses the existing brand palette instead of the reference site's yellow/red editorial stickers.
- Keep the Hero limited to the signature, identity label, scroll cue, and atmosphere. Extra corner metadata weakens the visual hierarchy and must remain removed.

### Linked index

- Lives in the right column of About.
- Default state is muted; hover/focus increases contrast and uses a small transform scale from the left edge.
- Every row links directly to a section or project anchor.

### Active work label

- One label per experience/project group is anchored near the lower-left corner of the chapter canvas.
- GSAP updates its name, date, progress, and short scale pulse when the active internal panel changes.
- The desktop work panel reserves bottom padding for the label; mobile returns to sticky/natural-flow behavior so the label never covers links or copy.

### Capability rail

- Duplicate the same item set once for a seamless loop.
- Use two opposite directions and an offset start position.
- Tiles express capability through typography, small evidence labels, and restrained solid colors—no generic icon-card grid.

## 9. Accessibility and performance

- Respect `prefers-reduced-motion` in CSS, Lenis, and GSAP match media.
- Keep anchors and native scroll semantics intact.
- Maintain visible focus states and adequate text contrast.
- Pause infinite rails on hover and focus-within; pause off-screen where practical.
- Restrict `will-change` to elements that actually animate.
- Do not create ScrollTriggers for decorative children; animate meaningful content units and active work items only.

## 10. Reference research system

- Use the global `design-resource-library` skill before material visual, interaction, motion, component, or page-structure work.
- Choose two to four sources based on the task instead of browsing the entire catalog.
- Use official implementation documentation for Lenis, GSAP, Motion, Material Web, React Bits, AI Elements, and Font Awesome.
- Use galleries to study hierarchy, spacing, composition, and interaction language; never treat screenshots or another designer's signature assets as production material.
- Record which references influenced a material decision and which patterns were rejected because they conflict with this product's audience, accessibility, performance, or requirements.
- Available packages do not imply simultaneous use. Lenis owns scroll feel, GSAP owns the current narrative scroll/state animation, and any future Motion usage must have a non-overlapping component-level purpose.

### Hero research used on 2026-08-16

- **Karol Ortyl:** informed the oversized handwritten focal point, quiet black upper field, atmospheric depth, responsive art direction, and staged disappearance on scroll. Its yellow/red label treatment, brand copy, drawing canvas, and implementation stack were deliberately not copied.
- **GSAP React official guidance:** reinforced keeping Hero timelines inside `useGSAP`, scoping selectors to the page root, and relying on context cleanup.
- **Lenis official guidance:** retained the single GSAP ticker integration and the existing scroll owner instead of introducing another animation loop.
- **React Bits ClickSpark:** retained the existing lightweight click feedback with the original white spark settings; no additional decorative dependency was added.
- **Browser annotation on the live Hero:** supplied the final lettering direction—bold hollow marker outlines, experimental street-art energy, and tiny numbered dot details. The geometry was redrawn directly as original SVG paths rather than approximated with an outlined webfont.
- **Second browser annotation on the live Hero:** explicitly rejected the regular bubble geometry and became the primary visual specification for continuous one-take paths, malformed loops, topological self-crossing, widened casual spacing, and at least twelve scattered annotations.

## 11. Revision log

### 2026-08-16

- Defined compact title hierarchy.
- Planned smoother `pear 279` signature with a deliberate word gap.
- Added Lenis + GSAP motion architecture.
- Replaced the former orbit skill map with two offset looping rails.
- Added About index and sticky active labels for Experience and Projects.
- Removed both Hero corner metadata blocks and kept the signature as the single visual focus.
- Rebuilt the signature as smooth custom monoline paths, tightened `pear 279` to a one-space optical gap, and synchronized the fixed corner mark.
- Refined the Hero into a dark-to-smoky-gray field with restrained grain, soft central haze, path-drawing entrance, and low-amplitude pointer parallax.
- Finalized the Hero as lowercase `pear 279`, removed all edge metadata, and kept only the center identity composition plus scroll cue.
- Restored the complete seven-item navigation, including Skills and resume download.
- Replaced proximity-only desktop settling with Observer-driven one-wheel navigation across six outer chapters, two Experience steps, and three Project steps.
- Rebuilt Experience and Projects as fixed-height chapter canvases with accessible active-panel state, direct internal anchors, progress labels, and reversible order.
- Preserved natural continuous reading on tablet/mobile, where all five work panels remain visible and accessible.
- Verified 1440×900 desktop and 390×844 mobile layouts with no horizontal overflow or browser console errors.
- Verified internal anchor arrival, keyboard navigation, exact chapter positioning, reverse/forward panel state, carousel hover pause, and `1.035×` card enlargement.
- Added a global design resource skill and source catalog covering motion, design systems, UI components, iconography, assets, and inspiration galleries.
- Added Motion, Material Web, Font Awesome React, and AI Elements CLI as available dependencies; retained explicit ownership boundaries to avoid overlapping animation systems.
- Preview workflow: do not run `next build` against the same `.next` directory while `next dev` is active. Stop development first, build, then restart development with a clean cache; otherwise stale asset URLs can make the page appear completely unstyled.
- Re-art-directed the Hero around an oversized monoline signature: wide desktop composition, same-path stacked mobile composition, quieter black headroom, layered fog/depth, and an original acid/paper/charcoal identity label.
- Rebuilt Hero motion as a measured path draw, fine-pointer-only opposing parallax, and a staged scrubbed exit; reduced-motion shows the final static composition immediately.
- Verified the Hero at 1440×900, 390×844, and 360×640, including one-wheel chapter travel, mobile navigation, internal anchor arrival, ClickSpark canvas, resume response, reduced-motion styles, and a clean browser console.
- Replaced the thin monoline signature with seven compound bubble-outline paths, retained the existing path-length entrance, and added controlled `1—7` dot annotations inside the hollow characters.
- Superseded the geometric bubble draft with seven hand-built open scribble paths, character-level stroke variation, static SVG displacement, irregular rotations, multiple self-intersections, a radial studio-light background, and twelve scattered numbered dots.
- Replaced only the Hero's hand-built SVG lettering with the user-supplied transparent PNG, preserving the atmospheric field, identity label, pointer parallax, staged exit, compact corner mark, and footer mark.
- Removed the two noisy connector strokes crossing `P–e` and `7–9`, then restored the edited asset to genuine RGBA transparency without changing its dimensions or distressed surface treatment.
