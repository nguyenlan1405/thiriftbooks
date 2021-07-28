import { TEXT_DOMAIN } from "../../../../global/constants";

import { getInheritedValues } from "../../../../functions/index";
import ButtonGroup from "../buttonGroup";
import SingleDimension from "./components/single-dimension";
import Tags from "../tags";
import ImportantButton from "../important-button";

const { __ } = wp.i18n;

const { Component, Fragment } = wp.element;
const {
  clone,
  set,
  isEmpty,
  isEqual,
  isString,
  get,
  capitalize,
  keys,
  pick,
  assign,
  omit,
  kebabCase,
} = lodash;

/**
 * Will take the default value and convert that into attribute schema
 * that's required for storing default value
 *
 * @param {string} defaultValue
 * @return {object} schema
 */

export function convertDimensionsToSchema(defaultValue) {
  // @example defaultValue => "10px 10px 10px 10px !important"

  if (!isString(defaultValue)) return dimensionSchema.default;

  const matchedUnits = defaultValue.match(/(px|%|vw|vh|rem|em)/g);
  const defaultUnit = get(matchedUnits, 0);
  const isImportant = /(!important)/.test(defaultValue);
  const matchedValues = defaultValue.match(/(\d|auto)+/g);

  if (matchedValues.length !== 4) return dimensionSchema.default;

  return {
    value: {
      top: matchedValues[0],
      right: matchedValues[1],
      bottom: matchedValues[2],
      left: matchedValues[3],
    },
    unit: defaultUnit ?? "%",
    important: isImportant,
  };
}

/**
 * Will take the dimensions schema and convert it into css readable property
 *
 * @param {object}  dimension Dimensions Schema
 * @return {string} css
 */

export function convertDimensions(dimension, property = "") {
  const getNum = (n) => (isEmpty(n) ? 0 : n);

  if (isEmpty(dimension)) {
    return "0px 0px 0px 0px";
  } // null exception

  const {
    value: { top, right, bottom, left },
    important,
    unit,
  } = dimension;

  const isImportant = important ? "!important" : "";

  const isEveryEmpty = [top, right, bottom, left].every((p) => isEmpty(p));
  const isUnit = isEmpty(unit) ? "px" : unit;

  if (isEveryEmpty) {
    return "";
  } else {
    const topUnit = isNaN(Number(top)) ? "" : isUnit;
    const rightUnit = isNaN(Number(right)) ? "" : isUnit;
    const bottomUnit = isNaN(Number(bottom)) ? "" : isUnit;
    const leftUnit = isNaN(Number(left)) ? "" : isUnit;

    let dimensions = {};
    const cssProperty = kebabCase(property);

    if (top !== "") {
      dimensions[`${cssProperty}-top`] =
        getNum(top) + topUnit + ` ${isImportant}`;
    }

    if (right !== "") {
      dimensions[`${cssProperty}-right`] =
        getNum(right) + rightUnit + ` ${isImportant}`;
    }

    if (bottom !== "") {
      dimensions[`${cssProperty}-bottom`] =
        getNum(bottom) + bottomUnit + ` ${isImportant}`;
    }

    if (left !== "") {
      dimensions[`${cssProperty}-left`] =
        getNum(left) + leftUnit + ` ${isImportant}`;
    }

    if (isEqual(cssProperty, "border-radius")) {
      dimensions = {
        [cssProperty]: `${getNum(top)}${topUnit} ${getNum(
          right
        )}${rightUnit} ${getNum(bottom)}${bottomUnit} ${getNum(
          left
        )}${leftUnit} ${isImportant}`,
      };
    }

    return dimensions;
  }
}

export const dimensionSchema = {
  type: "object",
  default: {
    value: {
      top: "",
      right: "",
      bottom: "",
      left: "",
    },
    unit: "%",
    important: false,
  },
};

