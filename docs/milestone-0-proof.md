# Milestone 0 Proof Of Capability

Date: 2026-04-24

Purpose: document the current pre-grant proof that IOTA GasKit is more than a proposal. This repo is a clean open-source grant scaffold extracted from a working GaaS prototype.

## Public repository

Repository:

```text
https://github.com/0xCozart/iota-gaskit
```

Initial scaffold commit:

```text
508453a chore: scaffold iota gaskit grant readiness repo
```

## What exists now

Open-source hygiene:

- `README.md`
- `LICENSE`
- `CONTRIBUTING.md`
- `SECURITY.md`
- GitHub issue templates
- Pull request template

Grant-facing docs:

- `docs/grant-application.md`
- `docs/grant-milestones.md`
- `docs/grant-scope.md`
- `docs/reviewer-checklist.md`
- `docs/reviewer-walkthrough.md`
- `docs/demo-script.md`
- `docs/architecture.md`
- `docs/assets/iota-gaskit-architecture.svg`

Security and operations docs:

- `docs/threat-model.md`
- `docs/production-hardening.md`
- `docs/security/sponsor-wallet.md`
- `docs/security/secrets.md`

Code/package scaffolds:

- `packages/shared-types`
- `packages/policy-gateway`
- `packages/sdk`
- `apps/demo-dapp`
- `examples/nextjs-api-route`
- `examples/node-backend`
- `examples/policies/demo-dapp.yaml`
- `deploy/gas-station/config.example.yaml`

## Current verification commands

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npm test
```

Latest local result:

```text
tests 16
pass 16
fail 0
cancelled 0
skipped 0
todo 0
```

Run typecheck:

```bash
npm run typecheck
```

Latest local result:

```text
npm run build && tsc --noEmit
exit code 0
```

Run combined grant check:

```bash
npm run grant:check
```

Latest local result:

```text
npm test && npm run typecheck && npm run pack:check
exit code 0
```

## Current test coverage

Policy gateway tests verify:

- missing auth rejects with `AUTH_MISSING`;
- app ID mismatch rejects with `AUTH_INVALID`;
- disabled app rejects with `APP_DISABLED`;
- daily request limit rejects with `APP_DAILY_REQUEST_LIMIT_EXCEEDED`;
- high gas budget rejects with `GAS_BUDGET_TOO_HIGH`;
- non-allowlisted package rejects with `PACKAGE_NOT_ALLOWED`;
- missing package metadata fails closed when package allowlists are configured;
- missing function metadata fails closed when function allowlists are configured;
- non-allowlisted function rejects with `FUNCTION_NOT_ALLOWED`;
- denied wallet rejects with `WALLET_DENIED`;
- valid request is allowed.

SDK tests verify:

- `reserveGas()` constructs the expected request;
- malformed successful reserve responses throw `GasKitError`;
- `executeSponsoredTransaction()` returns a transaction digest;
- auth rejection throws `GasKitAuthError`;
- policy rejection throws `GasKitPolicyError`.

## Secret-oriented scan

A local scan was run over non-ignored project files, excluding `node_modules`, `.git`, `dist`, and `.next`, for obvious sensitive patterns including:

- IOTA private-key prefix patterns
- Stripe secret keys
- Stripe webhook secrets
- Resend keys
- private key blocks
- Postgres connection URLs

Latest local result:

```text
findings_count 0
```

This is not a substitute for a full professional secret scan before every release, but it confirms the grant scaffold does not contain obvious copied sponsor keys or service credentials.

## Prototype evidence inherited from source project

The clean repo was extracted from a separate non-public GaaS source prototype. That source prototype has verified:

- Express gas sponsorship gateway;
- API-key authentication;
- quota and reservation controls;
- transaction logging;
- dashboard UI;
- code sample generation;
- Docker Compose deployment shape;
- Prometheus/Grafana monitoring assets.

Recent source prototype verification before extraction:

- frontend tests passed;
- frontend build passed;
- backend tests under Node 20.17.0 passed;
- backend build under Node 20.17.0 passed.

## What Milestone 0 proves

Milestone 0 proves:

1. The repo exists publicly and is safely framed as an open-source toolkit.
2. The project has a realistic architecture and grant milestone plan.
3. The core policy/SDK surfaces are scaffolded with passing tests.
4. The team has a working source prototype to extract from.
5. The project is ready to proceed into Milestone 1: local deployment kit and sponsored transaction demo.

## What Milestone 0 does not claim

Milestone 0 does not claim that:

- the full local Gas Station quickstart is complete;
- the demo dApp executes a real sponsored testnet transaction yet;
- package/function allowlists are integrated into the gateway proxy yet beyond the standalone policy decision scaffold;
- the operator dashboard has all PRD views yet;
- production hardening is complete.

Those are grant milestone deliverables.
