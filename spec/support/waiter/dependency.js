var _ = require('underscore');

class Dependency {
  constructor(callback) {
    this.callback = callback;

    _.bindAll(this, 'done');

    this.completed = false;
  }

  done() {
    this.completed = true;
    this.callback();
  }
}

module.exports = Dependency;
