# @iota-gaskit/sdk

TypeScript client scaffold for applications integrating with an IOTA GasKit policy gateway.

## Install

```sh
npm install @iota-gaskit/sdk
```

## Usage

```ts
import { createGasKitClient, GasKitPolicyError } from "@iota-gaskit/sdk";

const gasKit = createGasKitClient({
  baseUrl: "https://gateway.example.invalid",
  apiKey: process.env.GASKIT_APP_API_KEY ?? "",
});

try {
  const decision = await gasKit.simulatePolicy({
    gasBudget: 1_000_000,
    packageId: "0xpackage",
    functionName: "mint",
  });

  if (!decision.allowed) {
    console.log(decision.reasonCode, decision.message);
  }
} catch (error) {
  if (error instanceof GasKitPolicyError) {
    console.error(error.reasonCode, error.message);
  }
  throw error;
}
```

The client calls a configured policy gateway over HTTP. It does not embed sponsor credentials and does not itself prove live/testnet transaction execution.
