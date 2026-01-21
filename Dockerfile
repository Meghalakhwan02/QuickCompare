FROM node:22.15.0

ARG VITE_FACE_API_URL
ENV VITE_FACE_API_URL=$VITE_FACE_API_URL

WORKDIR /app

# Copy only dependency files first
COPY package.json package-lock.json ./

# Install EXACT dependencies (including native rollup binary)
RUN npm ci

# Copy source code AFTER deps
COPY . .

# Build
RUN npm run build
