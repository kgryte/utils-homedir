/* global require, describe, it */
'use strict';

var mpath = './../lib';


// MODULES //

var chai = require( 'chai' ),
	os = require( 'os' ),
	proxyquire = require( 'proxyquire' ),
	homedir = require( mpath );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'utils-homedir', function tests() {

	it( 'should export a function', function test() {
		expect( homedir ).to.be.a( 'function' );
	});

	it( 'should alias `os.homedir`', function test() {
		if ( os.homedir === void 0 ) {
			// Older Node versions...
			os.homedir = mock;
		}
		assert.strictEqual( homedir(), os.homedir() );

		if ( os.homedir === mock ) {
			delete os.homedir;
		}

		function mock() {
			// Assume tests are run on Linux env...
			return process.env[ 'HOME' ];
		}
	});

	it( 'should support older Node versions', function test() {
		var fcn;
		if ( os.homedir === void 0 ) {
			assert.strictEqual( homedir(), process.env[ 'HOME' ] );
		} else {
			fcn = os.homedir;
			delete os.homedir;

			// Assume Linux env...
			assert.strictEqual( homedir(), process.env[ 'HOME' ] );

			os.homedir = fcn;
		}
	});

	it( 'should support Windows', function test() {
		var homedir,
			fcn,
			env;

		if ( os.homedir !== void 0 ) {
			fcn = os.homedir;
			os.homedir = undefined;
		}
		homedir = proxyquire( mpath, {
			'check-if-windows': true
		});

		env = process.env[ 'USERPROFILE' ];
		process.env[ 'USERPROFILE' ] = 'C:\\Beep\\Boop';

		assert.strictEqual( homedir(), 'C:\\Beep\\Boop' );

		if ( fcn  ) {
			os.homedir = fcn;
		}
		process.env[ 'USERPROFILE' ] = env;
	});

});
