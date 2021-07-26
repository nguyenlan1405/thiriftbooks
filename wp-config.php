<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
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
define( 'DB_NAME', 'bookdb' );

/** MySQL database username */
define( 'DB_USER', 'nguyenlan' );

/** MySQL database password */
define( 'DB_PASSWORD', '1234' );

/** MySQL hostname */
define( 'DB_HOST', '42.118.85.113' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'IY>Kt1`cv6T]HfNo[cJp.FaJhae%&C^/CKcg+4QzQDumKbbuy9*9o<=vs9UGt:OL' );
define( 'SECURE_AUTH_KEY',  'mr]jP8s]mH`,BsD/<63*<XSu/bYg^^W81w>5Pi.zY~5U7z/lDX:S83MPv;{/:Y+?' );
define( 'LOGGED_IN_KEY',    'UvY/L]],`)?:VL9BCfx?{1R5^i&Ua)MR)Sqq4zS8s@;T!9wu]]<Ad]57bogI5$ns' );
define( 'NONCE_KEY',        'Y]u}.n-3y0?0`1Flw1+L<,>+W@E=QIsNN7a*.lpmo9L{Ig7i@-@KXZ9v!%1*6*)|' );
define( 'AUTH_SALT',        'y]Ark) (:5%2-YH[4,B5i&wLY=!IYIU6ArNXM?5J<sN.zUd%zzm3@)ML2I6% oDP' );
define( 'SECURE_AUTH_SALT', ')SBqRu`%}l_*Ahi^{Qg6D?#skf,E^0AH<Qa?|[KN?/wn|>D$.B#:~$<_BP,N}RZB' );
define( 'LOGGED_IN_SALT',   'j/xlFNstyls4`AVs5)]!L_%=ZOY*j/vk}`eaP:kTjjijizigyoTxZvM$K^)PB_ T' );
define( 'NONCE_SALT',       'mfRqbhq]?t/8]uz4CXZ3c(zakHkP&W_F:4b:b>! ]}g36_1@vc iUWK>C87@12LL' );

/**#@-*/

/**
 * WordPress database table prefix.
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
define( 'WP_DEBUG', true );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
