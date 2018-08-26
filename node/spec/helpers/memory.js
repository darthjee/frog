var Memory = require('../support/memory'),
  Memorized = require('../support/memory/memorized');

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
  }
}
