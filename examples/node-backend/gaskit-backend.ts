import {
  GasKitAuthError,
  GasKitError,
  GasKitPolicyError,
  type ExecuteSponsoredTransactionRequest,
  type ExecuteSponsoredTransactionResponse,
  type ReserveGasRequest,
  type ReserveGasResponse,
} from "../../packages/sdk/src/index.js";

export interface GasKitBackendClient {
  reserveGas(request: ReserveGasRequest): Promise<ReserveGasResponse>;
  executeSponsoredTransaction(
    request: ExecuteSponsoredTransactionRequest,
  ): Promise<ExecuteSponsoredTransactionResponse>;
}

export interface GasKitExampleResponse<TBody extends object> {
  status: number;
  body: TBody;
}

export interface GasKitExampleErrorBody {
  error: "AUTH_FAILED" | "POLICY_REJECTED" | "GASKIT_REQUEST_FAILED" | "INTERNAL_ERROR";
  message: string;
  reasonCode?: string;
}

export type GasKitExampleResult<TBody extends object> = GasKitExampleResponse<TBody | GasKitExampleErrorBody>;

export interface CreateGasKitBackendHandlersOptions {
  client: GasKitBackendClient;
}

export interface ReserveHandlerInput {
  gasBudget: number;
  reserveDurationSecs?: number;
  walletAddress?: string;
  packageId?: string;
  functionName?: string;
}

export interface ReserveHandlerBody {
  reservationId: string;
  gasKitTransactionId: string;
  sponsorAddress?: string;
}

export type ExecuteHandlerInput = ExecuteSponsoredTransactionRequest;

export interface ExecuteHandlerBody {
  digest?: string;
}

function statusOrFallback(status: number | undefined, fallback: number): number {
  return typeof status === "number" && status >= 400 && status <= 599 ? status : fallback;
}

function safeErrorResponse(error: unknown): GasKitExampleResponse<GasKitExampleErrorBody> {
  if (error instanceof GasKitAuthError) {
    return {
      status: statusOrFallback(error.status, 401),
      body: {
        error: "AUTH_FAILED",
        message: "GasKit authentication failed.",
      },
    };
  }

  if (error instanceof GasKitPolicyError) {
    return {
      status: statusOrFallback(error.status, 400),
      body: {
        error: "POLICY_REJECTED",
        message: "Request rejected by GasKit policy.",
        ...(error.reasonCode === undefined ? {} : { reasonCode: error.reasonCode }),
      },
    };
  }

  if (error instanceof GasKitError) {
    return {
      status: statusOrFallback(error.status, 502),
      body: {
        error: "GASKIT_REQUEST_FAILED",
        message: "GasKit request failed.",
      },
    };
  }

  return {
    status: 500,
    body: {
      error: "INTERNAL_ERROR",
      message: "Internal server error.",
    },
  };
}

export function createGasKitBackendHandlers(options: CreateGasKitBackendHandlersOptions) {
  return {
    async reserve(input: ReserveHandlerInput): Promise<GasKitExampleResult<ReserveHandlerBody>> {
      try {
        const reservation = await options.client.reserveGas({
          gasBudget: input.gasBudget,
          reserveDurationSecs: input.reserveDurationSecs,
          walletAddress: input.walletAddress,
          packageId: input.packageId,
          functionName: input.functionName,
        });

        return {
          status: 200,
          body: {
            reservationId: reservation.reservationId,
            gasKitTransactionId: reservation.gasKitTransactionId,
            ...(reservation.sponsorAddress === undefined ? {} : { sponsorAddress: reservation.sponsorAddress }),
          },
        };
      } catch (error) {
        return safeErrorResponse(error);
      }
    },

    async execute(input: ExecuteHandlerInput): Promise<GasKitExampleResult<ExecuteHandlerBody>> {
      try {
        const executed = await options.client.executeSponsoredTransaction({
          reservationId: input.reservationId,
          gasKitTransactionId: input.gasKitTransactionId,
          transactionBytes: input.transactionBytes,
          userSignature: input.userSignature,
        });

        return {
          status: 200,
          body: {
            ...(executed.digest === undefined ? {} : { digest: executed.digest }),
          },
        };
      } catch (error) {
        return safeErrorResponse(error);
      }
    },
  };
}
