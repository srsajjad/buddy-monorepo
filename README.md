# Buddy Monorepo

A full-stack TypeScript monorepo using Next.js, Express, and Firebase powered by [Turbo](https://turbo.build).

## Project Structure

```
buddy-monorepo/
├── apps/
│   ├── backend-repo/     # Express.js + Firebase backend
│   └── frontend-repo/    # Next.js frontend
└── packages/
    ├── shared-types/     # Shared TypeScript interfaces
    ├── shared-utils/     # Shared utility functions
    └── logger/           # Shared logging functionality
```

## Features

- **Frontend (Next.js 14+)**

  - React MUI components
  - Redux state management
  - Firebase Authentication
  - Mobile responsive design
  - App Router implementation

- **Backend (Express.js)**
  - Firebase Admin SDK integration
  - User management endpoints
  - JWT authentication middleware
  - Firestore database integration

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Firebase project credentials

### Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd buddy-monorepo
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   For local development:

   - backend-repo/.env
   - frontend-repo/.env.local

4. Start development servers:
   ```bash
   # Start all services
   pnpm dev
   ```

## API Endpoints

### User Management

- `POST /api/users/create-user` - Create new user
- `PUT /api/users/update-user-data` - Update user data
- `GET /api/users/fetch-user-data` - Fetch user data

All endpoints require Firebase authentication token.

## Tech Stack

- **Frontend**

  - Next.js 14+
  - React MUI
  - Redux Toolkit
  - TypeScript
  - Firebase Auth

- **Backend**

  - Express.js
  - Firebase Admin SDK
  - TypeScript
  - Firestore

- **Development**
  - pnpm (Package Manager)
  - ESLint
  - TypeScript
  - Turborepo

NB: During backend production deployment, use the command `turbo build` and target the `dist` folder.

## License

MIT
