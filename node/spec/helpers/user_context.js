var _ = require('underscore'),
  Memory = require('../support/memory'),
  Memorized = require('../support/memory/memorized');

function enhanceContext(context) {
  _.extend(context, {
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
