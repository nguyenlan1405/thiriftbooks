import { TEXT_DOMAIN } from "../../../global/constants";
import { rgba, getInheritedValues } from "../../../functions";
import PopoverColorPicker from "./color-picker/components/popover-color-picker";
import ButtonGroup from "./buttonGroup";
import Tags from "./tags";
import ImportantButton from "./important-button";

const { has, map, get, isEqual } = lodash;
const { Component } = wp.element;
const { __ } = wp.i18n;
const { __experimentalNumberControl: NumberControl } = wp.components;

/**
 * Will convert the given css box-shadow property into shadow schema
 *
 * @structure ?Inset horizontal vertical blurRadius spreadRadius shadowColor ?important
 * @example 14px 10px 4px 13px rgba(235, 0, 0, 1) | inset 20px 10px 4px 13px rgba(235, 0, 0, 1)
 *
 * @param {string}  shadow box-shadow css property
 * @return {object} shadowSchema
 */

export function convertShadowToSchema(shadow) {
  if (typeof shadow !== "string") return shadowSchema.default;

  const isInset = /(inset)+/.test(shadow);
  const isImportant = /(!important)/.test(shadow);

  // UnitValues includes horizontal vertical blurRadius spreadRadius
  let matchedUnitValues = shadow.match(/[\d]+(px|%|vw|vh|rem|em)+/gi);

  // removing units from the unitValues
  matchedUnitValues = map(matchedUnitValues, (val) => {
    const [value] = val.match(/[\d]+/g);
    return Number(value);
  });

  const shadowColor = shadow.match(
    /rgba?\(((25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,\s*?){2}(25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,?\s*([01]\.?\d*?)?\)/g
  );

  return {
    inset: isInset,
    horizontal: matchedUnitValues[0],
    vertical: matchedUnitValues[1],
    blurRadius: matchedUnitValues[2],
    spreadRadius: matchedUnitValues[3],
    shadowColor: get(shadowColor, 0) ?? "rgba(50, 46, 46, 1)",
    important: isImportant,
  };
}

export const shadowSchema = {
  type: "object",
  default: {
    inset: false,
    horizontal: 0,
    vertical: 0,
    blurRadius: 0,
    spreadRadius: 0,
    shadowColor: "rgba(50, 46, 46, 1)",
    important: false,
  },
};

export const convertShadow = (shadow) => {
  const requiredProperties = [
    "inset",
    "horizontal",
    "vertical",
    "blurRadius",
    "spreadRadius",
    "shadowColor",
    "important",
  ];

  if (!requiredProperties.every((p) => has(shadow, p))) {
    return "";
  }

  const {
    inset,
    horizontal,
    vertical,
    blurRadius,
    spreadRadius,
    shadowColor,
    important,
  } = shadow;

  const isInset = inset ? "inset " : "";

  const asArray = [horizontal, vertical, blurRadius, spreadRadius];

  const isSomePropertyEmpty = asArray.some((p) => {
    if (p === "") {
      return true;
    } else if (typeof p === "number") {
      return false;
    } else {
      return false;
    }
  });

  const isEveryPropertyEmpty = asArray.every((p) => {
    if (p === "") {
      return true;
    } else if (typeof p === "number" && p !== 0) {
      return false;
    } else {
      return true;
    }
  });

  let isImportant = important ? " !important" : "";

  let newShadow = `${isInset}${horizontal}px ${vertical}px ${blurRadius}px ${spreadRadius}px ${shadowColor}${isImportant}`;

  if (isEveryPropertyEmpty) {
    return "";
  }

  if (isSomePropertyEmpty) {
    return "";
  }

  return newShadow;
};

export class Shadow extends Component {
  constructor() {
    super();

    this.state = {
      ...shadowSchema.default,
      loaded: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.clear = this.clear.bind(this);
    this.isValueUpdated = this.isValueUpdated.bind(this);
    this.getCurrentShadow = this.getCurrentShadow.bind(this);
  }

  componentWillMount() {
    let value = getInheritedValues(this.props);

    if (!this.state.loaded) {
      this.setState({ ...value, loaded: true });
    }
  }

  clear() {
    this.setState(shadowSchema.default, () =>
      this.props.onChange(shadowSchema.default)
    );
  }

  handleChange(type, value) {
    this.setState({ [type]: value }, () => {
      this.props.onChange(this.state);
    });
  }

  /**
   * Will provide current shadow value
   * @return { object } shadow
   */

  getCurrentShadow() {
    const {
      inset,
      horizontal,
      vertical,
      blurRadius,
      spreadRadius,
      shadowColor,
      important,
    } = this.state;

    // current shadow value
    const currentShadow = {
      inset,
      horizontal,
      vertical,
      blurRadius,
      spreadRadius,
      shadowColor,
      important,
    };

    return currentShadow;
  }

  /**
   * Will check if the current shadow value is updated from the schema
   * @return { boolean } isUpdated
   */

  isValueUpdated() {
    const currentShadow = this.getCurrentShadow();
    const defaultShadow = shadowSchema.default;

    // checking for equality
    return !isEqual(currentShadow, defaultShadow);
  }

  render() {
    const {
      inset,
      horizontal,
      vertical,
      blurRadius,
      spreadRadius,
      shadowColor,
      important,
    } = this.state;

    // current shadow value
    const currentShadow = this.getCurrentShadow();

    const { label = "" } = this.props;

    const supportedInsets = [
      {
        label: __("Outer", TEXT_DOMAIN),
        value: false,
      },
      {
        label: __("Inner", TEXT_DOMAIN),
        value: true,
      },
    ];

    return (
      <div className="ep-shadow-control">
        <div className="cwp-opt ep-flexed ep-space-between">
          <Tags
            label={__(label, TEXT_DOMAIN)}
            initialValue={shadowSchema.default}
            currentValue={currentShadow}
            onClear={() =>
              this.setState({ ...this.state, ...shadowSchema.default }, () =>
                this.props.onChange(shadowSchema.default)
              )
            }
          />
          {this.isValueUpdated() && (
            <ImportantButton
              value={important}
              onImportant={() => this.handleChange("important", !important)}
            />
          )}
        </div>
        <div className="ep-root-shadow">
          <div className="cwp-opt ep-flexed">
            <span className="ep-flex-1">{__("Type", TEXT_DOMAIN)}</span>
            <div className="ep-flex-2">
              <ButtonGroup
                isSmall
                canBeEmptied={false}
                btnStyles={{
                  fontWeight: 400,
                  fontSize: "12px",
                }}
                multiple={false}
                uniqueValue={[]}
                value={inset}
                options={supportedInsets}
                onChange={(newInset) => this.handleChange("inset", newInset)}
              />
            </div>
          </div>
          <div className="cwp-opt">
            <PopoverColorPicker
              label={__("Color", TEXT_DOMAIN)}
              value={shadowColor}
              onChange={(newShadowColor) =>
                this.handleChange("shadowColor", newShadowColor)
              }
            />
          </div>

          <div className="cwp-opt ep-flexed">
            <span className="ep-flex-1">{__("X", TEXT_DOMAIN)}</span>
            <NumberControl
              className="ep-flex-2 ep-unit-control"
              value={horizontal}
              onChange={(h) => this.handleChange("horizontal", ~~h)}
            />
          </div>
          <div className="cwp-opt ep-flexed">
            <span className="ep-flex-1">{__("Y", TEXT_DOMAIN)}</span>
            <NumberControl
              className="ep-flex-2 ep-unit-control"
              value={vertical}
              onChange={(h) => this.handleChange("vertical", ~~h)}
            />
          </div>
          <div className="cwp-opt ep-flexed">
            <span className="ep-flex-1">{__("Blur", TEXT_DOMAIN)}</span>
            <NumberControl
              className="ep-flex-2 ep-unit-control"
              value={blurRadius}
              onChange={(b) => this.handleChange("blurRadius", ~~b)}
            />
          </div>
          <div className="cwp-opt ep-flexed">
            <span className="ep-flex-1">{__("Spread", TEXT_DOMAIN)}</span>
            <NumberControl
              className="ep-flex-2 ep-unit-control"
              value={spreadRadius}
              onChange={(s) => this.handleChange("spreadRadius", ~~s)}
            />
          </div>
        </div>
        {/* <div className="ep-clear">
          <Button isSmall isDefault onClick={this.clear}>
            Clear
          </Button>
          <CheckboxControl
            heading={__("Important", TEXT_DOMAIN)}
            checked={important}
            onChange={() => this.handleChange("important", !important)}
          />
        </div> */}
      </div>
    );
  }
}
