# IOTA GasKit Continuation Brief

Date: 2026-04-26

## What we recovered

The pasted PRD belongs to the clean public-ready repo:

- Primary continuation repo: `/mnt/d/CURSOR/iota-gaskit`
- Public repo recorded in docs: `https://github.com/0xCozart/iota-gaskit`
- Source/incubator prototype: `/mnt/d/CURSOR/gas_station`
- Widget planning folder: `/mnt/d/CURSOR/gaas-embeddable-widget-plan`
- Related observability/status product: `/mnt/d/CURSOR/iotato`

The canonical PRD has now been captured in:

- `docs/product-requirements.md`

## Current state of `/mnt/d/CURSOR/iota-gaskit`

The clean `iota-gaskit` repo is in Milestone 0 / grant-readiness state.

Confirmed current assets:

- Apache-2.0 open-source framing.
- README, grant scope, managed-service separation, milestone docs, reviewer walkthrough/checklist.
- `@iota-gaskit/shared-types` package.
- `@iota-gaskit/policy-gateway` package with pure policy decision tests.
- `@iota-gaskit/sdk` package with typed reserve/execute client scaffold and tests.
- Demo app and example folders as scaffolds/placeholders.
- Safe Gas Station config template.
- Architecture diagram and docs.
- Threat model and production hardening docs.
- Milestone 0 proof doc.

Current known verification evidence in docs:

- `npm test`: 16 tests passed.
- `npm run typecheck`: passed.
- `npm run grant:check`: passed during the recorded grant-readiness sprint.
- Secret-oriented tracked-file scan: 0 obvious private-key/API-token matches.

## Current PRD coverage

### Mostly covered now

- Open-source positioning and grant framing.
- License/contribution/security hygiene.
- Grant application narrative.
- Milestone table and budget.
- Initial policy reason-code/type scaffold.
- Initial SDK wrapper scaffold.
- Initial architecture/security/deployment docs.

### Partially covered now

- Policy gateway: pure decision engine exists, but it is not yet wired into a runnable HTTP proxy/gateway path.
- SDK: client wrappers exist, but they are not yet proven against a local runnable GasKit stack.
- Deployment kit: safe config and Redis template exist, but full local Gas Station stack is not complete.
- Examples/demo app: placeholder scaffolds exist, but no real sponsored testnet transaction demo yet.
- Observability/security pack: initial docs exist, but no complete Prometheus/Grafana/alert pack in the clean repo.

### Not implemented yet

- Local one-command quickstart with official Gas Station wired through GasKit.
- Real sponsored transaction demo.
- App/project persistence and API key lifecycle.
- Per-wallet daily limits in a live gateway path.
- App-level daily gas budget in a live gateway path.
- Package/function allowlists in a live proxy path.
- Policy simulation endpoint.
- Usage tracking store and dashboard.
- Dashboard CSV export.
- Final demo video assets.

## Related folders and how they should feed the project

### `/mnt/d/CURSOR/gas_station`

This is the main source/incubator prototype. It includes a working/full-stack SaaS-shaped GaaS product with Express backend, Next.js frontend, API-key auth, quotas/reservations, billing, dashboard, Docker/NGINX/monitoring assets, and partial widget implementation.

Use it as source material only. Do not publish or copy wholesale without scrubbing.

Reasons:

- It is SaaS-shaped rather than grant-toolkit-shaped.
- It contains local sensitive-looking sponsor/recovery/config material in working-tree files; values must stay redacted and should be rotated if ever real.
- Git state is not a clean public repo state.
- It contains build/runtime artifacts that should not be extracted into the clean repo.

Best use:

- Extract gateway/proxy concepts.
- Extract quota/reservation patterns after correcting race/mainnet-safety issues.
- Extract dashboard/monitoring ideas.
- Extract Docker/NGINX/Grafana patterns after removing secrets and SaaS-only assumptions.

### `/mnt/d/CURSOR/gaas-embeddable-widget-plan`

This is the widget planning/design folder. It is not the core GasKit PRD, but it is relevant to developer onboarding and future managed-service UX.

Useful pieces:

- hosted iframe widget plan;
- partner/origin validation;
- widget session token design;
- Neo-Tokyo design tokens;
- code-sample generation ideas;
- component inventory and execution sequence.

Do not prioritize this before the runnable GasKit Milestone 1 slice unless the goal is demo polish.

### `/mnt/d/CURSOR/iotato`

This appears to be IOTA Sentinel, an IOTA infrastructure monitoring/status product. It is not GasKit, but it can inform observability.

Useful pieces:

- IOTA RPC health checks;
- endpoint/check/incident model;
- cron locking/worker checks;
- alert routing abstractions;
- public status page model.

Do not merge wholesale. Adapt only observability/status patterns after the GasKit gateway and transaction flow are runnable.

## Recommended next implementation slice

Build the smallest runnable Milestone 1 vertical slice in `/mnt/d/CURSOR/iota-gaskit`:

**Local policy gateway + SDK smoke path.**

Goal:

Turn the repo from a credible grant scaffold into a runnable product slice without jumping straight to dashboard/widget work.

Proposed scope:

1. Add a runnable gateway service workspace, for example `apps/policy-gateway-service`.
2. Implement:
   - `GET /health`
   - `POST /v1/reserve_gas`
   - `POST /v1/execute_tx`
3. Load one demo policy from `examples/policies/demo-dapp.yaml`.
4. Authenticate one local demo app key from environment/config; never commit a real key.
5. Call `evaluateSponsorshipPolicy()` before proxying reserve/execute paths.
6. Forward allowed calls to an env-configured local IOTA Gas Station URL/token.
7. Return structured PRD reason codes for rejects.
8. Emit minimal structured decision logs for approved/rejected requests.
9. Add tests for:
   - health;
   - missing app key;
   - invalid app key;
   - package/function rejection;
   - allowed request reaching a mocked upstream.
10. Update quickstart docs to show the local gateway smoke path.

Why this slice first:

- It directly unlocks Milestone 1 and Milestone 2 proof.
- It reuses existing shared-types, policy-gateway, and SDK packages.
- It avoids premature dashboard/widget polish.
- It creates the integration surface that the demo app, dashboard, and observability pack will consume.

## Guardrails for the next pass

- Work in `/mnt/d/CURSOR/iota-gaskit`, not `/mnt/d/CURSOR/gas_station`, unless explicitly extracting source material.
- Treat `/mnt/d/CURSOR/gas_station` as private/incubator source only.
- Do not copy secrets, `.env` values, sponsor keys, recovery material, or local config values.
- Any extracted code should be scrubbed, minimized, tested, and reframed as open-source toolkit functionality.
- Keep grant scope distinct from future managed SaaS features.
- Do not prioritize embeddable widget work until the gateway/SDK/demo path is runnable.
