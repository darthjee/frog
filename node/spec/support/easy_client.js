var Http = require('http');

class EasyClient {
  constructor(options) {
    this.options = options
    this.postData = options.data;
  }

  static get(options) {
  }

  call(success) {
    var responseData = '',
        client = this;

    var req = Http.request(this.options);

    if (this.postData) {
      req.write(this.postData);
    }

    req.on('response', function(response) {
        response.on('data', function(buffer) {
          responseData = responseData.concat(buffer.toString());
        });
        response.on('end', function(buffer) {
          if (buffer) {
            responseData = responseData.concat(buffer.toString());
          }
          success({
            headers: response.headers,
            body: responseData,
            status: response.statusCode
          });
        });
      }).end();
  }
}

module.exports = EasyClient;