const emptyState = {
  top: "",
  right: "",
  bottom: "",
  left: "",
  important: false,
  unit: "%",
};
class Dimensions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        top: "",
        right: "",
        bottom: "",
        left: "",
        unit: "%",
        important: false,
      },
      currentMode: "simple",
      refresh: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.setAll = this.setAll.bind(this);
    this.clear = this.clear.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.handleModes = this.handleModes.bind(this);
    this.getConfig = this.getConfig.bind(this);
    this.getAllSideValue = this.getAllSideValue.bind(this);
    this.getCurrentValue = this.getCurrentValue.bind(this);
    this.toggleImportant = this.toggleImportant.bind(this);

    // control configuration
    this.config = {
      // if user can input auto values
      disableAuto: true,
    };
  }

  componentWillMount() {
    if (isEmpty(this.props.value)) return;

    const value = getInheritedValues(this.props);

    const { top, right, bottom, left } = value.value;
    const { important, unit } = value;

    const topValue = this.isValid(top) ? top : "";
    const rightValue = this.isValid(right) ? right : "";
    const bottomValue = this.isValid(bottom) ? bottom : "";
    const leftValue = this.isValid(left) ? left : "";

    let currentMode = "simple";
    // setting the current mode based on last updated values

    let allDimensionsEqual = [top, right, bottom, left].every((dim) =>
      isEqual(dim, top)
    );

    // if all last updated dimensions are not equal
    // then last active mode is advanced
    if (!allDimensionsEqual) {
      currentMode = "advanced";
    }

    this.setState({
      value: {
        top: topValue,
        right: rightValue,
        bottom: bottomValue,
        left: leftValue,
        important,
        unit,
      },
      currentMode,
    });
  }

  handleUnitChange(newUnit) {
    const currentValue = this.state.value;

    this.setState({ value: { ...currentValue, unit: newUnit } }, () => {
      const { top, right, bottom, left } = this.state.value;

      this.props.onChange({ top, right, bottom, left }, newUnit);
    });
  }

  isValid(value) {
    const isNumeric = !isNaN(Number(value));
    const isAuto = isEqual(value, "auto");

    return isNumeric || isAuto;
  }

  handleChange(value, type) {
    const { lock } = this.state.value;

    if (typeof value === "number") {
      value = value.toString();
    }

    let newValue;

    if (!lock) {
      newValue = clone(this.state.value);
      set(newValue, type, value);
    } else if (lock) {
      newValue = this.setAll(value);
    }

    const { top, right, bottom, left, unit } = newValue;

    this.setState({ value: newValue });

    this.props.onChange({ top, right, bottom, left }, unit);
  }

  setAll(v) {
    if (typeof v === "number") {
      v = v.toString();
    }

    let updatedValue = {
      top: v,
      right: v,
      bottom: v,
      left: v,
      unit: this.state.value.unit,
      important: this.state.value.important,
    };

    const { top, right, bottom, left, unit } = updatedValue;

    this.setState({ value: updatedValue }, () => {
      this.props.onChange({ top, right, bottom, left }, unit);
    });

    return updatedValue;
  }

  clear() {
    const newValue = emptyState;

    this.setState(
      { value: newValue, currentMode: "simple", refresh: !this.state.refresh },
      () => {
        this.props.onImportant(false);
        this.props.onChange({ top: "", right: "", bottom: "", left: "" }, "%");
      }
    );
  }

  /**
   * Will handle the current control modes changes
   * @param {string} mode
   */

  handleModes(nextMode) {
    this.setState({ currentMode: nextMode });
  }

  /**
   * Will provide control configuration based on user config and default config
   * @return {object} config
   */

  getConfig() {
    // default config
    const { config, props } = this;
    // picking only configs that are supported by the control
    const userConfig = pick(props, keys(config));

    const finalConfig = clone(config);

    assign(finalConfig, userConfig);

    return finalConfig;
  }

  /**
   * Will return value the simple mode value based on all directions
   */

  getAllSideValue() {
    const { top, right, bottom, left } = this.state.value;

    const isEveryDimensionEqual = [top, right, bottom, left].every((dim) =>
      isEqual(dim, top)
    );

    return isEveryDimensionEqual ? top : "";
  }

  /**
   * Will provide the current dimension value
   *
   * @return { object } value
   */

  getCurrentValue() {
    const { top, right, bottom, left, unit, important } = this.state.value;

    const valueAccordingToSchemaStructure = {
      value: {
        top,
        right,
        bottom,
        left,
      },
      unit,
      important,
    };

    return valueAccordingToSchemaStructure;
  }

  /**
   * Will toggle the importance status for current dimension property
   *
   * @return { void }
   */

  toggleImportant() {
    const { important } = this.state.value,
      newImportantStatus = !important;

    this.props.onImportant(newImportantStatus);
    this.setState({
      value: {
        ...this.state.value,
        important: newImportantStatus,
      },
    });
  }

  render() {
    const { value, refresh } = this.state;
    const { unit, important } = value;
    const { currentMode } = this.state;
    const { label = "" } = this.props;
    const defaultConfig = this.config;
    const {
      disableAuto = defaultConfig.disableAuto,
      allowNegativeIntegers = defaultConfig.allowNegativeIntegers,
    } = this.getConfig();

    const supportedModes = [
      {
        value: "simple",
        label: __("Simple", TEXT_DOMAIN),
      },
      {
        value: "advanced",
        label: __("Advanced", TEXT_DOMAIN),
      },
    ];

    const availableSides = ["top", "right", "bottom", "left"];
    const currentDimensionValue = this.getCurrentValue();
    const isDimensionValueUpdated = !isEqual(
      dimensionSchema.default,
      currentDimensionValue
    );

    return (
      <div className="ep-dimension-control">
        <div className="cwp-opt ep-flexed ep-space-between">
          <Tags
            labelClass="ep-flex-2"
            initialValue={dimensionSchema.default}
            currentValue={currentDimensionValue}
            label={__(label, TEXT_DOMAIN)}
            onClear={this.clear}
          />
          <ButtonGroup
            isSmall
            multiple={false}
            canBeEmptied={false}
            btnStyles={{
              fontWeight: 400,
              fontSize: "12px",
            }}
            uniqueValue={[]}
            value={currentMode}
            options={supportedModes}
            onChange={this.handleModes}
          />
        </div>
        {isEqual(currentMode, "simple") && (
          <Fragment>
            <SingleDimension
              positionLabel={__("All Sides", TEXT_DOMAIN)}
              disableAuto
              value={this.getAllSideValue()}
              onChange={(newValue) => this.setAll(newValue)}
              onUnitChange={this.handleUnitChange}
              currentUnit={unit}
              onImportant={this.toggleImportant}
              important={important}
              isDimensionValueUpdated={isDimensionValueUpdated}
              key={"border-all".concat(refresh)}
            />
          </Fragment>
        )}
        {isEqual(currentMode, "advanced") && (
          <Fragment>
            {availableSides.map((side) => {
              const positionLabel = capitalize(side);
              const value = get(this.state.value, side);

              return (
                <div className="cwp-opt">
                  <SingleDimension
                    disableAuto={disableAuto}
                    positionLabel={__(positionLabel, TEXT_DOMAIN)}
                    value={value}
                    onChange={(newValue) => this.handleChange(newValue, side)}
                    onUnitChange={this.handleUnitChange}
                    currentUnit={unit}
                    onImportant={this.toggleImportant}
                    important={important}
                    isDimensionValueUpdated={isDimensionValueUpdated}
                  />
                </div>
              );
            })}
          </Fragment>
        )}
      </div>
    );
  }
}

export default Dimensions;
