# Deployment

GasKit deployment documentation is split into local, testnet, and production-hardening tracks.

## Local grant demo

Milestone 1 provides a Docker Compose local stack for Redis, Gas Station, policy gateway, dashboard, and demo dApp.

## Production considerations

Production operators should:

- protect Gas Station behind the policy gateway;
- keep Redis private;
- use TLS at the reverse proxy;
- keep sponsor keys outside the repo;
- use KMS or external signer where possible;
- configure hard budgets and rate limits;
- monitor sponsor balance and policy rejection rates.

See `docs/production-hardening.md`.
