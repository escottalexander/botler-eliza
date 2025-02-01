# Botler - AI Agent for onboarding to Ethereum!

This project consists of two main components:
- An AI chat agent
- A front-end web interface

## Prerequisites

- [Node.js](https://nodejs.org/) (v23.3 recommended)
- [pnpm](https://pnpm.io/) package manager

## Project Setup

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:

Create a `.env` file in the `packages/agent` directory with your API keys:
```env
OPENAI_API_KEY=your_key_here
```
It is also negligible to switch to a different provider. Just use the appropriate api key from `packages/agent/example.env` and change `packages/agent/src/character.ts` to use the correct provider.

## Running the Application

### Start the Agent
```bash
# From the top of the project directory
pnpm run build:agent
pnpm run start:agent
```
The agent service will start on `http://localhost:3000` by default.

### Start the Front-end
```bash
# From the top of the project directory
pnpm run dev:front-end
```

The front-end will be available at `http://localhost:3001`.

You should now be able to chat directly with the agent through the front-end
