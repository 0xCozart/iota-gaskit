# IOTA GasKit Grant Application Draft

## Project name

**IOTA GasKit**

## Grant category

Open-Source Development

## License

Apache-2.0 for application code and repository assets unless otherwise noted. Documentation may also be made available under permissive documentation terms if required by the grant process.

## Reviewer quick verification

From a clean clone:

```bash
npm install
npm run grant:check
```

`npm run grant:check` is deterministic/offline. It runs tests, typecheck, local gateway and demo smokes, example testnet-readiness preflight, package dry-runs, and tracked-file secret scanning. It does not require sponsor keys, live IOTA RPC, Docker, npm registry credentials, or a running Gas Station.

Optional live testnet proof:

```bash
npm run execute:testnet-demo
```

This requires operator-owned local credentials and a reachable IOTA Gas Station/testnet setup. A prior public IOTA testnet sponsored execute has already been documented with digest `2Db6NiwZdR26JenPkWMFno7QgMePwhQ6rQQTA6jDJa7H`; see `docs/milestone-0-proof.md` and `docs/testnet-attempts.md`.

## One-line pitch

IOTA GasKit is an open-source toolkit that helps IOTA dApp builders deploy, secure, monitor, and integrate gas-sponsored transactions using the official IOTA Gas Station component.

## Short description

IOTA GasKit provides the missing developer and operator layer around IOTA Gas Station: local deployment templates, sponsorship policy controls, quotas, app keys, a TypeScript SDK, integration examples, an operator dashboard, observability templates, a threat model, and production hardening documentation.

The goal is to help IOTA teams ship gasless user experiences without every team rebuilding the same infrastructure, policy, monitoring, and security layer from scratch.

## Problem

Gasless onboarding is important for real-world IOTA adoption. Many users abandon Web3 applications when asked to acquire tokens, bridge funds, or understand gas before they can experience product value.

The official IOTA Gas Station component provides the core sponsorship primitive, but production teams still need to answer operational questions:

- How do we deploy Gas Station safely?
- How do we keep sponsor keys out of frontend and repository code?
- How do we prevent one app, wallet, IP, package, or function from draining the sponsor budget?
- How do we monitor success, failure, rejection, latency, and sponsor balance?
- How do we expose a clean API/SDK to application developers?
- How do we show security reviewers that gas sponsorship is financially bounded and observable?

Without a standard toolkit, each IOTA builder has to invent this production layer independently.

## Opportunity

IOTA already has the core Gas Station component. GasKit adds reusable open-source tooling around it:

- one-command local development path;
- cloud-ready deployment templates;
- app/API key model;
- policy gateway for quotas and allowlists;
- TypeScript SDK;
- example dApp integration;
- operator dashboard;
- Prometheus/Grafana-style observability assets;
- hardening and threat-model documentation;
- grant-verifiable demo assets.

This positions the project as ecosystem infrastructure rather than a private hosted wrapper.

## What the grant funds

The grant funds the open-source core:

1. Deployment Kit and Sponsored Transaction Demo.
2. Policy Gateway and Quota Enforcement.
3. TypeScript SDK and Integration Examples.
4. Operator Dashboard and Usage Tracking.
5. Production Hardening, Observability, Documentation, and Final Demo.

The grant does **not** fund billing, enterprise SLAs, proprietary hosting, or closed managed-service features. A future managed service may offer hosting, support, compliance help, SLAs, and enterprise onboarding, but the grant deliverables remain self-hostable, inspectable, forkable, independently useful, and licensed open source.

## Maintainer and delivery credibility

IOTA GasKit is maintained and built by 0xCozart as an open-source infrastructure project for IOTA sponsored-transaction adoption. The current work demonstrates full-stack TypeScript, Node service, SDK, policy, test automation, security documentation, and operator-readiness experience.

Proof already completed includes deterministic local gateway/SDK/demo tests, policy simulation, usage-event foundations, package dry-runs, tracked-file secret scanning, and one documented real sponsored IOTA testnet execute through the local gateway and Gas Station.

Expected delivery capacity is one focused maintainer-led implementation track with milestone-sized review artifacts. The grant plan is scoped to incremental open-source deliverables that can be verified from this repo rather than to a broad hosted product launch.

## Duplicate funding and conflicts

To the maintainer's current knowledge, the grant work described here is not currently funded by another grant, employer, or customer contract. Any material conflicts of interest or overlapping funding will be disclosed to reviewers.

The open-source grant deliverables remain independently deployable and useful without any future managed service.

## Why this matters for IOTA

GasKit helps IOTA applications onboard users without fee friction. This is especially valuable for:

- identity flows;
- notarization apps;
- supply-chain and trade workflows;
- RWA/product passport apps;
- wallets;
- games;
- hackathon projects;
- enterprise pilots where users should not manage tokens before trying the product.

Every team that can quickly deploy safe gas sponsorship has one less reason to choose another chain or avoid gasless UX.

## Current proof of capability

A clean public repository has been scaffolded from a working GaaS prototype and advanced with deterministic local readiness slices:

- Repository: `https://github.com/0xCozart/iota-gaskit`
- License: Apache-2.0
- Current packages:
  - `@iota-gaskit/shared-types`
  - `@iota-gaskit/policy-gateway`
  - `@iota-gaskit/sdk`
- Package publication status:
  - actual npm publication is not claimed as complete today;
  - packages have prerelease metadata and dry-run packaging checks;
  - publication, or final publication-ready artifacts if registry access is unavailable during review, is an M3 deliverable.
