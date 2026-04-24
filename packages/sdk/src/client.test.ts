import assert from "node:assert/strict";
import { test } from "node:test";
import { createGasKitClient, GasKitPolicyError } from "./index.js";

test("reserveGas constructs the expected request", async () => {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const client = createGasKitClient({
    baseUrl: "https://api.example.test/",
    apiKey: "test-key",
    fetchImpl: async (url, init) => {
      calls.push({ url: String(url), init: init ?? {} });
      return new Response(JSON.stringify({
        result: {
          reservation_id: "reservation-1",
          sponsor_address: "0xsponsor",
          gas_coins: [{ objectId: "0xcoin" }],
        },
        _saas_tx_id: "tx-1",
      }), { status: 200, headers: { "Content-Type": "application/json" } });
    },
  });

  const response = await client.reserveGas({
    gasBudget: 50_000_000,
    reserveDurationSecs: 120,
    walletAddress: "0xwallet",
    packageId: "0xpackage",
    functionName: "mint_badge",
  });

  assert.equal(response.reservationId, "reservation-1");
  assert.equal(response.gasKitTransactionId, "tx-1");
  assert.equal(calls[0].url, "https://api.example.test/v1/reserve_gas");
  assert.equal((calls[0].init.headers as Record<string, string>).Authorization, "Bearer test-key");
  assert.deepEqual(JSON.parse(String(calls[0].init.body)), {
    gas_budget: 50_000_000,
    reserve_duration_secs: 120,
    wallet_address: "0xwallet",
    package_id: "0xpackage",
    function_name: "mint_badge",
  });
});

test("executeSponsoredTransaction returns transaction digest", async () => {
  const client = createGasKitClient({
    baseUrl: "https://api.example.test",
    apiKey: "test-key",
    fetchImpl: async () => new Response(JSON.stringify({
      effects: { transactionDigest: "digest-1" },
    }), { status: 200, headers: { "Content-Type": "application/json" } }),
  });

  const response = await client.executeSponsoredTransaction({
    reservationId: "reservation-1",
    gasKitTransactionId: "tx-1",
    transactionBytes: "base64-tx",
    userSignature: "base64-sig",
  });

  assert.equal(response.digest, "digest-1");
});

test("policy rejection throws GasKitPolicyError", async () => {
  const client = createGasKitClient({
    baseUrl: "https://api.example.test",
    apiKey: "test-key",
    fetchImpl: async () => new Response(JSON.stringify({
      error: "Package not allowed",
      reasonCode: "PACKAGE_NOT_ALLOWED",
    }), { status: 429, headers: { "Content-Type": "application/json" } }),
  });

  await assert.rejects(
    () => client.reserveGas({ gasBudget: 100 }),
    (error) => error instanceof GasKitPolicyError && error.reasonCode === "PACKAGE_NOT_ALLOWED",
  );
});
