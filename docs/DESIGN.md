---
name: 콩알가계부 (Kongal Gagyebu)
verified: 2026-10-16
reference: Karrot (당근) SEED v2 design system — https://v2.seed-design.io
runtime_deps:
  icons: "@phosphor-icons/react"
  fonts: [Pretendard]
colors:
  primary: '#ff6f0f'
  primary-hover: '#ff9e66'
  primary-pressed: '#ff9e66'
  marketing: '#ff6600'
  canvas: '#ffffff'
  background: '#f2f3f6'
  surface: '#f7f8fa'
  foreground: '#212124'
  muted: '#868b94'
  on-primary: '#ffffff'
  hairline: '#eaebee'
  brand-tint: '#fff5f0'
  error: '#fa2314'
  info: '#009ceb'
  success: '#1aa174'
typography:
  h1:
    fontSize: 48px
    fontWeight: 700
  h2:
    fontSize: 42px
    fontWeight: 700
  h3:
    fontSize: 34px
    fontWeight: 700
  title:
    fontSize: 24px
    fontWeight: 700
  body:
    fontSize: 16px
    fontWeight: 400
  body-small:
    fontSize: 14px
    fontWeight: 400
rounded:
  sm: 6px
  md: 8px
  full: 9999px
spacing:
  sm: 4
  md: 8
  lg: 12
  xl: 16
  section: 64
