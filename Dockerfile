FROM node:22

WORKDIR /app

# Build-time env for Vite
ARG VITE_FACE_API_URL
ENV VITE_FACE_API_URL=$VITE_FACE_API_URL

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source
COPY . .

# Build production assets
RUN npm run build

# Vite preview port (production serve)
EXPOSE 4173

# Serve built app
CMD ["npm", "run", "preview", "--", "--host"]
