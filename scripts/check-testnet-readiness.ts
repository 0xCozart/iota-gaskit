import { access } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import { checkTestnetReadiness, formatReadinessReport, loadEnvFile } from "../apps/policy-gateway-service/src/readiness.js";

interface CliOptions {
  envFile: string;
  expectPlaceholders: boolean;
  help: boolean;
}

const usage = `usage: npm exec tsx -- scripts/check-testnet-readiness.ts [--env-file <path>] [--expect-placeholders]

Default mode validates a local .env for the first real testnet boundary and fails closed on placeholders.
--expect-placeholders validates that .env.example documents placeholders without being usable as a live config.`;

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {
    envFile: ".env",
    expectPlaceholders: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--env-file") {
      const value = argv[index + 1];
      if (!value) throw new Error("--env-file requires a path.");
      options.envFile = value;
      index += 1;
      continue;
    }
    if (arg === "--expect-placeholders") {
      options.expectPlaceholders = true;
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
    console.error(`Readiness env file not found: ${options.envFile}`);
    console.error("Copy .env.example to .env and replace placeholders locally before running testnet readiness.");
    return 1;
  }

  try {
    const env = await loadEnvFile(envFile);
    const report = await checkTestnetReadiness({
      env,
      expectPlaceholders: options.expectPlaceholders,
      cwd: dirname(envFile),
    });
    console.log(formatReadinessReport(report));
    return report.ok ? 0 : 1;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Readiness check failed unexpectedly.");
    return 1;
  }
}

process.exitCode = await main();
