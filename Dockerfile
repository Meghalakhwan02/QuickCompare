FROM node:22


ARG VITE_FACE_API_URL
ENV VITE_FACE_API_URL=$VITE_FACE_API_URL

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build
