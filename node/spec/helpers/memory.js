var Memory = require('../support/memory'),
  Waiter = require('../support/waiter');

module.exports = {
  getMemory: function() {
    if (!this.memory) {
      this.memory = new Memory();
    }
    return this.memory;
  },

  memorize: function() {
    this.getMemory().memorize.apply(this.memory, arguments);
  },

  memorized: function() {
    return this.getMemory().memorized.apply(this.memory, arguments);
  },

  getWaitersMap: function() {
    var context = this;

    this.memorized(function() {
      if (!this.waiters) {
        context.memorize({ waiters: {} });
      }
    });

    return this.memorized('waiters');
  },

  getWaiter: function(key) {
    if (!this.getWaitersMap()[key]) {
      this.getWaitersMap()[key] = this.memorized(function() {
        return new Waiter(this);
      });
    }

    return this.getWaitersMap()[key];
  },

  dependency: function(key, dependency) {
    if (key.constructor == Function) {
      dependency = key;
      key = 'default';
    }

    this.getWaiter(key).addDependency(dependency);
  },

  dependent: function(key, block) {
    if (key.constructor == Function) {
      block = key;
      key = 'default';
    }

    this.getWaiter(key).run(block);
  }
};
