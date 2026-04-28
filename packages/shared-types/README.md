# @iota-gaskit/shared-types

Shared TypeScript policy and request/decision types for IOTA GasKit packages.

## Install

```sh
npm install @iota-gaskit/shared-types
```

## Usage

```ts
import type { SponsorshipPolicy, SponsorshipRequestContext } from "@iota-gaskit/shared-types";
import { POLICY_REASON_CODES } from "@iota-gaskit/shared-types";

const policy: SponsorshipPolicy = {
  appId: "demo-app",
  appStatus: "active",
  allowedPackages: [],
  maxGasBudgetPerTx: 10_000_000,
};

const request: SponsorshipRequestContext = {
  authenticated: true,
  appId: "demo-app",
  gasBudget: 1_000_000,
};

console.log(POLICY_REASON_CODES, policy, request);
```

This package contains types and constants only; it does not contact IOTA RPC, an official Gas Station service, or any external network.
