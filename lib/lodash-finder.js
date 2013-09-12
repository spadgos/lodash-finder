var acorn = require('acorn'),
    walker = require('acorn/util/walk');

module.exports = function (source) {
  var ast = acorn.parse(source),
      foundFuncs = [];

  walker.simple(ast, {
    CallExpression: function (call) {
      var callee = call.callee;
      if (callee.type === 'MemberExpression' && callee.object.type === 'Identifier') {
        if (callee.object.name === '_') {
          if (foundFuncs.indexOf(callee.property.name) === -1) {
            foundFuncs.push(callee.property.name);
          }
        }
      }
    }
  });
  return foundFuncs;
};