components:
  marketing-primary:
    type: button
    backgroundColor: '#ff6600'
    textColor: '#ffffff'
    rounded: 9999px
    height: 36px
    padding: 4px 12px
    typography: 14px / 500
    hover: 'overlay #ffffff at 0.08 via ::before; bg stays #ff6600'
    pressed: 'overlay #ffffff at 0.12 via ::before; bg stays #ff6600'
    focus: 'ring 0 0 0 2px #ffffff, 0 0 0 4px #e14d00'
    states: 'default on two public surfaces (2026-07-11); hover, pressed and keyboard focus-visible measured 2026-09-29 with :hover, :active and :focus-visible matched; the fill never changes, so a background-only reading sees no change (corrected 2026-09-29: earlier text said hover not captured)'
    use: Landing / intro page CTA only (reference: Karrot marketing-site CTA)
  box-button:
    type: button
    backgroundColor: '#ff6f0f'
    textColor: '#ffffff'
    hover: '#ff9e66'
    pressed: '#ff9e66'
    disabled: 'bg #dcdee3 fg #adb1ba'
    states: 'primary, primary-low, secondary, danger, disabled, hover, keyboard. Pressed and hover share one background by design — SEED declares both as #ff9e66. Size and type scale are not promoted: the official preview renders one size and the reference documents five'
    use: In-app action with five documented sizes (from SEED)
  text-field:
    type: input
    states: outlined, underlined, focused, disabled, readonly, required, invalid
    use: SEED single-line form field
  tabs:
    type: tab
    states: selected, disabled, focus
    use: SEED category switching with indicator
  snackbar:
    type: toast
    states: default, success, warning, action focus
    use: SEED transient action feedback
  marketing-secondary:
    type: button
    backgroundColor: transparent
    textColor: '#1a1c20'
    border: 1px solid rgba(26, 28, 32, 0.118)
    rounded: 9999px
    padding: 3px 11px
    height: 36px
    typography: 14px / 500 / 20px
    hover: 'overlay #eeeff1 at 0.24 via ::before'
    pressed: 'overlay #eeeff1 at 0.36 via ::before'
    focus: 'ring 0 0 0 2px #ffffff, 0 0 0 4px #e14d00'
    states: 'rest on both public surfaces in the 2026-07-11 capture and unchanged on 2026-09-29; hover, pressed and keyboard focus-visible measured 2026-09-29 with :hover, :active and :focus-visible matched; the fill stays transparent while a #eeeff1 ::before overlay carries hover and pressed; focus is a box-shadow ring with outline none'
    use: Landing page secondary pill (reference: karrotmarket.com header outlined pill, About us)
  marketing-ghost:
    type: button
    backgroundColor: transparent
    textColor: '#1a1c20'
    rounded: 9999px
    padding: 4px 12px
    height: 36px
    typography: 14px / 500 / 20px
    states: rest on both public surfaces in the 2026-07-11 capture; no hover, pressed or focus sample exists, so none is declared
    use: (unused — reference-specific) karrotmarket.com header ghost pill (Sign In)
  flag-menu-button:
    type: button
    backgroundColor: transparent
    textColor: '#1a1c20'
    border: 1px solid rgba(26, 28, 32, 0.118)
    rounded: 9999px
    size: 40px x 40px
    typography: 14px / 400 / 14px
    hover: 'bg #f3f4f5'
    pressed: 'bg #f3f4f5'
    states: 'rest, hover and pressed sampled on the home surface (2026-07-11): hover and pressed both fill #f3f4f5, the value the location chip also records; the about-page capture caught this control already at #f3f4f5, so rest is taken from home; opens a two-item menu (dialog-open); focus not sampled, and the control was not re-probed on 2026-09-29'
    use: (unused — reference-specific) karrotmarket.com header 40px circle showing a flag emoji; opens the flag menu
  flag-menu:
    type: card
    backgroundColor: '#ffffff'
    textColor: '#1a1c20'
    rounded: 8px
    padding: 4px
    size: 219px x 80px
    typography: 14px / 400 / 20px
    shadow: rgba(26, 28, 32, 0.08) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.05) 0px 5px 10px 0px, rgba(0, 0, 0, 0.07) 0px 15px 25px 0px
    states: dialog-open observed on both public surfaces (2026-07-11)
    use: (unused — reference-specific) Popover menu opened by the flag button
  flag-menu-item:
    type: listItem
    backgroundColor: transparent
    textColor: '#1a1c20'
    rounded: 6px
    size: 211px x 36px
    typography: 14px / 400 / 20px
    states: rest observed inside the open menu (2026-07-11); no pointer-state sample
    use: (unused — reference-specific) Menu item (role=menuitem) inside the flag menu
  location-chip:
    type: button
    backgroundColor: transparent
    textColor: '#1a1c20'
    rounded: 9999px
    padding: 4px 8px
    height: 25px
    typography: 14px / 500 / 16.8px
    hover: 'bg #f3f4f5'
    pressed: 'bg #f3f4f5'
    states: 'rest, hover and pressed sampled (2026-07-11): hover and pressed both fill #f3f4f5, matching the flag button; keyboard focus not recorded'
    use: (unused — reference-specific) Location chip inside the search pill (area and radius, Manhattan · 30mi on 2026-09-29)
  search-field:
    type: input
    backgroundColor: '#ffffff'
    textColor: '#2a3038'
    rounded: 9999px
    height: 60px
    typography: 18px / 400 / 20px
    shadow: 'rgba(0, 0, 0, 0.05) 0px 5px 10px 0px, rgba(0, 0, 0, 0.07) 0px 15px 25px 0px, #1a1c20 0px 0px 0px 2px'
    hover: 'ring 0 0 0 2px #1a1c20 (unchanged)'
    pressed: 'ring 0 0 0 2px #e14d00 (mouse-down focuses the field)'
    focus: 'ring 0 0 0 2px #e14d00'
    states: rest, hover, pressed and keyboard focus-visible measured 2026-09-29 with :hover, :active and :focus-visible matched; bg, radius, height and shadow belong to the 60px wrapper that carries the ring, fg and font to the input, whose values the 2026-07-11 capture records identically; hover changes nothing; pressed is the mouse-focus ring, not a separate :active style; the input itself keeps outline none
    use: '(unused — reference-specific) karrotmarket.com search pill: a combobox input inside a ring-bearing wrapper'
  listing-card:
    type: card
    backgroundColor: transparent
    textColor: '#2a3038'
    rounded: 0px
    size: 187px x 255px
    typography: 16px / 700
    hover: image scale(1.05)
    pressed: image scale(1.05)
    states: 'hover and pressed measured 2026-09-29 with :hover and :active matched: the inner image scales to 1.05 and nothing else moves or recolours; keyboard focus shows only the browser default ring (outline auto), so no focus value is declared; fg and font are the title label, not the anchor (#2a3038 14px / 400); the 2026-07-11 capture holds 60 list items of the same 187 x 255 size'
    use: Day card (하루 카드) — one day of photos and spending (reference: karrotmarket.com listing card link in the home feed, web only)
  footer-link:
    type: button
    backgroundColor: transparent
    textColor: '#555d6d'
    height: 24px
    typography: 16px / 400
    hover: 'underline #555d6d'
    pressed: 'underline #555d6d'
    states: 'hover and pressed measured 2026-09-29 with :hover and :active matched (the Accept-only consent panel covering the link was hidden for the pointer pass): an underline appears; keyboard focus shows only the browser default ring (outline auto), so no focus value is declared; fg and font are the visible label, not the anchor (#2a3038 14px / 400)'
    use: Landing page footer text link (reference: karrotmarket.com footer, About Karrot)
  category-link:
    type: button
    backgroundColor: transparent
    textColor: '#1a1c20'
    height: 17px
    typography: 16px / 500
    hover: 'overlay (label span) #eeeff1 opacity 0→0.32; fg #1a1c20 unchanged'
    pressed: 'overlay (label span) #eeeff1 opacity 0→0.48; fg #1a1c20 unchanged'
    states: 'hover and pressed measured 2026-09-29 with :hover and :active matched: a #eeeff1 ::before overlay on the label span (99.4 x 48px) goes from opacity 0 to 0.32 on hover and 0.48 on pressed while the label stays #1a1c20, the About us overlay mechanism at higher opacities; the same on a second load and on the sibling Electronics & Appliances (corrected 2026-09-29: earlier text said no visible change, from a read that compared pseudo-elements on the anchor only); keyboard focus shows only the browser default ring (outline auto), so no focus value is declared; fg and font are the visible label, not the anchor (#2a3038 14px / 400)'
    use: (unused — reference-specific) karrotmarket.com category link in the home feed (Furniture and siblings)
  search-keyword-link:
    type: button
    backgroundColor: transparent
    textColor: '#1a1c20'
    height: 18px
    typography: 16px / 400 / 24px
    states: rest identical across the captured keyword links (2026-07-11, captures 8 to 39 checked); no pointer-state or focus sample, so none is declared
    use: (unused — reference-specific) Keyword text links listed under the search pill (ikea and siblings)
fonts:
  roles:
    sans: Pretendard
---

# Design System of 콩알가계부 (Kongal Gagyebu)

## Overview

### Visual Theme & Atmosphere

콩알가계부 (Kongal Gagyebu) is a shared household ledger for couples who live together: upload a card-app screenshot or a receipt, and the spending is sorted into "our day" (둘의 하루), with that day's photos beside it. The design keeps the record of the day dominant through one warm orange accent, calm neutrals, plain language, and light interface chrome — like a kind housemate (살림 메이트) who quietly finishes the tedious sorting and then steps back. Two related but non-identical orange values are kept from the reference: the in-app Primary is accent-500 (`#ff6f0f`), and the landing-page CTA renders as `#ff6600`. Keeping those values separate preserves the reference's measured truth.

The visual tokens are inherited from the Karrot (당근) SEED v2 design system, which remains the canonical source for colors, type roles, and component behavior. The measured web controls in Components come from karrotmarket.com captures (an English-language surface, 2026-07-11 and 2026-09-29); they are kept as evidence and either re-scoped to our landing page and day card or marked unused. Warm neutrals, direct hierarchy, and restrained ornament keep the couple's days — dates, places, amounts, photos — in front.

