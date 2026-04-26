import assert from "node:assert/strict";
import test from "node:test";

import { createGasKitBackendHandlers } from "./gaskit-backend.js";
import type {
  ExecuteSponsoredTransactionRequest,
  ExecuteSponsoredTransactionResponse,
  ReserveGasRequest,
  ReserveGasResponse,
} from "../../packages/sdk/src/index.js";

function asJson(value: unknown): string {
  return JSON.stringify(value);
}

test("reserve handler uses the server-owned SDK client and returns only safe reservation fields", async () => {
  const reserveCalls: ReserveGasRequest[] = [];
  const handlers = createGasKitBackendHandlers({
    client: {
      async reserveGas(request: ReserveGasRequest): Promise<ReserveGasResponse> {
        reserveCalls.push(request);
        return {
          reservationId: "reservation-1",
          gasKitTransactionId: "gaskit-1",
          sponsorAddress: "0xSPONSOR",
          gasCoins: [{ objectId: "coin-that-should-stay-server-side" }],
          raw: { upstreamDebug: "do-not-return" },
        };
      },
      async executeSponsoredTransaction(): Promise<ExecuteSponsoredTransactionResponse> {
        throw new Error("execute should not be called by reserve handler");
      },
    },
  });

  const response = await handlers.reserve({
    walletAddress: "0xUSER",
    packageId: "0xDEMO_PACKAGE",
    functionName: "mint_badge",
    gasBudget: 50_000_000,
  });

  assert.deepEqual(reserveCalls, [
    {
      walletAddress: "0xUSER",
      packageId: "0xDEMO_PACKAGE",
      functionName: "mint_badge",
      gasBudget: 50_000_000,
    },
  ]);
  assert.equal(response.status, 200);
  assert.deepEqual(response.body, {
    reservationId: "reservation-1",
    gasKitTransactionId: "gaskit-1",
    sponsorAddress: "0xSPONSOR",
  });
  assert.doesNotMatch(asJson(response.body), /do-not-return|coin-that-should-stay-server-side|apiKey|Bearer/i);
});

test("execute handler omits transaction bytes, user signatures, and raw upstream bodies", async () => {
  const executeCalls: ExecuteSponsoredTransactionRequest[] = [];
  const handlers = createGasKitBackendHandlers({
    client: {
      async reserveGas(): Promise<ReserveGasResponse> {
        throw new Error("reserve should not be called by execute handler");
      },
      async executeSponsoredTransaction(
        request: ExecuteSponsoredTransactionRequest,
      ): Promise<ExecuteSponsoredTransactionResponse> {
        executeCalls.push(request);
        return {
          digest: "demo-digest-1",
          raw: {
            transactionBytes: "raw-bytes-that-should-stay-server-side",
            userSignature: "raw-signature-that-should-stay-server-side",
          },
        };
      },
    },
  });

  const response = await handlers.execute({
    reservationId: "reservation-1",
    gasKitTransactionId: "gaskit-1",
    transactionBytes: "client-transaction-bytes",
    userSignature: "client-user-signature",
  });

  assert.deepEqual(executeCalls, [
    {
      reservationId: "reservation-1",
      gasKitTransactionId: "gaskit-1",
      transactionBytes: "client-transaction-bytes",
      userSignature: "client-user-signature",
    },
  ]);
  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { digest: "demo-digest-1" });
  assert.doesNotMatch(
    asJson(response.body),
    /raw-bytes-that-should-stay-server-side|raw-signature-that-should-stay-server-side|client-transaction-bytes|client-user-signature/i,
  );
});
