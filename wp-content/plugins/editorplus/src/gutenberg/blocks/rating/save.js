
const { RenderSavedStyles } = editorPlus.components;

function save(props) {
    const { className, id, ratingRange, icon, selectLayout, displayTitleText, titleText, displayRatingSuffix, ratingSuffix } = props.attributes;
    const srLayout = selectLayout === "row" ? "ep_sr_inline" : "ep_sr_stack";

    return (
      <div className={`${id} ${className}`}>
        <div className={`ep_sr_wrapper ${srLayout}`}>
          {displayTitleText ? 
          <div
            className="ep_sr_before_text"
            dangerouslySetInnerHTML={{
              __html: titleText,
            }}
          ></div>
          : ""}
          <div className="ep_sr_iconsuffix">
          <div className="ep_sr_icon_wrapper">
            {new Array(5).fill(0).map((_, idx) => {
              return (
                <div
                  className={`ep_sr_icon ${
                    idx < ratingRange ? "ep_sr_icon_checked" : ""
                  }`}
                >
                  <span className={icon}></span>
                </div>
              );
            })}
          </div>
          {displayRatingSuffix ? 
            <div
              className="ep_sr_after_text"
              dangerouslySetInnerHTML={{
                __html: ratingSuffix,
              }}
            ></div>
          : ""}
          </div>
        </div>
        <RenderSavedStyles {...props} />
      </div>
    );
}

export default save;