**Key Characteristics:**
- In-app Primary (accent-500): `#ff6f0f`; landing CTA: `#ff6600`
- `Pretendard` as the first family, substituted from the reference's system-first stack for consistent Korean rendering across OSes
- Semantic roles inherited from SEED's open-source `global.css`
- Components documented as behavior/state contracts, with landing geometry kept surface-specific

### Primary tasks

- Upload several card-app screenshots or receipts at once and let dates, shops, and amounts be sorted automatically
- Move the few exceptions from 공용 (shared) to 내 용돈 (my allowance)
- Flip through the calendar and look back at a day card (하루 카드) of photos and spending
- Close the month with an automatic settlement of who returns how much to whom
- Leave a monthly comment and fill a savings goal together

### Principles

1. **Orange is scarce, on purpose.** accent-500 (`#ff6f0f`; `#ff6600` on the landing page) appears only on the primary CTA, active states, and a small set of brand moments. The voice is subtle and unhurried — it sits beside the couple instead of pushing them — so the accent marks only the one action that matters. It never decorates, never fills a hero background, never tints a shadow. *UI implication:* at most one orange element per viewport in the primary flow; if a design has two orange CTAs competing on one screen, one must demote to neutral-weak.
2. **One plain typeface, because the day is the content.** No display face. Pretendard everywhere, with the system sans as fallback. The couple's days — dates, places, amounts, photos — *are* the product; the UI's job is to step back behind them. Pretendard replaces the reference's system-first stack only so Korean renders the same on every OS in a responsive web app. *UI implication:* never add a second branded webfont. If a heading needs weight, use weight 700, not a display face.
3. **Facts are surfaced, always.** The voice leads with facts and leaves the feeling to the two people. Every day card, upload result, and settlement shows the date, place, and amount. *UI implication:* every card or row that represents spending must show `{date} · {place} {amount}` as visible metadata, with amounts exact to the won (`38,000원`) — never rounded, never hidden in a detail screen.
4. **Calm comes from plainness, not from badges.** No streaks, no badges, no red "N days missing" banners. The brand never scolds, never scares, and never compares the two people. *UI implication:* reminders and backlog notices live in body-weight neutral text; reserve red and warning iconography for actual errors (a screenshot that could not be read), not for overdue records or high spending.
5. **Everything on the 4px grid.** The Seed Design system snaps all measurements to multiples of 4px. Off-grid values accrete into visual noise. *UI implication:* any padding, gap, or component height not in `{4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64}` must be justified in a comment or corrected.
6. **One accent. One system. One rhythm.** No secondary brand hue exists. No "Kongal Blue" for utility, no "Kongal Green" for success-branded promo. Semantic colors (`fg-critical`, `fg-informative`, `fg-positive`) exist — but they are utility, not brand. *UI implication:* if a design introduces a second brand-scale color, it has drifted off-system; reject or re-scope to semantic.
7. **Dark mode is a remap, not an inversion.** Semantic tokens point to different palette entries in dark mode; brand solid, critical, and informative are intentionally re-tuned rather than auto-computed. *UI implication:* never rely on `filter: invert()` or runtime HSL math. Every component reads from semantic tokens that already account for theme.
8. **Content-dense, chrome-light.** Couples upload a week or a month at once and then scan many entries in one sitting — a spending row is closer to an SMS than to a Pinterest tile. *UI implication:* target 3–4 day cards or entries visible per mobile viewport; chrome (borders, shadows, decorative space) must not push that below 3.

### Usage Boundaries

| Element | Use for | Never use for |
|---|---|---|
| accent-500 (`#ff6f0f`) | One primary action per screen; selected state | Background fills, body text, decoration, shadow tints |
| marketing (`#ff6600`) | Landing / intro page CTA only | Any in-app screen |
| brand-tint (`#fff5f0`) | Brief highlight of an entry that was just sorted or moved | Large background areas, default card fill |
| error (`#fa2314`) | Actual errors (a screenshot that could not be read, a failed upload) | Backlog notices, reminders, spending warnings |
| success (`#1aa174`) | Settlement and goal-reached confirmations | Routine save feedback, decoration |
| H1–H3 (48 / 42 / 34px) | Landing / intro page headings | In-app screens (in-app headings stop at Title 24px) |

## Colors

### Product semantics (inherited from SEED v2)
- **Primary — Kongal Orange** (`#ff6f0f`): accent-500 (SEED `--seed-semantic-color-primary`). The one warm accent in a neutral room; see Principle 1.
- **Primary Hover / Pressed** (`#ff9e66`): current light-theme state mapping.
- **Canvas** (`#ffffff`): gray-00 and `paper-default`.
- **Background** (`#f2f3f6`): gray-100 and `paper-background`.
- **Surface** (`#f7f8fa`): gray-50 and `paper-contents`.
- **Foreground** (`#212124`): gray-900 and `ink-text`.
- **Muted** (`#868b94`): gray-600 and `ink-text-low`.
- **Hairline** (`#eaebee`): gray-200 and `divider-2`.
- **Brand Tint** (`#fff5f0`): accent-50 and `paper-accent`.
- **Danger** (`#fa2314`): red-600.
- **Accent / Info** (`#009ceb`): blue-500.
- **Success** (`#1aa174`): green-500.

### Landing page exception
- **Landing CTA** (`#ff6600`): measured on the reference's public marketing pages; used only on our landing / intro page. Do not label it accent-500 or substitute it for the in-app Primary.
- **Marketing focus ring** (`#e14d00`): outer ring of the keyboard focus on the header pills (`0 0 0 2px #ffffff, 0 0 0 4px #e14d00`) and the 2px focus ring of the search pill, measured 2026-09-29. It is neither the in-app Primary nor the landing CTA orange.

## Typography

