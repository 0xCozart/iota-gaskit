# Policy Gateway

The policy gateway decides whether a sponsorship request is allowed before it reaches IOTA Gas Station.

## MVP policy dimensions

- app credential validity;
- app enabled/disabled status;
- app daily request limits;
- app daily gas budget;
- wallet daily request limits;
- denied wallets;
- package allowlists;
- function allowlists;
- per-transaction gas budget maximum.

## Standard reason codes

See `packages/shared-types/src/policy.ts` for the canonical reason-code list.

## Example

See `examples/policies/demo-dapp.yaml`.
