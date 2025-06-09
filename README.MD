# Decentralized Social Media

A minimal viable backend for a decentralized, Ethereum wallet-authenticated microblogging platform. Users can log in using their wallet, manage profiles, and create posts, likes, and comments — all secured with message signing and JWT-based authentication.

# Backend

## 🛠 Tech Stack

- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Authentication:** Ethereum wallet + message signing (via `ethers.js`) + JWT
- **Package Manager:** pnpm

## ⚙️ Project Setup

### 1. Clone & Install

```bash
git clone https://github.com/js313/decentralized-social.git
cd decentralized-social/backend
pnpm install
```

### 2. Configure Environment

Copy .env.example to .env and update the values:

```bash
cp .env.example .env
```

### 3. Start PostgreSQL (via Docker)

If PostgreSQL isn't already installed, run:

```bash
docker run --name social-db -p 5432:5432 \
-e POSTGRES_USER=postgres \
-e POSTGRES_PASSWORD=password \
-e POSTGRES_DB=social \
-d postgres
```

### 4. Run the Backend

```bash
pnpm start:dev
```

App runs at: http://localhost:3000

## 🗃 SQL Schema Dump

Run this to generate:

```bash
pnpm typeorm migration:generate
pnpm typeorm migration:run
```

You can export a SQL dump with this command:<br>
<b>Copy the postgres DB configs to `apps/backend/db/db-config.ts` before seeding</b>

```bash
pnpm run seed
```

## 📦 Available Endpoints

### Auth

- POST /auth/verify – Verifies a signed message and returns a JWT.

### Users

- GET /users/:wallet – Get user profile.
- POST /users – Create or update user (JWT required).

### Posts

- GET /posts – Get all posts.
- GET /posts/:id – Get single post with comments and likes.
- POST /posts – Create new post (JWT required).
- POST /posts/:id/like – Like a post (JWT required).
- POST /posts/:id/comment – Comment on a post (JWT required).

# Frontend

## Tech Stack

- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Wallet Auth: RainbowKit + wagmi v2
- Web3: ethers.js
- CSS: Tailwind CSS
- Query Management: React Query
- Wallet Login: Message signing + JWT
- Package Manager: pnpm

## ⚙️ Project Setup

### 1. Install Dependencies

```bash
cd frontend
pnpm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Make sure backend is running on port 3000<br>
Get a free project ID from [WalletConnect Cloud](https://cloud.reown.com/)

### 3. Run the Frontend

```bash
pnpm dev
```

App runs at: http://localhost:3001

## 🔗 Authentication Flow

- User clicks "Connect Wallet" (RainbowKit modal appears)
- User signs a challenge message
- Backend verifies the signature and returns a JWT
- JWT is used for authenticated requests (e.g., posting, liking, commenting)

## 📦 API Endpoints

### Auth

- POST /auth/verify – Verify wallet signature and issue JWT

### Users

- GET /users/:wallet – Fetch profile
- POST /users – Create/update profile (JWT)

### Posts

- GET /posts – All posts
- GET /posts/:id – Single post with comments and likes
- POST /posts – Create post (JWT)
- POST /posts/:id/like – Like post (JWT)
- POST /posts/:id/comment – Comment (JWT)
