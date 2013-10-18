var Uglify = require('uglify-js'),
    lodashFinder;

module.exports = lodashFinder = function (source, options) {
  var ast          = Uglify.parse(source),
      modules      = (options && options.modules) || ['underscore', 'lodash', '_'],
      foundFuncs   = [],
      map          = {},
      usingRequire = false;

  ast.figure_out_scope();

  ast.walk(new Uglify.TreeWalker(function (node) {
    if (node instanceof Uglify.AST_VarDef) {
      var value = node.value;
      if (value
          && value instanceof Uglify.AST_Call
          && value.expression.name === 'require'
          && value.args[0] instanceof Uglify.AST_String
          && modules.indexOf(value.args[0].value) > -1
          && value.expression.global()) {

        map[node.name.name] = node;
        usingRequire = true;
      }
    }
  }));

  ast.walk(new Uglify.TreeWalker(function (node) {
    if (node instanceof Uglify.AST_Call) {
      if (node.expression instanceof Uglify.AST_Dot) {
        var left = node.expression.expression,
            funcName = node.expression.property,
            defNode;

        if (left instanceof Uglify.AST_SymbolRef) {
          defNode = map[left.name];
          if ((!usingRequire && left.name === '_') || (defNode && left.thedef.orig.some(matches, defNode))) {
            if (foundFuncs.indexOf(funcName) === -1) {
              foundFuncs.push(funcName);
            }
          }
        }
      }
    }
  }));

  return foundFuncs;
};

function matches (symbol) {
  return symbol.start === this.start;
}

lodashFinder.parse = lodashFinder;

lodashFinder.getBuildCmd = function (source, cmdLineOpts, parseOptions) {
  var includes = lodashFinder.parse(source, parseOptions);
  cmdLineOpts = cmdLineOpts || [];
  cmdLineOpts.some(function (option, index, optsArray) {
    var parts = option.replace(/^-+/, '').split('=');
    if (parts.length === 2 && parts[0] === 'include') {
      parts[1].split(',').reduce(function (funcs, include) {
        if (funcs.indexOf(include) === -1) {
          funcs.push(include);
        }
        return funcs;
      }, includes);
      optsArray.splice(index, 1);
      return true;
    }
  });
  return 'lodash --include=' + includes.join(',') + [''].concat(cmdLineOpts).join(' ');
};



