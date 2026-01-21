FROM node:22

WORKDIR /app

# Vite build-time env
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

# Expose normal port
EXPOSE 3000

# Serve built app on port 3000
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]
