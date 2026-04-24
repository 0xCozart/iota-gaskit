# IOTA GasKit Grant Readiness Sprint

Date: 2026-04-24

## Goal

Prepare the current GaaS prototype for an IOTA Foundation Tier 2 open-source development grant by turning it into a credible, review-ready proof of capability for the proposed IOTA GasKit toolkit.

The sprint does not need to complete the full PRD. It needs to make the repo and grant package convincing enough that a reviewer sees:

- a real working codebase,
- a clear open-source toolkit thesis,
- safe security posture,
- realistic milestone plan,
- credible execution path,
- separation between grant-funded open-source work and future managed SaaS.

## Core Recommendation: Current Repo vs New Repo

### Recommendation

Create a new clean public GitHub repo for the grant, but do not start from scratch.

Use the current `/mnt/d/CURSOR/gas_station` repo as the source/incubator, then extract or copy a cleaned, grant-focused version into a new repo named one of:

- `iota-gaskit`
- `iota-gas-station-saas-toolkit`
- `iota-gas-sponsorship-toolkit`

Best name: `iota-gaskit`.

### Why not submit the current repo directly?

The current repo is valuable, but it is not configured cleanly for grant review:

1. It is framed as a private/managed SaaS, not an open-source toolkit.
2. It includes billing/pricing/commercial surfaces that are outside the PRD grant MVP.
3. It has local build artifacts such as `backend/dist` and frontend `.next` output in the working tree.
4. Current Git state is degraded: `git status --short` reports the whole repo as untracked, and no useful remote output was available.
5. Prior audit found a live-looking sponsor key in gas config, so public history must be handled carefully.
6. Missing open-source hygiene files: `LICENSE`, `CONTRIBUTING.md`, `SECURITY.md`, issue templates, threat model.
7. Missing PRD-specific repo structure: `packages/sdk`, `packages/policy-gateway`, `apps/demo-dapp`, `examples/*`.

### Why not abandon the current repo?

Because it already contains major proof-of-capability:

- Express backend gateway/proxy.
- API-key auth.
- quota/reservation controls.
- transaction logging.
- customer/dashboard UI.
- Docker Compose stack.
- Prometheus/Grafana monitoring.
- Stripe/Resend integrations.
- code samples.
- tests passing.

The correct move is extraction/refactoring, not restart.

### Working model

During sprint:

- Continue editing in `/mnt/d/CURSOR/gas_station` to create docs/plans and source materials.
- Build a cleaned grant branch/folder structure here first.
- Once ready, initialize a new clean GitHub repo `iota-gaskit` with only scrubbed source, docs, examples, and toolkit framing.
- Do not copy build artifacts, local secrets, old `.env`, `.next`, `dist`, runtime data, or SaaS-only clutter.

## Sprint Outcome

At the end of the sprint, we should have:

1. A grant-review-ready open-source repo or prepared repo tree.
2. README rewritten for IOTA GasKit toolkit.
3. Clear separation between open-source grant deliverables and future managed SaaS.
4. Safe gas-station config template with no committed private key.
5. Apache-2.0 license.
6. Contribution and security docs.
7. Threat model draft.
8. Grant milestone doc aligned to the PRD.
9. SDK package scaffold.
10. Policy gateway package scaffold with reason codes and first tests.
11. Demo dApp/example scaffold.
12. Architecture diagram or diagram source.
13. Demo video script.
14. Full build/test verification.

## Current Evidence

Recent verification from this session:

- Frontend tests passed: 7/7.
- Frontend build passed.
- Backend tests under Node 20.17.0 passed: 11/11.
- Backend build under Node 20.17.0 passed.
- Current Git status reports every repo file as untracked, implying this local checkout is not suitable as-is for clean public grant submission.

Related analysis:

- `docs/audits/2026-04-24-iota-gaskit-prd-gap-analysis.md`
- `docs/audits/2026-04-23-project-and-monetization-audit.md`
- `docs/MASTER_ROADMAP.md`

## Sprint Timeline

