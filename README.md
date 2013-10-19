## lodash-finder

An NPM module which searches for [Lodash][lodash]/[Underscore][underscore] methods used in your source.

You might want to use this to create custom Lodash builds, using its `include` flag without having to maintain the list of used functions manually.

```bash
lodash --include=all,the,functions,you,are,using
```

### Basic usage

The node module provides two functions:

1. Parses a source file and returns an array of the lodash methods used.
2. Gets the command to run to build lodash with the methods in the given source file.

```javascript
lodashFinder = require('lodash-finder');
functionsUsed = lodashFinder(sourceOfFile);
// functionsUsed == ['each', 'map', 'template']

buildCommand = lodashFinder.getBuildCmd(sourceOfFile, ['modern', '--output', 'lodash.js']);
// buildCommand == 'lodash include=each,map,template modern --output lodash.js'
```

Additionally, there's an executable which essentially wraps lodash's cli, but passes on the methods to include.

```shell
$ lodash-finder src modern --output lodash.js
```

The command line tool accepts the exact same arguments as lodash's cli, with two differences. The first argument must be a path identifier to find the source files. Paths can be excluded from the source by passing any number of `--exclude=` arguments.

Paths can be identified in three ways:

- glob syntax, eg: `src/**/*.js`
- a path to a directory, eg: `test`, which is then translated to `test/**/*.js`
- a path to a single file, eg: `src/all.js`

For example, to include the `src` directory but ignore vendor and test files:

```bash
$ lodash-finder src --exclude=src/test --exclude=src/vendor
```

### TODO

- Handle chaining method calls

[lodash]: https://github.com/lodash/lodash
[underscore]: https://github.com/jashkenas/underscore

