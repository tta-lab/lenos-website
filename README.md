# lenos-website

Landing, docs, blog, and benchmarks for [lenos](https://github.com/tta-lab/lenos)
— a terminal AI runtime for the [ttal](https://github.com/tta-lab/ttal-cli) ecosystem.

Built with [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com)
+ [MDX](https://mdxjs.com). Static build, deployed to GitHub Pages at
`https://tta-lab.github.io/lenos-website/`.

## Aesthetic

**Reading Room Technical** — anti-charm.sh by inversion. Light paper-warm
surface, editorial serif (Source Serif 4) + JetBrains Mono, single rust
accent (lenos canonical brand `#c4734f`), generous whitespace, restrained
motion. Saint-Exupéry as the operating principle: *perfection is achieved
when there is nothing left to take away.*

The dark theme directly uses lenos's product palette
(`internal/ui/styles/styles.go`) so the website-product visual handoff is
seamless.

Full design rationale: flicknote `d2e87f43`.
Prototype reference: `_proto/prototype.html` (single self-contained HTML,
the design checkpoint preceding this Astro scaffold).

## Local development

Requires [Bun](https://bun.sh) 1.3+ (faster installs, faster scripts).

```bash
bun install
bun run dev          # http://localhost:4321/lenos-website/
bun run build        # → dist/
bun run preview      # serve dist/ locally
```

**Note the subpath:** `astro dev` serves under `/lenos-website/` because the
`base` config matches the GitHub Pages project path. Visit
`http://localhost:4321/lenos-website/`, not `/`.

## Project layout

```
src/
├── components/         # SiteHeader, SiteFooter, HeroEditorial,
│                         KeyDifferentiators, InstallStrip, BenchmarkTable,
│                         PhilosophyBlock
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro             # landing
│   ├── benchmarks.astro
│   ├── docs/
│   │   ├── index.astro
│   │   └── install.mdx
│   └── blog/
│       └── index.astro
├── data/
│   └── benchmarks/
│       └── tb2.json            # Terminal Bench 2.0 — placeholder data
├── lib/
│   └── benchmarks.ts           # JSON loader + formatters
└── styles/
    ├── global.css              # @import "tailwindcss" + tokens + typography + prose
    ├── tokens.css              # @theme — palette, typography scale, spatial system
    ├── typography.css          # editorial type rules, focus, skip-link
    └── prose.css               # MDX article styles (docs, blog)
```

## Adding a doc page

Create `src/pages/docs/<slug>.mdx`:

```mdx
---
layout: ../../layouts/BaseLayout.astro
title: "<Page title> — lenos"
description: "<one-sentence description>"
---
import SiteHeader from "../../components/SiteHeader.astro";
import SiteFooter from "../../components/SiteFooter.astro";

<SiteHeader current="docs" />

<main id="main" style="max-width: 64rem; margin: 0 auto; padding: 4rem 1.5rem 0;">
<article class="prose">

<p class="eyebrow">Documentation / <section></p>

# Page title

Body prose...

</article>
</main>

<SiteFooter />
```

Then add a link in `src/pages/docs/index.astro`.

## Adding a blog post

Same pattern as docs, in `src/pages/blog/<slug>.mdx`. Update
`src/pages/blog/index.astro` to list the post.

## Updating the benchmark table

Edit `src/data/benchmarks/tb2.json`. Schema:

```json
{
  "generated_at": "2026-05-06T00:00:00Z",
  "harness_version": "0.0.1-placeholder",
  "harness_repo": "https://github.com/tta-lab/terminal-bench-runs",
  "tasks_total": 80,
  "is_placeholder": true,
  "rows": [
    {
      "agent": "lenos | codex | forgecode",
      "model": "<model name>",
      "provider": "<provider name>",
      "tasks_solved": 0,
      "tokens_input": 0,
      "tokens_output": 0,
      "wall_seconds": 0,
      "cost_usd": 0.0
    }
  ]
}
```

When real harness data lands, set `is_placeholder` to `false`. The table
caption will stop announcing placeholder status automatically.

## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml` which builds and
deploys to GitHub Pages.

**One-time setup on the repo:** Settings → Pages → Build and deployment →
Source: **GitHub Actions**. Without this, the `github-pages` environment
doesn't exist and the deploy job fails.

## License

The website source is distributed under the same terms as lenos —
[FSL-1.1-MIT](LICENSE).

Lineage: lenos is a fork of [Crush](https://github.com/charmbracelet/crush)
by [Charmbracelet](https://charm.sh), originally created by
[Kujtim Hoxha](https://github.com/kujtimiihoxha). We are grateful for the
foundation.
