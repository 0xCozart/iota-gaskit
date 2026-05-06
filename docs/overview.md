# IOTA GasKit

IOTA GasKit is a self-hostable toolkit for teams that want to pay IOTA transaction fees for their users.

The short version: users still approve their own transactions, but the app can cover the small network fee. GasKit helps the app do that safely by keeping sponsor secrets server-side, checking policy before spending gas, and recording sanitized usage events.

If terms like gas, sponsor wallet, package ID, or IOTA Gas Station are new, start with [IOTA and GasKit Basics](concepts.md).

## Why This Exists

Gas sponsorship removes a common onboarding problem: users should not need to find testnet tokens, buy IOTA, or understand fee mechanics before trying an app.

The hard part is not paying the fee once. The hard part is paying fees safely over time. A sponsor wallet can spend real funds on Mainnet, so operators need controls:

- which apps are allowed to request sponsorship;
- which wallets can use the sponsor;
- which Move packages and functions may be sponsored;
- how much gas an app or wallet can use;
- what happened when a request was allowed or rejected.

GasKit packages those controls into an SDK, policy gateway, local service, examples, docs, and verification scripts.

## Relationship to IOTA Gas Station

GasKit does not replace the official IOTA Gas Station. It sits around it.

Application backends call the GasKit SDK or gateway. GasKit applies app credentials and sponsorship policy. Only allowed requests are proxied to IOTA Gas Station, which manages sponsor-owned gas objects and talks to the IOTA network.

```text
dApp backend -> GasKit -> IOTA Gas Station -> IOTA network
```

The official Gas Station is the sponsorship engine. GasKit is the app integration and operator safety layer around that engine.

## What GasKit Helps With

- Keep sponsor credentials and app API keys off the frontend.
- Apply app-level and wallet-level sponsorship limits.
- Restrict sponsorship to allowed packages and functions.
- Preflight policy decisions before creating reservations.
- Emit sanitized decision events for usage and rejection visibility.
- Provide TypeScript SDK and backend examples for dApp teams.
- Document the operator path from local proof to testnet and production hardening.

## Who It Is For

- dApp builders who want users to try IOTA flows without first holding IOTA tokens.
- Teams running their own sponsor wallet and needing policy, usage visibility, and safer backend integration.
- Grant reviewers or contributors who need a deterministic local proof path before live testnet credentials are used.
- Operators who want a self-hostable path rather than a closed hosted sponsorship service.

## What Exists Today

| Area | Current status | Start here |
| --- | --- | --- |
| Beginner concepts | Plain-English explanations of IOTA, sponsored gas, GasKit roles, and common terms. | [IOTA and GasKit Basics](concepts.md) |
| Code examples | Backend SDK calls, Next.js route shape, browser caller shape, curl requests, and policy YAML. | [Code Examples](examples.md) |
| Agent workflow | Repo-local Codex skill for agents that need to navigate, develop, verify, or integrate GasKit safely. | [Agent Guide](agent-guide.md) |
| Local verification | Tests, typecheck, local gateway smoke, demo dApp smoke, package dry-runs, and secret scan run without live IOTA services. | [Quickstart](quickstart.md) |
| Policy gateway | App auth, allowlists, quotas, wallet denial, simulation, reserve proxying, execute proxying, and safe errors are implemented for local proof. | [Policy Gateway](policy.md) |
| SDK | Backend client helpers cover policy simulation, reserve, execute, typed errors, and malformed-response handling. | [TypeScript SDK](sdk.md) |
| Usage visibility | Sanitized decision events, in-memory usage snapshots, JSONL replay, and a local authenticated operator usage API exist as foundations. | [Observability](observability.md) |
| Testnet proof | A real sponsored IOTA testnet execute has been documented, but live proof still requires operator-owned local credentials. | [Testnet Readiness](testnet-readiness.md) |

## What Is Still Roadmap

These are not complete production claims yet:

- full dashboard UI;
- production-grade durable usage storage;
- production monitoring and alerting templates;
- package publication;
- KMS or external signer production integration;
- mainnet operational validation;
- final public walkthrough assets.

## Recommended First Path

1. Read [IOTA and GasKit Basics](concepts.md) if sponsored gas or IOTA terms are unfamiliar.
2. Read [Architecture](architecture.md) to understand why the gateway, SDK, and policy layers are separate.
3. Copy the safe backend and route patterns from [Code Examples](examples.md).
4. Use [Agent Guide](agent-guide.md) when handing work to an AI coding agent.
5. Run the deterministic local checks in [Quickstart](quickstart.md).
6. Read [Best Practices](best-practices.md) before adding live credentials.
7. Review [Testnet Readiness](testnet-readiness.md) before a live sponsored transaction attempt.
8. Use [Deployment](deployment.md) and [Production Hardening](production-hardening.md) when moving beyond local proof.

## Safety Boundary

Treat the sponsor wallet as a funded operational asset. Every sponsored path should be authenticated, allowlisted, budgeted, observable, and secret-free in logs. Use `simulatePolicy()` when possible, and keep browser code behind same-origin backend routes that own GasKit app credentials.