### Font Family
- **Primary family**: `Pretendard`, stack `Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR", sans-serif`. License: SIL Open Font License 1.1.
- **Substitution note**: the reference's computed first family was `System` (`-apple-system` across 420 visible elements), with `Pretendard Variable` declared only as a fallback. Replaced with Pretendard for Korean coverage: a system-first stack renders Korean differently on Windows and Android in a responsive web app. Pretendard was already in the reference stack and keeps the same neutral system-sans personality. Sizes, weights, line heights and tracking are unchanged.
- **Monospace**: no canonical UI monospace claim; do not invent one.

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| H1 | Pretendard | 48px | 700 | 135% | 0 | SEED semantic h1 |
| H2 | Pretendard | 42px | 700 | 135% | 0 | SEED semantic h2 |
| H3 | Pretendard | 34px | 700 | 135% | 0 | SEED semantic h3 |
| Title 1 Bold | Pretendard | 24px | 700 | 135% | 0 | Section or chapter title |
| Body L1 | Pretendard | 16px | 400 | 150% | -0.02em on web | Long-form body |
| Body L2 | Pretendard | 14px | 400 | 150% | -0.02em on web | Compact body |

### Principles
- Official SEED exposes regular and bold semantic weights; do not infer a broad custom weight scale.
- Web tracking differs by role: headings remain neutral while body roles use narrow tracking.
- The previous 26px maximum was an old snapshot and is no longer canonical.

| Evidence class | Reference (Karrot SEED) status |
|---|---|
| **Official product-use** | SEED v2 defines product typography roles around platform/system families rather than a branded display face |
| **Live surface-use** | `-apple-system` was the visible first family across the inspected Karrot marketing surfaces |
| **Official distributed asset** | SEED design tokens and components are published openly; no separate public Karrot typeface asset is asserted |
| **Declared-only** | Pretendard Variable appeared in public stacks and FontFace declarations without visible first-family use in this capture |
| **Unresolved** | Exact native-app runtime family resolution outside the published SEED semantic roles |

### Values kept in prose

Measured values the DESIGN.md token grammar cannot carry, kept verbatim:

- `typography.h1.lineHeight`: `135%`
- `typography.h2.lineHeight`: `135%`
- `typography.h3.lineHeight`: `135%`
- `typography.title.lineHeight`: `135%`
- `typography.body.lineHeight`: `150%`
- `typography.body-small.lineHeight`: `150%`

## Layout

### Spacing System
- Base unit: 4px
- Observed public-web clusters: 4px, 8px, 12px, 16px, and 64px
- Treat larger marketing gaps as surface composition, not universal product tokens

### Grid & Container
- Marketing pages use responsive full-width sections and a centered content column.
- SEED components define their own layout constraints; for example, Box Button keeps a 16px mobile edge inset.

### Whitespace Philosophy
- Keep content dominant and chrome quiet.
- Use the observed 4/8/12/16 rhythm locally; do not extrapolate undocumented marketplace grid rules from the marketing site.

### Border Radius Scale
- Small: 6px, observed on a public CTA.
- Medium: 8px, observed on a public CTA.
- Full: 9999px, dominant public-web button geometry.
- Component-specific radii from SEED must be taken from that component's current style page, not inferred from this marketing scale.

### Responsive Behavior

#### Observed and documented behavior
- Public marketing controls render as compact 36px pills in the header and larger 40–48px CTAs deeper in the page.
- SEED Box Button documents five sizes and requires a 16px mobile edge inset.
- SEED Tabs supports `hug` and `fill`; fill is limited to five stable top-level items, while hug is recommended for six or more or variable categories.
- Text Field labels and descriptions may wrap; the input value itself remains one line and clips horizontally.

## Elevation & Depth

The header controls on karrotmarket.com are flat at rest (`box-shadow: none`). Two measured exceptions are component-local: the search pill wrapper (two soft shadows plus a 2px ring, 2026-09-29) and the flag menu popover (an inset hairline plus two soft shadows, 2026-07-11). Keyboard focus on the header pills is also drawn with box-shadow. No universal shadow tokens are published in the canonical frontmatter until current component-style sources are captured claim by claim.

## Motion & Easing

**Durations** (named, not raw milliseconds):

| Token | Value | Use |
|---|---|---|
| `motion-instant` | 0ms | Toggle flips, checkbox state changes |
| `motion-fast` | 150ms | Hover, focus, button press overlays, inline flash success |
| `motion-standard` | 250ms | The default — card taps, tab switches, bottom-sheet reveals |
| `motion-slow` | 350ms | Emphasized transitions — full-sheet presentations, success screens |
| `motion-page` | 300ms | Native-style push/pop between routes |

Measured on the web (2026-09-29): the karrotmarket.com header pills transition `background-color, box-shadow, border-color, color, transform` over 0.2s with `cubic-bezier(0.4, 0, 0.2, 1)`.

**Easings:**

| Token | Curve | Use |
|---|---|---|
| `ease-enter` | `cubic-bezier(0.0, 0.0, 0.2, 1)` | Sheets, toasts, screen pushes appearing |
| `ease-exit` | `cubic-bezier(0.4, 0.0, 1, 1)` | Dismissals, pops, toast auto-close |
| `ease-standard` | `cubic-bezier(0.4, 0.0, 0.2, 1)` | Two-way transitions — expandable cards, tab content |

**Spring stance.** **Spring and overshoot easings are forbidden across 콩알가계부 surfaces.** The voice is unhurried and plain — it states what was done and saves its enthusiasm. Two people's shared money lives in this app — a button that wobbles on press reads as toy-like, and a success card that springs in reads as celebratory in a way 콩알가계부 deliberately isn't (a reached goal gets one line, not a party). The one licensed exception is the native-platform pull-to-refresh indicator, which inherits the OS's default spring because overriding it would feel *more* jarring than accepting it. Every other motion uses `ease-enter`, `ease-exit`, or `ease-standard`.

**Signature motions.**

