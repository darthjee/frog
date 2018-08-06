var http = require('http'),
    _ = require('underscore');

function DummyServer() {
  _.bindAll(this, '_handleRequest');

  this.server = http.createServer(this._handleRequest);
}

var fn = DummyServer.prototype;

fn._handleRequest = function(request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write('ok');
  response.end();
};

fn.start = function() {
  this.server.listen(3000);
};

module.exports = DummyServer;
