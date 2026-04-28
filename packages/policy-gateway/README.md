# @iota-gaskit/policy-gateway

Fail-closed sponsorship policy evaluation helpers for IOTA GasKit gateways.

## Install

```sh
npm install @iota-gaskit/policy-gateway @iota-gaskit/shared-types
```

## Usage

```ts
import { evaluateSponsorshipPolicy } from "@iota-gaskit/policy-gateway";

const decision = evaluateSponsorshipPolicy(
  {
    appId: "demo-app",
    appStatus: "active",
    allowedPackages: ["0xpackage"],
    maxGasBudgetPerTx: 10_000_000,
  },
  {
    authenticated: true,
    appId: "demo-app",
    packageId: "0xpackage",
    gasBudget: 1_000_000,
  },
);

if (!decision.allowed) {
  console.error(decision.reasonCode, decision.message);
}
```

The evaluator is deterministic and local. It does not reserve gas, execute transactions, call IOTA RPC, or enforce quotas beyond the request context values supplied by the caller.