1. **Day-card tap.** Card compresses to 98% scale on press (`motion-fast / ease-standard`), releases on tap-up before navigation begins. Feedback is immediate; the route transition follows on `motion-page / ease-enter`. On the reference's measured web card (karrotmarket.com) no press compression was observed: pressed only keeps the hover image zoom (scale 1.05, 2026-09-29).
2. **Bottom-sheet presentation.** Sheets rise from `y+40px` with `motion-standard / ease-enter` and a synchronized backdrop fade from `rgba(0,0,0,0)` to `rgba(0,0,0,0.5)` (`bg-overlay-muted`). Dismissal uses `motion-fast / ease-exit` — leaving is lighter than entering.
3. **Space switch.** When the user switches between 공용 (shared), 내 용돈 (my allowance), and 내 자산 (my assets), the list cross-fades over `motion-slow` rather than sliding — sliding would imply an order or hierarchy between the three spaces, which they don't have.
4. **Reduce motion.** Under `prefers-reduced-motion: reduce`, all `motion-*` tokens collapse to `motion-instant`. No exceptions. Cross-fades replace slides. Pull-to-refresh indicator simplifies to a static spinner. The app stays fully usable; just less kinetic.

## Iconography

- **Library:** Phosphor (`@phosphor-icons/react`), MIT license. Recorded in frontmatter `runtime_deps.icons`.
- **Weights:** `regular` by default; `fill` only for the selected state (active tab, chosen space). Rounded joins suit the kind, easygoing voice.
- **Style values:** the reference publishes no icon style rule (stroke, size, corner). Use the library defaults and the 4px grid until measured; do not invent a stroke token.

<!--
Conversion note (design-brandfit, 2026-10-16)
Reference: Karrot (당근) SEED v2 design system — https://v2.seed-design.io
  token source: https://github.com/daangn/seed-design/blob/fb4459e90f84e049112395964319b163f980b821/packages/stylesheet/global.css
  measured web surfaces: https://www.karrotmarket.com/ and /about/ (2026-07-11, 2026-09-29)
- Visual tokens (color values, type scale, spacing, radius, shadows, motion durations/easings,
  component measurements, interaction-state evidence) are kept from the reference unchanged.
- Meta, naming, rationale, and copy were rewritten from docs/VOICE.md and docs/PRODUCT.md.
- Removed: Brand Narrative and Personas (covered by VOICE.md / PRODUCT.md), and the reference's
  philosophy-layer source notes (founding history, funding, user metrics — not ours).
- Font family: System → Pretendard for Korean coverage (OFL). Icons: Phosphor added; the reference had none.
- Color values unchanged by decision. The vivid orange is managed by scarcity (Principle 1,
  Usage Boundaries), not by changing the hex.
- Voice samples are unvalidated planning copy for a new service.
- Known inconsistencies are listed under Governance.
-->

---

**Verified:** 2026-10-16 (design-brandfit conversion; reference measured 2026-07-11 and 2026-09-29)
**Reference:** Karrot (당근) SEED v2 — https://v2.seed-design.io ; live surfaces https://www.karrotmarket.com/
**Visual tokens:** kept from the reference. **Meta, voice, copy:** rewritten from docs/VOICE.md.
**Conflicts unresolved:** see Governance → Known inconsistencies

## Components

### Measured Web Controls (reference)

Only the Landing CTA, Landing Secondary Pill, Day Card and landing footer link map to 콩알가계부; the rest are kept as evidence and marked unused. These controls are measured on `https://www.karrotmarket.com/`, which served an English-language surface in both captures (a US feed, Manhattan listings, on 2026-09-29). Rest values of the header pills, flag menu, location chip, search input and keyword links come from the 2026-07-11 capture. The search wrapper, the listing card and the text links, and every hover, pressed and keyboard-focus value dated 2026-09-29, come from a targeted live probe with `:hover`, `:active` and `:focus-visible` confirmed. Nothing here is measured on the Korean daangn.com service.

**Landing CTA** (reference: Primary CTA)
- Background: `#ff6600`
- Text: `#ffffff`
- Radius: 9999px
- Padding: 4px 12px
- Height: 36px
- Font: 14px / 500 / System
- Hover: a white `::before` overlay at opacity 0.08; the background stays `#ff6600`
- Pressed: the same overlay at opacity 0.12
- Focus (keyboard): box-shadow ring `0 0 0 2px #ffffff, 0 0 0 4px #e14d00`, outline none
- States: default observed on two public surfaces (2026-07-11); hover, pressed and keyboard focus measured 2026-09-29. The 2026-07-11 capture holds no state frame for this button, and its style dump records no pseudo-elements, so it could not have seen the overlay; the background colour itself never changes.
- Use: Landing / intro page primary action only

**Landing Secondary Pill** (reference: Outlined Pill, About us)
- Background: transparent
- Text: `#1a1c20`
- Border: 1px solid `rgba(26, 28, 32, 0.118)`
- Radius: 9999px
- Padding: 3px 11px
- Height: 36px
- Font: 14px / 500 / 20px
- Hover / Pressed: `#eeeff1` `::before` overlay at opacity 0.24 / 0.36 (2026-09-29)
- Focus (keyboard): the same `#ffffff` + `#e14d00` ring as the primary CTA (2026-09-29)

**Ghost Pill (Sign In)** (unused — reference-specific)
- Background: transparent
- Text: `#1a1c20`
- Radius: 9999px
- Padding: 4px 12px
- Height: 36px
- Font: 14px / 500 / 20px
- States: rest only; no state was sampled

**Flag Menu** (unused — reference-specific)
- Button: 40px circle, transparent, 1px solid `rgba(26, 28, 32, 0.118)`, `#1a1c20`; hover and pressed fill `#f3f4f5`; opens the menu
- Menu: `#ffffff`, 8px radius, 4px padding, 219 × 80px, shadow `rgba(26, 28, 32, 0.08) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.05) 0px 5px 10px 0px, rgba(0, 0, 0, 0.07) 0px 15px 25px 0px`
- Menu item: 211 × 36px, 6px radius, `#1a1c20` 14px / 400 / 20px
- Focus was not recorded for any of the three

