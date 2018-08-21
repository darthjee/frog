var _ = require('underscore');

class Memorized {
  constructor(func) {
    this.func = func;
    this.value = null;
    this.called = false;
  }

  reset() {
    this.value = null;
    this.called = false
  }

  call(context) {
    if (!this.called) {
      this.value = this.func.call(context);
      this.called = true;
    }
    return this.value;
  }
}

class Memory {
  memorize() {
    if(arguments[0].constructor == Object) {
      return this.memorizeAll.apply(this, arguments);
    } else {
      return this.memorizeValue.apply(this, arguments);
    }
  }

  memorized(key) {
    var context = {},
      that = this;

    _.each(this.getMemorizedMap(), function(_, key) {
      context[key] = function() {
        return that.memorized(key);
      };
    });

    return this.getMemorizedMap()[key].call(context);
  }

  getMemorizedMap() {
    if (!this.memorizedMap) {
      this.memorizedMap = {};
    }
    return this.memorizedMap;
  }

  memorizeValue(key, func) {
    if (func == null || func.constructor != Function) {
      var value = func;
      func = function() { return value; };
    }
    this.getMemorizedMap()[key] = new Memorized(func);
  }

  memorizeAll(values) {
    var that = this;
    _.each(values, function(func, key) {
      that.memorizeValue(key, func);
    });
  }

  reset() {
    _.each(this.getMemorizedMap(), function(memorized) {
      memorized.reset();
    });
  }
}

function enhanceContext(context) {
  _.extend(context, {
    getMemory: function() {
      if (!this.memory) {
        this.memory = new Memory();
      }
      return this.memory;;
    },
    memorize: function() {
      this.getMemory().memorize.apply(this.memory, arguments);
    },
    memorized: function() {
      return this.getMemory().memorized.apply(this.memory, arguments);
    }
  });

  var UserContext = context.constructor;

  UserContext.fromExisting = function(oldContext) {
    var context = new (oldContext.constructor)();

    for (var prop in oldContext) {
      if (oldContext.hasOwnProperty(prop)) {
        var oldValue = oldContext[prop];

        if (
          oldValue != null && (
            oldValue.constructor == Memory || 
            oldValue.constructor == Memorized ||
            oldValue.constructor == Object
          )
        ) {
          context[prop] = UserContext.fromExisting(oldValue);
        } else {
          context[prop] = oldValue;
        }
      }
    }

    return context;
  };

}

beforeAll(function() {
  enhanceContext(this);
});

afterEach(function() {
  this.getMemory().reset();
});
