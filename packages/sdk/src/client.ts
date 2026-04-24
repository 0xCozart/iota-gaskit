import { GasKitAuthError, GasKitError, GasKitPolicyError } from "./errors.js";
import type {
  ExecuteSponsoredTransactionRequest,
  ExecuteSponsoredTransactionResponse,
  GasKitClientOptions,
  ReserveGasRequest,
  ReserveGasResponse,
} from "./types.js";

type JsonRecord = Record<string, unknown>;

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.replace(/\/+$/, "");
}

async function parseJson(response: Response): Promise<unknown> {
  return response.json().catch(() => ({}));
}

function buildError(status: number, body: unknown): GasKitError {
  const record = typeof body === "object" && body !== null ? (body as JsonRecord) : {};
  const message =
    typeof record["message"] === "string"
      ? record["message"]
      : typeof record["error"] === "string"
        ? record["error"]
        : `GasKit request failed with HTTP ${status}`;
  const reasonCode = typeof record["reasonCode"] === "string" ? record["reasonCode"] : undefined;

  if (status === 401 || status === 403) return new GasKitAuthError(message, status, body);
  if (status === 400 || status === 409 || status === 429) {
    return new GasKitPolicyError(message, reasonCode, status, body);
  }
  return new GasKitError(message, status, body);
}

export function createGasKitClient(options: GasKitClientOptions) {
  const baseUrl = normalizeBaseUrl(options.baseUrl);
  const fetchImpl = options.fetchImpl ?? fetch;

  async function post<T>(path: string, body: unknown): Promise<T> {
    const response = await fetchImpl(`${baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${options.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    const json = await parseJson(response);
    if (!response.ok) throw buildError(response.status, json);
    return json as T;
  }

  return {
    async reserveGas(request: ReserveGasRequest): Promise<ReserveGasResponse> {
      const json = await post<JsonRecord>("/v1/reserve_gas", {
        gas_budget: request.gasBudget,
        reserve_duration_secs: request.reserveDurationSecs,
        wallet_address: request.walletAddress,
        package_id: request.packageId,
        function_name: request.functionName,
      });

      const result = (json["result"] ?? {}) as JsonRecord;
      return {
        reservationId: String(result["reservation_id"] ?? ""),
        gasKitTransactionId: String(json["_saas_tx_id"] ?? json["gasKitTransactionId"] ?? ""),
        sponsorAddress: typeof result["sponsor_address"] === "string" ? result["sponsor_address"] : undefined,
        gasCoins: Array.isArray(result["gas_coins"]) ? result["gas_coins"] : undefined,
        raw: json,
      };
    },

    async executeSponsoredTransaction(
      request: ExecuteSponsoredTransactionRequest,
    ): Promise<ExecuteSponsoredTransactionResponse> {
      const json = await post<JsonRecord>("/v1/execute_tx", {
        reservation_id: request.reservationId,
        _saas_tx_id: request.gasKitTransactionId,
        tx_bytes: request.transactionBytes,
        user_sig: request.userSignature,
      });

      const effects = (json["effects"] ?? {}) as JsonRecord;
      return {
        digest:
          typeof effects["transactionDigest"] === "string"
            ? effects["transactionDigest"]
            : typeof json["digest"] === "string"
              ? json["digest"]
              : undefined,
        raw: json,
      };
    },
  };
}
