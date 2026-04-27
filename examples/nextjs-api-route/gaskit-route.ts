import type {
  ExecuteSponsoredTransactionRequest,
  ReserveGasRequest,
} from "../../packages/sdk/src/index.js";
import {
  createGasKitBackendHandlers,
  type CreateGasKitBackendHandlersOptions,
  type GasKitExampleErrorBody,
  type GasKitExampleResult,
} from "../node-backend/gaskit-backend.js";

export type CreateGasKitNextApiRoutesOptions = CreateGasKitBackendHandlersOptions;

export interface GasKitNextApiRoutes {
  reserve(request: Request): Promise<Response>;
  execute(request: Request): Promise<Response>;
}

interface BadRequestBody {
  error: "BAD_REQUEST" | "METHOD_NOT_ALLOWED";
  message: string;
}

type RouteResponseBody<TBody extends object> = TBody | GasKitExampleErrorBody | BadRequestBody;

function jsonResponse<TBody extends object>(status: number, body: TBody): Response {
  return Response.json(body, {
    status,
    headers: { "cache-control": "no-store" },
  });
}

function methodNotAllowed(): Response {
  return jsonResponse(405, {
    error: "METHOD_NOT_ALLOWED",
    message: "Use POST for this GasKit endpoint.",
  });
}

function badRequest(message: string): Response {
  return jsonResponse(400, {
    error: "BAD_REQUEST",
    message,
  });
}

async function readObjectBody(request: Request): Promise<Record<string, unknown> | Response> {
  let value: unknown;

  try {
    value = await request.json();
  } catch {
    return badRequest("Request body must be valid JSON.");
  }

  if (value === null || Array.isArray(value) || typeof value !== "object") {
    return badRequest("Request body must be a JSON object.");
  }

  return value as Record<string, unknown>;
}

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function optionalNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function requiredString(body: Record<string, unknown>, key: string): string | Response {
  const value = optionalString(body[key]);
  return value === undefined ? badRequest(`${key} must be a string.`) : value;
}

function requiredNumber(body: Record<string, unknown>, key: string): number | Response {
  const value = optionalNumber(body[key]);
  return value === undefined ? badRequest(`${key} must be a finite number.`) : value;
}

function asResponse<TBody extends object>(result: GasKitExampleResult<TBody>): Response {
  return jsonResponse<RouteResponseBody<TBody>>(result.status, result.body);
}

function reserveInputFromBody(body: Record<string, unknown>): ReserveGasRequest | Response {
  const gasBudget = requiredNumber(body, "gasBudget");
  if (gasBudget instanceof Response) {
    return gasBudget;
  }

  return {
    gasBudget,
    reserveDurationSecs: optionalNumber(body.reserveDurationSecs),
    walletAddress: optionalString(body.walletAddress),
    packageId: optionalString(body.packageId),
    functionName: optionalString(body.functionName),
  };
}

function executeInputFromBody(body: Record<string, unknown>): ExecuteSponsoredTransactionRequest | Response {
  const reservationId = requiredString(body, "reservationId");
  if (reservationId instanceof Response) {
    return reservationId;
  }
  const gasKitTransactionId = requiredString(body, "gasKitTransactionId");
  if (gasKitTransactionId instanceof Response) {
    return gasKitTransactionId;
  }
  const transactionBytes = requiredString(body, "transactionBytes");
  if (transactionBytes instanceof Response) {
    return transactionBytes;
  }
  const userSignature = requiredString(body, "userSignature");
  if (userSignature instanceof Response) {
    return userSignature;
  }

  return {
    reservationId,
    gasKitTransactionId,
    transactionBytes,
    userSignature,
  };
}

export function createGasKitNextApiRoutes(options: CreateGasKitNextApiRoutesOptions): GasKitNextApiRoutes {
  const backend = createGasKitBackendHandlers(options);

  return {
    async reserve(request: Request): Promise<Response> {
      if (request.method !== "POST") {
        return methodNotAllowed();
      }

      const body = await readObjectBody(request);
      if (body instanceof Response) {
        return body;
      }
      const input = reserveInputFromBody(body);
      if (input instanceof Response) {
        return input;
      }

      return asResponse(await backend.reserve(input));
    },

    async execute(request: Request): Promise<Response> {
      if (request.method !== "POST") {
        return methodNotAllowed();
      }

      const body = await readObjectBody(request);
      if (body instanceof Response) {
        return body;
      }
      const input = executeInputFromBody(body);
      if (input instanceof Response) {
        return input;
      }

      return asResponse(await backend.execute(input));
    },
  };
}
