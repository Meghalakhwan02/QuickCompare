FROM node:22

WORKDIR /app


# Pass API URL at build time
ARG VITE_FACE_API_URL
ENV VITE_FACE_API_URL=$VITE_FACE_API_URL

# Copy only package files first
COPY package.json package-lock.json* ./

# Clean install to ensure Linux-native optional deps
RUN npm ci --ignore-scripts

# Copy app files
COPY . .

EXPOSE 3000

# Run Vite dev server on all interfaces
CMD ["npx", "vite", "--host", "0.0.0.0", "--port", "3000"]
