<div align="center">
  <h1>Rentora</h1>
  <p>
    A full-stack rental marketplace for discovering stays, managing listings, handling bookings,
    saving wishlists, and running a host/guest experience from one MERN application.
  </p>

  <p>
    <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=111111" />
    <img alt="Vite" src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=ffffff" />
    <img alt="Node.js" src="https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js&logoColor=ffffff" />
    <img alt="Express" src="https://img.shields.io/badge/Express-5-111111?style=for-the-badge&logo=express&logoColor=ffffff" />
    <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=ffffff" />
    <img alt="Docker" src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=ffffff" />
  </p>
</div>

<br />

<div align="center">
  <a href="#features">Features</a>
  <span>&nbsp;•&nbsp;</span>
  <a href="#tech-stack">Tech Stack</a>
  <span>&nbsp;•&nbsp;</span>
  <a href="#local-setup">Local Setup</a>
  <span>&nbsp;•&nbsp;</span>
  <a href="#run-with-docker">Docker</a>
  <span>&nbsp;•&nbsp;</span>
  <a href="#run-with-npm">NPM</a>
</div>

---

## Overview

Rentora is a MERN-stack rental platform with a React/Vite frontend and an Express/MongoDB backend. It supports public listing discovery, authentication, guest booking flows, host listing management, wishlist handling, reviews, notifications, newsletter subscriptions, and contact form submissions.

The app is split into two services:

| App | Description | Default URL |
|---|---|---|
| `client` | React + Vite frontend served by Vite locally or Nginx in Docker | `http://localhost:5173` |
| `server` | Express API with MongoDB, JWT auth, cookies, validation, and Cloudinary uploads | `http://localhost:3003` |

## Features

<table>
  <tr>
    <td><strong>Public browsing</strong></td>
    <td>Explore rental homes, categories, property details, reviews, about, privacy, and terms pages.</td>
  </tr>
  <tr>
    <td><strong>Authentication</strong></td>
    <td>Signup, login, logout, protected routes, JWT cookies, profile update, avatar upload, and password changes.</td>
  </tr>
  <tr>
    <td><strong>Guest experience</strong></td>
    <td>Book homes, view personal bookings, save listings to wishlist, and manage guest-specific pages.</td>
  </tr>
  <tr>
    <td><strong>Host dashboard</strong></td>
    <td>Add homes, edit listings, view host listings, inspect listing details, and manage booking requests.</td>
  </tr>
  <tr>
    <td><strong>Reviews</strong></td>
    <td>Authenticated users can create and delete reviews for homes.</td>
  </tr>
  <tr>
    <td><strong>Notifications</strong></td>
    <td>Fetch notifications, mark individual notifications as read, and mark all as read.</td>
  </tr>
  <tr>
    <td><strong>Production-ready containers</strong></td>
    <td>Dockerfiles for client/server, local Compose, production Compose, and GitHub Actions image publishing.</td>
  </tr>
</table>

## Tech Stack

| Layer | Tools |
|---|---|
| Frontend | React 19, Vite 7, React Router 7, Tailwind CSS 4, Motion, React Icons |
| Backend | Node.js 20, Express 5, Mongoose, Joi, JWT, bcrypt, cookie-parser, CORS |
| Database | MongoDB |
| Media Uploads | Cloudinary, Multer, Multer Storage Cloudinary |
| DevOps | Docker, Docker Compose, Nginx, GitHub Actions, Docker Hub |

## Project Structure

```text
.
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── utils/
│   ├── Dockerfile
│   └── nginx.conf
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── validators/
│   └── Dockerfile
├── docker-compose.yaml
├── docker-compose.prod.yaml
└── .github/workflows/ci-cd.yml
```

## Local Setup

### Prerequisites

- Node.js 20+
- npm
- MongoDB local instance or MongoDB Atlas connection string
- Docker Desktop, if running with Docker
- Cloudinary account, if testing image uploads

### Environment Variables

The client uses same-origin `/api/...` requests. In Docker, Nginx proxies those calls to the API service. During `npm run dev`, Vite proxies `/api` to the backend with `API_PROXY_TARGET` or `http://localhost:3003` by default.

Create `server/.env`:

```env
PORT=3003
MONGO_URL=mongodb://127.0.0.1:27017/rentora
FRONTEND_URL=http://localhost:5173
JWT_SECRET=replace-with-a-strong-secret
COOKIE_SECRET=replace-with-a-strong-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

> Keep real secrets out of git. Use strong random values for `JWT_SECRET` and `COOKIE_SECRET`.

## Run With Docker

From the project root:

```bash
docker compose up --build
```

Then open:

| Service | URL |
|---|---|
| Frontend | `http://localhost:5173` |
| Backend API | proxied through `http://localhost:5173/api` |

Useful Docker commands:

```bash
docker compose ps
docker compose logs -f
docker compose down
```

The local Compose project is named `rentora` and creates:

- `rentora-client`
- `rentora-server`
- `rentora-network`

## Run With NPM

Install dependencies in both apps:

```bash
cd server
npm install

cd ../client
npm install
```

Start the backend in one terminal:

```bash
cd server
npm run dev
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

Open `http://localhost:5173`.

If your backend runs on a different port, start the frontend with:

```bash
API_PROXY_TARGET=http://localhost:8080 npm run dev
```

## Available Scripts

### Client

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build production frontend |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

### Server

| Command | Description |
|---|---|
| `npm run dev` | Start Express with Nodemon |
| `npm test` | Placeholder test script |

## API Overview

| Route Group | Base Path | Purpose |
|---|---|---|
| Homes | `/api/homes` | Public listings plus authenticated host CRUD |
| Reviews | `/api/homes/:id/reviews` | Create and delete home reviews |
| Users | `/api/user` | Auth, profile, avatar upload, and password management |
| Bookings | `/api/bookings` | Guest bookings and host booking management |
| Wishlist | `/api/wishlist` | Wishlist reads and toggles |
| Notifications | `/api/notifications` | Read notification state |
| Contact | `/api/contact` | Contact form submission |
| Newsletter | `/api/newsletter` | Newsletter subscription |

## Production Deployment

GitHub Actions builds and pushes these Docker Hub images:

```text
yadavkapil9560/rentora-server:latest
yadavkapil9560/rentora-client:latest
```

Production Compose expects the server env file at:

```text
/home/ubuntu/rentora/.env
```

The self-hosted runner label used by the workflow is:

```text
rentora-runner
```

Production containers and network:

- `rentora-server`
- `rentora-client`
- `rentora-prod-network`

## Maintainer

Built and maintained by **Kapil Yadav**.
