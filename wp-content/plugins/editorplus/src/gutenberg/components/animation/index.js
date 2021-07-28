import Icon from "../icon";
import { TEXT_DOMAIN } from "../../../global/constants";
import ButtonGroup from "../styling-controls/buttonGroup";
const { __ } = wp.i18n;
const { useState, useEffect, Fragment } = wp.element;
const {
  __experimentalRadio: Radio,
  __experimentalRadioGroup: RadioGroup,
  __experimentalText: Text,
  __experimentalNumberControl: NumberControl,
  SelectControl,
  RangeControl,
  Tooltip,
} = wp.components;
const { capitalize, clone, set, get, isEmpty, isEqual, slice } = lodash;

// this schema will be used as an extended attribute for this custom control
const schema = {
  type: "object",
  default: {
    type: "none",
    duration: 1,
    direction: "center",
    delay: 0,
    speedCurve: "ease-in",
    repeat: "once",
  },
};

/**
 * Animations lists that does not support directions from the above direction list
 * @example fade    does not support directions
 * @example slide   supports directions
 */

const unsupportedDirectionAnimations = ["fade", "zoom", "none", "roll"];

/**
 * Convert the animation schema into css readable animation property
 * @param   {object}  animation Animation Control schema
 * @return  {string}  css animation property
 */

function convert({ type, duration, direction, delay, speedCurve, repeat }) {
  /**
   * Animation Property can be written like this shorthand in css
   * @example animation: <Animation_Name> <Animation Duration> <Animation_Timing_Function> <Animation_Delay> <Animation_Iteration_Count> <Animation_Direction>
   * @reference https://www.w3schools.com/css/tryit.asp?filename=trycss3_animation5p
   */

  // some required properties check
  if (isEmpty(type) || isEqual(type, "none")) return "";
  // because it's capitalized in the keyframe suffix
  direction = direction === "center" ? "" : capitalize(direction);
  const iterationCount = repeat === "repeat" ? "Infinite" : "1";

  if (unsupportedDirectionAnimations.includes(type)) {
    direction = "";
  }

  const animation = `editor-plus-${type}${direction} ${duration}s ${speedCurve} ${delay}s ${iterationCount} forwards`;

  return animation;
}

