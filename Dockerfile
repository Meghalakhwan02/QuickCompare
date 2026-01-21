FROM node:22

WORKDIR /app

# Pass build-time env (optional, Vite reads VITE_ vars at build)
ARG VITE_FACE_API_URL
ENV VITE_FACE_API_URL=$VITE_FACE_API_URL

# Copy package files
COPY package.json package-lock.json* ./

# Fresh install with native binaries
RUN npm ci

# Copy source files
COPY . .

EXPOSE 3000

# Start Vite dev server on all interfaces
CMD ["npx", "vite", "--host", "0.0.0.0", "--port", "3000"]
