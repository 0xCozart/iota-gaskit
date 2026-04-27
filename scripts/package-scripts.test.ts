import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const packageJson = JSON.parse(await readFile(resolve(repoRoot, "package.json"), "utf8")) as {
  scripts?: Record<string, string>;
};
const tsconfig = JSON.parse(await readFile(resolve(repoRoot, "tsconfig.json"), "utf8")) as {
  include?: string[];
};

test("local smoke script builds workspace packages before running gateway smoke", () => {
  const smokeLocal = packageJson.scripts?.["smoke:local"];

  assert.equal(
    smokeLocal,
    "npm run build && tsx scripts/smoke-local-gateway.ts",
    "npm run smoke:local must not depend on pre-existing ignored dist artifacts",
  );
});

test("root npm test includes script, example, package, and app regression tests", () => {
  const npmTest = packageJson.scripts?.["test"] ?? "";

  assert.match(npmTest, /scripts\/\*\.test\.ts/);
  assert.match(npmTest, /examples\/\*\*\/\*\.test\.ts/);
  assert.match(npmTest, /packages\/\*\/src\/\*\.test\.ts/);
  assert.match(npmTest, /apps\/\*\/src\/\*\.test\.ts/);
});

test("root typecheck includes package, app, script, and example source", () => {
  assert.ok(tsconfig.include?.includes("packages/**/*.ts"));
  assert.ok(tsconfig.include?.includes("apps/**/*.ts"));
  assert.ok(tsconfig.include?.includes("scripts/**/*.ts"));
  assert.ok(tsconfig.include?.includes("examples/**/*.ts"));
});
