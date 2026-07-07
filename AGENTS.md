# Repository Guidelines

## Project Structure & Module Organization

This is a Vue 2 application built with the legacy Vue CLI Webpack template. Application code lives in `src/`: `src/main.js` bootstraps Vue, `src/components/index.vue` renders the China map view, and `src/store/` contains Vuex setup plus the `ChinaMap` module. Static runtime data is in `static/data/heatChinaRealData.json`; documentation images are in `images/`. Build and environment configuration live in `build/` and `config/`. Tests are split into `test/unit/` for Karma/Mocha specs and `test/e2e/` for Nightwatch browser tests.

## Build, Test, and Development Commands

- `npm install`: install project dependencies. Use Node.js 14.x for the most reliable local setup.
- `npm run dev` or `npm start`: start the Webpack dev server.
- `npm run build`: create a production build through `build/build.js`.
- `npm run lint`: run ESLint across `src`, unit specs, and e2e specs.
- `npm run unit`: run Karma/Mocha unit tests once.
- `npm run e2e`: run Nightwatch e2e tests.
- `npm test`: run unit tests followed by e2e tests.

## Coding Style & Naming Conventions

Use UTF-8, LF line endings, final newlines, trimmed trailing whitespace, and 2-space indentation as defined in `.editorconfig`. JavaScript and Vue files are linted with ESLint Standard style via `babel-eslint` and `eslint-plugin-html`; this means no semicolons, single quotes, and spacing enforced by StandardJS. Prefer clear Vue component names and keep Vuex modules in `src/store/modules/` using PascalCase filenames, as in `ChinaMap.js`.

## Testing Guidelines

Place unit specs under `test/unit/specs/` with the `*.spec.js` naming pattern. Use Mocha, Chai, Sinon, and Karma utilities already configured in `test/unit/karma.conf.js`. Keep browser workflow tests under `test/e2e/specs/` and use Nightwatch assertions, including custom assertions from `test/e2e/custom-assertions/`. Run `npm run lint` and the relevant test command before submitting changes.

## Commit & Pull Request Guidelines

Recent history uses short Conventional Commits-style messages, for example `docs: update rep id`, `fix: emit file`, and `chore: clean cache`. Use a concise lowercase type such as `fix`, `docs`, `chore`, `style`, or `test`, with an optional scope when useful. Pull requests should include a brief change summary, testing performed, linked issues when applicable, and screenshots or GIFs for visible map or UI changes.

## Security & Configuration Tips

Do not commit local secrets or machine-specific settings. Keep public static data in `static/`, build-time environment values in `config/*.env.js`, and avoid editing generated build output.
