import { TEXT_DOMAIN } from "../../../../global/constants";
import Transition, {
  convertTransition,
  transitionSchema,
  convertTransitionIntoSchema,
} from "../transition";
import {
  buildActiveContext,
  getInheritedValues,
  availableDisplayProperties,
  parsePropertyValue,
} from "../../../../functions/index";
import Tags from "../tags";
import ImportantButton from "../important-button";

const {
  toString,
  isEmpty,
  has,
  get,
  clone,
  assign,
  keys,
  pick,
  isString,
  isEqual,
} = lodash;
const { Component } = wp.element;
const {
  SelectControl,
  __experimentalNumberControl: NumberControl,
} = wp.components;

const { __ } = wp.i18n;

/**
 * Will convert the other settings to
 */

export function convertOtherSettingsToSchema(otherSettings) {
  const transition = get(otherSettings, "transition"),
    display = get(otherSettings, "display"),
    zIndex = get(otherSettings, "z-index"),
    overflow = get(otherSettings, "overflow");

  return {
    transition: convertTransitionIntoSchema(transition),
    hide: {
      property: parsePropertyValue(display, ""),
      important: isString(display) ? /(!important)/g.test(display) : false,
    },
    zIndex: {
      value: parsePropertyValue(zIndex, 0),
      important: isString(zIndex) ? /(!important)/g.test(zIndex) : false,
    },
    overflow: {
      value: parsePropertyValue(overflow, ""),
      important: isString(overflow) ? /(!important)/g.test(overflow) : false,
    },
  };
}

export const otherSettingsSchema = {
  type: "object",
  default: {
    hide: {
      property: "",
      important: false,
    },
    transition: transitionSchema.default,
    zIndex: {
      value: 0,
      important: false,
    },
    overflow: {
      value: "",
      important: false,
    },
  },
};

export function convertOtherSettings(settings) {
  let res = {};

  const requiredProperties = ["hide", "transition", "zIndex", "overflow"];

  if (!requiredProperties.every((p) => has(settings, p))) {
    return "";
  }

  const { hide, transition, zIndex, overflow } = settings;

  const isHideImportant = hide.important ? " !important" : "";

  if (hide.property !== "") {
    res["display"] = `${hide.property}${isHideImportant}`;
  }

  if (has(zIndex, "value") && zIndex.value !== 0) {
    const iszIndexImportant = get(zIndex, "important") ? " !important" : "";

    res["zIndex"] = toString(zIndex.value).concat(iszIndexImportant);
  }

  if (has(overflow, "value") && !isEmpty(overflow.value)) {
    const isOverflowImportant = get(overflow, "important") ? " !important" : "";

    res["overflow"] = overflow.value.concat(isOverflowImportant); // concatenation of the !important
  }

  res["transition"] = convertTransition(transition);

  return res;
}

class OtherSettings extends Component {
  constructor() {
    super();
    this.state = {
      ...otherSettingsSchema.default,
    };

    this.handleChange = this.handleChange.bind(this);
    this.getConfig = this.getConfig.bind(this);
    this.isValueUpdated = this.isValueUpdated.bind(this);

    // default control config
    this.config = {
      // default controls to render
      controls: ["display", "transition", "z-index", "overflow"],
    };
  }

