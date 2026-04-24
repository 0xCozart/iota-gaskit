export const POLICY_REASON_CODES = [
  "AUTH_MISSING",
  "AUTH_INVALID",
  "APP_DISABLED",
  "APP_DAILY_BUDGET_EXCEEDED",
  "APP_DAILY_REQUEST_LIMIT_EXCEEDED",
  "WALLET_DAILY_LIMIT_EXCEEDED",
  "PACKAGE_NOT_ALLOWED",
  "FUNCTION_NOT_ALLOWED",
  "WALLET_DENIED",
  "GAS_BUDGET_TOO_HIGH",
  "POLICY_CONFIG_INVALID",
  "GAS_STATION_UNAVAILABLE",
  "EXECUTION_FAILED",
] as const;

export type PolicyReasonCode = (typeof POLICY_REASON_CODES)[number];

export type PolicyDecision =
  | { allowed: true; reasonCode?: undefined; message?: string }
  | { allowed: false; reasonCode: PolicyReasonCode; message: string };

export interface SponsorshipPolicy {
  appId: string;
  appStatus: "active" | "disabled";
  dailyBudgetNanos?: number;
  dailyRequestLimit?: number;
  allowedPackages: string[];
  allowedFunctions?: string[];
  deniedWallets?: string[];
  maxRequestsPerWalletPerDay?: number;
  maxGasBudgetPerTx?: number;
}

export interface SponsorshipRequestContext {
  appId?: string;
  authenticated: boolean;
  walletAddress?: string;
  packageId?: string;
  functionName?: string;
  gasBudget?: number;
  appRequestsToday?: number;
  walletRequestsToday?: number;
  appGasReservedToday?: number;
}
