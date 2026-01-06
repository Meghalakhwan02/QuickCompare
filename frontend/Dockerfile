# Build and run Next.js app
FROM node:20-alpine

# This argument is required to bake the API URL into the frontend at build-time
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]

