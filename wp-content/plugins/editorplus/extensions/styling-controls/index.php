<?php

require_once plugin_dir_path(__DIR__) . 'utils.php';

$opt = get_option('editor_plus_extensions_styling__enable', true);
$static_file_opt = get_option('ep_generate_static_file');

$is_extension_enabled = $opt === '1' || $opt === true ? true : false;


if ($is_extension_enabled) {

    add_action('init', function () {

        $post_types = get_post_types([
            '_builtin' => false
        ], 'names', 'and');

        $post_types['post'] = 'post';

        foreach ($post_types as $post_type) :

            register_meta(
                $post_type,
                'editor_plus_custom_styling_options_file_version',
                array(
                    'show_in_rest' => true,
                    'single'       => true,
                    'type'         => 'string',
                    'default'       => 'initial'
                )
            );

            register_meta(
                $post_type,
                'editor_plus_custom_styling_options_css',
                array(
                    'show_in_rest' => true,
                    'single'       => true,
                    'type'         => 'string',
                    'default'       => '{}'
                )
            );

            # all the copied stylings will be stored here...        

            register_meta(
                $post_type,
                'editor_plus_copied_stylings',
                array(
                    'show_in_rest' => true,
                    'single'       => true,
                    'type'         => 'string',
                    'default'       => '{}'
                )
            );

        endforeach;
    });

    add_filter('editor_plus_css_code_version', function ($ep_version) {
        $post_id = get_the_ID();
        $static_file_ver  = get_post_meta($post_id, 'editor_plus_custom_styling_options_file_version', TRUE);

        return $static_file_ver;
    });


    add_filter('editor_plus_css_code', function ($ep_styling_code) {

        $post_id = get_the_ID();

        $custom_css_meta = get_post_meta($post_id, 'editor_plus_custom_styling_options_css', TRUE);

        $editor_plus_styling_option_css = [];
        $decoded_css = json_decode($custom_css_meta);

        if (is_object($decoded_css)) {

            foreach ($decoded_css as $key => $styling) {

                $editor_plus_styling_option_css[] = "$styling";
            }

            $css_code = join("\n", array_unique($editor_plus_styling_option_css));

            $ep_styling_code .= $css_code;

            return $ep_styling_code;
        }
    });
}

add_filter('body_class', function ($classes) {
    $classes[] = 'eplus_styles';
    return $classes;
});
