import { access } from "node:fs/promises";
import { resolve } from "node:path";

import { loadEnvFile } from "../apps/policy-gateway-service/src/readiness.js";

interface CliOptions {
  envFile: string;
  help: boolean;
  skipReserve: boolean;
}

const usage = `usage: npm exec tsx -- scripts/diagnose-gas-station-upstream.ts [--env-file <path>] [--skip-reserve]

Checks the configured live Gas Station boundary without printing secrets:
- GAS_STATION_URL reachability and health endpoints
- IOTA_RPC_URL JSON-RPC connectivity
- optional minimal reserve_gas compatibility probe using the configured bearer token

The reserve probe uses a small gas_budget and should only be run against a funded, intended testnet Gas Station.`;

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = { envFile: ".env", help: false, skipReserve: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--env-file") {
      const value = argv[index + 1];
      if (!value) throw new Error("--env-file requires a path.");
      options.envFile = value;
      index += 1;
      continue;
    }
    if (arg === "--skip-reserve") {
      options.skipReserve = true;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

function redactUrl(value: string | undefined): string {
  if (!value) return "<unset>";
  try {
    const url = new URL(value);
    url.username = "";
    url.password = "";
    return `${url.protocol}//${url.host}${url.pathname.replace(/\/+$/, "")}`;
  } catch {
    return "<invalid-url>";
  }
}

function summarizeJson(value: unknown): string {
  try {
    return JSON.stringify(value).slice(0, 700);
  } catch {
    return String(value).slice(0, 700);
  }
}

async function fetchJson(url: string, init?: RequestInit): Promise<{ ok: boolean; status: number; body: unknown }> {
  const response = await fetch(url, init);
  const text = await response.text();
  let body: unknown = text;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = text.slice(0, 700);
  }
  return { ok: response.ok, status: response.status, body };
}

async function checkHttp(name: string, url: string, init?: RequestInit): Promise<boolean> {
  try {
    const result = await fetchJson(url, init);
    console.log(`${result.ok ? "ok" : "fail"}: ${name} HTTP ${result.status} ${summarizeJson(result.body)}`);
    return result.ok;
  } catch (error) {
    console.log(`fail: ${name} ${error instanceof Error ? error.message : "request failed"}`);
    return false;
  }
}

async function main(): Promise<number> {
  let options: CliOptions;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Invalid arguments.");
    return 2;
  }
  if (options.help) {
    console.log(usage);
    return 0;
  }

  const envFile = resolve(process.cwd(), options.envFile);
  try {
    await access(envFile);
  } catch {
    console.error(`Env file not found: ${options.envFile}`);
    return 1;
  }

  const env = await loadEnvFile(envFile);
  const gasStationUrl = env.GAS_STATION_URL?.replace(/\/+$/, "");
  const rpcUrl = env.IOTA_RPC_URL;
  const token = env.GAS_STATION_BEARER_TOKEN;

  console.log(`gasStationUrl=${redactUrl(gasStationUrl)}`);
  console.log(`iotaRpcUrl=${redactUrl(rpcUrl)}`);
  console.log(`bearerTokenConfigured=${Boolean(token)}`);

  let ok = true;
  if (!gasStationUrl) {
    console.log("fail: GAS_STATION_URL is not configured");
    ok = false;
  } else {
    const healthOk = await checkHttp("Gas Station root", `${gasStationUrl}/`);
    const v1HealthOk = await checkHttp("Gas Station /v1/health", `${gasStationUrl}/v1/health`);
    ok = (healthOk || v1HealthOk) && ok;
  }

  if (!rpcUrl) {
    console.log("fail: IOTA_RPC_URL is not configured");
    ok = false;
  } else {
    const rpcOk = await checkHttp("IOTA RPC iota_getLatestCheckpointSequenceNumber", rpcUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "iota_getLatestCheckpointSequenceNumber", params: [] }),
    });
    ok = rpcOk && ok;
  }

  if (!options.skipReserve && gasStationUrl) {
    const headers: Record<string, string> = { "content-type": "application/json" };
    if (token) headers.authorization = `Bearer ${token}`;
    const reserveOk = await checkHttp("Gas Station reserve_gas compatibility probe", `${gasStationUrl}/v1/reserve_gas`, {
      method: "POST",
      headers,
      body: JSON.stringify({ gas_budget: 50000000, reserve_duration_secs: 120 }),
    });
    ok = reserveOk && ok;
  } else if (options.skipReserve) {
    console.log("skip: reserve_gas compatibility probe");
  }

  return ok ? 0 : 1;
}

process.exitCode = await main();
