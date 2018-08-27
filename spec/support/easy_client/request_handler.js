var ResponseHandler = require('./response_handler'),
  _ = require('underscore');

class RequestHandler {
  constructor(request, handlers) {
    this.request = request;
    this.dataHandlers = [];
    this.endHandlers = [];

    if (handlers.data) {
      this.dataHandlers.push(handlers.data);
    }

    if (handlers.end) {
      this.endHandlers.push(handlers.end);
    }

    _.bindAll(this, '_listenEvents');
  }

  _listenResponse() {
    return this.request.on('response', this._listenEvents);
  }

  _listenEvents(response) {
    var handler = new ResponseHandler(
      response, this.dataHandlers, this.endHandlers
    );

    response.on('data', handler.handleData);
    response.on('end', handler.handleEnd);
  }

  onData(handler) {
    this.dataHandlers.push(handler);
    return this;
  }

  onEnd(handler) {
    this.endHandlers.push(handler);
    return this;
  }

  perform() {
    return this._listenResponse().end();
  }
}

module.exports = RequestHandler;
