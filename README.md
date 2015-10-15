Home Directory
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Returns the current user's home directory.


## Installation

``` bash
$ npm install utils-homedir
```


## Usage

``` javascript
var homedir = require( 'utils-homedir' );
```

#### homedir

Returns the current user's `home` directory.

``` javascript
var home = homedir();
// returns <dirpath>
```


## Examples

``` javascript
var homedir = require( 'utils-homedir' );

console.log( homedir() );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## CLI

### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g utils-homedir
```

### Usage

```
Usage: homedir [options]

Options:
  -h,  --help     Print this message.
  -V,  --version  Print package version.
```

### Examples

``` bash
$ homedir
```

For local installations, modify the command to point to the local installation directory; e.g.,

``` bash
$ ./node_modules/.bin/homedir
```

Or, if you have cloned this repository and run `npm install`, modify the command to point to the executable; e.g.,

``` bash
$ node ./bin/cli
```


---
## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/utils-homedir.svg
[npm-url]: https://npmjs.org/package/utils-homedir

[travis-image]: http://img.shields.io/travis/kgryte/utils-homedir/master.svg
[travis-url]: https://travis-ci.org/kgryte/utils-homedir

[codecov-image]: https://img.shields.io/codecov/c/github/kgryte/utils-homedir/master.svg
[codecov-url]: https://codecov.io/github/kgryte/utils-homedir?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/utils-homedir.svg
[dependencies-url]: https://david-dm.org/kgryte/utils-homedir

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/utils-homedir.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/utils-homedir

[github-issues-image]: http://img.shields.io/github/issues/kgryte/utils-homedir.svg
[github-issues-url]: https://github.com/kgryte/utils-homedir/issues