  componentWillMount() {
    const value = getInheritedValues(this.props);

    this.setState({ ...value });
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

  getConfig() {
    const { config } = this;

    const userConfig = pick(this.props, keys(config));
    const finalConfig = clone(config);

    assign(finalConfig, userConfig);

    return finalConfig;
  }

  /**
   * Will check if the given values are updated or not
   * @param  { any } initialValue
   * @param  { string } defaultValueKey
   * @return { bool } isUpdated
   */

  isValueUpdated(initialValue, defaultValueKey) {
    return !isEqual(
      initialValue,
      get(otherSettingsSchema.default, defaultValueKey)
    );
  }

  render() {
    const { hide, transition, zIndex, overflow } = this.state;
    const { controls = this.config.controls } = this.getConfig();

    const overflowOptions = [
      {
        label: "Select",
        value: "",
      },
      {
        label: "Visible",
        value: "visible",
      },
      {
        label: "Hidden",
        value: "hidden",
      },
      {
        label: "Scroll",
        value: "scroll",
      },
      {
        label: "Auto",
        value: "auto",
      },
    ];

    return (
      <div className="ep-other-s">
        {controls.includes("display") && (
          <div className="cwp-opt ep-flexed">
            <Tags
              initialValue={otherSettingsSchema.default.hide}
              currentValue={hide}
              labelClass="ep-flex-2"
              label={__("Display", TEXT_DOMAIN)}
              onClear={() =>
                this.handleChange("hide", otherSettingsSchema.default.hide)
              }
            />
            <div className="ep-flexed ep-flex-2">
              <SelectControl
                className="cwp-opt-select-control"
                value={hide.property}
                options={[
                  { label: "Select", value: "" },
                  ...availableDisplayProperties,
                ]}
                onChange={(p) =>
                  this.handleChange("hide", { ...hide, property: p })
                }
              />
              {this.isValueUpdated(hide, "hide") && (
                <ImportantButton
                  value={get(hide, "important")}
                  onImportant={() =>
                    this.handleChange("hide", {
                      ...hide,
                      important: !hide.important,
                    })
                  }
                />
              )}
            </div>
          </div>
        )}

        {controls.includes("z-index") && (
          <div className="cwp-opt ep-flexed">
            <Tags
              label={__("Z Index", TEXT_DOMAIN)}
              labelClass="ep-flex-2"
              initialValue={otherSettingsSchema.default.zIndex}
              currentValue={zIndex}
              onClear={() =>
                this.handleChange("zIndex", otherSettingsSchema.default.zIndex)
              }
            />
            <div
              className="ep-flexed ep-flex-2"
              style={{ justifyContent: "flex-end" }}
            >
              <NumberControl
                className="ep-unit-control"
                value={get(zIndex, "value")}
                onChange={(newIndex) =>
                  this.handleChange("zIndex", { ...zIndex, value: newIndex })
                }
                step={1}
                max={10000}
              />
              {this.isValueUpdated(zIndex, "zIndex") && (
                <ImportantButton
                  value={get(zIndex, "important")}
                  onImportant={() =>
                    this.handleChange("zIndex", {
                      ...zIndex,
                      important: !zIndex.important,
                    })
                  }
                />
              )}
            </div>
          </div>
        )}

        {controls.includes("overflow") && (
          <div className="cwp-opt ep-flexed">
            <Tags
              label={__("Overflow", TEXT_DOMAIN)}
              labelClass="ep-flex-2"
              initialValue={otherSettingsSchema.default.overflow}
              currentValue={overflow}
              onClear={() =>
                this.handleChange(
                  "overflow",
                  otherSettingsSchema.default.overflow
                )
              }
            />
            <div className="ep-flexed ep-flex-2">
              <SelectControl
                className="cwp-opt-select-control"
                value={overflow.value}
                options={overflowOptions}
                onChange={(o) =>
                  this.handleChange("overflow", { ...overflow, value: o })
                }
              />
              {this.isValueUpdated(overflow, "overflow") && (
                <ImportantButton
                  value={get(overflow, "important")}
                  onImportant={() =>
                    this.handleChange("overflow", {
                      ...overflow,
                      important: !overflow.important,
                    })
                  }
                />
              )}
            </div>
          </div>
        )}
        {controls.includes("transition") && (
          <div className="cwp-opt">
            <Transition
              label={__("Transition", TEXT_DOMAIN)}
              value={transition}
              onChange={(newTransition) =>
                this.handleChange("transition", newTransition)
              }
            />
          </div>
        )}
      </div>
    );
  }
}

export default OtherSettings;
