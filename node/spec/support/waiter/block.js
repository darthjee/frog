var _ = require('underscore');

class Block {
  constructor(block, context) {
    this.block = _.bind(block, context);
    this.called = false;
  }

  call() {
    this.block();
    this.called = true;
  }
}

module.exports = Block;
