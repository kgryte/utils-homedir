'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' ),
	isWindows = require( 'check-if-windows' ),
	os = require( 'os' );


// HOMEDIR //

/**
* FUNCTION: homedir()
*	Returns the current user's home directory.
*
* @returns {String} directory
*/
function homedir() {
	if ( isFunction( os.homedir ) ) {
		return os.homedir();
	}
	// Node < v4
	if ( isWindows ) {
		// https://github.com/libuv/libuv/blob/764877fd9e4ea67c0cbe27bf81b2b294ed33b0f5/src/win/util.c#L1170
		return process.env[ 'USERPROFILE' ];
	}
	// https://github.com/libuv/libuv/blob/9fbcca048181b927cfcdb5c6c49e5bdff173aad5/src/unix/core.c#L1030
	return process.env[ 'HOME' ];
} // end FUNCTION homedir()


// EXPORTS //

module.exports = homedir;
