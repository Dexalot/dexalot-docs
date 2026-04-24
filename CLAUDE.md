# CLAUDE.md

Guidance for Claude Code working in this repository.

## What this repo is

A **documentation site**, not application code. It publishes [docs.dexalot.com](https://docs.dexalot.com) using [VuePress 2](https://vuepress.vuejs.org/) with `vuepress-theme-hope` and the Vite bundler. Content is Markdown; the only TypeScript lives under `docs/.vuepress/` (config, navbar, sidebar).

Default assumption for any task: the user wants a **Markdown content change**, not a build-system change.

## Toolchain (do not substitute)

- Node **22.11.0** (pinned in `engines`)
- **pnpm** (declared in `packageManager`) — never run `npm` or `yarn` here
- Scripts that matter:
  - `pnpm docs:dev` — local dev server
  - `pnpm docs:clean-dev` — dev server with cleared cache (use when hot reload misbehaves)
  - `pnpm docs:build:local:prod` — production build for local verification
  - `pnpm docs:build:amplify` — the command AWS Amplify runs in CI
  - `pnpm clean` — wipe `.cache`, `.temp`, `dist`
  - `pnpm pretty-md-check` / `pnpm pretty-md-fix` — markdown prettier
  - `pnpm lint-ts-check` / `pnpm lint-ts-fix` — eslint on `docs/.vuepress/**/*.ts`

There is **no `.eslintrc`** in the repo — ESLint runs with defaults. Do not create one unless asked.

## Repo layout

```
docs/
  README.md                  Home page (frontmatter-driven hero layout)
  .vuepress/
    config.ts                Site config + 5 locales (en, es, tr, vi, zh)
    theme.ts                 Theme-hope config (search, sitemap, seo, markdownMath)
    options.ts               sitemap + NODE_ENV
    navbar/   sidebar/       Per-locale nav (index.ts re-exports each)
    public/images/           Images referenced from Markdown as `/images/...`
    public/logos/            Brand assets
    styles/config.scss       Theme variable overrides
  en/  es/  tr/  vi/  zh/    Localized Markdown. Only `en` has the full set.
    articles/                Conceptual content (abs, cup, dip, omnivaults, subnet, ...)
    tutorials/               Step-by-step guides (howtouse, howtotest, runanode, ...)
    contracts/               Smart-contract reference (en only)
    apiv2/                   Trading API reference (en only)
    legal/                   License, Privacy, T&C (en only)
```

`pagePatterns` in [docs/.vuepress/config.ts](docs/.vuepress/config.ts) includes every `**/*.md` and excludes `**/*.snippet.md`. Use the `.snippet.md` suffix for partials that should not become their own page.

## Conventions for content changes

- **Images** live in `docs/.vuepress/public/images/<section>/` and are referenced as `/images/<section>/foo.png` from Markdown. Put originals/high-res sources in `attic/` (git-ignored), not in `public/`.
- **Links between pages** are relative to the current locale tree — e.g. from `docs/en/articles/foo.md`, link to `../tutorials/bar.md`, not `/en/tutorials/bar`.
- **Navbar and sidebar are not auto-generated.** If you add a new top-level page or section, update [docs/.vuepress/navbar/](docs/.vuepress/navbar/) and [docs/.vuepress/sidebar/](docs/.vuepress/sidebar/) for every locale you're shipping to. `common.ts` in `navbar/` holds entries shared across locales.
- **Localization:** English is authoritative. Mirror structural changes (new file, rename, moved image) across `es/`, `tr/`, `vi/`, `zh/` — if a translation isn't ready, still create the file so the nav doesn't 404. Do **not** invent translations; leave a clearly-marked placeholder or skip the sidebar entry.
- **Frontmatter** on the home pages (e.g. [docs/README.md](docs/README.md)) drives the hero layout — don't strip it.
- **Math** uses `@vuepress/plugin-markdown-math`; write LaTeX inside `$...$` or `$$...$$`.
- **Video embeds** use the `VidStack` component, registered globally in [docs/.vuepress/theme.ts](docs/.vuepress/theme.ts).

## Style

- Prettier: `printWidth: 120`, `semi: true`, **`endOfLine: "crlf"`** (see [.prettierrc](.prettierrc)). Respect CRLF when editing — some tools and the `core.autocrlf` guidance depend on it.
- markdownlint: see [.markdownlint.json](.markdownlint.json) (line length disabled; hard tabs forbidden; duplicate headers allowed).
- Spell check: cspell runs via VS Code; the project dictionary is [.vscode/dictionaries/project-terms-en.txt](.vscode/dictionaries/project-terms-en.txt). Add new proper nouns / tickers / product names there rather than suppressing warnings inline. Error codes matching `/[A-Z]{1,2}-[A-Z]{4}-[0-9]{2}/` are already ignored.

## Verifying changes

Before handing back a content change, at minimum:

1. `pnpm pretty-md-check` on affected files (or `--write` after reviewing).
2. Spot-check in `pnpm docs:dev` — confirm the page renders, images load, internal links resolve, nav/sidebar show the entry where expected.
3. For structural or config changes, also run `pnpm docs:build:local:prod` — production builds are stricter (sitemap + SEO enabled) and catch errors that dev mode swallows.

For type/config changes under `docs/.vuepress/`, run `pnpm lint-ts-check`.

## Things to avoid

- Don't switch package managers, bundlers, or the theme.
- Don't introduce emoji into content unless the user asks — existing hero pages do use them, keep that style, but don't sprinkle them elsewhere.
- Don't create new top-level folders next to `docs/`. Drafts and reference material go under the ignored `attic/`.
- Don't run destructive git operations; the default branch is `dev` (PRs merge to `main`) and images/large assets have been reduced intentionally — check `git log` before re-adding high-res files.

## License

Content and code are BUSL-1.1 licensed — see [LICENSE.txt](LICENSE.txt).
