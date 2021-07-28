import React, { Component, Fragment } from "react";
import {
  Range,
  RangeSchema,
  convertRange,
  convertRangeToSchema,
} from "../range/range";
import { TEXT_DOMAIN } from "../../../../global/constants";
import {
  getInheritedValues,
  basicColorScheme,
  parsePropertyValue,
} from "../../../../functions/index";
import ButtonGroup from "../buttonGroup";
import TextDecorationControl from "./components/text-decoration";
import EditorPlusIcons from "../../icon";
import PopoverColorPicker from "../color-picker/components/popover-color-picker";
import Tags from "../tags";
import ImportantButton from "../important-button";

const {
  get,
  set,
  clone,
  isEmpty,
  includes,
  isEqual,
  isArray,
  has,
  pick,
  assign,
  keys,
  isObject,
  isString,
} = window.lodash;
const { __ } = wp.i18n;
const {
  SelectControl,
  Icon,
  ColorPalette,
  CheckboxControl,
  __experimentalUnitControl: UnitControl,
  Tooltip,
  Button,
} = wp.components;

// making some modification in the rangeSchema
const modifiedRangeSchema = clone(RangeSchema.default);
set(modifiedRangeSchema, "unit", "px");

export function convertTypographyToSchema(typography) {
  if (!isObject(typography)) return typographySchema;

  // extracting properties
  const lineHeight = get(typography, "line-height"),
    fontSize = get(typography, "font-size"),
    letterSpacing = get(typography, "letter-spacing"),
    fontWeight = get(typography, "font-weight") ?? null,
    textColor = get(typography, "text-color") ?? "",
    underlineColor = get(typography, "underline-color") ?? "",
    underlineStyle = get(typography, "underline-style") ?? "",
    lineThroughColor = get(typography, "linethrough-color") ?? "",
    lineThroughStyle = get(typography, "linethrough-style") ?? "",
    textStyle = get(typography, "text-styles") ?? [],
    textAlignment = get(typography, "text-align") ?? "";

  return {
    lineHeight: isEmpty(lineHeight)
      ? modifiedRangeSchema
      : convertRangeToSchema(lineHeight),
    fontSize: isEmpty(fontSize)
      ? modifiedRangeSchema
      : convertRangeToSchema(fontSize),
    letterSpacing: isEmpty(letterSpacing)
      ? modifiedRangeSchema
      : convertRangeToSchema(letterSpacing),
    textStyle,
    fontWeight,
    underline: {
      color: underlineColor,
      style: underlineStyle,
    },
    textColor: {
      color: parsePropertyValue(textColor, ""),
      imp: isString(textColor) ? /(!important)/.test(textColor) : false,
    },
    lineThrough: {
      color: lineThroughColor,
      style: lineThroughStyle,
    },
    textAlignment,
  };
}

export const typographySchema = {
  type: "object",
  default: {
    lineHeight: modifiedRangeSchema,
    fontSize: modifiedRangeSchema,
    letterSpacing: modifiedRangeSchema,
    fontWeight: null,
    textStyle: [],
    textColor: {
      color: "",
      imp: false,
    },
    underline: {
      color: "",
      style: "",
    },
    lineThrough: {
      color: "",
      style: "",
    },
    textAlignment: "",
  },
};

