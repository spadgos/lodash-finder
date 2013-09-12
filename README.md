## lodash-finder

An NPM module which searches for [Lodash][lodash]/[Underscore][underscore] methods used in your source.

You might want to use this to create custom Lodash builds, using its `include` flag.

```bash
lodash --include=all,the,functions,you,are,using
```

### Usage

**Warning** this library is so alpha it hurts. Don't use it.

```javascript
var lodashFinder = require('lodash-finder');
var functionsUsed = lodashFinder(sourceOfFile);
// functionsUsed == ['each', 'map', 'template']
```

### TODO

- Publish to NPM
- Handle chaining method calls
- Check for local aliasing of `_` (eg: `var _ = []; _.each()`)
- Check for different import names for lodash (eg: `var lodash = require('lodash'); lodash.each(...)`)
- Helper function which will actually execute the lodash build with the given methods.
- Ability to take a file or directory name as input

[lodash]: https://github.com/lodash/lodash
[underscore]: https://github.com/jashkenas/underscore

