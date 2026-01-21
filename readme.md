# Space X Full Stack Interview

Welcome to the Dept Space X Full Stack Interview Challenge.

This repository contains a full-stack application (monorepo) designed to test your skills in **Node.js** and **React (Next.js)**.

## Structure

- **`/node`**: A Node.js API (Express + TypeORM + SQLite).
- **`/react`**: A Next.js 16 Client application.

## Getting Started

### Prerequisites

- Node.js 20+
- Docker (optional but recommended for the API)

### 1. Setup API (`/node`)

See [node/readme.md](./node/readme.md) for detailed tasks.

```bash
cd node
# Using Docker (Recommended)
docker-compose up --build

# OR locally
npm install
npm run dev:local
```

### 2. Setup Client (`/react`)

See [react/README.md](./react/README.md) for detailed tasks.

```bash
cd react
cp .env.example .env.local
npm install
npm run dev
```

## The Challenge

Your regular work involves building modern, performant web applications. This challenge simulates that by asking you to:

1.  **Fix & Modernize**: Identify and fix bugs in the existing codebase.
2.  **Implement Features**: Add missing functionality (e.g., authentication, favorites).
3.  **Architect**: Make decisions on rendering strategies (CSR vs SSR) and state management.

Good luck! 🚀
