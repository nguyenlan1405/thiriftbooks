<?php


function ep_editor_plus_minify_css($input)
{
    if (trim($input) === "") return $input;
    return preg_replace(
        array(
            // Remove comment(s)
            '#("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\')|\/\*(?!\!)(?>.*?\*\/)|^\s*|\s*$#s',
            // Remove unused white-space(s)
            '#("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\'|\/\*(?>.*?\*\/))|\s*+;\s*+(})\s*+|\s*+([*$~^|]?+=|[{};,>~]|\s(?![0-9\.])|!important\b)\s*+|([[(:])\s++|\s++([])])|\s++(:)\s*+(?!(?>[^{}"\']++|"(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\')*+{)|^\s++|\s++\z|(\s)\s+#si',
            // Replace `0(cm|em|ex|in|mm|pc|pt|px|vh|vw|%)` with `0`
            '#(?<=[\s:])(0)(cm|em|ex|in|mm|pc|pt|px|vh|vw|%)#si',
            // Replace `:0 0 0 0` with `:0`
            '#:(0\s+0|0\s+0\s+0\s+0)(?=[;\}]|\!important)#i',
            // Replace `background-position:0` with `background-position:0 0`
            '#(background-position):0(?=[;\}])#si',
            // Replace `0.6` with `.6`, but only when preceded by `:`, `,`, `-` or a white-space
            '#(?<=[\s:,\-])0+\.(\d+)#s',
            // Minify string value
            '#(\/\*(?>.*?\*\/))|(?<!content\:)([\'"])([a-z_][a-z0-9\-_]*?)\2(?=[\s\{\}\];,])#si',
            '#(\/\*(?>.*?\*\/))|(\burl\()([\'"])([^\s]+?)\3(\))#si',
            // Minify HEX color code
            '#(?<=[\s:,\-]\#)([a-f0-6]+)\1([a-f0-6]+)\2([a-f0-6]+)\3#i',
            // Replace `(border|outline):none` with `(border|outline):0`
            '#(?<=[\{;])(border|outline):none(?=[;\}\!])#',
            // Remove empty selector(s)
            '#(\/\*(?>.*?\*\/))|(^|[\{\}])(?:[^\s\{\}]+)\{\}#s'
        ),
        array(
            '$1',
            '$1$2$3$4$5$6$7',
            '$1',
            ':0',
            '$1:0 0',
            '.$1',
            '$1$3',
            '$1$2$4$5',
            '$1$2$3',
            '$1:0',
            '$1$2'
        ),
        $input
    );
}


/**
 * Merging all the stylesheets in with this assets directory 
 */

$css_code = "";
$static_file_opt = get_option('ep_generate_static_file');
$static_file_enabled = $static_file_opt === 'true' or $static_file_opt === true or $static_file_opt === '1';
$static_file_ver = 'initial';

add_action('before_delete_post', function ($id) {

    $path = "stylesheets/editor_plus_stylesheet_$id.min.css";

    $css_file_to_delete = plugin_dir_path(__FILE__) . $path;

    wp_delete_file($css_file_to_delete);
});

add_action('wp_footer', function () use ($css_code, $static_file_enabled, $static_file_ver) {
    global $post;

    $css_code = apply_filters('editor_plus_css_code', $css_code);
    $static_file_ver = apply_filters('editor_plus_css_code_version', $static_file_ver);

    $css_code = ep_editor_plus_minify_css($css_code); # minifying

    if (!empty($post) and $css_code !== "") {
        $id = $post->ID;
        if ($static_file_enabled) {

            $path = "stylesheets/editor_plus_stylesheet_$id.min.css";

            $css_file_path = plugin_dir_path(__FILE__) . $path;

            $css_file = fopen($css_file_path, 'w');

            fwrite($css_file, $css_code);

            $enqueue_path = plugin_dir_url(__FILE__) . $path;

            wp_enqueue_style(
                'ep-editor-plus-stylesheet',
                $enqueue_path,
                [],
                $static_file_ver
            );
        } else if (!$static_file_enabled and $css_code !== "") {
            echo '<style id="ep-stylesheet">' . $css_code . '</style>';
        }
    }
});


add_action('init', function () {

    $post_types = get_post_types([
        '_builtin' => false
    ], 'names', 'and');

    $post_types['post'] = 'post';

    foreach ($post_types as $post_type) :

        add_post_type_support($post_type, ['custom-fields']);

    endforeach;
});
