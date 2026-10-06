# ChatFlare Architecture

## Product

ChatFlare is an AI chat SaaS built to learn and apply the architecture patterns behind modern AI chat products. The first product milestone is passwordless authentication through Google OAuth and email OTP.

## Technology decisions

### Web application

- React 19
- TypeScript
- TanStack Start and TanStack Router
- Tailwind CSS and shadcn/ui
- Zustand
- Zod
- Cloudflare Workers

Although an earlier draft mentioned Next.js, the project uses TanStack Start. This matches the generated application and its Cloudflare Vite integration.

### Authentication

Better Auth runs inside the TypeScript web Worker and owns Google OAuth, email OTP, users, linked accounts, sessions, secure cookies, and account linking. Authentication data is stored in Cloudflare D1 through Drizzle ORM.

### Python backend

The future Python Worker owns AI and business functionality. It does not create a second authentication system. It obtains the authenticated user from the web Worker through a private Cloudflare service binding.

### Cloudflare services

- Workers: application compute
- D1: users, accounts, sessions, chats, and metadata
- Durable Objects: consistent rate-limit counters when required
- Turnstile: bot protection
- R2: future file and attachment storage
- Workers AI or external model providers: future AI inference
- Service bindings: private communication between Workers

## Repository structure

```text
chatflare/
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── lib/
│   │   │   ├── routes/
│   │   │   ├── server/
│   │   │   └── stores/
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── wrangler.jsonc
│   └── api/
│       └── Python Worker added in M8
├── packages/
│   └── schemas/
│       └── Shared Zod contracts
├── docs/
│   └── ARCHITECTURE.md
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

## Architectural rules

1. Code in `apps/web/src/server` is server-only.
2. Browser components must not import server-only modules.
3. Shared request and response contracts belong in `packages/schemas`.
4. Cloudflare bindings are accessed only from server-side code.
5. Better Auth is created using bindings available to the request rather than as a module-level singleton.
6. Secrets are stored in `.dev.vars` locally and as Wrangler secrets in production.
7. Authentication is issued by the web Worker only.
8. Python receives authenticated identity through a private service binding.
9. Database changes must be represented by committed migrations.
10. Production data must never be the default local-development database.

## Authentication flow

### Email OTP

1. The visitor submits an email address and a Turnstile token.
2. The Worker validates the request without revealing whether an account exists.
3. Better Auth creates a six-digit, single-use OTP with a short expiry.
4. The email provider sends the code outside the response path.
5. The visitor submits the code and receives a secure session cookie.
6. New users continue to onboarding; returning users continue to their intended route.

### Google OAuth

1. The visitor starts Google OAuth from the sign-in page.
2. Google redirects to the Better Auth callback.
3. A verified matching email is linked to the existing user instead of creating a duplicate.
4. Better Auth creates the session and continues to onboarding or the intended route.

## Milestones

| Milestone | Outcome |
| --- | --- |
| M0 | Repository foundation, shared schemas, documentation, and validation scripts |
| M1 | UI foundation, shadcn/ui, and a working local D1 binding |
| M2 | Better Auth, Drizzle schema, migrations, and session endpoint |
| M3 | End-to-end email OTP flow using a console email provider |
| M4 | Turnstile, rate limiting, transactional email, and audit events |
| M5 | Google OAuth and safe account linking |
| M6 | Onboarding, route protection, profile API, and sign-out |
| M7 | Automated tests, CI, observability, and staging deployment |
| M8 | Python Worker authenticated through a private service binding |

## Security principles

- Never commit credentials or local environment files.
- Store OTPs hashed and make them single-use.
- Validate Turnstile tokens on the server.
- Use generic authentication responses to prevent account enumeration.
- Keep session cookies HttpOnly, Secure in production, and appropriately SameSite.
- Redact credentials, OTPs, session tokens, and cookies from logs.
- Apply rate limits to both email identifiers and client IP addresses.
- Review Cloudflare usage and billing alerts before production traffic.
