# Agent Guide

GasKit now ships a repo-local Codex skill at `skills/iota-gaskit/SKILL.md`.

Use it when an agent needs to navigate the repo, make SDK or gateway changes, improve docs, run verification, review secret boundaries, or integrate GasKit into another app.

## What the Skill Teaches

- where product, architecture, examples, SDK, policy, gateway, observability, readiness, and docs-site files live;
- how to choose the right Apex workflow mode for GasKit work;
- which commands are local-only and which commands may touch live testnet services;
- how to keep sponsor-wallet, app-key, and upstream bearer-token boundaries intact;
- which verification commands prove docs, SDK, gateway, local smoke, readiness, typecheck, and secret hygiene.

## When to Invoke It

Use `$iota-gaskit` for prompts like:

- "review the GasKit docs";
- "add a new SDK example";
- "change policy gateway behavior";
- "debug testnet readiness";
- "integrate GasKit into a Next.js backend";
- "check whether sponsor secrets are safe";
- "run the local proof path";
- "prepare a new agent to work in this repo."

## What It Does Not Do

The skill is not an MCP server and does not expose live tools. It gives agents the repo-specific workflow, safety boundaries, source map, and command ladder. A future MCP should only be added if agents need structured live tooling such as policy inspection, env validation, generated integration scaffolds, or guided smoke execution.

## Safety Rule

Local checks do not prove live sponsored execution. Live commands such as `npm run execute:testnet-demo` must only be run when the operator explicitly asks and local testnet credentials are configured.
