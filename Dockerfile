# ---------- Build stage ----------
FROM node:18-bullseye AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --include=optional

COPY . .
RUN npm run build


# ---------- Production stage ----------
FROM node:18-bullseye

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/build ./build

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
