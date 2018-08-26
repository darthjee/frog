var _ = require('underscore'),
  Memory = require('../support/memory'),
  Memorized = require('../support/memory/memorized'),
  memoryExtension = require('./memory');

function enhanceContext(context) {
  _.extend(context, memoryExtension);

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
