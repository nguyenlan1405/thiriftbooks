<?php

require_once plugin_dir_path(__DIR__) . 'utils.php';
$opt = get_option('editor_plus_extensions_custom_block_code__enable', true);
$is_extension_enabled = $opt === '1' || $opt === true ? true : false;
$static_file_opt = get_option('ep_generate_static_file');



if ($is_extension_enabled) {

    add_action('init', function () {

        $post_types = get_post_types([
            '_builtin' => false
        ], 'names', 'and');

        $post_types['post'] = 'post';

        foreach ($post_types as $post_type) {
            register_meta(
                $post_type,
                'editor_plus_custom_css',
                array(
                    'show_in_rest' => true,
                    'single'       => true,
                    'type'         => 'string',
                    'default'       => '{}'
                )
            );

            register_meta(
                $post_type,
                'editor_plus_custom_css_file_version',
                array(
                    'show_in_rest' => true,
                    'single'       => true,
                    'type'         => 'string',
                    'default'       => 'initial'
                )
            );
        }
    });


    add_filter('editor_plus_css_code_version', function ($data) {
        $post_id = get_the_ID();
        $static_file_ver = get_post_meta($post_id, 'editor_plus_custom_css_file_version', TRUE);

        return $static_file_ver;
    });


    add_filter('editor_plus_css_code', function ($ep_styling_code) {

        $post_id = get_the_ID();

        $custom_css_meta = get_post_meta($post_id, 'editor_plus_custom_css', TRUE);

        $editor_plus_custom_css_list = [];
        $decoded_css = json_decode($custom_css_meta);

        if (is_object($decoded_css)) {

            foreach ($decoded_css as $key => $styling) {

                $editor_plus_custom_css_list[] = "$styling";
            }

            $css_code = join("\n", array_unique($editor_plus_custom_css_list));

            $ep_styling_code .= $css_code;

            return $ep_styling_code;
        }
    });
}


//for global css/js
add_action('wp_footer', function () use ($static_file_opt) {

    $css_file_path = plugin_dir_path(__FILE__) . 'dist/global.css';

    $global_css = wp_strip_all_tags(get_option('ep_custom_global_css'));
    $global_version = get_option('ep_custom_global_css_version');

    # minifying
    $global_css = editor_plus_minify_css($global_css);

    if ($static_file_opt === 'true' or $static_file_opt === true or $static_file_opt === '1') {
        $css_file = fopen($css_file_path, 'w');

        fwrite($css_file, $global_css);

        $path = plugin_dir_url(__FILE__) . 'dist/';

        if ($global_css !== "") {
            wp_enqueue_style(
                'e-plus-global-style',
                $path . 'global.css',
                [],
                $global_version
            );
        }
    } else if ($global_css !== "") {
        echo "<style id='editor-plus-global-style'>$global_css</style>";
    }
});
