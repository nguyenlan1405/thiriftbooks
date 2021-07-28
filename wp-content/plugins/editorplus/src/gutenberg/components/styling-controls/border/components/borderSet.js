import { basicColorScheme } from "../../../../../functions";
import { TEXT_DOMAIN } from "../../../../../global/constants";
import PopoverColorPicker from "../../color-picker/components/popover-color-picker";
import isEmpty from "lodash/isEmpty";
import Tags from "../../tags";
import ImportantButton from "../../important-button";
import { bordersSchema } from "../border";

const { isEqual, clone, set, isString, get } = lodash;
const { Component } = wp.element;
const {
  ColorPalette,
  SelectControl,
  RangeControl,
  Button,
  CheckboxControl,
  __experimentalNumberControl: NumberControl,
  Icon,
} = wp.components;
const { __ } = wp.i18n;

export function convertBorderToSchema(border) {
  if (!isString(border) || isEmpty(border)) {
    return {
      area: 0,
      style: "solid",
      color: "rgb(49, 49, 49)",
      important: false,
    };
  }

  const style = border.match(/(solid|dotted|dashed|double|groove|ridge)/g);
  const value = border.match(/\d+px/g);

  const finalValue = value.length ? value[0].match(/\d+/g) : 0;

  const color = border.match(
    /(#([\da-f]{3}){1,2}|(rgb|hsl)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/g
  );
  const isImportant = /(!important)/.test(border);

  return {
    style: get(style, 0) ?? "solid",
    area: Number(get(finalValue, 0)),
    color: get(color, 0),
    important: isImportant,
  };
}

class BorderSet extends Component {
  constructor() {
    super();
    this.state = {
      border: {
        area: 0,
        style: "solid",
        color: "rgb(49, 49, 49)",
        important: false,
      },
      loaded: false,
    };

    this.initialValue = {
      area: "",
      style: "solid",
      color: "rgb(49, 49, 49)",
      important: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.clear = this.clear.bind(this);
  }

  handleChange(value, type) {
    const newBorders = clone(this.state.border);

    set(newBorders, type, value);

    this.setState({
      border: newBorders,
      loaded: false,
    });
  }

  clear() {
    this.setState(
      {
        border: this.initialValue,
      },
      () => {
        this.props.onChange(this.initialValue);
      }
    );
  }

  componentWillMount() {
    this.setState({ loaded: true });
  }

  componentDidMount() {
    const { value } = this.props;

    if (isEmpty(value)) return;

    this.setState({ border: value, loaded: true });
  }

  componentWillUpdate(newProps, newState) {
    const { onChange } = newProps,
      { area, style, color, important } = newState.border,
      { loaded } = newState;

    const everyEmpty = [area, style, color].every(
      (prop) => typeof prop === "undefined"
    );

    if (isEqual(newState, this.state) || everyEmpty || loaded) return;

    onChange({ area, style, color, important });
  }

  render() {
    const { border } = this.state;
    const { area, color, style, important } = border;
    const { clearLabel = "" } = this.props;

    const styles = [
      {
        label: "Select Style",
        value: "",
        disabled: true,
      },
      {
        label: "Solid",
        value: "solid",
      },
      {
        label: "Dotted",
        value: "dotted",
      },
      {
        label: "Dashed",
        value: "dashed",
      },
      {
        label: "Double",
        value: "double",
      },
      {
        label: "Groove",
        value: "groove",
      },
      {
        label: "Ridge",
        value: "ridge",
      },
    ];

    return (
      <div className="ep-border-set">
        <Tags
          label={clearLabel}
          initialValue={this.initialValue}
          currentValue={border}
          labelClass="ep-border-label"
          clearLabel="ep-flex-2"
          onClear={this.clear}
        />

        <div className="cwp-opt ep-flexed">
          <NumberControl
            min={0}
            className="ep-flex-2 ep-unit-control"
            value={area}
            onChange={(newArea) => this.handleChange(newArea, "area")}
          />
          <SelectControl
            className="cwp-opt-select-control ep-flex-3"
            value={style}
            options={styles}
            onChange={(newStyle) => this.handleChange(newStyle, "style")}
          />
          <PopoverColorPicker
            value={color}
            onChange={(color) => this.handleChange(color, "color")}
          />
          <ImportantButton
            onImportant={() => this.handleChange(!important, "important")}
            value={important}
          />
        </div>
      </div>
    );
  }
}

export default BorderSet;
