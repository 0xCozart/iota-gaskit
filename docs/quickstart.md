# 30-Minute Quickstart

Status: Milestone 1 work item.

Goal: a developer can clone the repo, start a local GasKit stack, open the demo dApp, and execute one sponsored testnet transaction within 30 minutes.

## Current scaffold

```bash
npm install
npm test
npm run typecheck
```

## Milestone 1 target flow

1. Copy `.env.example` to `.env`.
2. Add testnet sponsor wallet values locally.
3. Start Redis, Gas Station, policy gateway, and dashboard.
4. Open dashboard health page.
5. Open demo dApp.
6. Execute sponsored testnet transaction.
7. See usage event in dashboard.

Secrets must remain local and must never be committed.
