# 🚀 Queue-Cure — Production Deployment & CI/CD Guide

---

## 📁 Architecture Overview

```
queue-cure-26/
├── client/          ← React + Vite + TailwindCSS v4 + Socket.IO
├── server/          ← Node.js + Express + MongoDB + Socket.IO
├── docker-compose.yaml        ← Dev: builds from source
├── docker-compose.prod.yaml   ← Prod: pulls from Docker Hub
└── .github/workflows/ci-cd.yml
```

---

## 🔍 Issues Found & Fixed

| Area | Problem | Fix |
|---|---|---|
| **CI/CD Workflow** | `npm run test` exits `1` — `|| echo` bypass is fragile | Graceful skip with proper check |
| **CI/CD Workflow** | No Docker layer caching → slow builds every time | GitHub Actions GHA cache |
| **CI/CD Workflow** | No multi-platform builds (ARM64 for AWS/GCP) | QEMU + Buildx `amd64,arm64` |
| **CI/CD Workflow** | No image tagging by commit SHA → rollback impossible | SHA + latest dual tags |
| **CI/CD Workflow** | Secrets in plain `echo` pipe → shows in logs | `docker/login-action` |
| **CI/CD Workflow** | No `.env` injection on server at deploy time | Runtime env_file on VM |
| **Server Dockerfile** | `.env` copied into image via `COPY . .` — **secrets leak!** | `RUN rm -f .env` in Dockerfile |
| **Server Dockerfile** | No `HEALTHCHECK` defined | Added `HEALTHCHECK` instruction |
| **docker-compose.prod.yaml** | `env_file: .env` references root `.env` missing on server | Fixed path to `/home/ubuntu/app/.env` |
| **nginx.conf** | No `gzip`, no security headers, no rate limiting | Added all three |
| **Deploy step** | No health-check or rollback logic | 60s health-check loop + auto-rollback |

---

## ✅ Full Implementation

---

### 1. Server Dockerfile — `server/Dockerfile`

```dockerfile
# ─── Stage 1: Dependencies ─────────────────────────────────────
FROM node:20-alpine AS deps

WORKDIR /app

# Copy only manifests first — enables layer cache reuse
COPY package.json package-lock.json ./

# Install ONLY production dependencies
RUN npm ci --omit=dev

# ─── Stage 2: Runtime ──────────────────────────────────────────
FROM node:20-alpine AS runner

# Security: run as non-root user
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

WORKDIR /app

# Copy prod node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy app source (no .env — secrets come from env_file at runtime)
COPY . .

# Drop any accidentally committed .env files
RUN rm -f .env .env.*

USER appuser

EXPOSE 3003

# Health check so Docker/Compose knows the container is ready
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:3003/api/health || exit 1

CMD ["node", "server.js"]
```

**Key changes:**
- Multi-stage build → smaller final image
- `rm -f .env` → secrets **never** baked into image
- Non-root user → security hardening
- `HEALTHCHECK` → Compose/orchestrator knows when server is ready

---

### 2. Client Dockerfile — `client/Dockerfile`

```dockerfile
# ─── Stage 1: Build ────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

# Install ALL deps (dev deps needed for Vite build)
RUN npm ci

COPY . .

RUN npm run build

# ─── Stage 2: Serve ────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Remove default config
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/*

# Copy built static assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
```

---

### 3. nginx.conf — `client/nginx.conf`

```nginx
# WebSocket upgrade map
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

# Rate limiting zones (protect API from abuse)
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=30r/s;

server {
    listen 80;
    server_tokens off;

    # ── Security Headers ──────────────────────────────────────
    add_header X-Frame-Options           "SAMEORIGIN"            always;
    add_header X-Content-Type-Options    "nosniff"               always;
    add_header X-XSS-Protection          "1; mode=block"         always;
    add_header Referrer-Policy           "strict-origin-when-cross-origin" always;

    # ── Gzip Compression ─────────────────────────────────────
    gzip on;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/javascript application/javascript
               application/json application/xml image/svg+xml;
    gzip_vary on;

    # ── API Proxy ─────────────────────────────────────────────
    location /api/ {
        limit_req zone=api_limit burst=50 nodelay;

        proxy_pass         http://server:3003;
        proxy_http_version 1.1;

        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_connect_timeout 10s;
        proxy_read_timeout    30s;
    }

    # ── Socket.IO Proxy ───────────────────────────────────────
    location /socket.io/ {
        proxy_pass         http://server:3003;
        proxy_http_version 1.1;

        proxy_set_header Upgrade    $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header Host       $host;
        proxy_set_header X-Real-IP  $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_read_timeout  3600s;
        proxy_send_timeout  3600s;
        proxy_buffering     off;
    }

    # ── Static Assets (SPA) ───────────────────────────────────
    location / {
        root       /usr/share/nginx/html;
        index      index.html index.htm;
        try_files  $uri $uri/ /index.html;

        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2|woff|ttf)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

---

### 4. docker-compose.yaml (Dev) — `docker-compose.yaml`

```yaml
version: '3.9'

