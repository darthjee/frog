var _ = require('underscore'),
  Memorized = require('./memory/memorized');

class Memory {
  memorize() {
    if(arguments[0].constructor == Object) {
      return this.memorizeAll.apply(this, arguments);
    } else {
      return this.memorizeValue.apply(this, arguments);
    }
  }

  memorized(key) {
    if(key.constructor == String) {
      return this.getMemorizedMap()[key].call(this.getContext());
    } else {
      return key.call(this.getContext());
    }
  }

  getContext() {
    if (!this.context) {
      this.context = {};
    }
    return this.context;
  }

  getMemorizedMap() {
    if (!this.memorizedMap) {
      this.memorizedMap = {};
    }
    return this.memorizedMap;
  }

  memorizeValue(key, func) {
    var that = this;

    if (func == null || func.constructor != Function) {
      var value = func;
      func = function() { return value; };
    }

    this.getMemorizedMap()[key] = new Memorized(func);
    this.getContext()[key] = function() {
      return that.memorized(key);
    };
  }

  memorizeAll(values) {
    var memmory = this;
    _.each(values, function(func, key) {
      memmory.memorizeValue(key, func);
    });
  }

  reset() {
    _.each(this.getMemorizedMap(), function(memorized) {
      memorized.reset();
    });
  }
}

module.exports = Memory;