Recommended sprint length: 10 working days.

Can be compressed to 5 intense days for grant application submission, but 10 days is more realistic if we want a meaningful demo scaffold and clean docs.

## Day 0: Repo Decision And Safety Setup

### Objective

Decide repo strategy and prevent accidental public exposure of unsafe artifacts.

### Tasks

1. Confirm new public repo name.
   - Recommended: `iota-gaskit`.

2. Add or confirm `.gitignore` excludes:
   - `.env`
   - `.env.*` except curated examples
   - `backend/dist/`
   - `frontend/.next/`
   - `node_modules/`
   - runtime `data/` files where applicable
   - logs
   - local SQLite databases

3. Decide extraction path:
   - Option A: create new sibling directory `/mnt/d/CURSOR/iota-gaskit` and copy curated files.
   - Option B: create `grant/iota-gaskit/` staging folder in current repo.
   - Recommended: Option A for clean repo initialization.

4. Run secret scan before anything public.
   - Use a local scan tool if available, or at minimum search for known key fields.
   - Any real-looking key material must be removed before commit.

### Deliverables

- Repo strategy decision written down.
- Clean target repo name selected.
- Safety checklist started.

### Acceptance Criteria

- We know whether the public repo is new or current.
- No one pushes current untracked tree directly to GitHub.
- Unsafe config is identified as a blocker.

## Day 1: Open-Source Identity And Hygiene

### Objective

Make the project look like a real open-source infrastructure project rather than a private SaaS prototype.

### Files To Create/Modify

- `README.md`
- `LICENSE`
- `CONTRIBUTING.md`
- `SECURITY.md`
- `.github/ISSUE_TEMPLATE/bug_report.md`
- `.github/ISSUE_TEMPLATE/feature_request.md`
- `.github/pull_request_template.md`
- `docs/grant-scope.md`
- `docs/managed-service-roadmap.md`

### Tasks

1. Rewrite top of README around IOTA GasKit:

   ```text
   IOTA GasKit is an open-source toolkit for deploying, securing, monitoring, and integrating sponsored transaction infrastructure around IOTA Gas Station.
   ```

2. Add explicit grant scope:

   ```text
   The grant funds the open-source toolkit. A future managed service may offer hosting, support, SLAs, and enterprise onboarding, but the core toolkit is independently deployable.
   ```

3. Move SaaS/commercial pricing out of the main README path.

4. Add Apache-2.0 license.

5. Add contribution guide.

6. Add security disclosure policy.

7. Add issue and PR templates.

### Acceptance Criteria

- A reviewer immediately understands this is an open-source toolkit.
- SaaS billing is clearly future/commercial and not the grant MVP.
- License and contributor docs exist.

## Day 2: Unsafe Config Cleanup And Security Baseline

### Objective

Remove reviewer-trust blockers around sponsor key handling and production safety.

### Files To Create/Modify

- `gas-station-config/config.yaml`
- `gas-station-config/config.example.yaml`
- `.env.example`
- `docs/security/sponsor-wallet.md`
- `docs/security/secrets.md`
- `docs/threat-model.md`
- `docs/production-hardening.md`

### Tasks

1. Replace real-looking gas-station config with safe template.

2. Move all key material to placeholders:

   ```yaml
   signer-config:
     local:
       keypair: "${GAS_STATION_KEYPAIR}"
   ```

   If the upstream image does not support env interpolation directly, document the generation step instead of committing real keys.

3. Fix testnet URL typo if present:

   ```text
   https://api.testnet.iota.cafe
   ```

4. Add explicit note:

   ```text
   Never commit sponsor private keys. If a key was ever committed, rotate that wallet before funding it.
   ```

5. Draft threat model covering:
   - sponsor wallet drain,
   - API key leakage,
   - bearer token leakage,
   - quota abuse,
   - replay/double execution,
   - package/function policy bypass,
   - Redis exposure,
   - misconfigured public gas station,
   - dashboard secret exposure,
   - supply-chain/dependency risk.

### Acceptance Criteria

