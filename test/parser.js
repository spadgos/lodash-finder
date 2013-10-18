var lodashFinder = require('../index'),
    _; // for jshint

module.exports = {
  'Parsing code for output': function () {
    var options;

    this.before(function () {
      options = {};
    });

    this.addAssertions({
      containsLodash: function (inputFn, expectedMethods) {
        var actual = lodashFinder('!' + inputFn.toString(), options);
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

    this.test('Lodash require()s can be aliased locally', function (assert) {
      var input = function () {
        var lodash = require('lodash'),
            under = require('underscore'),
            chr = require('_');
        lodash.each();
        under.filter();
        chr.map();
      };
      assert.that(input).containsLodash(['each', 'filter', 'map'])();
    });

    this.test('Lodash can be required from a custom module', function (assert) {
      var input = function () {
        var lodash = require('vendor/lodash'),
            under = require('vendor/underscore');
        lodash.each();
        under.filter();
      };
      options = {
        modules: ['vendor/lodash', 'vendor/underscore']
      };
      assert.that(input).containsLodash(['each', 'filter'])();
    });

    this.test('Overwritten imports are not ignored', function (assert) {
      var input = function () {
        var lodash = require('lodash');
        (function () {
          var lodash = {};
          lodash.map();
        }());
        lodash.filter();
      };
      assert.that(input).containsLodash(['filter'])();
    });
  }
};
