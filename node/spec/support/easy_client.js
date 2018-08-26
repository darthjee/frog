var Http = require('http'),
  RequestHandler = require('./easy_client/request_handler');

class EasyClient {
  constructor(options) {
    this.options = options;
    this.postData = options.data;
  }

  call(success) {
    var responseData = '',
      req = Http.request(this.options),
      handler = new RequestHandler(req, {
        data: function(buffer) {
          responseData = responseData.concat(buffer);
        },
        end: function(buffer, response) {
          responseData = responseData.concat(buffer);

          success({
            headers: response.headers,
            body: responseData,
            status: response.statusCode
          });
        }
      });

    if (this.postData) {
      req.write(this.postData);
    }

    handler.perform();
  }
}

module.exports = EasyClient;
