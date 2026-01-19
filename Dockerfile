# ---------- Build stage ----------
FROM node:18-bullseye AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --include=optional

COPY . .
RUN npm run build
