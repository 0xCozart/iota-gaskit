# Security Policy

## Reporting vulnerabilities

Please report suspected vulnerabilities privately before opening a public issue.

Preferred path:

1. Use GitHub Security Advisories for this repository if the feature is enabled.
2. If advisories are not enabled, contact the repository owner/maintainer through the GitHub repository owner profile and request a private disclosure channel before sharing exploit details.
3. Do not include sponsor-wallet keys, exploit payloads, or reproduction details in a public issue until maintainers have acknowledged and triaged the report.

If you accidentally exposed a sponsor wallet, app API key, Gas Station bearer token, or similar secret, rotate the credential immediately. Removing it from the working tree is not enough once it has been committed, pushed, copied into logs, or shared.

## Sensitive data rules

Never commit:

- sponsor private keys;
- IOTA wallet mnemonics or exported keypairs;
- Gas Station bearer tokens;
- API keys;
- JWT or embed session secrets;
- Stripe or Resend secrets;
- Supabase/database credentials;
- local `.env` files;
- local SQLite databases;
- generated build artifacts that could contain embedded secrets.

## Production safety baseline

Operators should:

- use a fresh sponsor wallet for each deployment;
- rotate any wallet whose key was ever committed or shared;
- keep the Gas Station API private behind the policy gateway;
- use KMS or an external signer for production where possible;
- start with small testnet budgets;
- configure hard sponsorship caps;
- monitor failed transactions, rejection rates, and sponsor balance;
- restrict dashboard and Grafana access.

See `docs/threat-model.md` and `docs/production-hardening.md`.
