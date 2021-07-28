import { TEXT_DOMAIN } from "../../../../../global/constants";
import { basicColorScheme } from "../../../../../functions";
import PopoverColorPicker from "../../color-picker/components/popover-color-picker";
import Tags from "../../tags";

const { Component } = wp.element;
const { SelectControl } = wp.components;
const { clone, set } = lodash;
const { __ } = wp.i18n;

class TextDecorationControl extends Component {
  constructor() {
    super();
    this.state = {
      value: {
        style: "",
        color: "",
      },
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(type, value) {
    const newValue = clone(this.state.value);
    set(newValue, type, value);

    this.setState({ value: newValue }, () => this.props.onChange(newValue));
  }

  componentWillMount() {
    const { value } = this.props;
    this.setState({ value });
  }

  render() {
    const { style, color } = this.state.value;
    const { property } = this.props;

    const supportedStyles = [
      {
        label: "Solid",
        value: "solid",
      },
      {
        label: "Double",
        value: "double",
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
        label: "Wavy",
        value: "wavy",
      },
    ];

    return (
      <div className="ep-text_decoration-control">
        <div className="cwp-opt ep-flexed ep-space-between" style={{ gap: 35 }}>
          {/* <span> {__(`${property} Style`, TEXT_DOMAIN)}</span> */}
          <Tags
            label={__(`${property} Style`, TEXT_DOMAIN)}
            initialValue={""}
            currentValue={style}
            onClear={() => this.handleChange("style", "")}
          />
          <SelectControl
            className="ep-flex-3 cwp-opt-select-control"
            value={style}
            options={supportedStyles}
            onChange={(newStyle) => this.handleChange("style", newStyle)}
          />
        </div>

        <div className="cwp-opt ep-flex-1" style={{ textAlign: "right" }}>
          <PopoverColorPicker
            customLabel={true}
            label={
              <Tags
                label={__(`${property} Color`, TEXT_DOMAIN)}
                currentValue={""}
                initialValue={color}
                onClear={() => this.handleChange("color", "")}
              />
            }
            value={color}
            onChange={(newColor) => this.handleChange("color", newColor)}
          />
        </div>
      </div>
    );
  }
}

export default TextDecorationControl;