- No real-looking sponsor key remains in checked-in config.
- Threat model exists.
- Production hardening doc exists.
- Sponsor wallet docs explain rotation/KMS/env guidance.

## Day 3: Toolkit Repo Structure Scaffold

### Objective

Create the PRD-aligned shape reviewers expect.

### Files/Folders To Create

```text
apps/
  dashboard/
  demo-dapp/
packages/
  sdk/
  policy-gateway/
  shared-types/
examples/
  nextjs-api-route/
  node-backend/
docs/
  quickstart.md
  architecture.md
  deployment.md
  policy.md
  sdk.md
  grant-milestones.md
  demo-script.md
```

### Tasks

1. Decide whether to physically move current frontend/backend now or create scaffolds first.

Recommended for sprint:

- Do not fully reorganize code yet.
- Add scaffold directories and README files that describe intended extraction.
- Keep existing `backend/` and `frontend/` working until after grant submission.

2. Create `packages/shared-types` placeholder with reason-code and core DTO plan.

3. Create `packages/policy-gateway` placeholder with README and first policy types.

4. Create `packages/sdk` placeholder with README and intended API.

5. Create `apps/demo-dapp` README describing demo transaction flow.

### Acceptance Criteria

- PRD repo structure is visible.
- Existing builds are not broken by the scaffold.
- README links to scaffold packages and examples.

## Day 4: Policy Reason Codes And Config Schema

### Objective

Show the core of the grant’s policy gateway in code, not just prose.

### Files To Create

- `packages/shared-types/package.json`
- `packages/shared-types/src/policy.ts`
- `packages/policy-gateway/package.json`
- `packages/policy-gateway/src/policy.ts`
- `packages/policy-gateway/src/policy.test.ts`
- `docs/policy.md`
- `examples/policies/demo-dapp.yaml`

### Initial Reason Codes

```ts
export const POLICY_REASON_CODES = [
  "AUTH_MISSING",
  "AUTH_INVALID",
  "APP_DISABLED",
  "APP_DAILY_BUDGET_EXCEEDED",
  "APP_DAILY_REQUEST_LIMIT_EXCEEDED",
  "WALLET_DAILY_LIMIT_EXCEEDED",
  "PACKAGE_NOT_ALLOWED",
  "FUNCTION_NOT_ALLOWED",
  "WALLET_DENIED",
  "GAS_BUDGET_TOO_HIGH",
  "POLICY_CONFIG_INVALID",
  "GAS_STATION_UNAVAILABLE",
  "EXECUTION_FAILED",
] as const;

export type PolicyReasonCode = (typeof POLICY_REASON_CODES)[number];
```

### Minimum Policy Tests

At least five:

1. Missing auth rejects with `AUTH_MISSING`.
2. Disabled app rejects with `APP_DISABLED`.
3. Gas budget too high rejects with `GAS_BUDGET_TOO_HIGH`.
4. Package not allowed rejects with `PACKAGE_NOT_ALLOWED`.
5. Denied wallet rejects with `WALLET_DENIED`.

### Acceptance Criteria

- Policy package has tests.
- Reason codes match PRD.
- Policy docs include example YAML.

## Day 5: SDK Scaffold

### Objective

Make the TypeScript SDK deliverable visible and credible.

### Files To Create

- `packages/sdk/package.json`
- `packages/sdk/src/index.ts`
- `packages/sdk/src/client.ts`
- `packages/sdk/src/errors.ts`
- `packages/sdk/src/types.ts`
- `packages/sdk/src/client.test.ts`
- `docs/sdk.md`

### SDK API

Minimum intended API:

```ts
const client = createGasKitClient({
  baseUrl: "https://api.example.com",
  apiKey: process.env.GASKIT_API_KEY!,
});

const reservation = await client.reserveGas({
  gasBudget: 50_000_000,
  walletAddress: userAddress,
  packageId,
  functionName,
});

const result = await client.executeSponsoredTransaction({
  reservationId: reservation.reservationId,
  gasKitTransactionId: reservation.gasKitTransactionId,
  transactionBytes,
  userSignature,
});
```

