# Repository Guidelines

## Project Structure & Module Organization

This is a Vue 3 application built with Vite. Runtime code lives in `src/`: `src/main.js` creates the Vue app, `src/App.vue` is the root component, `src/components/ChinaMap.vue` renders the ECharts map, and `src/stores/chinaMap.js` contains Pinia state/actions for loading heat-map data. Global styles are in `src/styles.css`. Public static files live under `public/`; the map data is served from `public/static/data/heatChinaRealData.json`. Build output goes to `dist/`.

## Build, Test, and Development Commands

- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the Vite dev server at `127.0.0.1:8080`.
- `npm run build`: generate a production build in `dist/`.
- `npm run preview`: serve the production build locally.
- `npm run lint`: run ESLint flat config across the project.
- `npm test`: currently aliases `npm run lint`.

## Coding Style & Naming Conventions

Use UTF-8, LF line endings, final newlines, trimmed trailing whitespace, and 2-space indentation. JavaScript and Vue files use ES modules, single quotes, and no semicolons. Vue single-file components should use PascalCase filenames, such as `ChinaMap.vue`. Pinia stores should live in `src/stores/` and use `useXStore` naming, such as `useChinaMapStore`.

## Testing Guidelines

The old Karma, PhantomJS, Nightwatch, Selenium, and ChromeDriver tests were removed during the Vue 3 migration because they targeted the deleted Vue CLI demo component and were not ARM64-compatible. Until a browser test stack is added, run `npm run lint` and `npm run build` before submitting changes. Prefer Vitest for future unit tests and Playwright for future browser coverage.

## Commit & Pull Request Guidelines

Recent history uses short Conventional Commits-style messages, for example `docs: update rep id`, `fix: emit file`, and `chore: clean cache`. Use a concise lowercase type such as `fix`, `docs`, `chore`, `style`, `test`, or `refactor`, with an optional scope when useful. Pull requests should include a brief summary, verification commands, linked issues when applicable, and screenshots or GIFs for visible map changes.

## Security & Configuration Tips

Use Node.js 22 as declared in `.nvmrc` and `package.json` engines. Do not commit local secrets or machine-specific settings. Keep public runtime assets under `public/`, and avoid editing generated `dist/` output.
