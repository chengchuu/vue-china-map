# Repository Guidelines

## Project Structure & Module Organization

This repository contains a Vue 3 single-page app built with Vite. `index.html` loads `src/main.js`, which creates the Vue app and installs Pinia. `src/App.vue` is the root component. `src/components/ChinaMap.vue` registers `china-map-geojson` with modular ECharts and renders the animated map. `src/stores/chinaMap.js` loads `public/static/data/heatChinaRealData.json`, filters data by known coordinates, and rotates highlighted cities. Global styles are in `src/styles.css`, the README screenshot is `images/china-map.png`, and GitHub Pages deployment is in `.github/workflows/pages.yml`. `scripts/validate-project.mjs` enforces deployment, SEO, heading, base-path, and lockfile-ignore contracts. Vite writes output to `dist/`; do not edit or commit generated output.

## Build, Test, and Development Commands

- `npm install`: install dependencies from `package.json`; this project intentionally does not use `npm ci`.
- `npm run dev`: start Vite at `127.0.0.1:8080`.
- `npm run build`: build production assets into `dist/`.
- `npm run preview`: preview the production build locally.
- `npm run lint`: run the flat ESLint config across JavaScript and Vue files.
- `npm test`: run `scripts/validate-project.mjs`.
- `BASE_PATH=/vue-china-map/ npm run build`: verify GitHub Pages project-path asset URLs.

## Coding Style & Naming Conventions

Follow `.editorconfig`: UTF-8, LF endings, final newline, trimmed trailing whitespace, and 2-space indentation. JavaScript and Vue files use ES modules, single quotes, and no semicolons. Follow `eslint.config.js`, including Vue recommended flat rules. Name Vue SFCs in PascalCase, for example `ChinaMap.vue`. Keep Pinia stores in `src/stores/` and name store composables `useXStore`, for example `useChinaMapStore`.

## Runtime & Deployment Notes

Use `import.meta.env.BASE_URL` as a string prefix for public assets so local dev (`/`) and GitHub Pages (`/vue-china-map/`) both work. Do not use `new URL(..., import.meta.env.BASE_URL)`, because Vite's base can be a path rather than an absolute URL. Keep map refresh logic guarded against overlapping requests, failed loads, and updates after ECharts disposal. Clear timers and resize listeners on unmount.

The Pages workflow runs on pushes to `main` and manual dispatches. It uses `actions/checkout@v7`, `actions/setup-node@v6`, Node.js 22, `package-manager-cache: false`, `npm install`, `npm run lint`, `npm test`, `actions/configure-pages@v6`, `BASE_PATH=/${{ github.event.repository.name }}/ npm run build`, artifact upload from `dist`, and `actions/deploy-pages@v5`. Update `scripts/validate-project.mjs` if this contract changes.

## Testing Guidelines

There is no unit or browser test suite. Before submitting changes, run `npm run lint`, `npm test`, and `npm run build`. For deployment-sensitive changes, also run `BASE_PATH=/vue-china-map/ npm run build`. Prefer Vitest for future unit tests and Playwright for future browser coverage.

## Commit & Pull Request Guidelines

Recent history uses short Conventional Commits-style messages with optional scopes, such as `chore(pkg): use vue in pkg`, `docs(rm): use vue in html`, and `docs(rm): remove test`. Use concise lowercase types such as `feat`, `fix`, `docs`, `chore`, `style`, `test`, or `refactor`. Pull requests should include a brief summary, verification commands, linked issues when applicable, and screenshots or GIFs for visible map changes.

## Security & Configuration Tips

Use Node.js 22 or newer and npm 10 or newer, as declared in `package.json`; GitHub Actions builds with Node.js 22. The project-level `.npmrc` uses the `npmmirror.com` registry. `package-lock.json` is intentionally ignored and must remain untracked unless the install policy changes. Do not commit secrets, `.env.*.local` files, machine-specific settings, or generated `dist/` assets.
