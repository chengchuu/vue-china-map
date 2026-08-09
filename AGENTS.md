# Repository Guidelines

## Project Structure & Module Organization

This repository contains a Vue 3 single-page application built with Vite. `index.html` loads `src/main.js`, which creates the Vue app and installs Pinia. `src/App.vue` is the root component, `src/components/ChinaMap.vue` configures and renders the ECharts map, and `src/stores/chinaMap.js` loads and transforms the heat-map data. Global styles are in `src/styles.css`. The runtime dataset is `public/static/data/heatChinaRealData.json`, and the README screenshot is `images/china-map.png`. `scripts/validate-project.mjs` checks the Pages workflow and SEO contract. GitHub Pages deployment is configured in `.github/workflows/pages.yml`. Vite writes generated output to `dist/`; do not edit or commit that directory.

## Build, Test, and Development Commands

- `npm install`: install dependencies from `package.json`.
- `npm run dev`: start the Vite dev server at `127.0.0.1:8080`.
- `npm run build`: generate a production build in `dist/`.
- `npm run preview`: serve the production build locally.
- `npm run lint`: run the flat ESLint configuration across JavaScript and Vue files.
- `npm test`: validate the Pages workflow, SEO metadata, heading, and base-path contract.
- `BASE_PATH=/vue-china-map/ npm run build`: verify GitHub Pages project-path assets.

## Coding Style & Naming Conventions

Follow `.editorconfig`: use UTF-8, LF line endings, final newlines, trimmed trailing whitespace, and 2-space indentation. JavaScript and Vue files use ES modules, single quotes, and no semicolons. Follow the recommended ESLint rules for JavaScript and Vue. Name Vue single-file components in PascalCase, such as `ChinaMap.vue`. Keep Pinia stores in `src/stores/` and name store composables `useXStore`, such as `useChinaMapStore`.

## Runtime & Deployment Notes

Use `import.meta.env.BASE_URL` when referencing public assets so local development (`/`) and GitHub Pages (`/vue-china-map/`) both work. Do not construct public asset URLs with `new URL(..., import.meta.env.BASE_URL)` because Vite's base can be a path instead of an absolute URL. The component registers the `china-map-geojson` data with modular ECharts, fetches data through Axios, and refreshes the highlighted cities every second. Keep refresh logic guarded against overlapping requests, failed loads, and updates after ECharts disposal. Clear timers and event listeners when the component unmounts.

The Pages workflow runs on pushes to `main` and manual dispatches. It installs with `npm install`, runs lint and tests, configures Pages, derives `BASE_PATH` from `github.event.repository.name`, and deploys `dist/`.

## Testing Guidelines

There is no unit or browser test suite. Run `npm run lint`, `npm test`, and `npm run build` before submitting changes. For deployment-sensitive changes, also run `BASE_PATH=/vue-china-map/ npm run build`. Prefer Vitest for future unit tests and Playwright for future browser coverage.

## Commit & Pull Request Guidelines

Recent history uses short Conventional Commits-style messages with optional scopes, such as `chore(pkg): use vue in pkg`, `docs(rm): use vue in html`, and `docs(rm): remove test`. Use a concise lowercase type such as `feat`, `fix`, `docs`, `chore`, `style`, `test`, or `refactor`. Pull requests should include a brief summary, verification commands, linked issues when applicable, and screenshots or GIFs for visible map changes.

## Security & Configuration Tips

Use Node.js 22 or newer and npm 10 or newer, as declared in `package.json`; GitHub Actions currently builds with Node.js 22. The project-level `.npmrc` uses the `npmmirror.com` registry. `package-lock.json` is intentionally ignored and must remain untracked. Do not commit local secrets, `.env.*.local` files, or machine-specific settings. Keep public runtime assets under `public/`.