**Search Pill** (unused — reference-specific)
- Wrapper: `#ffffff`, 9999px radius, 60px tall, shadow `rgba(0, 0, 0, 0.05) 0px 5px 10px 0px, rgba(0, 0, 0, 0.07) 0px 15px 25px 0px` plus a 2px `#1a1c20` ring
- Input: `#2a3038`, 18px / 400 / 20px
- Hover: no change. Pressed (mouse-down focuses the field) and keyboard focus: the wrapper ring turns `#e14d00`, still 2px (2026-09-29). The input keeps `outline: none`, so the indicator exists only on the wrapper.
- Location chip inside the pill: transparent, `#1a1c20` 14px / 500 / 16.8px, 25px tall, padding 4px 8px, 9999px radius; hover and pressed fill `#f3f4f5`
- Keyword links under the pill: `#1a1c20` 16px / 400 / 24px text links, rest only

**Day Card (하루 카드)** (reference: Listing Card, home feed)
- Use: one day of photos and spending; the title reads `{date} · {place} {amount}`, e.g. `3월 14일 · 성수동 파스타 38,000원`
- Transparent 187 × 255px link; title label `#2a3038` 16px / 700
- Hover and pressed: the image scales to 1.05; nothing recolours (2026-09-29)
- Focus: the browser default ring only, which is not a 콩알가계부 style and is not tokenized

**Text Links**
- Footer link (landing page; reference: About Karrot): label `#555d6d` 16px / 400; hover and pressed underline; focus shows the browser default ring only
- Category link (unused — reference-specific; reference: Furniture): label `#1a1c20` 16px / 500; hover and pressed fade in a `#eeeff1` overlay on the label span (`::before`, 99.4 × 48px) from opacity 0 to 0.32 (hover) and 0.48 (pressed), the About us overlay at higher opacities, while the label colour stays; focus shows the browser default ring only (2026-09-29)
- Both anchors compute `#2a3038` 14px / 400; the visible label is the child element, and its style is the one given here

### Core Product Components (from SEED)

**Box Button**
- States: primary, primary-low, secondary, danger, disabled, hover, keyboard
- Use: Action component with xsmall through xlarge sizes; medium is the documented default

**Text Field**
- States: outlined, underlined, focused, disabled, readonly, required, invalid
- Use: Single-line form input with label, description, error message, and optional prefix/suffix

**Tabs**
- States: selected, disabled, focus
- Use: Hug or fill category navigation with a current-selection indicator

**Snackbar**
- States: default, success, warning, action focus
- Use: Brief action feedback with at most one related action

### Published component roster (34 published, none measured here)

SEED Design publishes **34 components**, read from its own index at `https://v2.seed-design.io/component/` on
2026-09-19. Every host in this group serves a shell to a plain fetch, so the names come from the
rendered page in a browser. No value, state or geometry below is asserted by this reference.

Action Sheet, Alert Dialog, Avatar, Avatar Group, Bottom Sheet, Box Button, Box Toggle Button, Capsule Toggle Button, Text Button, Actionable Callout, Callout, Dismissable Callout, Checkbox, Chip Button, Chip Filter, Chip Radio Group, Chip Toggle Button, Extended Floating Action Button, Floating Action Button, Menu Floating Action Button, Help Bubble, Actionable Inline Alert, Dismissable Inline Alert, Inline Alert, Radio Group, Select Box, Range Slider, Slider, Snackbar, Spinner, Switch, Tabs, Multiline Text Field, Text Field

The host groups variants under a shared heading — Buttons, Callouts, Chips, FABs, Inline Alerts,
Sliders, Text Fields — and each variant above is its own documented component.

### States

| State | Treatment |
|---|---|
| **Empty (day with no records)** | One easygoing line plus one low-pressure hint; never count the missing days. Copy: `비어 있는 날이 있어요. 캡처 한 번에 여러 장 올릴 수 있어요.` Never an illustration. Never `N일째 기록이 없어요`. |
| **Empty (filter cleared)** | Single line of `gray-700` caption stating that nothing matched. No button — user resets the filter themselves. |
| **Empty (new user, first paint)** | One onboarding sentence that says there is little to set up (`캡처나 영수증을 올리면 날짜·가게·금액을 정리해 둘게요. 지난 내역은 나중에 몰아서 올려도 돼요.`), plus one primary CTA in Kongal Orange. No onboarding carousel. |
| **Loading (first paint)** | Skeleton blocks at `gray-200` matching the final day-card layout — 1:1 thumbnail box, two text lines, one metadata line. Shimmer at 1.2s with 8% white highlight. |
| **Loading (infinite scroll)** | Bottom-of-list spinner in Kongal Orange, 24px diameter. No overlay. Existing cards stay visible. |
| **Loading (refresh / pull-to-refresh)** | Pull-down reveals a progress indicator in Kongal Orange (the reference used a carrot glyph; no 콩알가계부 glyph is defined yet). |
| **Error (inline field)** | Input border becomes `#fa342c` (red-700) 2px, helper text below in red-700 13px. Say what failed, why, and what to do (`이 캡처는 금액을 읽지 못했어요. 글자가 흐리거나 잘렸을 수 있어요. 내역이 한 화면에 다 보이게 다시 캡처해서 올려주세요.`). |
| **Error (toast)** | `#1a1c20` (gray-1000) background, white 14px weight 400 text, 3s auto-dismiss. Bottom of screen with 16px inset above the tab bar. One sentence. No icon. |
| **Error (network / server-blocking)** | Full-screen centered message in `gray-1000` 16px weight 600, `gray-800` 14px weight 400 subline, retry button in Kongal Orange. No illustration. |
| **Success (inline flash)** | Brief 300ms flash of `#fff2ec` (accent-100) behind the updated element, fading back to default. For routine confirmations (an entry moved to 내 용돈, an upload sorted). |
| **Success (upload sorted)** | One factual summary in numbers, handing back only one task: `캡처 4장에서 12건 정리했어요. 전부 공용에 넣었고, 같은 결제 1건은 뺐어요. 용돈으로 옮길 건 눌러서 옮겨주세요.` |
| **Success (settlement / goal reached)** | Dedicated confirmation screen — not a toast. `#079171` (positive green) check icon top-center and one line: `공용통장이 지민에게 127,400원 돌려주면 이번 달 끝이에요.` or `목표 달성. 둘이 3개월 동안 모은 돈이에요.` At most one exclamation mark; no celebration animation. |
| **Skeleton** | `gray-200` blocks at exact final dimensions matching the day-card layout (1:1 thumbnail, two text lines, one metadata line). Shimmer 1.2s with 8% white highlight. Never over the date · place · amount metadata — that slot stays blank until resolved, so the UI never implies an amount that hasn't been read. |
| **Disabled** | Button background drops to `gray-200`, text to `gray-500`. No color inversion. Geometry stays identical so re-enable is frame-stable. |

