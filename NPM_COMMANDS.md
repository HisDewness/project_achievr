# NPM Commands Guide for project_achievr

This document explains all the npm commands available in the project_achievr monorepo and how to use them effectively.

## Project Structure

This is a monorepo with the following structure:
- **Root**: Main project configuration and workspace management
- **api/**: Express.js backend server
- **frontend/**: Next.js frontend application

## Installation Commands

### `npm install`
Installs all dependencies for the root project and all workspaces (api, frontend).

**What it does:**
- Installs root dependencies (concurrently)
- Installs dependencies for the api workspace
- Installs dependencies for the frontend workspace

**Usage:**
```bash
npm install
```

### `npm run install:all`
Alternative installation command that explicitly installs dependencies for all workspaces.

**What it does:**
- Runs `npm install` for the root
- Runs `npm install` for the api workspace
- Runs `npm install` for the frontend workspace

**Usage:**
```bash
npm run install:all
```

## Development Commands

### `npm run dev`
**Main development command** - Starts both frontend and backend servers simultaneously in development mode.

**What it does:**
- Starts the Express.js API server (typically on port 3001)
- Starts the Next.js frontend server (typically on port 3000)
- Both servers run with hot-reload enabled

**Usage:**
```bash
npm run dev
```

### `npm run dev:api`
Starts only the backend API server in development mode.

**What it does:**
- Starts the Express.js server with nodemon for hot-reload
- Useful when you only need to work on the backend

**Usage:**
```bash
npm run dev:api
```

### `npm run dev:frontend`
Starts only the frontend Next.js application in development mode.

**What it does:**
- Starts the Next.js development server
- Enables hot-reload for React components
- Useful when you only need to work on the frontend

**Usage:**
```bash
npm run dev:frontend
```

## Production Commands

### `npm run build`
Builds the frontend application for production.

**What it does:**
- Compiles and optimizes the Next.js application
- Creates a production-ready build in the frontend/.next directory
- Must be run before deploying to production

**Usage:**
```bash
npm run build
```

### `npm run start`
Starts both frontend and backend servers in production mode.

**What it does:**
- Starts the Express.js API server in production mode
- Starts the Next.js frontend server in production mode
- Requires the frontend to be built first with `npm run build`

**Usage:**
```bash
npm run build  # First build the frontend
npm run start  # Then start both servers
```

### `npm run start:api`
Starts only the backend API server in production mode.

**What it does:**
- Starts the Express.js server without development features
- Optimized for production deployment

**Usage:**
```bash
npm run start:api
```

### `npm run start:frontend`
Starts only the frontend Next.js application in production mode.

**What it does:**
- Starts the Next.js server in production mode
- Serves the built application from frontend/.next
- Requires the frontend to be built first

**Usage:**
```bash
npm run build        # First build the frontend
npm run start:frontend  # Then start the frontend server
```

## Utility Commands

### `npm run clean`
Removes all node_modules directories from the project.

**What it does:**
- Deletes node_modules from the root directory
- Deletes node_modules from the api directory
- Deletes node_modules from the frontend directory

**Usage:**
```bash
npm run clean
```

**When to use:**
- When you encounter dependency conflicts
- When you want to do a fresh installation
- When troubleshooting npm issues

### `npm run lint`
Runs the linting process on the frontend code.

**What it does:**
- Executes Next.js linting on the frontend workspace
- Checks for code style and potential issues
- Uses the configuration from frontend/package.json

**Usage:**
```bash
npm run lint
```

## Workspace-Specific Commands

You can also run commands directly in specific workspaces:

### API Workspace Commands
```bash
npm run dev --workspace=api
npm run start --workspace=api
npm install --workspace=api
```

### Frontend Workspace Commands
```bash
npm run dev --workspace=frontend
npm run build --workspace=frontend
npm run start --workspace=frontend
npm run lint --workspace=frontend
npm install --workspace=frontend
```

## Common Workflows

### Initial Setup
```bash
npm install
```

### Daily Development
```bash
npm run dev  # Start both servers
# Make changes to your code
# Servers will automatically reload
```

### Frontend-Only Development
```bash
npm run dev:frontend
# Work on React components and pages
```

### Backend-Only Development
```bash
npm run dev:api
# Work on API routes and server logic
```

### Production Deployment
```bash
npm run build
npm run start
```

### Troubleshooting Dependencies
```bash
npm run clean
npm install
```

## Environment Requirements

- **Node.js**: >= 20.0.0 (as specified in .nvmrc)
- **npm**: >= 9.0.0
- **Operating System**: macOS, Linux, or Windows

## Stopping Running Services

When you have npm commands running that start servers (like `npm run dev`, `npm run dev:api`, etc.), you'll need to stop them properly.

### How to Stop Running Services

**Method 1: Keyboard Shortcut (Recommended)**
```bash
# Press these keys in the terminal where the service is running:
Ctrl + C (on macOS/Linux)
Cmd + C (on macOS)
```

**Method 2: Find and Kill Process by Port**
If the keyboard shortcut doesn't work or you need to stop a service from a different terminal:

```bash
# Find processes using specific ports
lsof -ti:3000  # Find process using port 3000 (frontend)
lsof -ti:3001  # Find process using port 3001 (backend)

# Kill the process
kill -9 $(lsof -ti:3000)  # Kill process on port 3000
kill -9 $(lsof -ti:3001)  # Kill process on port 3001
```

**Method 3: Kill All Node Processes (Use with caution)**
```bash
# Kill all Node.js processes (will stop ALL Node apps running)
pkill -f node
# or
killall node
```

### Common Ports Used by This Project

- **Port 3000**: Next.js frontend development server
- **Port 3001**: Express.js backend API server

### Troubleshooting Port Conflicts

If you get "port already in use" errors:

1. **Check what's using the port:**
   ```bash
   lsof -i:3000  # Check port 3000
   lsof -i:3001  # Check port 3001
   ```

2. **Kill the conflicting process:**
   ```bash
   kill -9 <PID>  # Replace <PID> with the process ID from lsof
   ```

3. **Alternative: Use different ports**
   - Frontend: Set `PORT=3002` in your environment
   - Backend: Modify the port in your Express server configuration

## Notes

- The project uses npm workspaces for efficient dependency management
- Both frontend and backend can run simultaneously without port conflicts
- Hot-reload is enabled for both development servers
- The frontend must be built before running in production mode
- All commands should be run from the project root directory
