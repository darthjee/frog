var _ = require('underscore');

/**
 * Wraps value in array
 *
 * @example
 *   asArray() # returns []
 *
 * @example
 *   asArray(1) # returns [1]
 *
 * @example
 *   asArray([1]) # returns [1]
 */
_.constructor.prototype.asArray = function(value){
  if (value === undefined || value === null)
    return [];
  if (value.constructor == Array)
    return value;
  return [value];
};

module.exports = _;