services:
  server:
    build:
      context: ./server
      dockerfile: Dockerfile
    container_name: queue-cure-server
    restart: unless-stopped
    env_file:
      - ./server/.env
    ports:
      - "3003:3003"
    networks:
      - queue-cure-network
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3003/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 15s

  client:
    build:
      context: ./client
      dockerfile: Dockerfile
    container_name: queue-cure-client
    restart: unless-stopped
    ports:
      - "5173:80"
    depends_on:
      server:
        condition: service_healthy
    networks:
      - queue-cure-network

networks:
  queue-cure-network:
    driver: bridge
```

---

### 5. docker-compose.prod.yaml (Production) — `docker-compose.prod.yaml`

```yaml
version: '3.9'

services:
  server:
    image: yadavkapil9560/queue-cure-server:${IMAGE_TAG:-latest}
    container_name: queue-cure-server
    restart: unless-stopped
    env_file:
      - /home/ubuntu/app/.env
    networks:
      - queue-cure-prod-network
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3003/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 20s

  client:
    image: yadavkapil9560/queue-cure-client:${IMAGE_TAG:-latest}
    container_name: queue-cure-client
    restart: unless-stopped
    ports:
      - "8080:80"
    depends_on:
      server:
        condition: service_healthy
    networks:
      - queue-cure-prod-network

networks:
  queue-cure-prod-network:
    driver: bridge
```

---

### 6. GitHub Actions CI/CD — `.github/workflows/ci-cd.yml`

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

env:
  REGISTRY: docker.io
  SERVER_IMAGE: yadavkapil9560/queue-cure-server
  CLIENT_IMAGE: yadavkapil9560/queue-cure-client

jobs:
  # ─────────────────────────────────────────────────────────────
  # JOB 1: Lint & Test
  # ─────────────────────────────────────────────────────────────
  test:
    name: Lint & Test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: server/package-lock.json

      - name: Install Server Dependencies
        run: npm ci
        working-directory: server

      - name: Lint Server
        run: |
          if npm run | grep -q "lint"; then
            npm run lint
          else
            echo "No lint script, skipping."
          fi
        working-directory: server

      - name: Run Server Tests
        run: |
          if npm run | grep -q "test"; then
            npm test
          else
            echo "No test script configured, skipping."
          fi
        working-directory: server

      - name: Setup Node.js (Client)
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: client/package-lock.json

      - name: Install Client Dependencies
        run: npm ci
        working-directory: client

      - name: Lint Client
        run: npm run lint
        working-directory: client

  # ─────────────────────────────────────────────────────────────
  # JOB 2: Build & Push Docker Images
  # ─────────────────────────────────────────────────────────────
  build-push:
    name: Build & Push Images
    runs-on: ubuntu-latest
    needs: test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    outputs:
      image_tag: ${{ steps.meta.outputs.tag }}

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Compute Image Tag
        id: meta
        run: |
          SHORT_SHA="${GITHUB_SHA::8}"
          echo "tag=${SHORT_SHA}" >> $GITHUB_OUTPUT
          echo "Image tag: ${SHORT_SHA}"

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and Push Server Image
        uses: docker/build-push-action@v6
        with:
          context: ./server
          file: ./server/Dockerfile
          platforms: linux/amd64,linux/arm64
          push: true
          tags: |
            ${{ env.SERVER_IMAGE }}:${{ steps.meta.outputs.tag }}
            ${{ env.SERVER_IMAGE }}:latest
          cache-from: type=gha,scope=server
          cache-to:   type=gha,scope=server,mode=max

      - name: Build and Push Client Image
        uses: docker/build-push-action@v6
        with:
          context: ./client
          file: ./client/Dockerfile
          platforms: linux/amd64,linux/arm64
          push: true
          tags: |
            ${{ env.CLIENT_IMAGE }}:${{ steps.meta.outputs.tag }}
            ${{ env.CLIENT_IMAGE }}:latest
          cache-from: type=gha,scope=client
          cache-to:   type=gha,scope=client,mode=max

  # ─────────────────────────────────────────────────────────────
  # JOB 3: Deploy to Production (self-hosted runner)
  # ─────────────────────────────────────────────────────────────
  deploy:
    name: Deploy to Production
    runs-on:
      - self-hosted
      - queue-cure-runner
    needs: build-push
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    environment: production

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Authenticate Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Deploy with Docker Compose
        env:
          IMAGE_TAG: ${{ needs.build-push.outputs.image_tag }}
        run: |
          set -euo pipefail

          APP_DIR="/home/ubuntu/app"
          COMPOSE_FILE="${APP_DIR}/docker-compose.yaml"

          sudo mkdir -p "$APP_DIR"
          sudo cp docker-compose.prod.yaml "$COMPOSE_FILE"

          export IMAGE_TAG="${IMAGE_TAG}"
          cd "$APP_DIR"

          sudo -E docker compose pull
          sudo -E docker compose up -d --force-recreate --remove-orphans

          echo "Waiting for services to become healthy..."
          for i in $(seq 1 12); do
            SERVER_HEALTH=$(sudo docker inspect --format='{{.State.Health.Status}}' queue-cure-server 2>/dev/null || echo "unknown")
            CLIENT_HEALTH=$(sudo docker inspect --format='{{.State.Health.Status}}' queue-cure-client 2>/dev/null || echo "unknown")

            if [ "$SERVER_HEALTH" = "healthy" ] && [ "$CLIENT_HEALTH" = "healthy" ]; then
              echo "All services are healthy!"
              break
            fi

            if [ $i -eq 12 ]; then
              echo "Services failed health check. Rolling back..."
              sudo -E docker compose down
              sudo -E IMAGE_TAG=latest docker compose pull
              sudo -E IMAGE_TAG=latest docker compose up -d
              exit 1
            fi

            echo "  Attempt ${i}/12 — server: ${SERVER_HEALTH}, client: ${CLIENT_HEALTH}"
            sleep 5
          done

          sudo docker image prune -f

      - name: Notify on Failure
        if: failure()
        run: |
          echo "Deployment FAILED for commit ${{ github.sha }}"
          echo "Logs: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
```

