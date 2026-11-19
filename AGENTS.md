# Repository instructions

Static SvelteKit 3 + Svelte 5 + TypeScript 6 site for Python workshop lessons. Use npm; every package is a devDependency.

## Commands

- `npm run dev` serves at `http://localhost:5173/pythonlab` (not `/`).
- `npm run check` runs `svelte-kit sync` → `prettier --check .` → `svelte-check`. A formatting failure prevents typechecking; there is no ESLint.
- `npm run build` runs `check` then prerenders into `docs/`. Never commit or hand-edit `docs/`; it and `.svelte-kit/` are gitignored generated output.
- `npm run preview` serves the last build; restart it after rebuilding or it can serve stale asset names.
- `npm run format` fixes formatting (tabs, single quotes, width 100). Prettier skips `*.md`, `.opencode/`, generated output and `package-lock.json`.
- `.github/workflows/deploy.yml` uses Node `lts/*`, runs `npm ci` and `npm run build` on PRs and `main`, and deploys `docs/` to GitHub Pages only from `main`. CI does **not** run Playwright.

## Browser tests

- `npm test` runs Playwright against a fresh dev server on port **5174**, with `--strictPort` and no server reuse. Install Chromium once with `npx playwright install chromium`, or use installed Chrome with `PLAYWRIGHT_CHANNEL=chrome npm test`.
- Focus one lesson with `npm test -- -g 'lab1/02'`. To use an existing server instead, set `PLAYWRIGHT_BASE_URL=http://localhost:5173/pythonlab/` (keep the base path and final slash); see `tests/README.md`.
- Tests derive cases from `src/lib/nav.ts`, check deep-linked steps after hydration and follow Next across steps/pages. Hydration warnings and uncaught browser errors fail them; they do not verify Python execution.

## SvelteKit 3 specifics

- There is no `svelte.config.js`: adapter-static (output `docs`), base path `/pythonlab` and `relative: false` are options of the `sveltekit()` plugin in `vite.config.ts`.
- The code uses `$app/state` and `resolve`/`asset` from `$app/paths`. Check `node_modules/@sveltejs/kit` rather than relying on SvelteKit 2 APIs (e.g. navigation uses `reset`, not `noScroll`).
- Imports use the `#lib/*` alias from `package.json` `imports` (not `$lib`) and need the file extension: `#lib/nav.ts`, `#lib/components/Code.svelte`.

## Routing and navigation

- Build internal links with `href('introduction/02')` from `#lib/href.ts` and static asset URLs with `asset('file.png')` from `$app/paths`; bare `/terminal/` or `/file.png` URLs lose the GitHub Pages base path.
- Lessons are `src/routes/(site)/<section>/<NN>/+page.svelte`. Preserve existing `/pythonlab/introduction/NN` and `/pythonlab/lab1/NN` URLs.
- `trailingSlash` is `'never'` in the root layout and `'always'` in the `+page.ts` of each section index and of the terminal, so nav paths look like `introduction/`, `introduction/02`, `terminal/`.
- `src/lib/nav.ts` owns workshop titles, order and step IDs. The `(site)` layout supplies `<title>`, `<h1>`, carousel and prev/next links, so lessons have no `<h1>` of their own. A new lesson also needs a link in the section's hand-written contents list; point it at the first step (`README.md` has the recipe).
- Match each step ID with `<LessonSection id="…">`. Inactive sections stay mounted but hidden so editor state survives; the component resets focus/scroll and marks the container `more-below` for the bottom haze. `optional: true` steps open by direct link but are skipped by normal navigation.
- Keep `navigateStep` from `#lib/href.ts` on reactive Previous/Next links: it captures the hash target before SvelteKit updates the link, avoiding skipped steps. `PrevNext.svelte` also owns Ctrl/Cmd+`,` and Ctrl/Cmd+`.`.
- `clipped()` in `src/lib/clipped.ts` is an attachment that sets `data-clipped` on text too long for its box; pass whatever else the width depends on as its argument. `.tooltip` in `src/app.css` is the shared shortcut tooltip; components only position it.
- OS-specific steps are `<details name="os-type">` groups, not a tabs component.
- Theme: `src/app.css` uses `light-dark()` variables; the toggle sets `data-theme` on `<html>` and stores it in `localStorage.theme` (`src/app.html` applies it before paint).

## Interactive Python

- ``<PyCell code={String.raw`...`} />`` is runnable; `<Code lang="bash" code={...} />` is static. Both use `src/lib/highlight.ts`, which renders Shiki tokens itself. Only `python`, `bash` and `text` exist; register new languages/themes there.
- All PyCells share the singleton `cells` session in `src/lib/python/client.ts`, including across client-side page navigation. Reset clears only that editor/output, not Python variables. The terminal creates an independent session with `createSession()`.
- Page-to-worker messages are typed in `src/lib/python/protocol.ts`; change it together with `client.ts` and `worker.ts`.
- Pyodide is loaded from jsDelivr at a version pinned in `src/lib/python/worker.ts`; it is not an npm dependency, and running Python needs a network connection.
- There is no SharedArrayBuffer on GitHub Pages: `input()` raises an error; Stop / Ctrl-C during execution terminate the worker and lose its variables instead of raising Python `KeyboardInterrupt`.
- The restart message is exported as `RESTARTED` from `src/lib/python/client.ts`; `PyCell.svelte` and the terminal page import it instead of repeating the string.
- `src/routes/terminal/` is outside the `(site)` layout: wterm (`@wterm/dom`) with the Ghostty WASM core, driven by the readline-style `src/lib/terminal/line-editor.ts`. Links to it use `data-sveltekit-reload` (see `LaunchPython.svelte`).

## Browser debugging

- `opencode.jsonc` defines `chrome-devtools` MCP but has it **disabled**. If enabled, it requires `bunx` and uses `--isolated` (disposable Chrome, not an existing session); the app itself uses npm.
- The `.chrome-devtools-mcp/` directory is gitignored: run `mkdir -p .chrome-devtools-mcp` and save every file a tool can write (screenshots, traces, heap snapshots, Lighthouse reports) there, never in the repo root or `src/`/`static/`.
