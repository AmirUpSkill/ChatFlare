# ChatFlare

ChatFlare is an AI chat SaaS built with TanStack Start and the Cloudflare developer platform.

## Current status

The project is under active development. The current milestone establishes the repository and Cloudflare application foundation before authentication is implemented.

## Stack

- React 19 and TypeScript
- TanStack Start and TanStack Router
- Tailwind CSS and shadcn/ui
- Zod and Zustand
- Better Auth and Drizzle ORM
- Cloudflare Workers and D1
- pnpm workspaces

## Requirements

- Node.js 22
- pnpm 12.6.0
- A Cloudflare account for remote resources and deployment

## Installation

```powershell
git clone https://github.com/AmirUpSkill/ChatFlare.git
cd ChatFlare
pnpm install
```

## Local development

```powershell
pnpm dev
```

The application is normally available at `http://localhost:3000`.

## Environment variables

Create a local environment file from the committed template:

```powershell
Copy-Item apps/web/.dev.vars.example apps/web/.dev.vars
```

Never commit `.dev.vars` or other files containing credentials.

## Validation

```powershell
pnpm typecheck
pnpm lint
pnpm check
pnpm build
```

Generate Cloudflare binding types with:

```powershell
pnpm cf-typegen
```

## Workspace layout

```text
apps/web          TanStack Start Cloudflare Worker
apps/api          Future Python Worker
packages/schemas  Shared Zod validation contracts
docs              Architecture and engineering documentation
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the complete architecture.
