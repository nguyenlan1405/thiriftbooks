import { TEXT_DOMAIN } from "../../../global/constants";
import Tags from "./tags";
import ImportantButton from "./important-button";

const { Component, Fragment } = wp.element;
const { isEqual, isEmpty, isString, get } = lodash;
const {
  RangeControl,
  SelectControl,
  Button,
  CheckboxControl,
  __experimentalNumberControl: NumberControl,
} = wp.components;
const { __ } = wp.i18n;

export const transitionSchema = {
  type: "object",
  default: {
    duration: "",
    delay: "",
    speedCurve: "ease",
    important: true,
  },
};

/**
 * Will convert the transition property into transition control schema
 *
 * @param   {string}  transition
 *  @structure  <duration>ms <delay>ms <speedCurve>
 *  @example    1000ms 200ms linear !important
 *
 * @return  {object} transitionSchema
 */

export function convertTransitionIntoSchema(transition) {
  if (!isString(transition)) return transitionSchema.default;

  const isImportant = /(!important)/g.test(transition);
  const speedCurve = transition.match(/(linear|ease|ease-in-out|ease-out)/g);
  const values = transition.match(/[\d]+/g);

  if (values.length !== 2) return transitionSchema.default;

  return {
    duration: !isNaN(get(values, 0)) ? ~~get(values, 0) : "",
    delay: !isNaN(get(values, 1)) ? ~~get(values, 1) : "",
    speedCurve: get(speedCurve, 0),
    important: isImportant,
  };
}

export function convertTransition(transition) {
  const { duration, delay, speedCurve, important } = transition;

  const isImp = important ? " !important" : "";

  const isDelay = delay === "" ? "" : " ".concat(`${delay}ms`);

  const isSpeedCurve = !isEmpty(speedCurve) ? " ".concat(speedCurve) : "";

  if (duration === "") {
    return "";
  }

  return `${duration}ms${isDelay}${isSpeedCurve}${isImp}`;
}

class Transition extends Component {
  constructor(...props) {
    super(props);

    this.state = {
      ...transitionSchema.default,
    };

    this.handleChange = this.handleChange.bind(this);
    this.clear = this.clear.bind(this);
  }

  clear() {
    this.setState({ ...transitionSchema.default }, () =>
      this.props.onChange(this.state)
    );
  }

  handleChange(type, value) {
    this.setState(
      {
        [type]: value,
      },
      () => {
        this.props.onChange(this.state);
      }
    );
  }

  componentWillUpdate(newProps) {
    if (isEqual(newProps, this.props)) return;

    this.setState({ ...newProps.value });
  }

  componentDidMount() {
    this.setState({ ...this.props.value });
  }

  render() {
    const { delay, duration, important, speedCurve } = this.state;
    const { label } = this.props;

    const curveOptions = [
      {
        label: "Select Speed Curve",
        value: "",
      },
      {
        label: "Ease",
        value: "ease",
      },
      {
        label: "Ease-In-Out",
        value: "ease-in-out",
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

    return (
      <Fragment>
        <div className="cwp-opt ep-flexed ep-space-between">
          <Tags
            label={label}
            initialValue={transitionSchema.default}
            currentValue={this.state}
            onClear={() =>
              this.setState({ ...transitionSchema.default }, () =>
                this.props.onChange(transitionSchema.default)
              )
            }
          />
          {!isEqual(transitionSchema.default, this.state) && (
            <ImportantButton
              value={important}
              onImportant={() => this.handleChange("important", !important)}
            />
          )}
        </div>
        <div className="ep-transition">
          <div className="cwp-opt ep-flexed ep-unit-control">
            <span className="ep-flex-2">
              {__("Duration (ms)", TEXT_DOMAIN)}
            </span>

            <NumberControl
              className="ep-flex-1"
              onChange={(newDuration) =>
                this.handleChange("duration", newDuration)
              }
              value={duration}
              min={0}
              max={2000}
              step={50}
            />
          </div>
          <div className="cwp-opt ep-flexed ep-unit-control">
            <span className="ep-flex-2">{__("Delay (ms)", TEXT_DOMAIN)}</span>
            <NumberControl
              className="ep-flex-1"
              onChange={(newDuration) =>
                this.handleChange("delay", newDuration)
              }
              value={delay}
              min={0}
              max={300}
              step={50}
            />
          </div>
          <div className="cwp-opt ep-flexed">
            <span className="ep-flex-2">{__("Speed Curve", TEXT_DOMAIN)}</span>
            <div className="ep-flex-1">
              <SelectControl
                className="cwp-opt-select-control"
                value={speedCurve}
                options={curveOptions}
                onChange={(speedCurve) =>
                  this.handleChange("speedCurve", speedCurve)
                }
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Transition;
