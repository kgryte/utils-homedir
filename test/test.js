/* global require, describe, it, beforeEach */
'use strict';

var mpath = './../lib';


// MODULES //

var chai = require( 'chai' ),
	os = require( 'os' ),
	proxyquire = require( 'proxyquire' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'utils-homedir', function tests() {

	var opts;

	beforeEach( function before() {
		opts = {
			'os': {
				'homedir': undefined
			},
			'utils-platform': 'darwin',
			'check-if-windows': false
		};
	});

	it( 'should export a function', function test() {
		var homedir = proxyquire( mpath, opts );
		expect( homedir ).to.be.a( 'function' );
	});

	it( 'should alias `os.homedir`', function test() {
		var homedir;

		opts.os.homedir = mock;
		homedir = proxyquire( mpath, opts );

		assert.strictEqual( homedir, mock );

		function mock(){}
	});

	it( 'should support older Node versions', function test() {
		var homedir,
			env;

		homedir = proxyquire( mpath, opts );

		env = process.env;
		process.env = {
			'HOME': '/Users/beep'
		};

		assert.strictEqual( homedir(), '/Users/beep' );

		process.env = env;
	});

	it( 'should return a home directory in a non-windows environment (HOME)', function test() {
		var homedir,
			env;

		opts[ 'utils-platform' ] = 'darwin';
		homedir = proxyquire( mpath, opts );

		env = process.env;
		process.env = {
			'HOME': '/Users/beep'
		};

		assert.strictEqual( homedir(), '/Users/beep' );

		process.env = env;
	});

	it( 'should return a home directory in a Mac OSX environment (LOGNAME)', function test() {
		var homedir,
			env;

		opts[ 'utils-platform' ] = 'darwin';
		homedir = proxyquire( mpath, opts );

		env = process.env;
		process.env = {
			'LOGNAME': 'beep'
		};

		assert.strictEqual( homedir(), '/Users/beep' );

		process.env = env;
	});

	it( 'should return a home directory in a Linux environment (LOGNAME)', function test() {
		var homedir,
			env;

		opts[ 'utils-platform' ] = 'linux';
		homedir = proxyquire( mpath, opts );

		env = process.env;
		process.env = {
			'LOGNAME': 'beep'
		};

		assert.strictEqual( homedir(), '/home/beep' );

		process.env = env;
	});

	it( 'should return a home directory in a Mac OSX environment (USER)', function test() {
		var homedir,
			env;

		opts[ 'utils-platform' ] = 'darwin';
		homedir = proxyquire( mpath, opts );

		env = process.env;
		process.env = {
			'USER': 'beep'
		};

		assert.strictEqual( homedir(), '/Users/beep' );

		process.env = env;
	});

	it( 'should return a home directory in a Linux environment (USER)', function test() {
		var homedir,
			env;

		opts[ 'utils-platform' ] = 'linux';
		homedir = proxyquire( mpath, opts );

		env = process.env;
		process.env = {
			'USER': 'beep'
		};

		assert.strictEqual( homedir(), '/home/beep' );

		process.env = env;
	});

	it( 'should return a home directory in a Mac OSX environment (LNAME)', function test() {
		var homedir,
			env;

		opts[ 'utils-platform' ] = 'darwin';
		homedir = proxyquire( mpath, opts );

		env = process.env;
		process.env = {
			'LNAME': 'beep'
		};

		assert.strictEqual( homedir(), '/Users/beep' );

		process.env = env;
	});

	it( 'should return a home directory in a Linux environment (LNAME)', function test() {
		var homedir,
			env;

		opts[ 'utils-platform' ] = 'linux';
		homedir = proxyquire( mpath, opts );

		env = process.env;
		process.env = {
			'LNAME': 'beep'
		};

		assert.strictEqual( homedir(), '/home/beep' );

		process.env = env;
	});

	it( 'should return a home directory in a Mac OSX environment (USERNAME)', function test() {
		var homedir,
			env;

		opts[ 'utils-platform' ] = 'darwin';
		homedir = proxyquire( mpath, opts );

		env = process.env;
		process.env = {
			'USERNAME': 'beep'
		};

		assert.strictEqual( homedir(), '/Users/beep' );

		process.env = env;
	});

	it( 'should return a home directory in a Linux environment (USERNAME)', function test() {
		var homedir,
			env;

		opts[ 'utils-platform' ] = 'linux';
		homedir = proxyquire( mpath, opts );

		env = process.env;
		process.env = {
			'USERNAME': 'beep'
		};

		assert.strictEqual( homedir(), '/home/beep' );

		process.env = env;
	});

	it( 'should return `null` if unable to locate a home directory in a Mac OS X environment', function test() {
		var homedir,
			env;

		opts[ 'utils-platform' ] = 'darwin';
		homedir = proxyquire( mpath, opts );

		env = process.env;
		process.env = {};

		assert.isNull( homedir() );

		process.env = env;
	});

	it( 'should return `null` if unable to locate a home directory in a linux environment', function test() {
		var homedir,
			env;

		opts[ 'utils-platform' ] = 'linux';
		homedir = proxyquire( mpath, opts );

		env = process.env;
		process.env = {};

		assert.isNull( homedir() );

		process.env = env;
	});

	it( 'should return the `/root` directory if run as `root` in a linux environment', function test() {
		var homedir,
			env,
			fcn;

		opts[ 'utils-platform' ] = 'linux';
		homedir = proxyquire( mpath, opts );

		env = process.env;
		process.env = {};

		fcn = process.getuid;
		process.getuid = getuid;

		assert.strictEqual( homedir(), '/root' );

		process.env = env;
		process.getuid = fcn;

		function getuid() {
			return 0;
		}
	});

	it( 'should return a home directory on Windows (USERPROFILE)', function test() {
		var homedir,
			env;

		opts[ 'check-if-windows' ] = true;
		homedir = proxyquire( mpath, opts );

		env = process.env;
		process.env = {
			'USERPROFILE': 'C:\\Users\\boop'
		};

		assert.strictEqual( homedir(), 'C:\\Users\\boop' );

		process.env = env;
	});

	it( 'should return a home directory on Windows (HOMEDRIVE+HOMEPATH)', function test() {
		var homedir,
			env;

		opts[ 'check-if-windows' ] = true;
		homedir = proxyquire( mpath, opts );

		env = process.env;
		process.env = {
			'HOMEDRIVE': 'C:',
			'HOMEPATH': '\\Users\\boop'
		};

		assert.strictEqual( homedir(), 'C:\\Users\\boop' );

		process.env = env;
	});

	it( 'should return a home directory on Windows (HOME)', function test() {
		var homedir,
			env;

		opts[ 'check-if-windows' ] = true;
		homedir = proxyquire( mpath, opts );

		env = process.env;
		process.env = {
			'HOME': 'C:\\Users\\boop'
		};

		assert.strictEqual( homedir(), 'C:\\Users\\boop' );

		process.env = env;
	});

	it( 'should return `null` if unable to locate a home directory on Windows', function test() {
		var homedir,
			env;

		opts[ 'check-if-windows' ] = true;
		homedir = proxyquire( mpath, opts );

		env = process.env;
		process.env = {};

		assert.isNull( homedir() );

		process.env = env;
	});

});
