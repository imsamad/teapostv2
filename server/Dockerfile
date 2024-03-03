FROM node as base
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .

FROM base as dev
WORKDIR /app
CMD npm run dev

FROM base as prod
WORKDIR /app
RUN npm run build
CMD npm start