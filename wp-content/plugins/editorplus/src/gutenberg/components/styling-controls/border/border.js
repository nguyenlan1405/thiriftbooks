import BorderSet, { convertBorderToSchema } from "./components/borderSet";
import { buildActiveContext, getInheritedValues } from "../../../../functions";
import ButtonGroup from "../buttonGroup";
import { TEXT_DOMAIN } from "../../../../global/constants";

const {
  capitalize,
  isEmpty,
  isEqual,
  each,
  get,
  has,
  assign,
  clone,
  keys,
  pick,
  isObject,
} = lodash;
const { Component } = wp.element;
const { Button } = wp.components;
const { __ } = wp.i18n;

export const bordersSchema = {
  type: "object",
  default: {
    borderTop: {},
    borderRight: {},
    borderLeft: {},
    borderBottom: {},
    borderAll: {},
  },
};

export function convertBordersToSchema(borders) {
  if (!isObject(borders)) return bordersSchema.default;

  const borderTop = get(borders, "border-top"),
    borderRight = get(borders, "border-right"),
    borderLeft = get(borders, "border-left"),
    borderBottom = get(borders, "border-bottom"),
    borderAll = get(borders, "border");

  if (has(borders, "border")) {
    return {
      borderTop: convertBorderToSchema(borderAll),
      borderRight: convertBorderToSchema(borderAll),
      borderLeft: convertBorderToSchema(borderAll),
      borderBottom: convertBorderToSchema(borderAll),
      borderAll: convertBorderToSchema(borderAll),
    };
  }

  return {
    borderTop: convertBorderToSchema(borderTop),
    borderRight: convertBorderToSchema(borderRight),
    borderLeft: convertBorderToSchema(borderLeft),
    borderBottom: convertBorderToSchema(borderBottom),
    borderAll: convertBorderToSchema(borderAll),
  };
}

const borderSchema = {
  area: "",
  style: "solid",
  color: "rgb(49, 49, 49)",
  important: false,
};

function isBorderEmpty(border) {
  const color = get(border, "color"),
    area = get(border, "area"),
    style = get(border, "style");

  let hasEmptyValue = false;

  if (isEqual(area, "")) {
    hasEmptyValue = true;
  }

  return hasEmptyValue;
}

export function convertBorder(border) {
  const color = get(border, "color"),
    area = get(border, "area"),
    style = get(border, "style"),
    imp = get(border, "important");

  const isImportant = imp ? "!important" : "";

  const css = `${area}px ${style} ${color} ${isImportant}`;

  const everyEmpty = [area, style, color].some((p) => {
    if (typeof p === "undefined") {
      return true;
    } else if (typeof p === "number") {
      return false;
    } else if (isEmpty(p)) {
      return true;
    }

    return false;
  });

  if (everyEmpty) {
    return "";
  }

  return css;
}

function sameBorders(borders) {
  const {
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    borderAll,
  } = borders;

  const isSame = [
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    borderAll,
  ].every((b) => isEqual(b, borderTop));

  return isSame;
}

export function convertBorders(borders) {
  const hasAllProperties = [
    "borderTop",
    "borderRight",
    "borderBottom",
    "borderLeft",
    "borderAll",
  ].every((b) => has(borders, b));

  if (!hasAllProperties) {
    return "";
  }

  const result = {};

  if (sameBorders(borders) && !isBorderEmpty(borders.borderTop)) {
    result["border"] = convertBorder(borders.borderTop);
  } else {
    each(borders, (border, key) => {
      const color = get(border, "color"),
        area = get(border, "area"),
        style = get(border, "style"),
        imp = get(border, "important");

      const isImportant = imp ? "!important" : "";

      const css = `${area}px ${style} ${color} ${isImportant}`;

      if (key !== "borderAll" && !isBorderEmpty(border)) result[key] = css;
    });
  }

  return result;
}

