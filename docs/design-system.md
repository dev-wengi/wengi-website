# Wengi Design System v3

One vivid green, sampled from the Tablet 834 reference. Deep pine panels
and a mint tint support it. Green appears only where it means "brand / go".

## Source

Every value below was sampled from `Tablet · 834.png` (project root,
untracked reference — do not delete) except `--brand-ink`, which is the
reference link green (`#00AA25`, only 3.1:1) darkened to pass WCAG AA.

| Token | Value | Sampled from |
|---|---|---|
| `--brand` | `#05FF3C` | Headline, CTA button, chips (3 agreeing samples) |
| `--brand-hover` | `#04EB37` | Brand darkened 8% for hover fills |
| `--brand-ink` | `#007D1B` | Reference link green, darkened to 5.3:1 on white |
| `--brand-soft` | `#E8FBEA` | Tinted learning-path card |
| `--pine` | `#163520` | Deep green project-card header |
| `--pine-deep` | `#0B170E` | Dark code panel |
| `--ink` | `#060A07` | Footer, newsletter card |
| `--ink-raised` | `#111713` | Hero surface, dark card body |
| `--paper` | `#FFFFFF` | Light sections |
| `--card` | `#FFFFFF` | Light cards (always with a border) |
| `--text-on-dark` | `#FFFFFF` | Headings on dark (19.9:1) |
| `--muted-on-dark` | `#A7B1AB` | Secondary on dark (9.0:1) |
| `--text-on-light` | `#060A07` | Body on light (19.9:1) |
| `--muted-on-light` | `#57615B` | Secondary on light (6.4:1) |
| `--line-on-dark` | `rgba(255,255,255,.14)` | Borders on dark |
| `--line-on-light` | `rgba(6,10,7,.12)` | Borders on light |

Verified pairs: white text on brand fill 1.37:1 (fails WCAG —
explicit product decision, see rule 2), brand on ink 14.6:1,
brand-ink on white 5.3:1, brand-ink on mint 4.9:1.
(Check script: `/tmp/contrast_v3.py`. Sampler: `/tmp/sample_tablet.py`.)

## Usage rules

1. Never set small text in `--brand` on a light surface. Use `--brand-ink`.
2. `--brand` fills pair with white text (explicit product decision).
   Tradeoff: white on `#05FF3C` is 1.37:1 and fails WCAG — the reference
   itself uses dark text on these fills. If readability complaints come in,
   either revert to ink text or darken the fill.
3. `--pine` / `--pine-deep` are the only dark greens; no other green
   surfaces on dark backgrounds.
4. `--brand-soft` mint is for tinted light surfaces, always with ink text.
5. Neutrals carry the page; green is the signal. If everything glows,
   nothing does.
6. New code uses the primitives. Legacy `green-*` / `bg-black` /
   `footer-blue` tokens still resolve as aliases in `tokens.css` — do not
   add new usages of them.

## Where it lives

- Source of truth: `src/styles/tokens.css` (primitives + roles + legacy aliases)
- Tailwind v4 theme mirror: `src/index.css` (`@theme`)
- Tailwind v3 compat mirror: `tailwind.config.js`
- New utilities: `.bg-brand`, `.bg-brand-soft`, `.bg-ink`, `.bg-paper`,
  `.bg-pine`, `.bg-pine-deep`, `.text-brand`, `.text-brand-ink`

## Accepted literals (intentional)

- Literal near-blacks (`#0A0A0A`, `#1A1A1A`) still appear as text, borders,
  and icon strokes. They are visually identical to `--text-on-light`
  and are accepted as ink — do not churn them.
- Dead `var()` fallbacks for neutrals are stale but never render; update
  them only when touching the line anyway.
- `PathwayCard` keeps its `#F7F7F7` rest surface as an intentional card tint.
- Unused public assets (`dw-emblem.png`, `icons.svg`, `logo stacked- grey.svg`)
  are kept in place; nothing in code references them.

## Removed during rollout (2026-11-15)

Deleted as fully unreferenced: `Button`, `Card`, `Container`,
`SectionTitle`, `GlowBlob`, `GridLines`, `components/Footer`,
`ui/card`, `Mission`, plus the unimported `components/index.ts` and
`sections/index.ts` barrels. Restore from git history if any are wanted back.
