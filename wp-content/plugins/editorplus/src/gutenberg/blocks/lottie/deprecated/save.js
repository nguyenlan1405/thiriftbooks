const { Fragment } = wp.element;

const {
  RenderSavedStyles,
} = editorPlus.components;


const { isEmpty, get } = lodash;

function save(props) {
  const {
    className,
    id,
    sourceMedia,
    sourceUrl,
    loop,
    autoplay,
    onHover,
    animationSpeed,
  } = props.attributes;

  const loopTag = loop ? { loop: true } : {};
  const hoverTag = onHover ? { hover: "hover" } : {};

  const getSourceType = () => {
    if (!isEmpty(sourceUrl)) {
      return "url";
    } else if (!isEmpty(sourceMedia)) {
      return "media";
    }

    return source;
  };

  const source = getSourceType();

  return (
    <Fragment>
      <div className={`${id} ${className}`}>
        <div className="ep_lottie_wrap">
          <lottie-player
            src={source === "media" ? get(sourceMedia, "url") : sourceUrl}
            class="ep_lottie_player"
            {...loopTag}
            {...hoverTag}
            speed={animationSpeed}
            autoplay={autoplay}
          ></lottie-player>
        </div>
      </div>
      <RenderSavedStyles {...props} />
    </Fragment>
  );
}

export default save;