export class Border extends Component {
  constructor() {
    super();
    this.state = {
      border: {
        borderTop: borderSchema,
        borderRight: borderSchema,
        borderBottom: borderSchema,
        borderLeft: borderSchema,
        borderAll: borderSchema,
      },
      currentBorder: "all",
      currentMode: "simple",
    };

    this.getActiveStatus = this.getActiveStatus.bind(this);
    this.handleAllChange = this.handleAllChange.bind(this);

    // default control config
    this.config = {
      // allowed border directions
      directions: ["all", "top", "right", "bottom", "left"],
    };
  }

  getActiveStatus(t) {
    const { currentBorder } = this.state;

    return buildActiveContext(
      t,
      currentBorder,
      { isPrimary: true },
      { isSecondary: true }
    );
  }

  componentWillMount() {
    const value = getInheritedValues(this.props);
    const { directions } = this.getConfig();

    // if there are selective border directions to be rendered
    if (directions) {
      this.setState({
        currentBorder: get(directions, 0),
      });
    }

    this.setState({
      border: value,
    });

    // detecting current mode based on last updated value
    const isBordersSame = sameBorders(value);

    if (!isBordersSame) {
      this.setState({ currentMode: "advanced" });
    }
  }

  handleAllChange(newBorder) {
    const newBorders = {
      borderTop: newBorder,
      borderRight: newBorder,
      borderBottom: newBorder,
      borderLeft: newBorder,
      borderAll: newBorder,
    };

    const newState = Object.assign({}, this.state.border, newBorders);

    this.setState({ border: newState }, () => this.props.onChange(newBorders));
  }

  /**
   * Will provide control configuration assigning some default values
   * @return {object} config
   */

  getConfig() {
    const { config } = this;

    // picking user configuration
    const userConfig = pick(this.props, keys(config));

    // creating a final configuration merging default and user options
    const finalConfig = clone(config);

    assign(finalConfig, userConfig);

    return finalConfig;
  }

  /***
   * Will return calculated value for simple mode
   * @return {object} value
   */

  getAllBordersValue() {
    const { border } = this.state;
    const allBordersEqual = sameBorders(border);

    if (allBordersEqual) {
      return get(border, "borderAll");
    } else {
      return {
        area: 0,
        style: "solid",
        color: "rgb(49, 49, 49)",
        important: false,
      };
    }
  }

  render() {
    const { border } = this.state;
    const { currentBorder, currentMode } = this.state;
    const { directions = this.config.directions } = this.getConfig();
    const { label = "" } = this.props;

    const borderPos = ["top", "right", "bottom", "left"];
    const shouldRenderNav = directions.length > 1;
    const addClearLabel = shouldRenderNav ? true : false;

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

    return (
      <div className="ep-border" style={{ marginTop: 20 }}>
        <div className="cwp-opt ep-flexed">
          <span className="ep-flex-2">{__(label, TEXT_DOMAIN)}</span>
          <ButtonGroup
            isSmall
            canBeEmptied={false}
            btnStyles={{
              fontWeight: 400,
              fontSize: "12px",
            }}
            multiple={false}
            uniqueValue={[]}
            value={currentMode}
            options={supportedModes}
            onChange={(updatedMode) =>
              this.setState({ currentMode: updatedMode })
            }
          />
        </div>
        {currentMode === "simple" && (
          <BorderSet
            clearLabel={addClearLabel ? "All" : ""}
            value={this.getAllBordersValue()}
            onChange={(newBorder) => this.handleAllChange(newBorder)}
          />
        )}

        {borderPos.map((set, index) => {
          const isActive = currentMode === "advanced",
            key = `border${capitalize(set)}`;

          const value = isEmpty(get(border, key))
            ? borderSchema
            : get(border, key);

          return (
            isActive && (
              <BorderSet
                clearLabel={addClearLabel ? capitalize(set) : ""}
                value={value}
                onChange={(newBorder) => {
                  const updatedBorders = {
                    ...this.state.border,
                    [key]: newBorder,
                  };

                  this.setState(
                    {
                      border: updatedBorders,
                    },
                    this.props.onChange(updatedBorders)
                  );
                }}
                key={index}
              />
            )
          );
        })}
      </div>
    );
  }
}
