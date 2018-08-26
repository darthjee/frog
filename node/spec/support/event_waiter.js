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

class Waiter {
  constructor(context) {
    this.context = context || this;
    this.incompleteDependencies = [];
    this.blocks = [];

    _.bindAll(this, '_done');
  }

  addDependency(block) {
    var dependency = new Dependency(this._done);

    this.incompleteDependencies.push(dependency);

    block.call(this.context, dependency.done);
  }

  run(callback) {
    var block = new Block(callback, this.context);

    if (!this._callRun(block)) {
      this.blocks.push(block);
    }
  }

  _callRun(block) {
    if (this._completed()) {
      block.call();
      return true;
    }
    return false;
  }

  _done() {
    var waiter = this;

    if (this._completed()) {
      _.each(this.blocks, function(block) {
        waiter._callRun(block);
      });
    }
  }

  _completed() {
    return this._incompleteDependencies().length == 0;
  }

  _incompleteDependencies() {
    this.incompleteDependencies = _.select(
      this.incompleteDependencies, function(dependency) {
        return ! dependency.completed;
      }
    );

    return this.incompleteDependencies;
  }
}

module.exports = Waiter;
