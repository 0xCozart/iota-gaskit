# Secrets Handling

Never commit `.env`, private keys, tokens, or service credentials.

Use examples with placeholders only:

```env
GAS_STATION_KEYPAIR=replace-with-local-secret
GAS_STATION_AUTH=replace-with-random-token
JWT_SECRET=replace-with-random-secret
```

Before pushing public changes, run a secret scan and inspect config files manually.
