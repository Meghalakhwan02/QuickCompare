# ---------- Build stage ----------
FROM node:18-bullseye AS builder

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build React app
RUN npm run build


# ---------- Production stage ----------
FROM node:18-bullseye

WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy only the build output
COPY --from=builder /app/build ./build

# Expose port
EXPOSE 3000

# Serve React build
CMD ["serve", "-s", "build", "-l", "3000"]