function AnimationControl(props) {
  const [state, setState] = useState(schema.default);

  // some destructuring...
  const { value } = props;
  const { type, direction, duration, delay, speedCurve, repeat } = state;

  //picking the last updated value (IF AVAILABLE) when this control loads
  useEffect(() => setState(value), []);

  // supportedAnimationTypes must have their respective keyframe in the stylesheet
  // with their respective name prefixed with "editor-plus-<ANIMATION_NAME>"
  const supportedAnimationTypes = [
    "none",
    "fade",
    "slide",
    "bounce",
    "zoom",
    "flip",
    "fold",
    "roll",
  ].map((animType) => {
    const animLabel = capitalize(animType);

    let renderContent = (
      <div className="anim-type-radio">
        <Icon width={20} icon={animType} />
        {animLabel}
      </div>
    );

    return {
      label: __(renderContent),
      value: animType,
    };
  });

  const supportedAnimationDirectionsOptions = [
    "center",
    "up",
    "right",
    "down",
    "left",
  ].map((animDir) => {
    let dirIcon = animDir === "center" ? "marker" : `arrow-${animDir}-alt2`;

    if (animDir === "left") {
      dirIcon = `arrow-right-alt2`;
    }

    if (animDir === "right") {
      dirIcon = `arrow-left-alt2`;
    }

    return {
      label: __(<Icon icon={dirIcon} />),
      value: animDir,
      help: capitalize(animDir),
    };
  });

  const timingMarks = [
    {
      value: 0,
      label: "1s",
    },
    {
      value: 1,
      label: "2s",
    },
    {
      value: 2,
      label: "3s",
    },
    {
      value: 3,
      label: "4s",
    },
    {
      value: 4,
      label: "5s",
    },
    {
      value: 5,
      label: "6s",
    },
    {
      value: 6,
      label: "7s",
    },
  ];
  const supportedSpeedCurves = [
    {
      label: "East-In-Out",
      value: "ease-in-out",
    },
    {
      label: "Ease",
      value: "ease",
    },
    {
      label: "Ease-In",
      value: "ease-in",
    },
    {
      label: "Ease-Out",
      value: "ease-out",
    },
    {
      label: "Linear",
      value: "linear",
    },
  ];
  const supportedAnimationRepeat = [
    {
      label: "Once",
      value: "once",
    },
    {
      label: "Repeat",
      value: "repeat",
    },
  ];

  /**
   * Will update the respective option of it's type in the state
   * @param {string} type Option Type
   * @param {*} value  Option value
   */

  const handleChange = (type, value) => {
    const newState = clone(state);
    // updating the state with new option value
    set(newState, type, value);
    setState(newState);
    props.onChange(newState);
  };

  const getProgressMarks = () => {
    const mrks = [
      {
        value: 0,
        label: __("0s", TEXT_DOMAIN),
      },
      {
        value: totalAnimationDuration,
        label: totalAnimationDuration + "s",
      },
    ];

    if (delay !== 0) {
      mrks.push({
        value: delay,
        label: __("Animation", TEXT_DOMAIN),
      });
    }

    return mrks;
  };

  const disableClass = props.disabled ? "ep-is-disabled" : "";
  const totalAnimationDuration = delay + duration;

  return (
    <div className="ep-animation-control">
      <div className={`ep-anim-opt ${disableClass}`}>
        <ButtonGroup
          multiple={false}
          uniqueValue={[]}
          value={type}
          key={type}
          flexWrap={true}
          btnStyles={{
            fontWeight: 400,
            fontSize: "12px",
            padding: "30px 13px",
          }}
          options={supportedAnimationTypes}
          onChange={(newAnimationType) =>
            handleChange("type", newAnimationType)
          }
        />
      </div>
      {type !== "none" && (
        <div className="ep-anim-opt" style={{ marginTop: 20 }}>
          <RangeControl
            label={__("Player", TEXT_DOMAIN)}
            separatorType="fullWidth"
            withInputField={false}
            max={totalAnimationDuration}
            beforeIcon={__(
              <Icon
                icon={props.isPlaying ? "controls-pause" : "controls-play"}
                onClick={() => {
                  props.onPlay(totalAnimationDuration);
                }}
              />
            )}
            showTooltip={false}
            value={props.progress}
            marks={getProgressMarks()}
          />
        </div>
      )}
      {!unsupportedDirectionAnimations.includes(type) && (
        <div className={`ep-anim-opt cwp-opt ${disableClass}`}>
          <Text className="ep-anim-headline">
            {__("Direction", TEXT_DOMAIN)}
          </Text>
          <ButtonGroup
            multiple={false}
            uniqueValue={[]}
            value={direction}
            options={supportedAnimationDirectionsOptions}
            onChange={(newAnimationDirection) =>
              handleChange("direction", newAnimationDirection)
            }
          />
        </div>
      )}

      {type !== "none" && (
        <Fragment>
          <div className={`ep-anim-opt ${disableClass}`}>
            <RangeControl
              label={__("Duration", TEXT_DOMAIN)}
              beforeIcon="clock"
              marks={timingMarks}
              value={duration}
              onChange={(newDuration) => handleChange("duration", newDuration)}
              min={1}
              max={7}
              step={1}
            />
          </div>
          <div
            className={`ep-anim-opt cwp-opt ep-unit-control ep-flexed ${disableClass}`}
          >
            <span className="ep-flex-2">{__("Delay", TEXT_DOMAIN)}</span>
            <NumberControl
              className="ep-flex-2"
              isShiftStepEnabled={true}
              onChange={(newDelay) => handleChange("delay", ~~newDelay)}
              shiftStep={10}
              step={1}
              min={0}
              labelPosition="side"
              value={delay}
              isDragEnabled={true}
            />
          </div>
          <div className={`ep-anim-opt cwp-opt ep-flexed ${disableClass}`}>
            <span className="ep-flex-2">{__("Speed Curve", TEXT_DOMAIN)}</span>
            <div className="ep-flex-2">
              <SelectControl
                className="cwp-opt-select-control"
                options={supportedSpeedCurves}
                value={speedCurve}
                onChange={(speedCurve) =>
                  handleChange("speedCurve", speedCurve)
                }
              />
            </div>
          </div>
          <div className={`ep-anim-opt ep-flexed cwp-opt ${disableClass}`}>
            <span className="ep-flex-2">{__("Repeat", TEXT_DOMAIN)}</span>

            <div className="ep-flex-2">
              <SelectControl
                className="cwp-opt-select-control"
                options={supportedAnimationRepeat}
                value={repeat}
                onChange={(repeat) => handleChange("repeat", repeat)}
              />
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}

// Applying some static properties
AnimationControl.schema = schema;
AnimationControl.convert = convert;

export default AnimationControl;
