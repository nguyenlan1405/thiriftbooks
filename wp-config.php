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
define( 'DB_NAME', 'booksdb' );

/** MySQL database username */
define( 'DB_USER', 'nguyenlan' );

/** MySQL database password */
define( 'DB_PASSWORD', '1234' );

/** MySQL hostname */
define( 'DB_HOST', 'https://bookstore/' );

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
define( 'AUTH_KEY',         'QWT$V/aX7H ZRV}|]:H0Ss)4x0l=4L+BR>rgs1N5-sZ)dK,_E*W}AF7|D,_EZp%#' );
define( 'SECURE_AUTH_KEY',  'Fzu4+&[]v:W5q[zbn}.UvLK|&[gXI?H H-gcsaYzE7;a=-,CM#<,VgI:Zn0@@OM`' );
define( 'LOGGED_IN_KEY',    'l$jAfu3%Vw1nCDI8$0gLz;qbFisbr,c>:(}vkB?J}AEZN?V:.yeK:;yoD9OXAAP#' );
define( 'NONCE_KEY',        'em9L&0~2=}vG9;0?S^b^QsJ`*/BCfc,Z,Q!q]vpRx_lpZUGNF>ys.IN@c0B$uC3l' );
define( 'AUTH_SALT',        '~Y><;(()HZRzqngB<.nm@k;+`XCFQwj<gZPPpqG%3JB6m+o,^ye]5qH/jf<%EZX6' );
define( 'SECURE_AUTH_SALT', 'Sd!R6:N^0c){ D;=7L{0OyI2<A W;M5~$3,Wh7Nql+MER$Ln0t^$AY(DXV#BP9>L' );
define( 'LOGGED_IN_SALT',   '`We&u_a2tA:EIih6f-z&)N^iLQ6>jr&|JSPg0~<O3jFx&LI3Lys&|t^2<Ac F[/*' );
define( 'NONCE_SALT',       'XZ:As)LNP)nMKa5VKF&bwy-I[l7ZsS;..?E]>E%nL*u Q(4J!o*VOA0Uu;IW5-eQ' );

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
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
