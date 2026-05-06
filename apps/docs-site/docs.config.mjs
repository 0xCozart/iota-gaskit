export default {
  title: "IOTA GasKit Docs",
  description: "Self-hostable documentation for deploying, securing, monitoring, and integrating IOTA gas-sponsored transactions.",
  repositoryUrl: "https://github.com/0xCozart/iota-gaskit",
  sections: [
    {
      label: "Start",
      pages: [
        {
          title: "IOTA and GasKit Basics",
          source: "docs/concepts.md",
          slug: "concepts",
          description: "Plain-English explanations of IOTA, sponsored gas, GasKit roles, architecture, and common terms."
        },
        {
          title: "Overview",
          source: "docs/overview.md",
          slug: "overview",
          description: "What GasKit is, why it exists, what exists today, what remains roadmap, and where to start."
        },
        {
          title: "Quickstart",
          source: "docs/quickstart.md",
          slug: "quickstart",
          description: "Run local verification, gateway smoke paths, and demo dApp flows."
        },
        {
          title: "Reviewer Walkthrough",
          source: "docs/reviewer-walkthrough.md",
          slug: "reviewer-walkthrough",
          description: "A reproducible path for reviewers to inspect deterministic proof."
        }
      ]
    },
    {
      label: "Build",
      pages: [
        {
          title: "Best Practices",
          source: "docs/best-practices.md",
          slug: "best-practices",
          description: "Safe defaults for app keys, policy simulation, sponsor-wallet risk, and observability."
        },
        {
          title: "Code Examples",
          source: "docs/examples.md",
          slug: "examples",
          description: "SDK calls, backend routes, browser caller shape, curl requests, and policy YAML."
        },
        {
          title: "Agent Guide",
          source: "docs/agent-guide.md",
          slug: "agent-guide",
          description: "How AI coding agents should navigate, verify, and safely work with GasKit."
        },
        {
          title: "Policy Gateway",
          source: "docs/policy.md",
          slug: "policy-gateway",
          description: "How sponsorship decisions are evaluated before reaching IOTA Gas Station."
        },
        {
          title: "TypeScript SDK",
          source: "docs/sdk.md",
          slug: "sdk",
          description: "Backend SDK calls for policy simulation, reserve, and sponsored execute."
        },
        {
          title: "Deployment",
          source: "docs/deployment.md",
          slug: "deployment",
          description: "Local and production deployment notes for GasKit operators."
        }
      ]
    },
    {
      label: "Operate",
      pages: [
        {
          title: "Architecture",
          source: "docs/architecture.md",
          slug: "architecture",
          description: "Plain-English system shape, why the layers exist, trust boundaries, and current usage-event foundations."
        },
        {
          title: "Observability",
          source: "docs/observability.md",
          slug: "observability",
          description: "Sanitized decision events, usage snapshots, and production direction."
        },
        {
          title: "Testnet Readiness",
          source: "docs/testnet-readiness.md",
          slug: "testnet-readiness",
          description: "Local checks before live testnet sponsor credentials are used."
        },
        {
          title: "Production Hardening",
          source: "docs/production-hardening.md",
          slug: "production-hardening",
          description: "Sponsor-wallet, gateway, persistence, and deployment hardening guidance."
        },
        {
          title: "Threat Model",
          source: "docs/threat-model.md",
          slug: "threat-model",
          description: "Risk boundaries and failure modes for gas sponsorship."
        }
      ]
    },
    {
      label: "Security",
      pages: [
        {
          title: "Sponsor Wallet",
          source: "docs/security/sponsor-wallet.md",
          slug: "sponsor-wallet",
          description: "Sponsor-wallet handling and operational safety notes."
        },
        {
          title: "Secrets",
          source: "docs/security/secrets.md",
          slug: "secrets",
          description: "Secret boundaries, local files, and repository hygiene."
        }
      ]
    }
  ]
};
