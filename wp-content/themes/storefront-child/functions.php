<?php
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

// BEGIN ENQUEUE PARENT ACTION
// AUTO GENERATED - Do not modify or remove comment markers above or below:

if ( !function_exists( 'chld_thm_cfg_locale_css' ) ):
    function chld_thm_cfg_locale_css( $uri ){
        if ( empty( $uri ) && is_rtl() && file_exists( get_template_directory() . '/rtl.css' ) )
            $uri = get_template_directory_uri() . '/rtl.css';
        return $uri;
    }
endif;
add_filter( 'locale_stylesheet_uri', 'chld_thm_cfg_locale_css' );

// END ENQUEUE PARENT ACTION

function my_wp_nav_menu_args( $args = '' ) {
 
 if( is_user_logged_in() ) { 
 	if( 'secondary-navigation' == $args['theme_location'] ) { // Change top-navigation to theme specific name
	    $args['secondary-navigation'] = 'menulogout';
	}
     
 } else { 
	if( 'secondary-navigation' == $args['theme_location'] ) { // Change top-navigation to theme specific name
	    $args['secondary-navigation'] = 'menulogin';
	}
     
	} 
     return $args;
 }
 add_filter( 'wp_nav_menu_args', 'my_wp_nav_menu_args' );

remove_action(‘woocommerce_after_shop_loop_item’, ‘woocommerce_widget_shopping_cart_after_buttons’);