### Acceptance Criteria

- SDK package exists.
- SDK docs exist.
- Request construction tests pass.
- SDK does not need to publish to npm before grant submission, but structure must be npm-ready.

## Day 6: Demo App And Examples Scaffold

### Objective

Make the final grant demo path concrete.

### Files To Create

- `apps/demo-dapp/README.md`
- `apps/demo-dapp/package.json`
- `apps/demo-dapp/src/` minimal scaffold if time permits
- `examples/nextjs-api-route/README.md`
- `examples/node-backend/README.md`
- `docs/demo-script.md`

### Demo Scenario

1. Operator starts local stack.
2. Operator opens dashboard.
3. Operator sees Gas Station health.
4. Demo app requests sponsored transaction.
5. Policy gateway approves.
6. Gas Station executes.
7. Dashboard updates.
8. Operator changes policy to block function.
9. Demo app receives structured rejection reason.

### Acceptance Criteria

- Demo app scaffold exists.
- Demo script is written.
- Reviewer can see exactly what final grant demo will prove.

## Day 7: Dashboard Reframing

### Objective

Reframe dashboard from SaaS customer UI toward operator toolkit UI without breaking current functionality.

### Files To Modify/Create

- `frontend/src/app/dashboard/page.tsx`
- `frontend/src/app/dashboard/docs/page.tsx`
- `docs/dashboard.md`

### Tasks

1. Add docs explaining current dashboard capabilities.
2. Add roadmap section for missing PRD operator dimensions:
   - app usage,
   - wallet usage,
   - policy rejections,
   - policy viewer,
   - CSV export.
3. If time permits, add static/placeholder dashboard sections clearly marked as upcoming toolkit operator features.

### Acceptance Criteria

- Dashboard is not oversold.
- Docs explain what is implemented now vs grant milestone work.

## Day 8: Grant Milestone Mapping And Architecture Diagram

### Objective

Make the application easy for a grant reviewer to verify.

### Files To Create

- `docs/grant-milestones.md`
- `docs/architecture.md`
- `docs/assets/architecture.svg` or Mermaid diagram in markdown
- `docs/reviewer-checklist.md`

### Tasks

1. Map each PRD milestone to repo deliverables.
2. For each milestone, list:
   - deliverables,
   - acceptance criteria,
   - demo evidence,
   - expected test command,
   - expected docs.
3. Add architecture diagram:

```text
Demo dApp -> SDK -> Policy Gateway -> IOTA Gas Station -> IOTA RPC
                         |
                         -> Usage Store -> Dashboard -> Metrics
```

### Acceptance Criteria

- Reviewer can understand the architecture in under five minutes.
- Milestones have concrete verification evidence.

## Day 9: Grant Narrative And Application Package

### Objective

Update grant docs to match the Tier 2 PRD and current proof-of-capability.

### Files To Modify/Create

- `docs/grant-application.md`
- `docs/grant-budget.md`
- `docs/grant-risk-mitigation.md`
- `docs/grant-submission-checklist.md`

### Tasks

1. Replace Tier 1 SaaS framing with Tier 2 open-source toolkit framing.
2. Budget target: $45,000-$50,000.
3. Recommended ask: $49,000.
4. Emphasize public-good deliverables.
5. Explicitly state future managed SaaS is outside grant-funded MVP.
6. Include current proof-of-capability without overstating completion.

### Acceptance Criteria

- Application text aligns with PRD.
- Budget aligns with milestones.
- Risks are acknowledged and mitigated.

## Day 10: Verification And Proof Video

### Objective

Lock the sprint output and produce reviewer-facing evidence.

### Verification Commands

Frontend:

```bash
cd frontend
npm test
npm run build
```

Backend under Node 20.17.0 in this environment:

```bash
cd backend
PATH=/home/bel/.nvm/versions/node/v20.17.0/bin:$PATH npm test
PATH=/home/bel/.nvm/versions/node/v20.17.0/bin:$PATH npm run build
```