export const convertTypography = (typography) => {
  let res = {};
  const requiredProperties = [
    "fontSize",
    "letterSpacing",
    "lineHeight",
    "fontWeight",
    "textStyle",
    "textColor",
    "underline",
    "lineThrough",
    // "textAlignment", // due to later addition
  ];
  if (!requiredProperties.every((pr) => has(typography, pr))) {
    return "";
  }

  const {
    fontSize,
    letterSpacing,
    lineHeight,
    fontWeight,
    textStyle,
    textColor,
    underline,
    lineThrough,
    textAlignment = "",
  } = typography;

  const textDecorations = ["underline", "line-through"];
  const textStyles = ["italic"];
  const textTransform = ["lowercase", "uppercase", "capitalize"];

  if (!isEmpty(textAlignment)) {
    res["text-align"] = textAlignment;
  }

  if (includes(textStyle, "line-through")) {
    const lineThroughColor = get(lineThrough, "color");
    const lineThroughStyle = get(lineThrough, "style");

    if (!isEmpty(lineThroughColor)) {
      res["text-decoration-color"] = lineThroughColor + " !important";
    }

    if (!isEmpty(lineThroughStyle)) {
      res["text-decoration-style"] = lineThroughStyle + " !important";
    }
  }

  if (includes(textStyle, "underline")) {
    const underlineColor = get(underline, "color");
    const underlineStyle = get(underline, "style");

    if (!isEmpty(underlineColor)) {
      res["text-decoration-color"] = underlineColor + " !important";
    }

    if (!isEmpty(underlineStyle)) {
      res["text-decoration-style"] = underlineStyle + " !important";
    }
  }

  if (fontWeight !== null) {
    res["font-weight"] = fontWeight;
  }

  if (!isEmpty(get(textColor, "color"))) {
    const textColorImportant = get(textColor, "imp") ? " !important" : "";

    res["color"] = `${get(textColor, "color")}${textColorImportant}`;
  }

  textStyle.forEach((style) => {
    if (!isEmpty(style) && textDecorations.includes(style)) {
      res["text-decoration"] = style;
    } else if (!isEmpty(style) && textStyles.includes(style)) {
      res["font-style"] = style;
    } else if (!isEmpty(style) && textTransform.includes(style)) {
      res["text-transform"] = style;
    }
  });

  res["font-size"] = convertRange(fontSize);
  res["letter-spacing"] = convertRange(letterSpacing);
  res["line-height"] = convertRange(lineHeight);

  return res;
};

class Typography extends Component {
  constructor() {
    super();
    this.state = {
      value: typographySchema.default,
    };
    this.handleChange = this.handleChange.bind(this);
    this.hasFontStyle = this.hasFontStyle.bind(this);
    this.getConfig = this.getConfig.bind(this);
    this.isValueUpdated = this.isValueUpdated.bind(this);

    // default control config
    this.config = {
      // default typography controls to render
      controls: [
        "font-size",
        "font-weight",
        "letter-spacing",
        "line-height",
        "text-style",
        "text-color",
        "text-align",
      ],
    };
  }

  hasFontStyle(queryStyle) {
    const textStyle = get(this.state, "value.textStyle");

    if (isArray(textStyle)) {
      return includes(textStyle, queryStyle);
    } else {
      return isEqual(textStyle, queryStyle);
    }
  }

  componentWillMount() {
    const value = getInheritedValues(this.props);

    this.setState({ value });
  }

  handleChange(type, value) {
    const newValue = clone(this.state.value);

    set(newValue, type, value);

    this.setState({ value: newValue }, () => {
      this.props.onChange(newValue);
    });
  }

