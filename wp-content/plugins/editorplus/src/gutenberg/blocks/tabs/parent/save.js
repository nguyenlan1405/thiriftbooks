const { InnerBlocks } = wp.blockEditor;
const { Fragment } = wp.element;
const { map, get } = lodash;

const {
  StylingControls,
  RenderStyles,
  RenderSavedStyles,
  RenderMultiStyles,
} = editorPlus.components;

function save(props) {
  const {
    className,
    id,
    tabs,
    tabsStyle,
    showSubTitle,
    autoplay,
    autoplayDelay,
  } = props.attributes;
  const titleAlignment = get(props.attributes, "titleAlignment");
  const hasSpaceAround =
    get(titleAlignment, "mobile") === "space-around" ||
    get(titleAlignment, "desktop") === "space-around" ||
    get(titleAlignment, "tablet") === "space-around";

  return (
    <div className={`${id}`}>
      <div
        className={`ep_tabs_root ${tabsStyle}`}
        data-autoplay={autoplay}
        data-delay={autoplayDelay}
      >
        <div className={`ep_tabs_header ${hasSpaceAround ? "ep_th_full" : ""}`}>
          {map(tabs, (tab) => (
            <Fragment>
              <a href={"#" + tab.id} className="ep_label_main">
                <span
                  className="ep_label"
                  dangerouslySetInnerHTML={{
                    __html: tab.label,
                  }}
                ></span>
                {showSubTitle === true ? (
                  <span
                    className="ep_sub_label"
                    dangerouslySetInnerHTML={{
                      __html: tab.subLabel,
                    }}
                  ></span>
                ) : null}
              </a>
            </Fragment>
          ))}
        </div>
        <div className={`ep_tabs_wrapper ${className}`}>
          <InnerBlocks.Content />
        </div>
        <RenderSavedStyles {...props} />
      </div>
    </div>
  );
}

export default save;
