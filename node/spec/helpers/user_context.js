var _ = require('underscore');

function enhanceContext(context) {
  _.extend(context, {
    getMemorizedMap: function() {
      if (!this.memorizedMap) {
        this.memorizedMap = {};
      }
      return this.memorizedMap;
    },
    memorizeValue: function(key, func) {
      if (func.constructor != Function) {
        var value = func;
        func = function() { return value };
      }
      this.getMemorizedMap()[key] = func;
    },
    memorizeAll: function(values) {
      var that = this;
      _.each(values, function(func, key) {
        that.memorizeValue(key, func);
      });
    },
    memorize: function() {
      if(arguments[0].constructor == Object) {
        return this.memorizeAll.apply(this, arguments);
      } else {
        return this.memorizeValue.apply(this, arguments);
      }
    },
    memorized: function(key) {
      var value = this.getMemorizedMap()[key]();
      this.getMemorizedMap()[key] = function() {
        return value;
      };
      return value;
    }
  });

  var UserContext = context.constructor;

  UserContext.fromExisting = function(oldContext) {
    var context = new (oldContext.constructor)();

    for (var prop in oldContext) {
      if (oldContext.hasOwnProperty(prop)) {
        if (oldContext[prop].constructor == Object) {
          context[prop] = UserContext.fromExisting(oldContext[prop]);
        } else {
          context[prop] = oldContext[prop];
        }
      }
    }

    return context;
  };

}

beforeAll(function() {
  enhanceContext(this);
});
