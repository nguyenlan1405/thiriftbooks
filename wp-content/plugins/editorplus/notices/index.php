<?php

$extendify_notices_key = 'editorplus_feedback_notice';
$extendify_notices_nonce = wp_create_nonce($extendify_notices_key);

add_action('admin_notices', function () use ($extendify_notices_key, $extendify_notices_nonce) {
    $current_page = get_current_screen();
    if (!$current_page || !in_array($current_page->base, ['plugins'])) {
        return;
    }
    ob_start(); ?>
<p>
    <?php esc_html_e('Want to influence the direction of our Gutenberg products? Join our user panel to participate in periodic surveys, give early product feedback, and join optional user interviews. Panel members will be compensated for their time or entered to win prizes.', 'editor_plus') ?>
</p>
<p style="max-width:850px;">
    <?php
            // translators: %s surrounding the word 'here' and is wrapped with <a>.
            printf(esc_html__('Click %shere%s to sign up today!', 'editor_plus'), '<a target="_blank" href="https://forms.gle/76TMfmyBphmiXr6C9">', '</a>'); ?>
</p>
<?php
    $extendify_notices_content = ob_get_clean();

    // In short, the notice will always show until they press dismiss
    if (!get_user_option($extendify_notices_key)) { ?>
<div id="<?php echo $extendify_notices_key; ?>" class="notice notice-info"
    style="display:flex;align-items:stretch;justify-content:space-between;position:relative">
    <div style="display:flex;align-items:center;position:relative">
        <div style="margin-right:1.5rem;">
            <svg width="60" height="60" viewBox="0 0 103 103" fill="none" xmlns="http://www.w3.org/2000/svg">
                <title>Extendify Logo</title>
                <rect y="25.75" width="70.8125" height="77.25" fill="black" />
                <rect x="45.0625" width="57.9375" height="57.9375" fill="#37C2A2" />
            </svg>
        </div>
        <div>
            <h3 style="margin-bottom:0.25rem;">
                <?php esc_html_e('Thanks for using Editor Plus by Extendify', 'editor_plus'); ?></h3>
            <div style="max-width:850px;">
                <?php echo $extendify_notices_content; ?>
            </div>
        </div>
    </div>
    <div style="margin:5px -5px 0 0;">
        <button
            style="max-width:15px;border:0;background:0;color: #7b7b7b;white-space:nowrap;cursor: pointer;padding: 0"
            title="<?php esc_attr_e('Dismiss notice', 'editor_plus') ?>"
            aria-label="<?php esc_attr_e('Dismiss Extendify notice', 'editor_plus') ?>"
            onclick="jQuery('#<?php echo $extendify_notices_key; ?>').remove();jQuery.post(window.ajaxurl, {action: 'handle_<?php echo $extendify_notices_key; ?>', _wpnonce: '<?php echo $extendify_notices_nonce ?>' });">
            <svg width="15" height="15" style="width:100%" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>
</div>
<?php }
});

add_action('wp_ajax_handle_' . $extendify_notices_key, function () use ($extendify_notices_key) {
    if (!wp_verify_nonce($_REQUEST['_wpnonce'], $extendify_notices_key)) {
        wp_send_json_error([
            'message' => esc_html__('The security check failed. Please refresh the page and try again.', 'editor_plus')
        ], 401);
    }
    update_user_option(get_current_user_id(), $extendify_notices_key, time());
    wp_send_json_success();
});