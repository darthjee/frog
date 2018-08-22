var _ = require('underscore');

class ResponseHandler {
  constructor(response, handlers) {
    this.response = response;
    this.handlers = handlers;

    _.bindAll(this, 'handleData', 'handleEnd');
  }

  handleData(buffer) {
    this.handlers.data(buffer.toString(), this.response);
  }

  handleEnd(buffer) {
    var bufferString = '';

    if (buffer) {
      bufferString = buffer.toString();
    }

    this.handlers.end(bufferString, this.response);
  }
}

module.exports = ResponseHandler;
