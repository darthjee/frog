var _ = require('underscore');

class Waiter {
  constructor(context) {
    this.context = context || this;
    this.dependencies = 0;

    _.bindAll(this, '_done');
  }

  addDependency(block) {
    block.call(this.context, this._done);
  }

  run(block) {
    block.call(this.context);
  }

  _done() {
    this.dependencies--;

    if (this.dependencies == 0) {}
  }
}

module.exports = Waiter;
