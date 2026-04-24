# Reviewer Walkthrough

Date: 2026-04-24

Purpose: give grant reviewers a short, reproducible path through the IOTA GasKit repo without implying that future milestone deliverables are already complete.

## 1. Start with the thesis

Read:

- `README.md`
- `docs/grant-scope.md`
- `docs/managed-service-roadmap.md`

What to verify:

- GasKit is framed as an open-source toolkit around IOTA Gas Station.
- The grant-funded core remains self-hostable and inspectable.
- Future managed hosting/support is separated from the grant MVP.

## 2. Check repository hygiene

Read:

- `LICENSE`
- `NOTICE`
- `CONTRIBUTING.md`
- `SECURITY.md`
- `.github/ISSUE_TEMPLATE/bug_report.md`
- `.github/ISSUE_TEMPLATE/feature_request.md`
- `.github/pull_request_template.md`

What to verify:

- The repository is Apache-2.0 licensed.
- Contributors and security reporters have a clear path.
- Sensitive sponsor-wallet material is explicitly forbidden.

## 3. Review the proposed architecture

Read:

- `docs/architecture.md`
- `docs/assets/iota-gaskit-architecture.svg`
- `docs/threat-model.md`
- `docs/production-hardening.md`
- `docs/security/sponsor-wallet.md`
- `docs/security/secrets.md`

What to verify:

- The policy gateway sits between apps/SDKs and IOTA Gas Station.
- Sponsor-wallet safety is treated as the primary security boundary.
- Allowlists, quotas, denial rules, observability, and private Gas Station access are represented.

## 4. Verify the current code scaffold

Run from the repository root:

```bash
npm install
npm run grant:check
```

Expected current result:

- workspace packages build to local `dist/` folders;
- policy gateway and SDK tests pass;
- TypeScript typecheck passes;
- npm package dry-runs complete for the workspace packages.

The important source files are:

- `packages/shared-types/src/policy.ts`
- `packages/policy-gateway/src/policy.ts`
- `packages/policy-gateway/src/policy.test.ts`
- `packages/sdk/src/client.ts`
- `packages/sdk/src/client.test.ts`

What to verify:

- policy decisions are typed and reason-coded;
- package/function allowlists fail closed when configured metadata is missing;
- SDK success responses validate required identifiers instead of silently returning empty strings;
- tests cover representative reject/allow/error paths.

## 5. Review grant plan and evidence

Read:

- `docs/grant-application.md`
- `docs/grant-milestones.md`
- `docs/milestone-0-proof.md`
- `docs/demo-script.md`
- `docs/reviewer-checklist.md`

What to verify:

- the recommended Tier 2 ask is tied to concrete deliverables;
- Milestone 0 is described as a proof-of-capability scaffold, not a finished Gas Station product;
- future milestones are measurable and demo-oriented.

## 6. Inspect deployment and examples with the correct expectation

Read:

- `docs/quickstart.md`
- `docs/deployment.md`
- `deploy/docker-compose/docker-compose.local.yml`
- `deploy/gas-station/config.example.yaml`
- `examples/policies/demo-dapp.yaml`
- `examples/node-backend/README.md`
- `examples/nextjs-api-route/README.md`
- `apps/demo-dapp/README.md`

What to verify:

- these are safe scaffolds/templates for Milestone 1, not a completed full-stack quickstart yet;
- no private keys or bearer tokens are embedded;
- local/testnet-first defaults are documented.

## Reviewer-safe conclusion

This repo currently proves that the team can present a clean, licensed, tested, security-conscious open-source toolkit scaffold for IOTA gas sponsorship. It does not ask reviewers to treat Milestone 1-5 functionality as already complete. The next grant-funded step is the end-to-end local deployment kit and sponsored transaction demo.
