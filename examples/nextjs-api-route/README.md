# Next.js API Route Example

This example shows how a Next.js backend route can keep the GasKit app credential server-side while exposing safe reserve and execute endpoints to browser code.

The maintained `gaskit-route.ts` file is framework-light: it uses the standard `Request` and `Response` APIs that Next.js route handlers support, and it injects an SDK-shaped server-owned client for deterministic tests. No real IOTA network, sponsor key, Docker service, or app API key is required for the example tests.

## App Router usage

Create one route file for reserve after copying `gaskit-route.ts` into a server-only helper path such as `app/api/gaskit/_lib/gaskit-route.ts`:

```ts
// app/api/gaskit/reserve/route.ts
import { createGasKitClient } from "@iota-gaskit/sdk";
import { createGasKitNextApiRoutes } from "../_lib/gaskit-route.js";

const routes = createGasKitNextApiRoutes({
  client: createGasKitClient({
    baseUrl: process.env.GASKIT_GATEWAY_URL!,
    apiKey: process.env.GASKIT_DEMO_APP_KEY!,
  }),
});

export const POST = routes.reserve;
```

Create a second route file for execute:

```ts
// app/api/gaskit/execute/route.ts
import { createGasKitClient } from "@iota-gaskit/sdk";
import { createGasKitNextApiRoutes } from "../_lib/gaskit-route.js";

const routes = createGasKitNextApiRoutes({
  client: createGasKitClient({
    baseUrl: process.env.GASKIT_GATEWAY_URL!,
    apiKey: process.env.GASKIT_DEMO_APP_KEY!,
  }),
});

export const POST = routes.execute;
```

Your real app should keep `GASKIT_DEMO_APP_KEY` on the server. Browser callers send only transaction metadata, transaction bytes, and user signatures needed for the sponsorship flow.

## Safety behavior

The route helpers:

- accept only `POST`;
- reject malformed JSON, arrays, and primitive request bodies before calling the SDK client;
- forward only the allowlisted SDK request fields;
- return only reservation IDs, optional sponsor address, execution digest, and sanitized error codes/messages;
- omit app API keys, bearer tokens, raw upstream bodies, gas coin internals, transaction bytes, and user signatures from responses.

Run the example tests from the repo root:

```bash
node --import tsx --test examples/nextjs-api-route/gaskit-route.test.ts
```

The root `npm test` command also includes checked example tests, and `npm run typecheck` includes `examples/**/*.ts`.
