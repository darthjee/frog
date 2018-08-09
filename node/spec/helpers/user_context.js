var _ = require('underscore');

function enhanceContext(context) {
  _.extend(context, {
    getMemorizedMap: function() {
      if (!this.memorizedMap) {
        this.memorizedMap = {};
      }
      return this.memorizedMap;
    },
    memorize: function(key, func) {
      if (func.constructor != Function) {
        var value = func;
        func = function() { return value };
      }
      this.getMemorizedMap()[key] = func;
    },
    memorized: function(key) {
      var value = this.getMemorizedMap()[key]();
      this.getMemorizedMap()[key] = function() {
        return value;
      };
      return value;
    }
  });
}

beforeAll(function() {
  enhanceContext(this);
});