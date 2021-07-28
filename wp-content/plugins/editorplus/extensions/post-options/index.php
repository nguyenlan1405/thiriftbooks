<?php

add_action('init', function () {

    $post_types = get_post_types([
        '_builtin' => false
    ], 'names', 'and');

    $post_types['post'] = 'post';

    foreach ($post_types as $post_type) :

        register_meta(
            $post_type,
            'editor_plus_post_options',
            array(
                'show_in_rest' => true,
                'single'       => true,
                'type'         => 'string',
                'default'       => '{}'
            )
        );

    endforeach;
});

# for post title
add_filter('editor_plus_css_code', function ($css_code) {

    try {
        $post_id = get_the_ID();
        $editorplus_post_options = get_post_meta($post_id, 'editor_plus_post_options', TRUE);
        $editorplus_post_options = json_decode($editorplus_post_options);
        $hide_widget_area = false;

        if ($editorplus_post_options->disableTitle ?? false) {
            $css_code .= ".entry-header {display:none;}";
        }

        if ($editorplus_post_options->disableHeader ?? false) {
            $css_code .= "header.site-header, header#site-header, header.entry-header { display: none; }";
            $hide_widget_area = true;
        }

        if ($editorplus_post_options->disableFooter ?? false) {
            $css_code .= "footer.site-footer, footer#site-footer {display:none;}";
            $hide_widget_area = true;
        }

        if ($editorplus_post_options->enforceStyling ?? false) {
            $css_code .= "body {background-color: #fff;}";
        }

        if ($hide_widget_area) {
            $css_code .= "aside.widget-area, .footer-nav-widgets-wrapper.header-footer-group { display:none !important; }";
        }

        return $css_code;
    } catch (\Exception $e) {
        return $css_code;
    }
}, 10, 2);