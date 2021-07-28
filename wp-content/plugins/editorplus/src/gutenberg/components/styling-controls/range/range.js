import { TEXT_DOMAIN } from "../../../../global/constants";
import Tags from "../tags";
import ImportantButton from "../important-button";

const { isEqual, isEmpty, get, pick, clone, assign, keys, toLower } = lodash;
const { Component } = wp.element;
const {
  RangeControl,
  CheckboxControl,
  SelectControl,
  Button,
  __experimentalUnitControl: UnitControl,
} = wp.components;
const { __ } = wp.i18n;

export const RangeSchema = {
  type: "object",
  default: {
    value: "",
    important: false,
    unit: "%",
  },
};

/**
 * Will convert the output range property back to schema structure
 * @param {string} range
 * @return {object} RangeSchema
 */

export function convertRangeToSchema(range) {
  if (typeof range !== "string") return RangeSchema.default;

  const value = range.match(/[-]{0,1}[\d]*[.]{0,1}[\d]+/g);
  const matchedUnits = range.match(/(px|%|vw|vh|rem|em)/g);
  const isImportant = /(!important)/.test(range);

  if (isEmpty(value)) return RangeSchema.default;

  return {
    value: Number(get(value, 0)),
    important: isImportant,
    unit: get(matchedUnits, 0) ?? "",
  };
}

export function convertRange(range) {
  const value = get(range, "value");
  const important = get(range, "important");
  const unit = get(range, "unit");

  const RangeUnit = isEmpty(unit) ? "" : unit;

  const isImp = important ? "!important" : "";

  if (value === "") {
    return "";
  }

  return `${value}${RangeUnit} ${isImp}`;
}

export class Range extends Component {
  constructor() {
    super();
    this.state = {
      ...RangeSchema.default,
    };

    this.handleChange = this.handleChange.bind(this);
    this.clear = this.clear.bind(this);
    this.getMaxRangeAccordingToUnits = this.getMaxRangeAccordingToUnits.bind(
      this
    );

    // config handler
    this.getConfig = this.getConfig.bind(this);

    // configuration to modify current range
    this.config = {
      // only these units will be available in the selector
      supportedUnits: ["%", "px", "vw", "vh", "rem", "em"],
      min: 0, // minimum value that can be input
      max: undefined, // use the max range according to unit when undefined
      // available types are ['UnitControl' , 'RangeControl']
      type: "RangeControl",
    };
  }

  clear() {
    const freshState = {
      value: "",
      important: false,
      unit: this.state.unit,
    };

    this.setState(freshState, () => {
      this.props.onChange(freshState);
    });
  }

  componentDidMount() {
    const { value } = this.props;
    // de-structuring the final config for current block
    const { supportedUnits = defaultConfig.supportedUnits } = this.getConfig();

    const finalUnits = this.getUnits(supportedUnits);
    this.setState({ ...value });

    if (isEmpty(finalUnits)) {
      this.setState({ unit: "" });
    }

    // applying the current unit by default
    if (finalUnits.length === 1) {
      this.handleChange("unit", get(finalUnits, "[0].value"));
    }
  }

  handleChange(type, value) {
    this.setState(
      {
        [type]: value,
      },
      () => {
        const { value, important, unit } = this.state;

        this.props.onChange({
          value,
          important,
          unit,
        });
      }
    );
  }

  getMaxRangeAccordingToUnits(unit) {
    switch (unit) {
      case "px":
        return 1000;
      default:
        return 100;
    }
  }

  /**
   * Will provide current control config assigning defaults in the user config
   * @return { object } config
   */

  getConfig() {
    // default config
    const { config, props } = this;

    // user assigned config for current block
    const userConfig = pick(props, keys(config));

    // avoiding any mutation errors
    const finalConfig = clone(config);

    assign(finalConfig, userConfig);

    return finalConfig;
  }

  /**
   * Will return the available units for range control with user override
   * @return {array} units
   */

  getUnits(supportedUnits) {
    const defaultSupportedUnits = this.config.supportedUnits;
    const options = [];

    supportedUnits.forEach((unit) => {
      // checking if the unit is valid and supported by our control
      const unitWithoutCaseSensitivity = toLower(unit);

      if (defaultSupportedUnits.includes(unitWithoutCaseSensitivity)) {
        options.push({
          label: unit,
          value: unit,
          default: 0,
        });
      }
    });

    return options;
  }

  render() {
    const { label } = this.props;
    const { value, important, unit } = this.state;

    const defaultConfig = this.config;

    // de-structuring the final config for current block
    const {
      supportedUnits = defaultConfig.supportedUnits,
      min = defaultConfig.min,
      max = defaultConfig.max,
    } = this.getConfig();

    const finalUnits = this.getUnits(supportedUnits);

    const rangeControlLabel = __(label, TEXT_DOMAIN);

    return (
      <div className="ep-range-control" style={{ margin: "15px 0px" }}>
        <Tags
          labelClass="ep-flex-1"
          label={rangeControlLabel}
          initialValue={RangeSchema.default.value}
          currentValue={this.state.value}
          onClear={this.clear}
        />
        <div className="cwp-opt ep-flexed">
          <RangeControl
            className="ep-flex-2 ep-range-control"
            min={min}
            max={
              typeof max === "undefined"
                ? this.getMaxRangeAccordingToUnits(unit)
                : max
            }
            withInputField={false}
            value={value}
            onChange={(value) => this.handleChange("value", value)}
          />
          <div
            style={{ flex: 1.5, margin: "0px 0px 0px 10px" }}
            className="ep-unit-control"
          >
            <UnitControl
              value={value + unit}
              min={min}
              units={finalUnits}
              max={
                typeof max === "undefined"
                  ? this.getMaxRangeAccordingToUnits(unit)
                  : max
              }
              onChange={(newValue) => {
                if (isEmpty(unit)) {
                  newValue = newValue.replace(/[(%|px|em|rem|vw|vh)]/g, "");
                }

                const updatedValue = convertRangeToSchema(newValue);

                this.setState({ ...updatedValue }, () => {
                  this.props.onChange(updatedValue);
                });
              }}
              onUnitChange={(newUnit) => this.handleChange("unit", newUnit)}
            />
          </div>
          {!isEqual(RangeSchema.default, this.state) && (
            <ImportantButton
              value={important}
              onImportant={() => this.handleChange("important", !important)}
            />
          )}
        </div>
      </div>
    );
  }
}
