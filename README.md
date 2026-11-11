# Python Lab

Python workshop lessons with runnable code cells and an in-browser Python shell.
A static SvelteKit + TypeScript site, built by Vite into `docs/` for GitHub Pages.

## Quick start

```bash
npm install      # once
npm run dev      # dev server with live reload: http://localhost:5173/pythonlab
npm run build    # format check + type check + static build into docs/
npm run format   # fix formatting with Prettier
```

Commit `docs/` after `npm run build`; it is the deployed site. Never edit it by hand.

## Edit a page

Each page is one file, `src/routes/(site)/<section>/<NN>/+page.svelte`, written as HTML plus:

```svelte
<script lang="ts">
	import Code from '#lib/components/Code.svelte';
	import PyCell from '#lib/components/PyCell.svelte';
</script>

<PyCell code={String.raw`print("runs in the browser")`} />
<Code lang="bash" code={String.raw`python3 --version`} />
```

`PyCell` is an editable cell that runs Python; `Code` is a static highlighted block
(`python`, `bash` or `text`).

## Add a page

1. Create `src/routes/(site)/introduction/14/+page.svelte` with the lesson content.
2. Add one line to `src/lib/nav.ts`: `{ path: 'introduction/14', title: 'My Lesson' },`
3. Link it from the contents list in `src/routes/(site)/introduction/+page.svelte`.

The page title and the previous/next links (Ctrl/Cmd+`,` and `.`) come from `nav.ts`.

## Where things are

- `src/routes/(site)/`: home page and the `introduction` and `lab-01` lessons.
- `src/routes/terminal/`: Python shell (Pyodide + Ghostty terminal via wterm).
- `src/lib/python/`: the Pyodide web worker shared by cells and the shell.
- `src/lib/components/`, `src/app.css`: components and the light/dark theme.
- `vite.config.ts`: base path (`/pythonlab`) and output directory (`docs`).

Pyodide loads from the jsDelivr CDN, so running Python needs a network connection.
