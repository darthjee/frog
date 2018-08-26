var _ = require('underscore');

class ResponseHandler {
  constructor(response, dataHandlers, endHandlers) {
    this.response = response;
    this.dataHandlers = dataHandlers;
    this.endHandlers = endHandlers;

    _.bindAll(this, 'handleData', 'handleEnd');
  }

  handleData(buffer) {
    var that = this,
      bufferString = '';

    if (buffer) {
      bufferString = buffer.toString();
    }

    _.each(this.dataHandlers, function (handler) {
      handler(bufferString, that.response);
    });
  }

  handleEnd(buffer) {
    var that = this,
      bufferString = '';

    if (buffer) {
      bufferString = buffer.toString();
    }

    _.each(this.endHandlers, function (handler) {
      handler(bufferString, that.response);
    });
  }
}

module.exports = ResponseHandler;
