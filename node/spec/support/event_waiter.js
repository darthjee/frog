var _ = require('underscore');

class Waiter {
  constructor(context) {
    this.context = context || this;
    this.dependencies = 0;
    this.blocks = [];

    _.bindAll(this, '_done');
  }

  addDependency(block) {
    this.dependencies++;
    block.call(this.context, this._done);
  }

  run(block) {
    if (!this._callRun(block)) {
      this.blocks.push(block);
    };
  }

  _callRun(block) {
    if (this.dependencies <= 0) {
      block.call(this.context);
      return true;
    }
    return false;
  }

  _done() {
    var waiter = this;

    this.dependencies--;

    if (this.dependencies <= 0) {
      _.each(this.blocks, function(block) {
        waiter._callRun(block);
      });
    }
  }
}

module.exports = Waiter;
