//? custom control
import AnimationControl from "../../components/animation/index";
import { TEXT_DOMAIN } from "../../../global/constants";
import {
  hasAnimationClass,
  id,
  getAnimBlockInnerTarget as getBlockInnerTarget,
  testAndRemoveUnusedMeta,
  isBlockSupported,
  removeEditorPlusClasses,
  removeBlockMeta,
} from "../../../functions/index";
import styleToCss from "style-object-to-css-string";

//? Destructuring wordpress modules
const {
  domReady,
  compose: { createHigherOrderComponent },
  hooks: { addFilter },
  element: { Fragment, useEffect, useState },
  blockEditor: { InspectorControls },
  components: { Button, PanelBody },
  data,
  i18n: { __ },
} = wp;

const { get, has, isEmpty, isError, attempt, toString } = lodash;
const META_KEY = "editor_plus_custom_animation_option_css";
const { editPost } = data.dispatch("core/editor");
const { getEditedPostAttribute } = data.select("core/editor");
const { getBlock } = data.select("core/block-editor");

/**
 * This function will be used in the filter for extending the custom attributes
 * @param {array} settings - Block Settings
 * @param {string} name - Block Slug/Name
 * @return {array} extendedAttributes
 */

const withAnimationControlsAttribute = (settings, name) => {
  if (!has(settings, "attributes")) return;

  const attributeToExtend = {
    epCustomAnimation: AnimationControl.schema,
    epAnimationGeneratedClass: {
      type: "string",
      default: "",
    },
  };

  settings.attributes = Object.assign(settings.attributes, attributeToExtend);

  return settings;
};

/**
 * This HigherOrderComponent will be used for extending Gutenberg Block
 * @prop {function} BlockEdit Gutenberg Block as Component
 */

