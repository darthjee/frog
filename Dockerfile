FROM darthjee/node_mongo:0.0.5

ADD node/package.json  /home/node/app

RUN npm install

