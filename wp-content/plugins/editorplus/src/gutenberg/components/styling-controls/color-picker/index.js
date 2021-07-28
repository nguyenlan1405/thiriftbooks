import {
  basicColorScheme,
  rgba,
  getInheritedValues,
} from "../../../../functions";
import PopoverColorPicker from "./components/popover-color-picker";

const { ColorPicker: WpColorPicker, ColorPalette } = wp.components;
const { Component } = wp.element;
const { assign, pick, keys, isEmpty, has, clone } = lodash;

export const colorSchema = {
  type: "object",
  default: {
    color: "",
  },
};

export function convertColorToSchema(color) {
  return {
    color,
  };
}

export function convertColor(value) {
  if (!has(value, "color")) {
    return "";
  }

  if (!isEmpty(value.color)) {
    return value.color;
  }

  return "";
}

class ColorPicker extends Component {
  constructor() {
    super();
    this.state = {
      value: {
        ...colorSchema.default,
      },
    };

    // Binding Functions
    this.getConfig = this.getConfig.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getControl = this.getControl.bind(this);

    // default control config
    this.config = {
      colors: basicColorScheme, // if the control is ColorPalette
      type: "PopoverColorPicker",
    };
  }

  componentWillMount() {
    const { value } = this.props;

    if (isEmpty(value)) return;

    const inheritedValue = getInheritedValues(this.props);

    this.setState({
      value: inheritedValue,
    });
  }

  /**
   * Will handle all the change that will happen when the control value update
   * @param {string} newValue
   */

  handleChange(newValue) {
    const updatedValue = {
      color: newValue,
    };

    this.setState(
      {
        value: updatedValue,
      },
      () => this.props.onChange(updatedValue)
    );
  }

  /**
   * Will return the control configuration assigning props with default options
   */

  getConfig() {
    const { config } = this;

    const userConfig = pick(this.props, keys(config)); // user applied config
    const finalConfig = clone(config);

    // assigning user config with our default configuration
    assign(finalConfig, userConfig);

    return finalConfig;
  }

  /**
   * Will return the control for color picker based on user config
   * @return {function} control
   */

  getControl() {
    const {
      type = this.config.type,
      colors = this.config.colors,
    } = this.getConfig();
    const { label = "" } = this.props;
    // current value
    const { color } = this.state.value;

    switch (type) {
      case "ColorPalette":
        return (
          <ColorPalette
            colors={colors}
            value={color}
            onChange={(color) => {
              this.handleChange(color);
            }}
          />
        );
        break;
      case "ColorPicker":
        return (
          <WpColorPicker
            color={color}
            onChangeComplete={(value) => this.handleChange(rgba(value))}
          />
        );
      default:
        return (
          <PopoverColorPicker
            label={label}
            value={color}
            onChange={(newColor) => this.handleChange(newColor)}
          />
        );
    }
  }

  render() {
    const { type = this.config.type } = this.getConfig();
    const { label = "" } = this.props;
    const ColorPickerControl = this.getControl();

    return (
      <div className="ep-color-picker">
        <div>
          {!isEmpty(label) && type !== "PopoverColorPicker" && (
            <div className="ep-label" style={{ marginBottom: 10 }}>
              <span>{label}</span>
            </div>
          )}
          {ColorPickerControl}
        </div>
      </div>
    );
  }
}

export default ColorPicker;
