FROM node:14
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY server.js .
COPY stomp-client.js .

CMD [ "node", "server.js" ]