console.info('Starting this thing');

var Server = require('./dummy_server');
var EasyClient = require('../spec/support/easy_client');
var RedirecterHttp = require('../lib/proxy/server');

new Server().start();

var client = new EasyClient({
  hostname: 'localhost',
  port: 3300
});

var config = {
  port: 3300,
  proxy: {
    host: 'localhost',
    port: 3000
  }
};

var redirect = RedirecterHttp(config);

redirect.listen();

client.call(function(response) {
  console.info(response.body);
});
