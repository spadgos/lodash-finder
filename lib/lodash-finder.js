var uglify = require('uglify-js');

module.exports = function (sourceOrAst) {
  var ast = typeof sourceOrAst === 'string' ? uglify.parser.parse(sourceOrAst) : sourceOrAst,
      walker = uglify.uglify.ast_walker(),
      foundFuncs = [];

  walker.with_walkers({
    'call': function (invocation) {
      // invocation is...
      // _.foo() --> ["dot", ["name", "_"], "foo"]
      // _.bar.baz() --> ["dot", [ "dot", [ "name", "_" ], "bar" ], "baz" ]

      if (invocation[0] === 'dot' && invocation[1].length === 2 && invocation[1][1] === '_') {
        if (foundFuncs.indexOf(invocation[2]) === -1) {
          foundFuncs.push(invocation[2]);
        }
      }
    }
  }, function () {
    return walker.walk(ast);
  });
  return foundFuncs;
};
