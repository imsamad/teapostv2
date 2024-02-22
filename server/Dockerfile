FROM node:20.11-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .

RUN npm run build

RUN rm -rf src node_modules tsconfig.json scripts
RUN npm ci --omit=dev
RUN ls
CMD ["npm","start"]