# TypeScript SDK

The SDK helps dApp backends interact with GasKit without hand-writing raw HTTP calls.

## Planned API

```ts
import { createGasKitClient } from "@iota-gaskit/sdk";

const client = createGasKitClient({
  baseUrl: "https://api.example.com",
  apiKey: process.env.GASKIT_API_KEY!,
});

const reservation = await client.reserveGas({
  gasBudget: 50_000_000,
  walletAddress: userAddress,
  packageId: "0x...",
  functionName: "mint_badge",
});

const result = await client.executeSponsoredTransaction({
  reservationId: reservation.reservationId,
  gasKitTransactionId: reservation.gasKitTransactionId,
  transactionBytes,
  userSignature,
});
```

The API key belongs on the backend, not in browser code.