- Current local proof surfaces:
  - runnable local policy gateway smoke path with a mock upstream;
  - authenticated local policy simulation preflight;
  - SDK helpers for policy simulation, reserve, and execute flows;
  - local demo dApp CLI and loopback browser-wrapper smokes;
  - tested Next.js API route and Node backend examples;
  - sanitized decision events, an in-memory local usage read model, a file-backed local JSONL usage event-store foundation, and an authenticated local operator usage API foundation;
  - safe Gas Station config template and policy YAML example;
  - threat model, production-hardening, observability, policy, SDK, and testnet-readiness docs;
  - a documented real IOTA testnet sponsored execute path through the local policy gateway and Gas Station.

Local verification from the grant-readiness sprint:

- `npm test`: 132 deterministic tests passed, 0 failed after grant-readiness polish.
- `npm run typecheck`: passed.
- `npm run smoke:local`: local gateway smoke passed.
- `npm run grant:check`: passed locally across tests, typecheck, smokes, offline readiness example, package dry-run checks, and tracked-file secret scan.
- `npm run execute:testnet-demo`: succeeded once against IOTA testnet with public digest `2Db6NiwZdR26JenPkWMFno7QgMePwhQ6rQQTA6jDJa7H`.
- secret-oriented tracked-file scan: 0 obvious private-key/API-token matches.

The current public repo now claims a real sponsored testnet execute proof. It does not yet claim production usage storage, operator dashboard UI, production monitoring, package publication, production KMS/signer integration, or final demo video assets. The original prototype proved additional implementation capability such as Express gateway, API-key authentication, quota tracking, transaction logging, dashboard UI, Docker deployment, and Prometheus/Grafana monitoring; grant work turns those proven pieces into a clean open-source toolkit.

## Milestones

| Milestone | Duration | Deliverables | Reviewer verification |
| --- | ---: | --- | --- |
| M1 Deployment Kit and Testnet Demo | 2 weeks | Docker Compose local stack, env templates, testnet guide, health checks, sponsored transaction demo | Reviewer can run clean clone and execute one sponsored testnet transaction |
| M2 Policy Gateway, Quotas, and Abuse Controls | 3 weeks | App keys, app quotas, wallet limits, package/function allowlists, denylist, reason codes, policy tests | Unauthorized/over-quota/non-allowlisted requests are rejected with structured reasons |
| M3 SDK, Examples, and Package Publication | 2 weeks | TypeScript SDK, typed wrappers, Next.js route example, Node backend example, package publication or publication-ready artifacts | SDK tests pass, examples run, package dry-run or package publication evidence is present |
| M4 Usage Tracking and Lightweight Operator Dashboard | 3 weeks | Operator dashboard, app usage, wallet usage, recent execution/rejection logs, quota views, CSV export | Dashboard shows app/wallet/status dimensions and redacts secrets |
| M5 Hardening, Observability Docs, and Final Demo | 2 weeks | Threat model, production guide, monitoring/alerts, KMS notes, contribution docs, final demo video | Final walkthrough proves happy path and rejection path |

## Success criteria

By completion, reviewers should be able to verify:

- public GitHub repo is complete and licensed;
- clean local quickstart works;
- demo dApp executes a sponsored testnet transaction;
- policy gateway enforces app credentials, quotas, wallet limits, and allowlists;
- SDK has typed reserve/execute methods and tests;
- dashboard shows health, usage, policy rejections, and transaction status;
- observability templates and alerts exist;
- threat model and production hardening docs are published;
- final demo video shows both approved and rejected sponsorship flows.

## Risks and mitigations

### Risk: project looks like private hosted-service fundraising

Mitigation: the repo and grant scope explicitly focus on the open-source toolkit. Managed hosting is documented separately as a future sustainability path, not the grant deliverable.

### Risk: sponsor wallet security concerns

Mitigation: GasKit includes a threat model, safe config templates, sponsor-wallet guidance, KMS notes, quotas, hard caps, and failure-closed policy behavior.

### Risk: scope creep

Mitigation: the grant MVP excludes billing, enterprise SSO, legal/compliance services, cross-chain support, and commercial SLAs.

### Risk: dependency on upstream Gas Station changes

Mitigation: GasKit wraps documented API behavior and keeps SDK/gateway modules isolated so compatibility updates are localized.

### Risk: abuse or runaway gas spend

Mitigation: policy gateway enforces app keys, app budgets, wallet limits, package/function allowlists, denylists, gas-budget caps, and structured rejections.

## Long-term sustainability

After the grant, the open-source toolkit remains useful for any IOTA builder. Sustainability can come from:

- managed hosting;
- enterprise deployment support;
- custom integrations;
- premium observability;
- ecosystem partnerships;
- community contributions.

The core toolkit remains open source.

## Application-ready answer: What are you building?

I am building IOTA GasKit, an open-source toolkit that helps IOTA builders deploy and operate gas-sponsored transaction infrastructure. It adds deployment templates, policy controls, quotas, app keys, usage tracking, a TypeScript SDK, an operator dashboard, and production hardening documentation around the official IOTA Gas Station component.

## Application-ready answer: What problem does it solve?

IOTA Gas Station enables sponsored transactions, but dApp teams still need production infrastructure around it. They need safe deployment, app-level controls, usage limits, monitoring, and integration examples. Without reusable tooling, every team has to solve these same problems independently.

## Application-ready answer: Why is this useful for IOTA?

Gasless onboarding makes IOTA applications easier for real users, especially non-crypto users and enterprise workflows. GasKit reduces integration friction and helps more IOTA apps offer sponsored transactions safely.

## Application-ready answer: Why should this be open source?

Gas sponsorship is ecosystem infrastructure. Builders should be able to inspect, self-host, fork, and extend the toolkit. Open sourcing the core makes the project valuable even without any future managed service.

## Application-ready answer: What happens after the grant?

After the grant, the open-source toolkit continues as community infrastructure. A managed service may later provide hosting, support, and enterprise deployment help, while the core toolkit remains open source.
