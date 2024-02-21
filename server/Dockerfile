FROM node:20.11-alpine
WORKDIR /
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .

# Peel down extra .ts files to just prod app.
RUN ls
RUN npm run build
# RUN rm -rf src
# RUN rm -rf node_modules
# RUN rm -rf tsconfig.json
# RUN rm -rf scripts
# RUN npm ci --omit=dev
RUN ls
CMD ["sh", "-c", "ls && node .build/index"]
