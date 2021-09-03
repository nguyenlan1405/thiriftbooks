<?php
/*
 * Template Name: Editor Plus Template
 * Template Post Type: post, page
*/

global $post;

$editorplus_post_options = get_post_meta($post->ID, 'editor_plus_post_options', true);
$disable_page_header = false;
$disable_page_footer = false;
$disable_page_title = false;

$editorplus_decoded_options = json_decode($editorplus_post_options);

if ($editorplus_decoded_options->disableHeader ?? false) {
	$disable_page_header = true;
}

if ($editorplus_decoded_options->disableFooter ?? false) {
	$disable_page_footer = true;
}

if ($editorplus_decoded_options->disableTitle ?? false) {
	$disable_page_title = true;
}

$disable_page_header ? wp_head() : get_header();
?>

<body <?php body_class(); ?>>
    <div class="ep-temp-container ep-container">
        <?php if ($disable_page_title === false ): ?>

        <div class="ep-temp-entry-header">
            <h1 class="ep-temp-entry-title"><?php the_title(); ?></h1>
        </div>

        <?php endif; ?>

        <div class="ep-temp-entry-content">
            <?php

				if ( have_posts() ) {

					while ( have_posts() ) {
						the_post();
						the_content();
					}
				}
			?>

        </div>


    </div><!-- #site-content -->
    <style>
    @media(min-width: 700px) {
            .ep-temp-container [class*=extendify-] [class*=wp-block] > * {
                margin-top: 0px;
            }
            .ep-temp-container [class*=wp-block] > * .wp-block-button__link {
                border-radius: 0px;
            }
            .ep-temp-container .wp-block-image:not(.alignwide):not(.alignfull):not(.alignleft):not(.alignright):not(.aligncenter) {
                margin-top:0px;
            }
            html, body {
                font-size: 16px !important;
            }
        }
    </style>
    <?php $disable_page_footer ? wp_footer() : get_footer(); ?>