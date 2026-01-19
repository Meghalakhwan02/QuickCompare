# ---------- Build stage ----------
FROM node:18-bullseye AS builder

WORKDIR /app

# Copy only dependency manifests first (better cache)
COPY package.json package-lock.json ./

# Clean, deterministic install
RUN npm ci

# Copy source
COPY . .

# Build Vite app (tsc + vite build)
RUN npm run build


# ---------- Production stage ----------
FROM node:18-bullseye

WORKDIR /app

# Install static server
RUN npm install -g serve

# Copy build output only
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Serve Vite build
CMD ["serve", "-s", "dist", "-l", "3000"]
