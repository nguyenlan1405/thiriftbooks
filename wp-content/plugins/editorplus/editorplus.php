<?php

/**
 * Plugin Name:       Editor Plus by Extendify
 * Plugin URI:		  https://wpeditorplus.com/
 * Description:       Editor Plus extends Gutenberg editor with advanced design controls, icons and more features.
 * Version:           2.8.4
 * Author:            Extendify
 * Author URI:        https://extendify.com/
 * License:           GPL-3.0+
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain:       editor_plus
 */

require_once plugin_dir_path(__FILE__) . 'includes/class-editorplus.php';

if ( file_exists(plugin_dir_path(__FILE__) . 'extendify-sdk/loader.php') ) {
    $GLOBALS['extendifySdkSourcePlugin'] = 'Editor Plus';
    require_once plugin_dir_path(__FILE__) . 'extendify-sdk/loader.php';
}