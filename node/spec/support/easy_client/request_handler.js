var ResponseHandler = require('./response_handler'),
  _ = require('underscore');

class RequestHandler {
  constructor(request, handlers) {
    this.request = request;
    this.handlers = handlers;

    _.bindAll(this, '_listenEvents');
  }

  _listenResponse() {
    return this.request.on('response', this._listenEvents);
  }

  _listenEvents(response) {
    var handler = new ResponseHandler(response, this.handlers);

    response.on('data', handler.handleData);
    response.on('end', handler.handleEnd);
  }

  perform() {
    return this._listenResponse().end();
  }
}

module.exports = RequestHandler;
