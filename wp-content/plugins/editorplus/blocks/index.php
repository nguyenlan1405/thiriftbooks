<?php

add_action('init', function () {

	function ep_register_block_categories($categories) {
		return array_merge(
			array(
				array(
					'slug'  => 'ep-editorplus-blocks',
					'title' => 'Editor Plus Blocks',
				),
			),
			$categories
		);
	}
	// "block_categories" filter is deprecated for WP version above 5.8
	if ( version_compare(get_bloginfo('version'),'5.8', '>=') ) {
		add_filter('block_categories_all', 'ep_register_block_categories');
	} else {
		add_filter('block_categories', 'ep_register_block_categories');
	}

});

add_action( 'wp_enqueue_scripts', function() {
	
	global $post;

	wp_register_script(
		'editorplus-progressbar-script',
		plugins_url('/assets/scripts/progressbar.js', dirname(__FILE__)),
		array('jquery'),
		'new',
		true
	);

	wp_register_script(
		'editorplus-toggles-script',
		plugins_url('/assets/scripts/toggles.js', dirname(__FILE__)),
		array('jquery'),
		'new',
		true
	);

	wp_register_script(
		'editorplus-counter-script',
		plugins_url('/assets/scripts/counter.js', dirname(__FILE__)),
		array('jquery'),
		'update',
		true
	);

	wp_register_script(
		'editorplus-tabs-script',
		plugins_url('/assets/scripts/tabs.js', dirname(__FILE__)),
		array('jquery'),
		'latest',
		true
	);

	wp_register_script(
		'editorplus-countdown-script',
		plugins_url('/assets/scripts/countdown.js', dirname(__FILE__)),
		array('jquery'),
		'updaedade',
		true
	);

	wp_register_script(
		'editorplus-lottie-player-script',
		plugins_url('/assets/scripts/lottie-player.js', dirname(__FILE__)),
		array('jquery'),
		'latest',
		true
	);

	##### REGISTERING BLOCK TYPES
	$progress_bar_assets = array(
		'script'         => !is_admin() ? 'editorplus-progressbar-script' : '',
	);

	if (!has_block('ep/progress-bar', $post)) :
		unset($progress_bar_assets['script']);
	endif;

	register_block_type(
		'ep/progress-bar',
		$progress_bar_assets
	);

	$toggles_assets = array(
		'script'         => !is_admin() ? 'editorplus-toggles-script' : '',
	);


	if (!has_block('ep/toggles', $post)) :
		unset($toggles_assets['script']);
	endif;

	register_block_type(
		'ep/toggles',
		$toggles_assets
	);

	$counter_assets = array(
		'script'         => !is_admin() ? 'editorplus-counter-script' : '',
	);

	if (!has_block('ep/counter', $post)) :
		unset($counter_assets['script']);
	endif;

	register_block_type(
		'ep/counter',
		$counter_assets
	);

	$tabs_assets = array(
		'script'         => !is_admin() ? 'editorplus-tabs-script' : '',
	);

	if (!has_block('ep/tabs', $post)) :
		unset($tabs_assets['script']);
	endif;

	register_block_type(
		'ep/tabs',
		$tabs_assets
	);

	$countdown_assets = array(
		'script'         => !is_admin() ? 'editorplus-countdown-script' : '',
	);

	if (!has_block('ep/countdown', $post)) :
		unset($countdown_assets['script']);
	endif;

	register_block_type(
		'ep/countdown',
		$countdown_assets
	);

	$lottie_assets = array(
		'script' => !is_admin() ? 'editorplus-lottie-player-script' : '',
	);

	if (!has_block('ep/lottie', $post)) :
		unset($lottie_assets['script']);
	endif;

	register_block_type(
		'ep/lottie',
		$lottie_assets
	);


});