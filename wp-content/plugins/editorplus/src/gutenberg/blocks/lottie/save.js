import { Fragment } from "react";

const { RenderSavedStyles } = editorPlus.components;

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
    href,
    hrefTarget,
  } = props.attributes;

  const getSourceType = () => {
    if (!isEmpty(sourceUrl)) {
      return "url";
    } else if (!isEmpty(sourceMedia)) {
      return "media";
    }

    return source;
  };

  const source = getSourceType();
  const hasSource = !isEmpty(sourceMedia) || !isEmpty(sourceUrl);

  let lottie_markup = `<lottie-player src="${
    source === "media" ? get(sourceMedia, "url") : sourceUrl
  }" class="ep_lottie_player" speed="${animationSpeed}" ${
    loop ? "loop" : ""
  } autoplay="${autoplay}" ${onHover ? "hover" : ""}></lottie-player>`;

  const LottieContainer = (
    <Fragment>
      <div className={`${id} ${className}`}>
        <div
          className="ep_lottie_wrap"
          dangerouslySetInnerHTML={{ __html: lottie_markup }}
        ></div>
      </div>
      <RenderSavedStyles {...props} />
    </Fragment>
  );

  const LottieContainerWithAnchor = isEmpty(href) ? (
    LottieContainer
  ) : (
    <a href={href} target={hrefTarget}>
      {LottieContainer}
    </a>
  );

  return hasSource && LottieContainerWithAnchor;
}

export default save;
