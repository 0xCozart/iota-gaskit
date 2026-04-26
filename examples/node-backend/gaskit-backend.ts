import type {
  ExecuteSponsoredTransactionRequest,
  ExecuteSponsoredTransactionResponse,
  ReserveGasRequest,
  ReserveGasResponse,
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

export interface CreateGasKitBackendHandlersOptions {
  client: GasKitBackendClient;
}

export interface ReserveHandlerInput {
  gasBudget: number;
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

export function createGasKitBackendHandlers(options: CreateGasKitBackendHandlersOptions) {
  return {
    async reserve(input: ReserveHandlerInput): Promise<GasKitExampleResponse<ReserveHandlerBody>> {
      const reservation = await options.client.reserveGas({
        gasBudget: input.gasBudget,
        walletAddress: input.walletAddress,
        packageId: input.packageId,
        functionName: input.functionName,
      });

      return {
        status: 200,
        body: {
          reservationId: reservation.reservationId,
          gasKitTransactionId: reservation.gasKitTransactionId,
          sponsorAddress: reservation.sponsorAddress,
        },
      };
    },

    async execute(input: ExecuteHandlerInput): Promise<GasKitExampleResponse<ExecuteHandlerBody>> {
      const executed = await options.client.executeSponsoredTransaction({
        reservationId: input.reservationId,
        gasKitTransactionId: input.gasKitTransactionId,
        transactionBytes: input.transactionBytes,
        userSignature: input.userSignature,
      });

      return {
        status: 200,
        body: {
          digest: executed.digest,
        },
      };
    },
  };
}
