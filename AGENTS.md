# Agent Instructions

<!-- apex-workflow:start -->
## Apex Workflow Harness

Use `$apex-workflow` for meaningful execution in this repo.

- Profile: `apex.workflow.json`
- Select the lightest safe mode before implementation.
- For meaningful code-facing work, create or update a slice manifest under `tmp/apex-workflow/`.
- Use the configured tracker, code-intelligence, browser, and UI/UX adapters from the profile.
- Refresh this harness config from the repo root with:

```bash
node /mnt/d/CURSOR/apex-workflow/scripts/init-harness.mjs --target=. --yes --force
```

<!-- apex-workflow:end -->
