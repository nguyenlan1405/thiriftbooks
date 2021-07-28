<?php

if (!defined('ABSPATH')) {
    exit;
}

define('EDPL_EDITORPLUS_PLUGIN_DIR', plugin_dir_path(__DIR__));
define('EDPL_EDITORPLUS_PLUGIN_URL', plugins_url('/', __DIR__));

/**
 * Main Editor Plus Class
 * @since 2.6.0
 */

final class edpl__EditorPlus
{

    /**
     * This plugin's instance
     *
     * @var edpl__EditorPlus
     * @since 2.6.0
     */

    private static $instance;

    /**
     * This plugin's current version
     *
     * @var $plugin_version
     */

    public static $plugin_version = '2.5.0';

    /**
     * This plugin's slug
     *
     * @var $plugin_slug
     */

    public static $plugin_slug = 'editor_plus';

    /**
     * Used For Disabling Caching/Other features to make development easy
     *
     * @var $env
     */

    private static $env = "DEVELOPMENT";

    /**
     * Main EditorPlus Instance.
     *
     * Insures that only one instance of EditorPlus exists in memory at any one
     * time. Also prevents needing to define globals all over the place.
     *
     * @since 2.6.0
     * @static
     * @return object|edpl__EditorPlus The one true edpl__EditorPlus
     */

    public static function instance()
    {
        if (!isset(self::$instance) and !(self::$instance instanceof edpl__EditorPlus)) :

            self::$instance = new Self();
        self::$instance->init();
        self::$instance->includes();

        endif;
    }

    /**
     * Include required files.
     *
     * @access private
     * @since 2.6.0
     * @return void
     */

    private function includes()
    {
        require_once EDPL_EDITORPLUS_PLUGIN_DIR . 'assets/index.php';
        require_once EDPL_EDITORPLUS_PLUGIN_DIR . 'extensions/index.php';
        require_once EDPL_EDITORPLUS_PLUGIN_DIR . 'blocks/index.php';
        require_once EDPL_EDITORPLUS_PLUGIN_DIR . 'notices/index.php';
        require_once EDPL_EDITORPLUS_PLUGIN_DIR . 'page-template/index.php';
    }

    /**
     * Register all plugin settings
     *
     * @return void
     */

    public function register_settings()
    {
        $extensions = new edpl_ExtensionsManager();
        $extensions->register_settings();
    }

    /**
     * Enqueue Assets
     *
     * @param string suffix - Current Page Suffix
     * @return void
     */

    public function enqueue_assets($suffix)
    {


        # using dynamic version to disable wp cache in the DEVELOPMENT version
        $dynamic_version = self::$env === 'PRODUCTION' ? self::$plugin_version : uniqid();

        # for gutenberg editor
        if (in_array($suffix, ['post.php', 'post-new.php'])) :

            wp_enqueue_style('editor_plus-plugin-style', EDPL_EDITORPLUS_PLUGIN_URL . 'dist/gutenberg-editor.css', ['wp-components'], $dynamic_version);
            wp_enqueue_script('editor_plus-plugin-script', EDPL_EDITORPLUS_PLUGIN_URL . 'dist/gutenberg-editor.js', ['wp-api', 'wp-i18n', 'wp-components', 'wp-element', 'wp-editor'], $dynamic_version, true);
            wp_enqueue_script('editor_plus-lodash-conflict-script', EDPL_EDITORPLUS_PLUGIN_URL . 'assets/scripts/lodash-conflict.js', array('wp-api', 'wp-i18n', 'wp-components', 'wp-element', 'wp-editor'), $dynamic_version, true);

            # LOTTIE SCRIPT
            wp_enqueue_script('editor-plus-lottie-script', EDPL_EDITORPLUS_PLUGIN_URL . '/assets/scripts/lottie-player.js', [], 'latest', true);

            $extra_css = apply_filters('editor_plus_plugin_css', '');
            wp_add_inline_style('editor_plus-plugin-style', $extra_css);

            # loading localized variables

            $extensions = new edpl_ExtensionsManager();
            $deploy = $extensions->deploy();

            wp_localize_script(
                'editor_plus-plugin-script',
                'editor_plus_extension',
                $deploy->data
            );
            
            wp_localize_script(
                'editor_plus-plugin-script',
                'eplus_data',
                [
                    'rest_url' => get_rest_url(),
                    'ajax_url' => admin_url('admin-ajax.php'),
                    'plugin_assets' => plugins_url('assets', __FILE__)
                ]
        );

        endif;

        # for wp frontend
        if (!is_admin()) :

            wp_enqueue_style('editor_plus-plugin-frontend-style', EDPL_EDITORPLUS_PLUGIN_URL . 'dist/gutenberg-frontend.css', [], $dynamic_version, false);
        wp_enqueue_script('editor_plus-plugin-frontend-script', EDPL_EDITORPLUS_PLUGIN_URL . 'assets/scripts/frontend.js', ['jquery'], $dynamic_version, true);

        $extra_css = apply_filters('editor_plus_plugin_css', '');
        wp_add_inline_style('editor_plus-plugin-frontend-style', $extra_css);

        endif;

        # for admin settings
        if (in_array($suffix, ['settings_page_editor_plus', 'toplevel_page_gutenberg-edit-site'])) :

            wp_enqueue_style('editor-plus-admin-style', EDPL_EDITORPLUS_PLUGIN_URL . 'dist/admin.css', ['wp-components'], $dynamic_version);
        wp_enqueue_script('editor-plus-admin-script', EDPL_EDITORPLUS_PLUGIN_URL . 'dist/admin.js', ['wp-api', 'wp-i18n', 'wp-components', 'wp-element', 'wp-editor'], $dynamic_version, true);


        # loading localized variables

        $extensions = new edpl_ExtensionsManager();
        $deploy = $extensions->deploy();

        wp_localize_script(
            'editor-plus-admin-script',
            'editor_plus_extension',
            $deploy->data
        );

        wp_localize_script(
            'editor-plus-admin-script',
            'eplus_data',
            [
                    'rest_url' => get_rest_url(),
                    'ajax_url' => admin_url('admin-ajax.php'),
                    'plugin_assets' => plugins_url('assets', __FILE__)
                ]
        );

        endif;
    }


    public function register()
    {
        function edpl__callback()
        {
            echo '<div id="editor-plus-root"></div>';
        }

        $page_hook_suffix = add_options_page(
            __('Editor Plus', 'editor_plus'),
            __('Editor Plus', 'editor_plus'),
            'manage_options',
            'editor_plus',
            'edpl__callback'
        );
    }

    /**
     * Load actions/filters
     *
     * @return void
     */

    private function init()
    {
        add_action('admin_enqueue_scripts', [$this, 'enqueue_assets']);
        add_action('init', [$this, 'enqueue_assets']);
        add_action('init', [$this, 'register_settings']);
        add_action('admin_menu', [$this, 'register']);
        add_action("admin_print_scripts-{settings_page_editor_plus}", [$this, 'enqueue_assets']);
        add_filter('upload_mimes', function ($ep_mime_types) {
            $ep_mime_types['json'] = 'text/plain'; // Adding .json extension
            return $ep_mime_types;
        }, 1, 1);
    }
}


/**
 * Function works with the EditorPlus class instance
 *
 * @return object edpl__EditorPlus
 */

function edpl_editorplus()
{
    return edpl__EditorPlus::instance();
}

add_action('plugins_loaded', 'edpl_editorplus');