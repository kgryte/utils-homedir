'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' ),
	isWindows = require( 'check-if-windows' ),
	platform = require( 'utils-platform' ),
	os = require( 'os' );


// HOMEDIR //

/**
* FUNCTION: homedir()
*	Returns the current user's home directory.
*
* @returns {String|Null} directory
*/
function homedir() {
	var env = process.env,
		home,
		user;

	if ( isWindows ) {
		// https://github.com/libuv/libuv/blob/764877fd9e4ea67c0cbe27bf81b2b294ed33b0f5/src/win/util.c#L1170
		// https://en.wikipedia.org/wiki/Environment_variable#Windows
		home = env[ 'USERPROFILE' ] || env[ 'HOMEDRIVE' ]+env[ 'HOMEPATH' ] || env[ 'HOME' ];
		return ( home ) ? home : null;
	}
	// https://github.com/libuv/libuv/blob/9fbcca048181b927cfcdb5c6c49e5bdff173aad5/src/unix/core.c#L1030
	home = env[ 'HOME' ];
	if ( home ) {
		return home;
	}
	// Get the current user account (https://docs.python.org/2/library/getpass.html):
	user = env[ 'LOGNAME' ] || env[ 'USER' ] || env[ 'LNAME' ] || env[ 'USERNAME' ];

	// If on Mac OSX, use the Mac path convention (http://apple.stackexchange.com/questions/119230/what-is-standard-for-os-x-filesystem-e-g-opt-vs-usr)...
	if ( platform === 'darwin' ) {
		return ( user ) ? '/Users/'+user : null;
	}
	// Check if running as 'root' (https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard)...
	if ( process.getuid() === 0 ) {
		return '/root';
	}
	// If on Linux, use the Linux path convention (https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard)...
	return ( user ) ? '/home/'+user : null;
} // end FUNCTION homedir()


// EXPORTS //

module.exports = isFunction( os.homedir ) ? os.homedir : homedir;
