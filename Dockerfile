# Use Node 22
FROM node:22

# Set working directory
WORKDIR /app

# Pass API URL at build time
ARG VITE_FACE_API_URL
ENV VITE_FACE_API_URL=$VITE_FACE_API_URL

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port Vite will run on
EXPOSE 3000

# Start Vite dev server on all interfaces
CMD ["npx", "vite", "--host", "0.0.0.0", "--port", "3000"]
