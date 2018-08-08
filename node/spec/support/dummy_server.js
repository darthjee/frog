var http = require('http'),
    _ = require('underscore');

class DummyServer {
  constructor() {
    this.server = http.createServer(this._handleRequest);
  }

  _handleRequest(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('-------------------------------------------------ok\n');
    response.write('-------------------------------------------------dok\n');
    console.info('finishing');
    response.end('data');
    console.info('finished');
  }

  start() {
    this.server.listen(3000);
  }

  stop() {
    this.server.close();
  }
}

module.exports = DummyServer;