Policy/SDK packages, once added:

```bash
npm test --workspaces
```

or package-specific commands based on final workspace setup.

### Proof Video Outline

Record 2-3 minutes showing:

1. Repo README and toolkit positioning.
2. Architecture diagram.
3. Existing backend/frontend tests passing.
4. Local dashboard/gas proxy proof if available.
5. Policy reason code tests if implemented.
6. SDK scaffold and demo app flow.
7. Grant milestones checklist.

### Acceptance Criteria

- All existing builds/tests pass.
- New policy/SDK tests pass if implemented.
- Grant submission checklist is complete enough to submit.
- Public repo is ready or clean staging tree is ready to push.

## Repo Creation Plan

### Option A: Clean New Repo Now

Create `/mnt/d/CURSOR/iota-gaskit` immediately and copy curated files.

Pros:

- clean identity,
- clean public history,
- no accidental SaaS clutter,
- best for grant reviewers.

Cons:

- requires careful copying and keeping useful code in sync,
- may slow immediate implementation slightly.

### Option B: Refactor Current Repo Then Extract

Continue working in `/mnt/d/CURSOR/gas_station`, then extract once docs and scaffolds are ready.

Pros:

- fastest to use current code,
- no duplication yet.

Cons:

- current git state is degraded,
- higher risk of accidentally publishing build artifacts or unsafe files,
- SaaS framing is embedded throughout.

### Recommended

Use Option B for at most 1-2 days while drafting, then create the clean new repo by Day 3.

Practical flow:

1. Work in current repo for sprint docs and cleanup plan.
2. Create `/mnt/d/CURSOR/iota-gaskit`.
3. Copy only curated source/docs/config examples.
4. Initialize Git there.
5. Add clean `.gitignore` first.
6. Run secret scan.
7. Make initial commit.
8. Push to GitHub public when safe.

## Initial Clean Repo Contents

Suggested first public tree:

```text
iota-gaskit/
  README.md
  LICENSE
  CONTRIBUTING.md
  SECURITY.md
  .gitignore
  .github/
    ISSUE_TEMPLATE/
    pull_request_template.md
  backend/                 # current gateway, renamed later to packages/policy-gateway or apps/api
  frontend/                # current dashboard, renamed later to apps/dashboard
  deploy/
    docker-compose/
    nginx/
    redis/
  monitoring/
  packages/
    sdk/
    policy-gateway/
    shared-types/
  apps/
    demo-dapp/
  examples/
    nextjs-api-route/
    node-backend/
  docs/
    quickstart.md
    architecture.md
    deployment.md
    policy.md
    sdk.md
    threat-model.md
    production-hardening.md
    grant-milestones.md
    reviewer-checklist.md
```

## Sprint Risks

1. Secret exposure risk.
   - Mitigation: do not push until config is scrubbed and secret scan passes.

2. Scope creep.
   - Mitigation: submission readiness, not full PRD completion.

3. Breaking working SaaS prototype while refactoring.
   - Mitigation: keep current backend/frontend paths stable through grant submission; add scaffolds first.

4. Reviewer confusion from billing/SaaS features.
   - Mitigation: separate open-source grant scope from future managed service docs.

5. No demo transaction before submission.
   - Mitigation: at minimum provide scaffold, tests, architecture, and proof-of-capability; ideally record existing gas proxy/test flow.

## Final Recommendation

Do create a new public repo for the IOTA Foundation grant.

Do not rewrite from scratch.

Use the current repo as the working prototype and source of proven implementation. Extract a clean, grant-focused `iota-gaskit` repo with safe config, open-source hygiene, toolkit framing, PRD-aligned scaffolds, and a credible milestone path.

The immediate next action is Day 0:

1. Confirm repo name: recommended `iota-gaskit`.
2. Confirm public license: recommended Apache-2.0.
3. Confirm we will create a clean new repo rather than publishing this current local tree as-is.
4. Start with README/LICENSE/CONTRIBUTING/SECURITY and config cleanup.