#### Measured interaction states — karrotmarket.com (reference evidence)

| Control | Hover | Pressed | Keyboard focus | Evidence |
|---|---|---|---|---|
| Landing CTA (ref: Sell pill) | `#ffffff` overlay 0.08 | overlay 0.12 | `#ffffff` 2px + `#e14d00` ring | 2026-09-29 probe |
| Landing secondary (ref: About us pill) | `#eeeff1` overlay 0.24 | overlay 0.36 | same ring | 2026-09-29 probe |
| Search pill (unused) | no change | wrapper ring `#e14d00` (mouse focus) | wrapper ring `#e14d00` | 2026-09-29 probe |
| Day card (ref: listing card) | image scale 1.05 | image scale 1.05 | browser default only | 2026-09-29 probe |
| Footer link (landing) | underline | underline | browser default only | 2026-09-29 probe |
| Category link (unused) | `#eeeff1` overlay 0.32 (label span) | overlay 0.48 | browser default only | 2026-09-29 probe |
| Flag button, location chip (unused) | fill `#f3f4f5` | fill `#f3f4f5` | not recorded | 2026-07-11 capture |

## Do's and Don'ts

### Do
- Use accent-500 `#ff6f0f` for in-app product work.
- Use Pretendard with the documented fallback stack.
- Follow each component's documented states and accessibility behavior (source: SEED).
- Keep `#ff6600` explicitly scoped to the landing / intro page.
- Show `{date} · {place} {amount}` on every spending card or row, amounts exact to the won.

### Don't
- Don't relabel `#ff6600` as accent-500.
- Don't fall back to a system-first stack for Korean UI; it renders differently across OSes.
- Don't reuse the retired 26px maximum; current heading roles reach 48px.
- Don't turn the measured web day card into native-app cards or sheets; native-app geometry remains unmeasured.
- Don't read the browser's default focus ring on the day card, footer link and category link as a 콩알가계부 focus style; those controls have no authored focus style.
- Don't use red or warning iconography for backlog, reminders, or high spending.

## Voice & Tone

콩알가계부 speaks like a kind housemate (살림 메이트) who has already finished the tedious sorting and now lays out the day in dates, places, and amounts. Four traits stay fixed — kind (다정한), light (가벼운), memory-keeping (추억을 아끼는), easygoing (느긋한) — and the tone scales by context. Sentences end in the soft polite `~해요`; never `~합니다` or `~하십시오`. Full guide: `docs/VOICE.md`.

| Context | Tone |
|---|---|
| Onboarding | Slightly warmer; say first that there is little to set up (`캡처나 영수증을 올리면 날짜·가게·금액을 정리해 둘게요. 지난 내역은 나중에 몰아서 올려도 돼요.`) |
| Empty states | More easygoing; never surface the backlog (`비어 있는 날이 있어요. 캡처 한 번에 여러 장 올릴 수 있어요.`) |
| Upload sorted | Facts in numbers; hand back only one task (`캡처 4장에서 12건 정리했어요. 전부 공용에 넣었고, 같은 결제 1건은 뺐어요. 용돈으로 옮길 건 눌러서 옮겨주세요.`) |
| Day card | Rich in facts, not in feelings (`3월 14일 · 성수동 파스타 38,000원. 이날 사진 3장이 있어요.`) |
| Month-end settlement | Precision over lightness; spell out who returns how much to whom and take no side (`공용통장이 지민에게 127,400원 돌려주면 이번 달 끝이에요.`) |
| Goal reached | One line; amount, period, the two of them (`목표 달성. 둘이 3개월 동안 모은 돈이에요.`) |
| Errors | Warmer and explanatory: what failed, why, what to do (`이 캡처는 금액을 읽지 못했어요. 글자가 흐리거나 잘렸을 수 있어요. 내역이 한 화면에 다 보이게 다시 캡처해서 올려주세요.`) |
| Push notifications | Shortest and most easygoing; a request, once a day (`오늘 거 올려볼까요? 캡처 한 장이면 돼요.`) |
| Landing page | Light and short (`캡처나 영수증만 올리면 둘의 하루로 정리돼요.`) |

**CTAs.** Suggest, don't command: request forms (`올려볼까요?`) and single-action guidance (`눌러서 옮겨주세요`). No `지금 바로`, `반드시`, or `~하세요`.

