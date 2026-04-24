# Dexalot Technical Documents

Source for the Dexalot Knowledge Hub published at [docs.dexalot.com](https://docs.dexalot.com).

The site is a [VuePress 2](https://vuepress.vuejs.org/) application (Vite bundler, `vuepress-theme-hope`) containing articles, tutorials, smart-contract references, trading API docs, incentive program details, and legal documents. Content is authored in Markdown under `docs/` and localized to English, Spanish, Turkish, Vietnamese, and Chinese.

## Requirements

- Node.js **22.11.0** (pinned via `engines`; use `nvm use` or an equivalent)
- [pnpm](https://pnpm.io/) **9.13.2+** (declared in `packageManager`)

## Install

```sh
pnpm install
```

## Develop

Run a hot-reloading dev server on `http://localhost:8080`:

```sh
pnpm docs:dev
```

If the cache gets into a bad state:

```sh
pnpm docs:clean-dev   # dev server with a cold cache
pnpm clean            # remove .cache, .temp, and dist
```

## Build

```sh
pnpm docs:build:local:dev    # NODE_ENV=development (no SEO / sitemap)
pnpm docs:build:local:prod   # NODE_ENV=production
pnpm docs:build:amplify      # build target used by AWS Amplify CI
```

Output is written to `docs/.vuepress/dist`. Serve the built site locally:

```sh
pnpm docs:serve
```

## Project layout

```
docs/
  README.md              Home page (VuePress frontmatter landing layout)
  .vuepress/
    config.ts            Site-level config + locales
    theme.ts             vuepress-theme-hope configuration
    options.ts           Sitemap + NODE_ENV helpers
    navbar/              Per-locale navbar (en, es, tr, vi, zh + common)
    sidebar/             Per-locale sidebar definitions
    public/              Static assets (images, logos, favicon)
    styles/              SCSS overrides
  en/ es/ tr/ vi/ zh/    Localized Markdown trees
    articles/            Conceptual / background content
    tutorials/           Step-by-step guides
    contracts/           Smart-contract reference (en only)
    apiv2/               Trading API reference (en only)
    legal/               License, Privacy, T&C (en only)
```

Only English has the full set of sections. When adding a new page, mirror the file in every locale you intend to ship; VuePress walks every Markdown file that matches `pagePatterns` in `config.ts`.

## Linting and formatting

Configuration files:

- `.prettierrc` — prettier rules (`printWidth: 120`, CRLF line endings)
- `.prettierignore`
- `.markdownlint.json` — markdownlint rules
- `.vscode/cspell.json` + `.vscode/dictionaries/project-terms-en.txt` — spell-check dictionary

### Recommended VS Code extensions

- `DavidAnson.vscode-markdownlint`
- `esbenp.prettier-vscode`
- `streetsidesoftware.code-spell-checker`

Project-wide VS Code settings live in `.vscode/settings.json` (trim trailing whitespace, no format-on-save for TS/JS, format-on-save for Solidity).

### Useful scripts

```sh
pnpm pretty-md-check   # prettier --check **/*.md
pnpm pretty-md-fix     # prettier --write **/*.md
pnpm pretty-check      # check ts, js, md
pnpm pretty-fix        # write ts, js, md
pnpm lint-ts-check     # eslint .ts
pnpm lint-ts-fix
pnpm lint-js-check     # eslint .js
pnpm lint-js-fix
```

Check/fix a single file:

```sh
./node_modules/.bin/prettier --check docs/en/articles/abs/README.md
./node_modules/.bin/prettier --write docs/en/articles/abs/README.md
```

Always run `--check` and review diffs before `--write`.

### Spell check

cspell is not installed as a dependency — run it via the VS Code Code Spell Checker extension, or invoke it with `npx`:

```sh
npx cspell lint --show-suggestions --config .vscode/cspell.json "docs/**/*.md"
```

Add project-specific terms to `.vscode/dictionaries/project-terms-en.txt`.

## Git hygiene

```sh
git config --global core.autocrlf true
```

`.gitignore` excludes `node_modules`, `.env*` (except `.env.example`), VuePress build artifacts (`.cache`, `.temp`, `dist`), and a local `attic/` scratch directory for drafts and original-resolution images.

## License

BUSL-1.1 — see [LICENSE.txt](LICENSE.txt).
