describe('Underscore', function() {
  var _ = require('../../../lib/underscore_ext');

  describe('#asArray', function() {
    describe('when value is an array', function() {
      it('returns the array itself', function() {
        var array = [1, 2, 3];
        expect(_.asArray(array)).toEqual(array);
      });
    });

    describe('when value is null', function() {
      it('returns an empty array', function() {
        expect(_.asArray(null)).toEqual([]);
      });
    });

    describe('when value is undefined', function() {
      it('returns an empty array', function() {
        expect(_.asArray()).toEqual([]);
      });
    });

    describe('when value is not an array', function() {
      it('returns the value wrapped in an array', function() {
        var value = Math.floor(Math.random() * 100);
        expect(_.asArray(value)).toEqual([value]);
      });
    });
  });
});