  getConfig() {
    const { config } = this;

    const userConfig = pick(this.props, keys(config));

    const finalConfig = clone(config);

    assign(finalConfig, userConfig);

    return userConfig;
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
      get(typographySchema.default, defaultValueKey)
    );
  }

  /**
   * Will important the given property
   * @param { string } property
   * @param { string } importantKey
   *
   * @return { void }
   */

  handleImportant(property, importantKey) {
    const propertyValue = get(this.state.value, property);
    const newValue = {
      ...this.state.value,
      [property]: {
        ...propertyValue,
        [importantKey]: !get(propertyValue, importantKey),
      },
    };

    this.setState(
      {
        value: newValue,
      },
      () => this.props.onChange(newValue)
    );
  }

  render() {
    const { value } = this.state;
    const fontSize = get(value, "fontSize"),
      letterSpacing = get(value, "letterSpacing"),
      lineHeight = get(value, "lineHeight"),
      textStyle = get(value, "textStyle"),
      textColor = get(value, "textColor"),
      underline = get(value, "underline"),
      lineThrough = get(value, "lineThrough"),
      fontWeight = get(value, "fontWeight"),
      textAlign = get(value, "textAlignment") ?? "";
    const { controls = this.config.controls } = this.getConfig();
    const textColorValue = get(textColor, "color");

    const supportedFontWeights = [
      {
        label: __("Select", TEXT_DOMAIN),
        value: null,
      },
      {
        label: __("Light", TEXT_DOMAIN),
        value: 300,
      },
      {
        label: __("Regular", TEXT_DOMAIN),
        value: 500,
      },
      {
        label: __("Semi Bold", TEXT_DOMAIN),
        value: 600,
      },
      {
        label: __("Bold", TEXT_DOMAIN),
        value: 700,
      },
      {
        label: __("Ultra Bold", TEXT_DOMAIN),
        value: 800,
      },
    ];

    const supportedFontStyle = [
      {
        label: __(<Icon icon="editor-italic" />),
        value: "italic",
        help: __("Italic", TEXT_DOMAIN),
      },
      {
        label: __("TT"),
        value: "uppercase",
        help: __("Uppercase", TEXT_DOMAIN),
      },
      {
        label: __("tt"),
        value: "lowercase",
        help: __("Lowercase", TEXT_DOMAIN),
      },
      {
        label: __("Tt"),
        value: "capitalize",
        help: __("Capitalize", TEXT_DOMAIN),
      },
      {
        label: __(<Icon icon="editor-underline" />),
        value: "underline",
        help: __("Underline", TEXT_DOMAIN),
      },
      {
        label: __("S"),
        value: "line-through",
        help: __("Strikethrough", TEXT_DOMAIN),
      },
    ];

    const supportedTextAlignments = [
      {
        label: __(<Icon icon="editor-alignleft" />),
        value: "left",
        help: __("Align Left", TEXT_DOMAIN),
      },
      {
        label: __(<Icon icon="editor-aligncenter" />),
        value: "center",
        help: __("Align Center", TEXT_DOMAIN),
      },
      {
        label: __(<Icon icon="editor-alignright" />),
        value: "right",
        help: __("Align Right", TEXT_DOMAIN),
      },
      {
        label: __(<Icon icon="editor-justify" />),
        value: "justify",
        help: __("Align Justify", TEXT_DOMAIN),
      },
    ];

    let fontSizeValue = get(fontSize, "value") + get(fontSize, "unit");
    let lineHeightValue = get(lineHeight, "value") + get(lineHeight, "unit");
    let letterSpacingValue =
      get(letterSpacing, "value") + get(letterSpacing, "unit");

    return (
      <div className="ep-typography-control">
        {controls.includes("font-weight") && (
          <div className="cwp-opt  ep-flexed ep-space-between">
            <Tags
              labelClass="ep-flex-1"
              label={__("Weight", TEXT_DOMAIN)}
              initialValue={typographySchema.default.fontWeight}
              currentValue={fontWeight}
              onClear={() =>
                this.handleChange(
                  "fontWeight",
                  typographySchema.default.fontWeight
                )
              }
            />

            <div className="ep-flex-2">
              <SelectControl
                key={fontWeight}
                className="cwp-opt-select-control"
                value={fontWeight}
                options={supportedFontWeights}
                onChange={(newFontWeight) =>
                  this.handleChange("fontWeight", newFontWeight)
                }
              />
            </div>
          </div>
        )}

        {controls.includes("font-size") && (
          <div className="cwp-opt ep-flexed ep-space-between">
            <Tags
              label={__("Size", TEXT_DOMAIN)}
              initialValue={typographySchema.default.fontSize}
              currentValue={fontSize}
              labelClass="ep-flex-1"
              onClear={() =>
                this.handleChange("fontSize", typographySchema.default.fontSize)
              }
            />
            <div className="ep-unit-control ep-flexed ep-flex-2 ep-flex-end">
              <UnitControl
                value={fontSizeValue}
                onChange={(val) => {
                  const convertedValue = convertRangeToSchema(val);
                  set(convertedValue, "important", get(fontSize, "important"));

                  this.handleChange("fontSize", convertedValue);
                }}
              />
              {this.isValueUpdated(fontSize, "fontSize") && (
                <ImportantButton
                  value={get(fontSize, "important")}
                  onImportant={() =>
                    this.handleImportant("fontSize", "important")
                  }
                />
              )}
            </div>
          </div>
        )}

        {controls.includes("line-height") && (
          <div className="cwp-opt ep-flexed ep-unit-control ep-space-between">
            <Tags
              label={__("Line", TEXT_DOMAIN)}
              initialValue={typographySchema.default.lineHeight}
              currentValue={lineHeight}
              labelClass="ep-flex-1"
              onClear={() =>
                this.handleChange(
                  "lineHeight",
                  typographySchema.default.lineHeight
                )
              }
            />
            <div className="ep-flex-2 ep-flexed ep-flex-end">
              <UnitControl
                value={lineHeightValue}
                onChange={(val) => {
                  const convertedValue = convertRangeToSchema(val);
                  set(
                    convertedValue,
                    "important",
                    get(lineHeight, "important")
                  );
                  this.handleChange("lineHeight", convertedValue);
                }}
              />
              {this.isValueUpdated(lineHeight, "lineHeight") && (
                <ImportantButton
                  value={get(lineHeight, "important")}
                  onImportant={() =>
                    this.handleImportant("lineHeight", "important")
                  }
                />
              )}
            </div>
          </div>
        )}

        {controls.includes("letter-spacing") && (
          <div className="cwp-opt ep-flexed ep-space-between ep-unit-control">
            <Tags
              label={__("Letter", TEXT_DOMAIN)}
              initialValue={typographySchema.default.letterSpacing}
              currentValue={letterSpacing}
              labelClass="ep-flex-1"
              onClear={() =>
                this.handleChange(
                  "letterSpacing",
                  typographySchema.default.letterSpacing
                )
              }
            />
            <div className="ep-flex-2 ep-flexed ep-flex-end">
              <UnitControl
                value={letterSpacingValue}
                onChange={(val) => {
                  const convertedValue = convertRangeToSchema(val);
                  set(
                    convertedValue,
                    "important",
                    get(letterSpacing, "important")
                  );
                  this.handleChange("letterSpacing", convertedValue);
                }}
              />
              {this.isValueUpdated(letterSpacing, "letterSpacing") && (
                <ImportantButton
                  value={get(letterSpacing, "important")}
                  onImportant={() =>
                    this.handleImportant("letterSpacing", "important")
                  }
                />
              )}
            </div>
          </div>
        )}

        {controls.includes("text-color") && (
          <div className="cwp-opt">
            <PopoverColorPicker
              customLabel={true}
              value={textColorValue}
              onChange={(newTextColor) =>
                this.handleChange("textColor", {
                  ...textColor,
                  color: newTextColor,
                })
              }
              label={
                <Tags
                  label={__("Color", TEXT_DOMAIN)}
                  initialValue={typographySchema.default.textColor}
                  currentValue={textColor}
                  onClear={() =>
                    this.handleChange(
                      "textColor",
                      typographySchema.default.textColor
                    )
                  }
                />
              }
              afterElement={
                this.isValueUpdated(textColor, "textColor") ? (
                  <ImportantButton
                    value={get(textColor, "imp")}
                    onImportant={() => this.handleImportant("textColor", "imp")}
                  />
                ) : null
              }
            />
          </div>
        )}

        {controls.includes("text-align") && (
          <div className="cwp-opt ep-flexed ep-space-between">
            <Tags
              label={__("Align", TEXT_DOMAIN)}
              labelClass="ep-flex-1"
              initialValue={typographySchema.default.textAlignment}
              currentValue={textAlign}
              onClear={() =>
                this.handleChange(
                  "textAlignment",
                  typographySchema.default.textAlignment
                )
              }
            />
            <div className="ep-flex-2">
              <ButtonGroup
                key={textAlign}
                multiple={false}
                uniqueValue={[]}
                value={textAlign}
                options={supportedTextAlignments}
                onChange={(newTextAlignment) =>
                  this.handleChange("textAlignment", newTextAlignment)
                }
              />
            </div>
          </div>
        )}
        {controls.includes("text-style") && (
          <div className="cwp-opt">
            <ButtonGroup
              multiple={true}
              uniqueValue={[
                ["uppercase", "lowercase", "capitalize"],
                ["underline", "line-through"],
              ]}
              value={textStyle}
              options={supportedFontStyle}
              onChange={(newTextStyle) =>
                this.handleChange("textStyle", newTextStyle)
              }
            />
          </div>
        )}

        {this.hasFontStyle("underline") && (
          <TextDecorationControl
            property={"Underline"}
            value={underline}
            onChange={(newUnderline) =>
              this.handleChange("underline", newUnderline)
            }
          />
        )}
        {this.hasFontStyle("line-through") && (
          <TextDecorationControl
            property={"Strike Through "}
            value={lineThrough}
            onChange={(lineThrough) =>
              this.handleChange("lineThrough", lineThrough)
            }
          />
        )}
      </div>
    );
  }
}

export default Typography;
