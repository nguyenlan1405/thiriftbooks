<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'books' );

/** MySQL database username */
define( 'DB_USER', 'nguyenlan' );

/** MySQL database password */
define( 'DB_PASSWORD', '1234' );

/** MySQL hostname */
define( 'DB_HOST', '42.118.85.113' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '4=VbBaxjuX&RW(<fakj*Q$dk^BiE#rMH7i%=WS)nP#UTG$mRDgzVs[U5{>_Y> Vc' );
define( 'SECURE_AUTH_KEY',  'is{Kh`pWQ7%iYhBH1=HcO x9:Z(Nj?Txd_fzzW?tHv`RTUIE1%7+]~zXounZ_W[|' );
define( 'LOGGED_IN_KEY',    ')jL83vfvcm@qqWbC{ipO %BlJq6&1cz8#t27xBr@*Mbb;?iWO-ARLC,x97pfLP=C' );
define( 'NONCE_KEY',        'uSe@^R;97=B`:3nU@??=^~Cpqekp+VFzZ1h=Yl0G`;Nqvp!wSRc}f-b2 /w]NJn?' );
define( 'AUTH_SALT',        ')<y6liRpPsS>Mr6<TMcSO;l1bIPK-c-%{yusthe4+XRPemA %_UV#|mUu1h9!Y4y' );
define( 'SECURE_AUTH_SALT', '4WYd_!RtARSQ,v(;3$~?RmV6<fMx`#UdXK_}(6U.5kRYjc,-!4y/PW}IjWempWyC' );
define( 'LOGGED_IN_SALT',   '0(WY~vwgzlf=@SX[#*wnlsbGsZ$t@c]Mu:$+OWbVrrl!x([p(*v$PU{Z6GD}@E|L' );
define( 'NONCE_SALT',       'j%.9SkQSc,yyvgW9*~=+B:oQR89XAF2.by:`%1.Lb sgs=nY_~$znbA&b:+aUsE&' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';