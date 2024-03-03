FROM node:20.11.1-alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

CMD npm start
