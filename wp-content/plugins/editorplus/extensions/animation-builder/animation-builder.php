<?php

$opt = get_option('editor_plus_extensions_animation_builder__enable', true);
$is_extension_enabled = $opt === '1' || $opt === true ? true : false;

add_filter('editor_plus_extensions',  function ($extensions) {

    $details = [
        'title'       => __('Animations'),
        'description' => __('The Animations extension lets you animate your content in Gutenberg. If enabled you will see Animations panel on all core blocks.')
    ];

    $extensions['animation_builder'] = $details;
    return $extensions;
});


if ($is_extension_enabled) {


    $post_types = get_post_types([
        '_builtin' => false
    ], 'names', 'and');

    $post_types['post'] = 'post';

    foreach ($post_types as $post_type) {
        register_meta(
            $post_type,
            'editor_plus_custom_animation_option_css',
            array(
                'show_in_rest' => true,
                'single'       => true,
                'type'         => 'string',
                'default'       => '{}'
            )
        );
    }


    add_filter('editor_plus_css_code', function ($ep_styling_code) {


        $post_id = get_the_ID();

        $custom_css_meta = get_post_meta($post_id, 'editor_plus_custom_animation_option_css', TRUE);

        $editor_plus_animation_styling_list = [];
        $decoded_css = json_decode($custom_css_meta);

        if (is_object($decoded_css)) {

            foreach ($decoded_css as $key => $styling) {

                if (!empty($styling) and $styling !== "") {
                    $editor_plus_animation_styling_list[] = "$styling";
                }
            }

            $css_code = join("\n", array_unique($editor_plus_animation_styling_list));

            $ep_styling_code .= $css_code;

            return $ep_styling_code;
        }
    });
} else if ($is_extension_enabled and !is_admin()) {
    echo "<script> var editorPlusAnimationExtension = false; </script>";
}
