var Http = require('http');

class EasyClient {
  constructor(options) {
    this.options = options
  }

  static get(options) {
  }

  call(success) {
    var data = '',
        client = this;

    Http.request(this.options).on('response', function(response) {
      response.on('data', function(buffer) {
        data = data.concat(buffer.toString());
      });
      response.on('end', function(buffer) {
        if (buffer) {
          data = data.concat(buffer.toString());
        }
        success({
          headers: response.headers,
          body: data
        });
      });
    }).end();
  }
}

module.exports = EasyClient;
