
FROM node as base

FROM base as deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base as dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
