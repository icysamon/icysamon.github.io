FROM node:22.16-alpine

ENV PORT=3030

WORKDIR /app

COPY package.json package-lock.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]