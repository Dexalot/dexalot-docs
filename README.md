# Dexalot Technical Documents

## Project setup

```sh
yarn install
```

### Compiles and hot-reloads for development

```sh
yarn serve
```

### Compiles and minifies for production

```sh
yarn build
```

## Setup and Configure prettier and eslint

* Make sure you run

   git config --global core.autocrlf true

* Install the VS Code plugin for Markdownlint from the URL below.

  [VS Marketplace link](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)

  ```sh
  Name: markdownlint
  Id: davidanson.vscode-markdownlint
  Publisher: David Anson
  https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
  ```

* Install the VS Code plugin for Prettier from the URL below.

  [VS Marketplace link](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

  ```sh
  Name: Prettier - Code formatter
  Id: esbenp.prettier-vscode
  Publisher: Prettier
  https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
  ```

* Install the VS Code plugin for Code Spell Checker from the URL below

  [VS Marketplace link](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

  ```sh
  Name: Code Spell Checker
  Id: streetsidesoftware.code-spell-checker
  Publisher: Street Side Software
  https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker
  ```

* VS Code settings are placed in .vscode/settings.json file and will be pulled from the git repository. It contains project specific settings such as:

  ```sh
  Files: Trim Final Newlines
  Files: Insert Final Newline
  Files: Trim Trailing Whitespace
  Editor: Trim Auto Whitespace
  ```

* Install the node.js packages: eslint, prettier and cspell.

  The individual packages are `markdownlint`, `markdownlint-cli`, `prettier`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `eslint` and `cspell`.

  These tools are already in `package.json` and they will all be installed with `yarn install`.

* Markdownlint settings can be reviewed in `.markdownlint.json`

* Prettier settings can be reviewed in `.prettierrc` and `.prettierignore`

* Eslint settings can be reviewed in `.eslintrc` and `.eslintignore`

* You can check or fix files in place markdownlint. Initially run checks and AVOID automatic fixes without reviewing the check results first.

  check an individual markdown file

  ```sh
  ./node_modules/.bin/markdownlint docs/articles/abs/README.md
  ```

  fix an individual markdown file

  ```sh
  ./node_modules/.bin/markdownlint --fix docs/articles/abs/README.md
  ```

  check all files with the .md extension

  ```sh
  ./node_modules/.bin/markdownlint **/*.md --ignore node_modules
  ```

  fix all files with a specific extension

  ```sh
  ./node_modules/.bin/markdownlint **/*.md --ignore node_modules --fix
  ```

* You can check or fix files in place for style with prettier. Initially run checks and AVOID automatic fixes without reviewing the check results first.

  check an individual markdown file

  ```sh
  ./node_modules/.bin/prettier --check docs/articles/abs/README.md
  ```

  fix an individual markdown file

  ```sh
  ./node_modules/.bin/prettier --write docs/articles/abs/README.md
  ```

  check all files with the .md extension

  ```sh
  ./node_modules/.bin/prettier --check **/*.md
  ```

  fix all files with a specific extension

  ```sh
  ./node_modules/.bin/prettier --write **/*.md
  ```

* Cspell can check spelling errors.

  check all markdown files

  ```sh
  ./node_modules/.bin/cspell lint --show-suggestions **/*.md
  ```

* Below scripts are added to package.json for convenience.

  ```sh
      lint-ts-check
      lint-js-check
      lint-ts-fix
      lint-js-fix
      lint-md-check
      lint-md-fix
      pretty-md-check
      pretty-md-fix
      pretty-ts-check
      pretty-ts-fix
      pretty-js-check
      pretty-js-fix
  ```

* These scripts can be run with

  ```sh
      yarn <script_name>
  ```
