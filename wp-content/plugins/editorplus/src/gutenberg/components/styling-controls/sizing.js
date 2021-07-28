import {
  Range,
  RangeSchema,
  convertRange,
  convertRangeToSchema,
} from "./range/range";
import { getInheritedValues } from "../../../functions";
import { TEXT_DOMAIN } from "../../../global/constants";

const { isEmpty, isEqual, get, isObject } = lodash;
const { Component, Fragment } = wp.element;
const { __ } = wp.i18n;

export const sizingSchema = {
  type: "object",
  default: {
    height: RangeSchema.default,
    width: RangeSchema.default,
    maxWidth: RangeSchema.default,
    maxHeight: RangeSchema.default,
  },
};

export function convertSizingToSchema(sizing) {
  if (!isObject(sizing)) return sizingSchema.default;

  const height = get(sizing, "height"),
    width = get(sizing, "width"),
    maxWidth = get(sizing, "max-width"),
    maxHeight = get(sizing, "max-height");

  return {
    height: convertRangeToSchema(height),
    width: convertRangeToSchema(width),
    maxWidth: convertRangeToSchema(maxWidth),
    maxHeight: convertRangeToSchema(maxHeight),
  };
}

export function convertSizing(sizing) {
  const height = get(sizing, "height");
  const width = get(sizing, "width");
  const maxWidth = get(sizing, "maxWidth");
  const maxHeight = get(sizing, "maxHeight");

  return {
    height: convertRange(height),
    width: convertRange(width),
    maxWidth: convertRange(maxWidth),
    maxHeight: convertRange(maxHeight),
  };
}

class Sizing extends Component {
  constructor() {
    super();
    this.state = {
      value: {
        ...sizingSchema.default,
      },
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const value = getInheritedValues(this.props);

    this.setState({ value });
  }

  handleChange(type, value) {
    const updatedValue = {
      ...this.state.value,
      [type]: value,
    };

    this.setState({ value: updatedValue }, () => {
      this.props.onChange(updatedValue);
    });
  }

  render() {
    const { state } = this;
    let height = get(state, "value.height"),
      width = get(state, "value.width"),
      maxWidth = get(state, "value.maxWidth"),
      maxHeight = get(state, "value.maxHeight");

    return (
      <div className="ep-sizing-control">
        <Range
          label={__("Width", TEXT_DOMAIN)}
          value={width}
          onChange={(newW) => {
            this.handleChange("width", newW);
          }}
        />
        <Range
          label={__("Max Width", TEXT_DOMAIN)}
          value={maxWidth}
          onChange={(newW) => {
            this.handleChange("maxWidth", newW);
          }}
        />
        <Range
          label={__("Height", TEXT_DOMAIN)}
          value={height}
          onChange={(newH) => {
            this.handleChange("height", newH);
          }}
        />
        <Range
          label={__("Max Height", TEXT_DOMAIN)}
          value={maxHeight}
          onChange={(newH) => {
            this.handleChange("maxHeight", newH);
          }}
        />
      </div>
    );
  }
}

export default Sizing;
