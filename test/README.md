Two test projects included:

- `test/cli-project` — minimal project to run the registry generator (`scripts/registry.ts`) via `pnpm -w --filter pharen-ui-cli-test run generate`.
- `test/lib-project` — Vite + Vue app that installs `@pharen/ui` and mounts it. Run with `pnpm -w --filter pharen-ui-lib-test run dev`.

Notes:
- The library test project assumes you have `@pharen/ui@0.0.15` published to npm (it is).
- If you want to test the library locally without publishing, use `pnpm -w --filter pharen-ui-lib-test add ../..` to install the workspace package.
