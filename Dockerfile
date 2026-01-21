FROM node:22


ARG VITE_FACE_API_URL
ENV VITE_FACE_API_URL=$VITE_FACE_API_URL

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

# Build
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]

