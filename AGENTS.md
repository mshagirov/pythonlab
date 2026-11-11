# Repository instructions

Static SvelteKit 3 + Svelte 5 + TypeScript 6 site for Python workshop lessons, built by Vite into `docs/` and deployed to GitHub Pages by `.github/workflows/deploy.yml` on push to `main`. npm only; every package is a devDependency.

## Commands

- `npm install` once; `npm run dev` serves at `http://localhost:5173/pythonlab`; `npm run preview` serves the last build (restart it after rebuilding, or it serves stale asset names).
- `npm run check` is the only verification step: `svelte-kit sync`, `prettier --check .`, `svelte-check`. There is no ESLint and no test runner; CI only runs `npm run build` (which includes `check`).
- `npm run build` runs `check` and then prerenders into `docs/`. `docs/` is gitignored build output; CI runs `npm ci && npm run build` and deploys it, so never commit or hand-edit it.
- `npm run format` fixes formatting (tabs, single quotes, width 100). Prettier skips `*.md`, `.opencode/` and `docs/`.

## SvelteKit 3 specifics

- There is no `svelte.config.js`: adapter-static (output `docs`), base path `/pythonlab` and `relative: false` are options of the `sveltekit()` plugin in `vite.config.ts`.
- The code uses v3 module names such as `$app/env`, `$app/state` and `resolve` from `$app/paths`. Check `node_modules/@sveltejs/kit` rather than relying on SvelteKit 2 habits.
- Imports use the `#lib/*` alias from `package.json` `imports` (not `$lib`) and need the file extension: `#lib/nav.ts`, `#lib/components/Code.svelte`.

## Routing and navigation

- Build internal links with `href('introduction/02')` from `#lib/href.ts` so they carry the base path; a bare `/terminal/` breaks on GitHub Pages.
- Lessons are `src/routes/(site)/<section>/<NN>/+page.svelte`. URLs must stay `/pythonlab/introduction/NN` and `/pythonlab/lab-01/NN`.
- `trailingSlash` is `'never'` in the root layout and `'always'` in the `+page.ts` of each section index and of the terminal, so nav paths look like `introduction/`, `introduction/02`, `terminal/`.
- `src/lib/nav.ts` lists every section and page. The `(site)` layout takes the page title, `<h1>` and prev/next links from it, so lesson pages contain no `<h1>` of their own. A new lesson needs a `nav.ts` entry plus a link in the section's hand-written contents list (`<section>/+page.svelte`).
- `PrevNext.svelte` owns the Ctrl/Cmd+`,` and Ctrl/Cmd+`.` shortcuts.
- OS-specific steps are `<details name="os-type">` groups, not a tabs component.
- Theme: `src/app.css` uses `light-dark()` variables; the toggle sets `data-theme` on `<html>` and stores it in `localStorage.theme` (`src/app.html` applies it before paint).

## Interactive Python

- `<PyCell code={String.raw`...`} />` is a runnable editor; `<Code lang="bash" code={...} />` is a static Shiki block. Only `python`, `bash` and `text` exist; new languages or themes must be registered in `src/lib/highlight.ts`.
- All cells on a page share one Pyodide worker (`cells` in `src/lib/python/client.ts`), so names carry between cells. The terminal page creates its own session with `createSession()`.
- Page-to-worker messages are typed in `src/lib/python/protocol.ts`; change it together with `client.ts` and `worker.ts`.
- Pyodide is loaded from jsDelivr at a version pinned in `src/lib/python/worker.ts`; it is not an npm dependency, and running Python needs a network connection.
- GitHub Pages cannot send COOP/COEP headers, so there is no SharedArrayBuffer: `input()` raises an error, and Stop / Ctrl-C terminate and restart the worker instead of raising `KeyboardInterrupt`.
- The string `'Python was restarted'` is duplicated in `client.ts` and `PyCell.svelte`; keep them identical.
- `src/routes/terminal/` is outside the `(site)` layout: wterm (`@wterm/dom`) with the Ghostty WASM core, driven by the readline-style `src/lib/terminal/line-editor.ts`. Links to it use `data-sveltekit-reload` (see `LaunchPython.svelte`).

## Agents

- `.opencode/agents/code-generator.md` defines a `code-generator` subagent that expects a precise task brief and the verification commands to run.
