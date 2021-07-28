<?php

include_once plugin_dir_path(__FILE__) . 'custom-code/index.php';
include_once plugin_dir_path(__FILE__) . 'styling-controls/index.php';
include_once plugin_dir_path(__FILE__) . 'icon_inserter/index.php';
include_once plugin_dir_path(__FILE__) . 'animation-builder/animation-builder.php';
include_once plugin_dir_path(__FILE__) . 'extend-blocks/index.php';
include_once plugin_dir_path(__FILE__) . 'post-options/index.php';


class edpl_ExtensionsManager
{
    const group = 'editor_plus_extensions';

    public function __construct()
    {
        $this->extensions = [
            'styling' => [
                'title' => 'Styling - NoCode Visual Styler',
                'description'   => 'This extension extends Gutenberg bocks with powerful visual style options.'
            ],
            'custom_block_code' => [
                'title' => 'CSS Editor',
                'description' => 'This extension extends Gutenberg blocks with custom CSS editor and also enable a Global CSS editor in the admin.',
                'extra_settings' => ['ep_custom_global_css', 'ep_custom_global_js', 'ep_generate_static_file', 'ep_custom_global_css_version']
            ],

            'blocks_extender' => [
                'title'       => 'Extend Core Blocks',
                'description' => 'This extension core blocks with more useful features besides the styling.'
            ],
            'icon_inserter' => [
                'title'       => 'Icons Library',
                'description' => 'This extension extends enables you to insert icons in Gutenberg anywhere in RichText area.'
            ]
        ];

        # exposing this list to be extended by pro plugin
        $this->extensions = apply_filters('editor_plus_extensions', $this->extensions);
    }

    public function register_settings()
    {
        foreach ($this->extensions as $name => $data) {

            $slug = self::group . '_' . $name;
            $enable_slug = self::group . '_' . $name . '__enable';

            register_setting(
                self::group,
                $enable_slug,
                array(
                    'type'         => 'boolean',
                    'show_in_rest' => true,
                    'default'      => true,
                )
            );

            if (array_key_exists('extra_settings', $data) and !empty($data['extra_settings'])) {

                $extra_settings = $data['extra_settings'];

                foreach ($extra_settings as $extra_setting) {

                    register_setting(
                        self::group,
                        $extra_setting,
                        array(
                            'type'         => 'string',
                            'show_in_rest' => true,
                            'default'      => '',
                        )
                    );

                }
            }
        }

    }

    public function deploy()
    {

        foreach ($this->extensions as $name => $data) {

            $slug = self::group . '_' . $name;
            $enable_slug = self::group . '_' . $name . '__enable';

            $this->extensions[$name]['enabled'] = get_option($enable_slug);

            if (array_key_exists('extra_settings', $data) and !empty($data['extra_settings'])) {

                $extra_settings = $data['extra_settings'];

                foreach ($extra_settings as $extra_setting) {

                    if ($extra_setting === 'ep_custom_global_js') {

                        $this->extensions[$name]['extra_setting_values'][$extra_setting] = base64_decode(urldecode(get_option($extra_setting)));
                    } else {
                        $this->extensions[$name]['extra_setting_values'][$extra_setting] = get_option($extra_setting);
                    }
                }
            }
        }

        $logs = new Self();

        $logs->data = $this->extensions;

        return $logs;
    }
}