# Repository instructions

Static SvelteKit 3 + Svelte 5 + TypeScript 6 site for Python workshop lessons, built by Vite and deployed via GitHub Pages from `docs/`. npm only; every package is a devDependency.

## Commands

- `npm install` once; `npm run dev` serves at `http://localhost:5173/pythonlab`; `npm run preview` serves the last build (restart it after rebuilding, or it serves stale asset names).
- `npm run build` runs `npm run check` (`svelte-kit sync`, `prettier --check .`, `svelte-check`) and then prerenders into `docs/`. `docs/` is committed and is the deployed site; run the build after changes and never edit `docs/` by hand.
- `npm run format` fixes formatting. There is no ESLint and no test runner.

## Structure

- There is no `svelte.config.js`: adapter-static (output `docs`), base path `/pythonlab` and `relative: false` are set in `vite.config.ts`.
- Imports use the `#lib/*` alias from `package.json` `imports` and need the file extension: `#lib/nav.ts`, `#lib/components/Code.svelte`.
- Build internal links with `href('introduction/02')` from `#lib/href.ts` so they carry the base path; a bare `/terminal/` breaks on GitHub Pages.
- Lessons are `src/routes/(site)/<section>/<NN>/+page.svelte`. URLs must stay `/pythonlab/introduction/NN` and `/pythonlab/lab-01/NN`; section indexes set `trailingSlash = 'always'` in their `+page.ts`.
- `src/lib/nav.ts` lists every section and page. The `(site)` layout takes the page title, `<h1>` and prev/next links from it, so a new lesson needs an entry there plus a link in the section's hand-written contents list.
- `PrevNext.svelte` owns the Ctrl/Cmd+`,` and Ctrl/Cmd+`.` shortcuts.
- OS-specific steps are `<details name="os-type">` groups, not a tabs component.
- Theme: `src/app.css` uses `light-dark()` variables; the toggle sets `data-theme` on `<html>` and stores it in `localStorage.theme` (`src/app.html` applies it before paint).

## Interactive Python

- `<PyCell code={String.raw`...`} />` is a runnable editor; `<Code lang="bash" code={...} />` is a static Shiki block. Languages and themes are registered in `src/lib/highlight.ts`.
- All cells on a page share one Pyodide worker (`cells` in `src/lib/python/client.ts`), so names carry between cells. The terminal page creates its own session.
- Pyodide is loaded from jsDelivr at a version pinned in `src/lib/python/worker.ts`; it is not an npm dependency.
- GitHub Pages cannot send COOP/COEP headers, so there is no SharedArrayBuffer: `input()` raises an error, and Stop / Ctrl-C terminate and restart the worker instead of raising `KeyboardInterrupt`.
- `src/routes/terminal/` is outside the `(site)` layout: wterm (`@wterm/dom`) with the Ghostty WASM core, driven by the readline-style `src/lib/terminal/line-editor.ts`.
