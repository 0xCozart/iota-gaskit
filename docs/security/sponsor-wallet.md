# Sponsor Wallet Safety

The sponsor wallet pays gas for users. Treat it as a hot operational wallet with strict spending limits.

Rules:

- Use a fresh wallet for demos and production deployments.
- Do not reuse a wallet whose key appeared in a repo, chat, log, screenshot, or shared document.
- Keep demo/testnet and mainnet wallets separate.
- Start with low balances and explicit caps.
- Prefer KMS or an external signer for production.
- Document rotation steps before mainnet operation.
