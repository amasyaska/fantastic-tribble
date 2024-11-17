FROM node:18-alpine AS build

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/build /app/build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
