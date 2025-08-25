# project_achievr

A web app for helping gamers get achievements and trophies for their games.

## Architecture

The repository is a monorepo managed with npm workspaces:

- **api/** – Express API server that exposes authentication and guide-generation endpoints.
- **frontend/** – Next.js frontend for the user interface.
- **shared/** – (future) shared utilities and components.

The API communicates with external services such as OpenAI and gaming networks, and the frontend talks to the API over HTTP.

> See `NPM_COMMANDS.md` for a full list of available npm scripts.

## Prerequisites

- Node.js 20+
- npm 9+

## Environment Variables

Create a root `.env` file based on `.env.example` with the following variables. Next.js automatically loads root `.env` files (e.g. `.env.local`, `.env.development`, `.env.production`), so a separate `frontend/.env` is unnecessary. Variables prefixed with `NEXT_PUBLIC_` are exposed to the frontend build:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Port for the Express API server | `4000` |
| `OPENAI_API_KEY` | OpenAI key used for guide generation | _none_ |
| `NEXT_PUBLIC_API_URL` | Base URL the frontend uses to access the API | `http://localhost:4000` |
| `NODE_ENV` | Node environment (`development`, `production`, etc.) | `development` |

## Development Setup

1. Clone the repository and navigate to the project root.
2. Copy `.env.example` to `.env` and supply values.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start both servers with hot reload:
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:3000
   - API: http://localhost:4000

## Production Setup

1. Ensure environment variables are configured.
2. Install dependencies and build the frontend:
   ```bash
   npm install
   npm run build
   ```
3. Start the servers:
   ```bash
   npm run start
   ```

## Testing and Linting

- Run the linter:
  ```bash
  npm run lint
  ```
- Run backend unit and integration tests with:
(Tests cover authentication endpoints, guide generation, middleware, and CORS behavior)
  ```bash
  npm test
  ```

## Deployment

1. Build the frontend (`npm run build`).
2. Run `npm run start` in a production environment with proper environment variables.
3. Serve over HTTPS and place behind a reverse proxy or container orchestration platform as needed.

## Security and Data Handling

- Secrets such as `OPENAI_API_KEY` are supplied via environment variables and never committed.
- Validate and sanitize all incoming requests to protect against injection attacks.
- Limit logs to non-sensitive information; prefer centralized logging with access controls.
- Use HTTPS in production and enable CORS only for trusted origins.
- Follow least-privilege principles when integrating with external services and store only necessary user data.