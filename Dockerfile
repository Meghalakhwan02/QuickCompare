FROM node:22

WORKDIR /app

# Build-time ARG for API
ARG VITE_FACE_API_URL
ENV VITE_FACE_API_URL=$VITE_FACE_API_URL

# Force Rollup JS fallback to avoid native binary errors
ENV ROLLUP_IGNORE_NATIVE=true

# Copy package files
COPY package.json package-lock.json* ./

# Clean install inside container (Linux)
RUN rm -rf node_modules && npm ci

# Copy app source
COPY . .

# Expose port
EXPOSE 3000

# Start Vite dev server on all interfaces
CMD ["npx", "vite", "--host", "0.0.0.0", "--port", "3000"]
