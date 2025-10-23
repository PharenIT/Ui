This is a tiny test repo that demonstrates the registry CLI usage.

How it works:
- `pnpm -w --filter pharen-ui-cli-test run generate` will run the project's `generate` script which executes the library's `scripts/registry.ts` to produce Vue snippets from `registry/components/*.json`.
- Run `pnpm -w --filter pharen-ui-cli-test dev` to start vite (if desired).

Note: It reuses the root scripts/registry.ts script. You can edit it to change behavior.
