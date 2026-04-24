export class GasKitError extends Error {
  constructor(message: string, readonly status?: number, readonly body?: unknown) {
    super(message);
    this.name = "GasKitError";
  }
}

export class GasKitPolicyError extends GasKitError {
  constructor(message: string, readonly reasonCode?: string, status?: number, body?: unknown) {
    super(message, status, body);
    this.name = "GasKitPolicyError";
  }
}

export class GasKitAuthError extends GasKitError {
  constructor(message: string, status?: number, body?: unknown) {
    super(message, status, body);
    this.name = "GasKitAuthError";
  }
}
