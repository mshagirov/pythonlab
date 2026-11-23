# Python Lab

> A static SvelteKit + TS/JS site, built by Vite into `docs/` for GitHub Pages.

Python workshop lessons for beginners. Start with in-browser lessons. Then, build
your first Python project on your machine.

## Quick start

```bash
npm install      # once
npm run dev      # dev server with live reload: http://localhost:5173/pythonlab
npm run build    # format check + type check + static build into docs/
npm run format   # fix formatting with Prettier
```

Pushing to `main` builds and deploys the site with GitHub Actions
(`.github/workflows/deploy.yml`). `docs/` is local build output and is not committed.

## Edit a page

Each page is one file, `src/routes/(site)/<section>/<NN>/+page.svelte`, written
as HTML plus:

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
2. Add one line to the section's `pages` in `src/lib/nav.ts`: `{ path: 'introduction/14', title: 'My Lesson' },`
3. Link it from the contents list in `src/routes/(site)/introduction/+page.svelte`
   with `href()` from `#lib/href.ts`, so the link keeps the `/pythonlab` base path:
   `<li><a href={href('introduction/14')}>My Lesson</a></li>`

The page title, its `<h1>` and the previous/next links (Ctrl/Cmd+`,` and `.`) come
from `nav.ts`, so a lesson page has no `<h1>` of its own.

## Add in-page sections (steps)

A page with steps shows one section at a time, and previous/next walk through
them before moving to the next page.

1. List the steps in the page's `nav.ts` entry:

   ```ts
   {
       path: 'introduction/14',
       title: 'My Lesson',
       steps: [
           { id: 'first-step', title: 'First Step' },
           { id: 'second-step', title: 'Second Step' },
           { id: 'extra-reading', title: 'Extra Reading', optional: true },
       ],
   },
   ```

   An `optional` step opens from a direct link but is skipped by previous/next.

2. Wrap each part of the page in a `LessonSection` whose `id` matches a step:

   ```svelte
   <script lang="ts">
       import LessonSection from '#lib/components/LessonSection.svelte';
   </script>

   <LessonSection id="first-step">
       <h3>First Step</h3>
       <p>...</p>
   </LessonSection>
   <LessonSection id="second-step">
       <h3>Second Step</h3>
       <p>...</p>
   </LessonSection>
   ```

3. Point the contents link at the first step: `href('introduction/14#first-step')`.

## Add images

Put the file in `static/` and reference it with `asset()`, which adds the base path:

```svelte
<script lang="ts">
    import { asset } from '$app/paths';
</script>

<img src={asset('my-plot.png')} alt="Describe the plot" width="1200" height="800" />
```

The DNA and journey banners are pre-rendered PNGs in `static/`. The journey uses
the same full-map image at every width so it scales without breakpoint jumps.
To edit their artwork, update `scripts/journey-art.ts` or
`scripts/generate-banners.ts`, then run `npm run banners` (requires Playwright
Chromium; use `PLAYWRIGHT_CHANNEL=chrome npm run banners` for installed Chrome).
Regeneration uses Node's built-in TypeScript support (Node 22.18+).

## Add a workshop section

1. Add the section to `sections` in `src/lib/nav.ts`:

   ```ts
   {
       path: 'lab2/',
       title: 'Second Python Project',
       pages: [
           {
               path: 'lab2/01',
               title: 'Project Goals',
               steps: [{ id: 'overview', title: 'Overview' }],
           },
       ],
   },
   ```

   Set `endsAtWorkshops: true` to make the last step lead back to the workshops page.

2. Create the contents page `src/routes/(site)/lab2/+page.svelte`:

   ```svelte
   <script lang="ts">
       import { href } from '#lib/href.ts';
   </script>

   <p>Intro to the workshop.</p>

   <h3>Contents</h3>

   <ol>
       <li><a href={href('lab2/01#overview')}>Project Goals</a></li>
   </ol>
   ```

3. Create `src/routes/(site)/lab2/+page.ts` so the section URL ends in `/`:

   ```ts
   export const trailingSlash = 'always';
   ```

4. Add the lessons as in [Add a page](#add-a-page). The home page lists every
   section in `nav.ts`, so it needs no change.

## License

[MIT](LICENSE) -- Copyright (c) 2025 Murat Shagirov.
