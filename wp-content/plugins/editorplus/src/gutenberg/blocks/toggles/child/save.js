const { InnerBlocks } = wp.blockEditor;

function save(props) {
  const { className, id, title, activeIcon, icon } = props.attributes;

  return (
    <div className={`${id} ${className}`}>
      <div className={`ep_toggle_item_wrapper`}>
        <div className="ep_toggle_item_title">
          <span
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          ></span>
          <span
            className={`ep_toggles_icon ${icon}`}
            data-icon={icon}
            data-activeicon={activeIcon}
          ></span>
        </div>
        <div className="ep_toggle_item_content">
          <InnerBlocks.Content />
        </div>
      </div>
    </div>
  );
}

export default save;
