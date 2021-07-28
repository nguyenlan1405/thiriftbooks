import React, { Component } from "react";
import { TEXT_DOMAIN } from "../../../../global/constants";
import { Range, RangeSchema, convertRange } from "../range/range";
import {
  basicColorScheme,
  dividers as svgDividers,
} from "../../../../functions";
import SvgPicker from "./components/svg-picker";

const jQuery = window.jQuery;

const { clone, set, isEmpty, has } = lodash;
const { SelectControl, ColorPalette, PanelRow, FormToggle } = wp.components;
const { __ } = wp.i18n;

export const ShapeDividerSchema = {
  type: "object",
  default: {
    height: {
      ...RangeSchema.default,
      value: "30",
    },
    width: {
      ...RangeSchema.default,
      value: "100",
    },
    color: "",
    style: "",
    arrangement: "top",
    position: "top",
    flip: false,
  },
};

export function convertShapeDivider(divider) {
  const res = {};

  const { height, width, color, style, arrangement, position, flip } = divider;

  const newWidth = convertRange(width); // because it's range component
  const newHeight = convertRange(height); // because it's range component

  const newStyle = jQuery(style).attr("fill", color);

  let svgDataUri;

  if (!isEmpty(style)) {
    const selectedSvg = newStyle[0].outerHTML;
    svgDataUri = "data:image/svg+xml;base64," + window.btoa(selectedSvg);
  }

  let transforms = [];

  res["width"] = newWidth;
  res["height"] = newHeight;
  res["position"] = "absolute";
  res["background-color"] = "transparent !important";

  if (position === "top") {
    res["top"] = "0 !important";
  } else {
    res["top"] = "auto !important";
    res["bottom"] = "0";

    transforms.push("rotateX(180deg)");
  }

  if (flip) {
    transforms.push("rotateY(180deg)");
  }

  res["left"] = "0 !important";
  res["background-size"] = "cover";

  if (!isEmpty(transforms)) {
    res["transform"] = transforms.join(" ");
  }

  if (arrangement === "underneath") {
    res["z-index"] = "-1";
  } else {
    res["z-index"] = "100";
  }

  if (!isEmpty(style)) {
    res["background-image"] = `url(${svgDataUri})`;
  }

  if (isEmpty(style)) {
    return "";
  }

  return res; // exception
}

class ShapeDivider extends Component {
  constructor() {
    super();
    this.state = {
      divider: {
        ...ShapeDividerSchema.default,
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const { value } = this.props;

    this.setState({
      divider: value,
    });
  }

  handleChange(value, type) {
    const newDivider = clone(this.state.divider); // creating a copy of original divider
    set(newDivider, type, value); // mutating...

    this.setState({ divider: newDivider }, () =>
      this.props.onChange(newDivider)
    ); // updating...
  }

  render() {
    const { color, height, style, width, arrangement, position, flip } =
      this.state.divider;

    return (
      <div className="ep-shape-divider-control">
        <SvgPicker
          choices={svgDividers}
          value={style}
          onSelect={(svg) => this.handleChange(svg, "style")}
        />

        <SelectControl
          label={__("Arrangement", TEXT_DOMAIN)}
          value={arrangement}
          options={[
            { label: "On top of element", value: "top" },
            { label: "Underneath the element", value: "underneath" },
          ]}
          onChange={(arrangement) => {
            this.handleChange(arrangement, "arrangement");
          }}
        />
        <SelectControl
          label={__("Position", TEXT_DOMAIN)}
          value={position}
          options={[
            { label: "Top", value: "top" },
            { label: "Bottom", value: "bottom" },
          ]}
          onChange={(position) => {
            this.handleChange(position, "position");
          }}
        />

        <div>
          <PanelRow>
            <h3>{__("Flip", TEXT_DOMAIN)}</h3>
            <FormToggle
              checked={flip}
              onChange={() => this.handleChange(!flip, "flip")}
            />
          </PanelRow>
        </div>

        <Range
          label={__("Width", TEXT_DOMAIN)}
          value={width}
          onChange={(newW) => this.handleChange(newW, "width")}
        />
        <Range
          label={__("Height", TEXT_DOMAIN)}
          value={height}
          onChange={(newH) => this.handleChange(newH, "height")}
        />

        <div>
          <h3>{__("Color", TEXT_DOMAIN)}</h3>
          <ColorPalette
            colors={basicColorScheme}
            value={color}
            onChange={(color) => this.handleChange(color, "color")}
          />
        </div>
      </div>
    );
  }
}

export default ShapeDivider;
