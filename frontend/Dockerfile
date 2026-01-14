FROM node:20-alpine
 
ARG NEXT_PUBLIC_API_BASE_URL

ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
 
WORKDIR /app
 
# Install dependencies first

COPY package*.json ./

RUN npm ci
 
# Copy source AFTER deps

COPY . .
 
# Ensure no stale Next.js build

RUN rm -rf .next
 
# Build fresh

RUN npm run build
 
EXPOSE 3000
 
CMD ["npm", "run", "start"]

 