**Forbidden phrases.**
- Mocking money: `텅장`, `거지`, `망했다`, `탕진`
- Over-sweet couple talk: `자기야`, `우리 사랑`, `달달한`
- Sentimental diary: `소중한 순간`, `그날의 햇살`, `기억해요…`
- Comparing the two: `OO님이 더 많이`, `OO님이 N번 결제했어요`
- Assigning feelings: `고마워해야겠어요`, `칭찬해 주세요`
- Scolding or scaring: `혼나요`, `벌금`, `반성`, `안 하면 ~해져요`, `사라져요`
- Surfacing the backlog: `N일째 기록이 없어요`, `밀린 내역`
- Commands: `지금 바로`, `반드시`, `~하세요`
- Banking stiffness: `Balance`, `Budget`, `Bills`, `잔고 현황`, `처리되었습니다`, `완료되었습니다`
- Blurry amounts: `약 4만 원`, `대략`

**Emoji and punctuation.** Almost none. Only for food or place on a day card, at most one per string; emotional emoji (`💕`, `🙈`, `💸`) are forbidden. Exclamation marks only on goal reached, at most one. Amounts always exact with commas (`38,000원`). Names as the user set them (`지민`), without `님`; the two together are `둘이`.

**Voice samples.** Unvalidated planning copy for a new service (source: docs/VOICE.md).

- `캡처나 영수증만 올리면 둘의 하루로 정리돼요.` — landing
- `오늘 거 올려볼까요? 캡처 한 장이면 돼요.` — push
- `캡처 4장에서 12건 정리했어요. 전부 공용에 넣었고, 같은 결제 1건은 뺐어요.` — upload sorted
- `3월 14일 · 성수동 파스타 38,000원. 이날 사진 3장이 있어요.` — day card
- `공용통장이 지민에게 127,400원 돌려주면 이번 달 끝이에요.` — settlement
- `목표 달성. 둘이 3개월 동안 모은 돈이에요.` — goal reached

## Agent Prompt Guide

### Quick Color Reference
- Product Primary (accent-500): `#ff6f0f`
- Product Hover / Pressed: `#ff9e66`
- Landing CTA only: `#ff6600`
- Canvas: `#ffffff`; Background: `#f2f3f6`; Surface: `#f7f8fa`
- Foreground: `#212124`; Muted: `#868b94`; Hairline: `#eaebee`
- Danger: `#fa2314`; Accent: `#009ceb`; Success: `#1aa174`

### Example Component Prompts
- "Build the in-app primary action using accent-500 `#ff6f0f`; use the Box Button's documented size and state contract rather than inventing geometry."
- "Build the landing page CTA with `#ff6600`, white text, 14px/500 Pretendard, 36px height, and full-pill radius."
- "Create a text field with outlined and underlined variants, explicit label, error message, focused, readonly, required, invalid, and disabled states."
- "Build a day card (하루 카드) whose title reads `{date} · {place} {amount}` and whose image scales to 1.05 on hover; Phosphor icons at regular weight, fill for selected."

### Iteration Guide
1. Choose the target surface first: in-app product or landing page.
2. Keep `#ff6f0f` and `#ff6600` distinct.
3. Use Pretendard with the documented fallback stack.
4. Use only the 4/8/12/16/64 spacing observations as canonical shared values.
5. Source component behavior from the current SEED page for that component.

---

## Governance

### Known Gaps

- **Contrast, `marketing-primary`.** Text `#ffffff` on `#ff6600` measures 2.94:1, below the WCAG AA 4.5:1 minimum for normal-size text. Recorded as measured, not adjusted.
- **Contrast, `box-button`.** Text `#ffffff` on `#ff6f0f` measures 2.79:1, below the WCAG AA 4.5:1 minimum for normal-size text. Recorded as measured, not adjusted.
- **Contrast, `marketing-secondary`.** Text `#1a1c20` on `#00000000` measures 1.23:1, below the WCAG AA 4.5:1 minimum for normal-size text. Recorded as measured, not adjusted.
- **Contrast, `marketing-ghost`.** Text `#1a1c20` on `#00000000` measures 1.23:1, below the WCAG AA 4.5:1 minimum for normal-size text. Recorded as measured, not adjusted.
- **Contrast, `flag-menu-button`.** Text `#1a1c20` on `#00000000` measures 1.23:1, below the WCAG AA 4.5:1 minimum for normal-size text. Recorded as measured, not adjusted.
- **Contrast, `flag-menu-item`.** Text `#1a1c20` on `#00000000` measures 1.23:1, below the WCAG AA 4.5:1 minimum for normal-size text. Recorded as measured, not adjusted.
- **Contrast, `location-chip`.** Text `#1a1c20` on `#00000000` measures 1.23:1, below the WCAG AA 4.5:1 minimum for normal-size text. Recorded as measured, not adjusted.
- **Contrast, `listing-card`.** Text `#2a3038` on `#00000000` measures 1.58:1, below the WCAG AA 4.5:1 minimum for normal-size text. Recorded as measured, not adjusted.
- **Contrast, `footer-link`.** Text `#555d6d` on `#00000000` measures 3.17:1, below the WCAG AA 4.5:1 minimum for normal-size text. Recorded as measured, not adjusted.
- **Contrast, `category-link`.** Text `#1a1c20` on `#00000000` measures 1.23:1, below the WCAG AA 4.5:1 minimum for normal-size text. Recorded as measured, not adjusted.
- **Contrast, `search-keyword-link`.** Text `#1a1c20` on `#00000000` measures 1.23:1, below the WCAG AA 4.5:1 minimum for normal-size text. Recorded as measured, not adjusted.

### Known inconsistencies

- The States table cites `#fa342c` (red-700) for inline errors and `#079171` for success, while the tokens declare error `#fa2314` and success `#1aa174`. Tokens win; the values were not changed in this conversion.
- The States table also cites `#fff2ec` (accent-100), `#1a1c20` (gray-1000) and `gray-*` steps that are not in the frontmatter tokens.
- The contrast entries above for transparent-background controls are measured against `#00000000`, not the real canvas, so the 1.23:1 figures understate on-canvas contrast.
- White text on accent-500 (2.79:1) and on `#ff6600` (2.94:1) is below WCAG AA for normal text. Color values are kept by decision; revisit separately if accessibility requires it.
