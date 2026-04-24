# GasKit Demo dApp

This app will demonstrate the final grant flow:

1. User opens the demo dApp.
2. Demo backend uses the GasKit SDK with app credentials.
3. Policy gateway validates the app, wallet, package, function, and gas budget.
4. IOTA Gas Station reserves gas.
5. User signs the transaction.
6. Demo backend submits the signed transaction through GasKit.
7. Dashboard updates usage and policy decision logs.
8. Operator changes policy to deny the function.
9. Demo dApp retries and receives a structured rejection reason.

Milestone 1 completes the happy-path transaction. Milestone 2 completes the policy rejection path.
