# ---------- Build stage ----------
FROM node:18-bullseye AS builder

WORKDIR /app

COPY package.json package-lock.json ./

ENV ROLLUP_DISABLE_NATIVE=1
ENV NODE_OPTIONS=--max-old-space-size=4096

RUN npm ci

COPY . .
RUN npm run build
