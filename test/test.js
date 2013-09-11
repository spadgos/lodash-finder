var lodashFinder = require('../lodash-finder'),
    _ = require('underscore');

[
  {
    message: 'Only top level methods should be returned',
    input: function () {
      _.reduce();
      _.bar.baz();
      _.map();
      _.each();
      _();
    },
    expected: ['reduce', 'map', 'each']
  },
  {
    message: 'Duplicates should be filtered',
    input: function () {
      _.reduce();
      _.reduce();
      _.reduce();
      _.each();
      _.each();
    },
    expected: ['reduce', 'each']
  },
  {
    message: 'Comments and strings are not returned',
    input: function () {
      // _.map()
      /* _.reduce() */
      var x = '_.each()',
          y = '_.filter()',
          z;
      z = y + x;
    },
    expected: []
  }
].forEach(function (test) {
  var input = 'x = ' + test.input.toString();
  assert(_.difference(lodashFinder(input), test.expected).length === 0);
});

function assert(test) {
  if (!test) {
    throw 'NOPE';
  }
}
