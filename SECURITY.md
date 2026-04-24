# Security Policy

## Reporting vulnerabilities

Please report suspected vulnerabilities privately before opening a public issue.

Preferred contact for the grant sprint: open a private maintainer channel or email the project maintainer listed in the final public repository metadata. Do not include exploit details in a public issue until maintainers have acknowledged and triaged the report.

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
