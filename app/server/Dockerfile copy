FROM node as base
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .

FROM base as dev
COPY . .

FROM base as prod
COPY . .
RUN npm run build
RUN rm -rf tsconfig.json src *.md scripts
