FROM node:21-alpine3.18

WORKDIR /app

COPY package*.json ./

COPY . .

EXPOSE 3000

RUN npm install

EXPOSE 5000
CMD ["node", "index.js"]

