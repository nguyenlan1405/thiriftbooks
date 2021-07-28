  
const {
  RenderSavedStyles,
} = editorPlus.components;


function save(props) {
    const { className, id, ratingRange, icon, selectLayout } = props.attributes;
    const srLayout = selectLayout === "row" ? "ep_sr_inline" : "ep_sr_stack";

    return (
      <div className={`${id} ${className}`}>
        <div className={`ep_sr_wrapper ${srLayout}`}>
          <div
            className="ep_sr_before_text"
            dangerouslySetInnerHTML={{
              __html: props.attributes.titleText,
            }}
          ></div>
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
        </div>
        <RenderSavedStyles {...props} />
      </div>
    );
  }

export default save;