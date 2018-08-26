var _ = require('underscore'),
  Dependency = require('./waiter/dependency');
  Block = require('./waiter/block');

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

  _runAll() {
    var waiter = this;

    _.each(this._notRanBlocks(), function(block) {
      waiter._callRun(block);
    });
  }

  _notRanBlocks() {
    return _.select(this.blocks, function(block) {
      return !block.called;
    });
  }

  _done() {
    if (this._completed()) {
      this._runAll();
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