const withAnimationControls = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    const [animationState, setAnimationState] = useState({
      playing: false,
      duration: 0,
      progress: 0, // will be updated each sec
    });

    const value = get(props.attributes, "epCustomAnimation");
    const currentBlock = getBlock(props.clientId);
    const name = get(currentBlock, "name");
    const isCurrentBlockSupported = isBlockSupported(name);

    if (!isCurrentBlockSupported) {
      return <BlockEdit {...props} />;
    }

    let progressInterval;

    const {
      clientId,
      attributes: { className, epAnimationGeneratedClass, epCustomAnimation },
    } = props;

    useEffect(() => {
      const currentPostMeta = getEditedPostAttribute("meta"),
        currentStringifiedAnimationCss = get(currentPostMeta, META_KEY);

      // checking if the css can be parsed for safety
      const canBeParsed = !isError(
        attempt(JSON.parse, currentStringifiedAnimationCss)
      );

      if (canBeParsed) {
        const parsedAnimations = JSON.parse(currentStringifiedAnimationCss);
        const animationToUpdate = get(props, "attributes.epCustomAnimation");
        const convertedAnimation = AnimationControl.convert(animationToUpdate);
        const blockExists = !isEmpty(getBlock(clientId));

        if (
          !has(parsedAnimations, clientId) &&
          !isEmpty(convertedAnimation) &&
          blockExists
        ) {
          handleChange(animationToUpdate);
        }
      }
    }, []);

    const handleChange = (updatedValue) => {
      const currentPostMeta = getEditedPostAttribute("meta"),
        currentStringifiedAnimationCss = get(currentPostMeta, META_KEY);
      const cssProperty = AnimationControl.convert(updatedValue);
      const animClass = get(props.attributes, "epAnimationGeneratedClass");

      // checking if the css can be parsed for safety
      const canBeParsed = !isError(
        attempt(JSON.parse, currentStringifiedAnimationCss)
      );

      if (canBeParsed) {
        const currentAnimationCss = JSON.parse(currentStringifiedAnimationCss);
        const cssStyling = `.${animClass} { animation: ${cssProperty} }`;
        // updating the meta value of current block

        if (!isEmpty(cssProperty)) {
          currentAnimationCss[clientId] = cssStyling;
        } else {
          currentAnimationCss[clientId] = "";
        }

        const updatedStringifiedValue = JSON.stringify(currentAnimationCss);

        editPost({ meta: { [META_KEY]: updatedStringifiedValue } });

        // updating attribute
        props.setAttributes({
          epCustomAnimation: updatedValue,
          epAnimationGeneratedClass: animClass,
        });
      }
    };

    useEffect(() => {
      const animType = get(props, "attributes.epCustomAnimation.type");

      const generatedID = id(6);
      const randomGeneratedClassName = `edplus_anim-${generatedID}`;

      const savedAnimationClassName = epAnimationGeneratedClass;
      const animClass = !isEmpty(savedAnimationClassName)
        ? savedAnimationClassName
        : randomGeneratedClassName;

      if (isEmpty(savedAnimationClassName)) {
        props.setAttributes({
          epAnimationGeneratedClass: animClass,
        });
      }

      if (!hasAnimationClass(className) && animType !== "none") {
        const blockClassList = toString(className).split(" ");

        blockClassList.push(animClass);
        props.setAttributes({
          className: blockClassList.join(" "),
        });
      }

      if (hasAnimationClass(className) && animType === "none") {
        props.setAttributes({
          className: removeEditorPlusClasses(className, true),
        });
      }
    }, [props.attributes, animationState]);

    // for removing extra css of deleted blocks
    useEffect(() => testAndRemoveUnusedMeta(META_KEY), [props.attributes]);
    useEffect(() => {
      return () => {
        testAndRemoveUnusedMeta(META_KEY);
        removeBlockMeta(clientId, META_KEY);
      };
    }, []);

    /**
     * Will pause the currently playing css animation
     */

    const pause = () => {
      clearInterval(progressInterval);

      setAnimationState({
        ...animationState,
        duration: 0,
        playing: false,
        progress: 0,
      });
    };

    /**
     * Will play the css animation
     * @param {number} duration Duration of css animation to be played
     */

    const play = (duration) => {
      setAnimationState({ ...animationState, duration, playing: true });

      // for updating animation progress each second
      progressInterval = setInterval(() => {
        if (Math.floor(animationState.progress) < Math.floor(duration)) {
          animationState.progress += 1 / 9;

          setAnimationState({
            ...animationState,
            duration,
            playing: true,
          });
        } else {
          pause();
        }
      }, Math.floor((1 / 9) * 1000));
    };

    const getAnimationStyling = () => {
      const animationPlayState = animationState.playing ? "running" : "paused";

      const styling = {
        animation: AnimationControl.convert(value),
      };

      if (animationPlayState === "paused") {
        delete styling.animation;
      }

      const cssStyling = styleToCss(styling);
      const innerTarget = getBlockInnerTarget(name, epAnimationGeneratedClass);
      const targetElement = `${epAnimationGeneratedClass}${innerTarget}`;
      const generatedStyling = `.${targetElement} { ${cssStyling} }`;

      return isEmpty(cssStyling) ? "" : generatedStyling;
    };

    const generatedAnimationStyling = getAnimationStyling();

    return (
      <Fragment>
        <BlockEdit {...props} />
        {!isEmpty(generatedAnimationStyling) && (
          <style
            id="eplus-animation-styling"
            dangerouslySetInnerHTML={{ __html: generatedAnimationStyling }}
          ></style>
        )}
        <InspectorControls>
          <PanelBody title={__("Animation", TEXT_DOMAIN)} initialOpen={false}>
            <AnimationControl
              disabled={animationState.playing}
              {...props}
              value={value}
              attr="epCustomAnimation"
              onChange={handleChange}
              onPlay={play}
              onPause={pause}
              progress={animationState.progress}
              isPlaying={animationState.playing}
            />
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  };
});
const isExtensionEnabled =
  get(editor_plus_extension, "animation_builder.enabled") === "1" ||
  get(editor_plus_extension, "animation_builder.enabled") === true
    ? true
    : false;

if (isExtensionEnabled) {
  addFilter(
    "editor.BlockEdit",
    "editor-plus/custom-animation-controls",
    withAnimationControls
  );

  addFilter(
    "blocks.registerBlockType",
    "editor-plus/custom-animation-control-attribute",
    withAnimationControlsAttribute
  );
}
