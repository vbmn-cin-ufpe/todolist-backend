FROM node:16

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install
RUN npm install -g ts-node

COPY . .
COPY ormconfig.json .

EXPOSE 3000

CMD ["npm", "run", "start"]

