var lodashFinder = require('../lodash-finder'),
    _ = require('underscore');

[
  {
    expected: ['reduce', 'each', 'map'],
    input: function () {
      _.reduce();
      _.bar.baz();
      _.each();
      _.map();
      _.each();
      _();
    }
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
