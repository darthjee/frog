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

class Waiter {
  constructor(context) {
    this.context = context || this;
    this.dependencies = [];
    this.blocks = [];

    _.bindAll(this, '_done');
  }

  addDependency(block) {
    var dependency = new Dependency(this._done);

    this.dependencies.push(dependency);

    block.call(this.context, dependency.done);
  }

  run(block) {
    if (!this._callRun(block)) {
      this.blocks.push(block);
    };
  }

  _callRun(block) {
    if (this._completed()) {
      block.call(this.context);
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
    return _.select(this.dependencies, function(dependency) {
      return ! dependency.completed;
    });
  }
}

module.exports = Waiter;
