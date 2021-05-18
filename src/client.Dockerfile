FROM node:14
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY client.js .
COPY stomp-client.js .

CMD [ "node", "client.js" ]