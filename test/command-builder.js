var lodashFinder = require('../index');

module.exports = {
  'Lodash build commands': function () {
    var source = '_.each(); _.map();',
        funcs = ['each', 'map'];

    this.addAssertions({
      hasBuildCommand: function (sourceInfo, expectedCommand) {
        var command = lodashFinder.getBuildCmd(sourceInfo.source, sourceInfo.params, sourceInfo.options);
        return command === expectedCommand || command;
      }
    });

    this.test('Simple include parameter', function (assert) {
      assert
        .that({ source: source })
        .hasBuildCommand('lodash --include=' + funcs.join(','))
        .since('Given no other input, a simple command is built');
    });

    this.test('Extra parameters are added', function (assert) {
      assert
        .that({ source: source, params: ['mobile', '--exports=amd'] })
        .hasBuildCommand('lodash --include=' + funcs.join(',') + ' mobile --exports=amd')
        .since();
    });

    this.test('Extra includes are merged', function (assert) {
      assert
        .that({ source: source, params: ['--include=filter,each'] })
        .hasBuildCommand('lodash --include=' + funcs.join(',') + ',filter')
        .since();
    });

    this.test('Options can be passed to the command line builder', function (assert) {
      assert
        .that({
          source: 'var ld = require("vendor/lodash"); ld.map();',
          options: { modules: ['vendor/lodash'] }
        })
        .hasBuildCommand('lodash --include=map')
        .since();
    });
  }
};
