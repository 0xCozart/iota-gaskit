# Architecture

```mermaid
flowchart LR
  Demo[Demo dApp] --> SDK[TypeScript SDK]
  SDK --> Gateway[Policy Gateway]
  Gateway --> Store[(Usage Store)]
  Gateway --> GasStation[IOTA Gas Station]
  GasStation --> RPC[IOTA RPC]
  Gateway --> Metrics[Metrics / Logs]
  Store --> Dashboard[Operator Dashboard]
```

## Components

- IOTA Gas Station: official sponsored-transaction component.
- GasKit Policy Gateway: validates app credentials, policy, quotas, and metadata before proxying to Gas Station.
- GasKit Usage Store: stores app config, policy decisions, and usage events.
- TypeScript SDK: typed wrapper for dApp backends.
- Operator Dashboard: health, usage, policy, and rejection visibility.
- Demo dApp: reviewer-verifiable sponsored transaction flow.