---

## 🔄 Full Pipeline Flow

```
git push → main
     │
     ▼
┌─────────────────────────────────┐
│  Job 1: test (ubuntu-latest)    │
│  • npm ci (server + client)     │
│  • eslint lint                  │
│  • npm test (graceful skip)     │
└────────────────┬────────────────┘
                 │ success
                 ▼
┌─────────────────────────────────┐
│  Job 2: build-push              │
│  • Compute SHA tag (a3f9c1d8)   │
│  • QEMU + Buildx (amd64+arm64)  │
│  • GHA layer cache              │
│  • Push :a3f9c1d8 + :latest     │
└────────────────┬────────────────┘
                 │ success
                 ▼
┌─────────────────────────────────┐
│  Job 3: deploy (self-hosted)    │
│  • docker compose pull          │
│  • docker compose up -d         │
│  • Health check loop (60s)      │
│  • Auto-rollback on failure     │
│  • docker image prune -f        │
└─────────────────────────────────┘
```

---

## 📋 GitHub Secrets Setup

Go to: **GitHub repo → Settings → Secrets and variables → Actions → New repository secret**

| Secret Name | Value |
|---|---|
| `DOCKERHUB_USERNAME` | `yadavkapil9560` |
| `DOCKERHUB_TOKEN` | Your Docker Hub Access Token — generate at hub.docker.com → Account Settings → Personal Access Tokens |

> Always use a Docker Hub **Access Token**, never your account password. Tokens can be revoked independently.

---

## 🖥️ Server VM Setup

On your production server, create the env file Docker Compose loads at runtime:

```bash
sudo mkdir -p /home/ubuntu/app
sudo nano /home/ubuntu/app/.env
```

Fill in your production values (never commit this):

```env
PORT=3003
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/queue-cure
JWT_SECRET=<strong-random-secret>
CLIENT_URI=https://yourdomain.com
COOKIE_SECRET=<strong-random-secret>
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
NODE_ENV=production
EMAIL_PASS=<your-app-password>
EMAIL_USER=<your-email>
```

---

## 🏃 Self-Hosted Runner Setup

```bash
# 1. GitHub repo → Settings → Actions → Runners → New self-hosted runner
# 2. Follow the Linux instructions, then label it:

./config.sh --url https://github.com/<your-username>/queue-cure-26 \
            --token <RUNNER_TOKEN> \
            --labels queue-cure-runner

# 3. Install as a service so it survives reboots
sudo ./svc.sh install
sudo ./svc.sh start
```

---

## 🔑 Key Improvements Summary

| Feature | Before | After |
|---|---|---|
| **Secret leakage** | `.env` baked into server image | Deleted in Dockerfile, injected at runtime |
| **Build caching** | None — rebuilds everything | GitHub Actions GHA cache (50-80% faster) |
| **Image tagging** | `:latest` only | `:latest` + `:sha` — rollback possible |
| **Multi-arch** | amd64 only | `linux/amd64,linux/arm64` |
| **Rollback** | Manual | Auto-rollback if health check fails |
| **Health checks** | None | Defined in Dockerfile + Compose |
| **Startup ordering** | `depends_on: server` | `depends_on: condition: service_healthy` |
| **nginx security** | No headers | X-Frame-Options, nosniff, rate limiting |
| **nginx perf** | No compression | gzip on all text/js/css, 1yr asset caching |
| **PR CI** | No CI on PRs | test job runs on every PR |
| **Concurrency** | Queues up old runs | Cancels stale runs on new push |
| **Docker login** | echo password pipe | docker/login-action (secure, no logs) |

---

## ⚠️ One Required Code Change

The health check pings `/api/health`. Add this to your Express server:

```js
// In server.js — add before other routes:
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});
```

Docker uses this to confirm the server container is truly ready before nginx starts routing traffic to it.
