var lodashFinder = require('../index'),
    _; // for jshint

module.exports = {
  'Lodash Finder tests': function () {

    this.addAssertions({
      containsLodash: function (inputFn, expectedMethods) {
        var actual = lodashFinder('!' + inputFn.toString());
        expectedMethods.sort();
        actual.sort();
        return this(actual).equals(expectedMethods)();
      }
    });

    this.test('Only top level methods should be returned', function (assert) {
      var input = function () {
        _.reduce();
        _.bar.baz();
        _.map();
        _.each();
        _();
      };
      assert.that(input).containsLodash(['reduce', 'map', 'each'])();
    });

    this.test('Duplicates should be filtered', function (assert) {
      var input = function () {
        _.reduce();
        _.reduce();
        _.reduce();
        _.each();
        _.each();
      };
      assert.that(input).containsLodash(['reduce', 'each'])();
    });

    this.test('Comments and strings are not returned', function (assert) {
      var input = function () {
        // _.map()
        /* _.reduce() */
        var x = '_.each()',
            y = '_.filter()',
            z;
        z = y + x;
      };
      assert.that(input).containsLodash([])();
    });
  }
};
