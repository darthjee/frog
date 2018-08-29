FROM darthjee/node_mongo:0.0.6

ADD package.json  /home/node/app

RUN npm install

