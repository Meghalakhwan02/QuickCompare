FROM node:22

WORKDIR /app

# 1. Copy package files only
COPY package.json package-lock.json* ./

# 2. Remove any pre-existing node_modules (avoid host binaries)
RUN rm -rf node_modules

# 3. Install dependencies properly (allow scripts for Rollup native)
RUN npm ci

# 4. Copy app source
COPY . .

# 5. Expose port
EXPOSE 3000

# 6. Start Vite dev server on all interfaces
CMD ["npx", "vite", "--host", "0.0.0.0", "--port", "3000"]
