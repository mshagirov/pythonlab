# Browser regression tests

Install the test browser once with `npx playwright install chromium`, then run
`npm test`. The suite starts a fresh dev server on port 5174.

To use an installed Chrome instead, run `PLAYWRIGHT_CHANNEL=chrome npm test`.

To check an already-running dev server, including stale client modules after route
moves, run:

```sh
PLAYWRIGHT_BASE_URL=http://localhost:5173/pythonlab/ npm test
```

The tests visit every registered lesson section, wait for client hydration, check
that exactly the requested section is visible, and follow Next across sections
and pages. Hydration warnings and uncaught browser errors fail the tests.
The optional VS Code branch has an additional navigation/progress check.
