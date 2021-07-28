import { basicColorScheme, rgba } from "../../../../../functions/index";
import { TEXT_DOMAIN } from "../../../../../global/constants";

const { Component } = wp.element;
const { isEmpty, get, isObject } = lodash;
const { __ } = wp.i18n;
const { Popover, ColorPalette, ColorPicker } = wp.components;

class PopoverColorPicker extends Component {
  constructor() {
    super();
    this.state = {
      isSelecting: false,
      value: "",
      refreshColorPicker: false,
    };
    this.getConfig = this.getConfig.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.config = {};
  }

  /**
   * Will provide control configuration with assigning some default values
   * @return {object} configuration
   */

  getConfig() {
    return;
  }

  componentWillMount() {
    this.setState({ value: this.props.value });
  }

  componentWillReceiveProps({ value }) {
    this.setState({ ...this.state, value });
  }

  handleChange(updatedValue, source) {
    // if the source is color palette then colorPicker needs to be refreshed

    const newState = { value: updatedValue };

    if (source === "colorPalette") {
      newState["refreshColorPicker"] = !this.state.refreshColorPicker;
    }

    this.setState(newState, () => {
      this.props.onChange(updatedValue);
    });
  }

  render() {
    const { label = "", customLabel = false, afterElement = null } = this.props;
    const { isSelecting, value, refreshColorPicker } = this.state;
    const hasLabel = !isEmpty(label);

    return (
      <div
        className={`ep__popover_color_picker ${
          hasLabel ? "ep__with_label" : ""
        }`}
      >
        {hasLabel && !customLabel && <span>{__(label, TEXT_DOMAIN)}</span>}
        {hasLabel && customLabel && label}
        <div className="ep-flexed">
          <div
            style={{ margin: 0 }}
            className="components-circular-option-picker__option-wrapper"
          >
            <button
              onClick={() => this.setState({ isSelecting: !isSelecting })}
              type="button"
              aria-pressed="false"
              aria-label="Color: Very dark gray"
              className="components-button components-circular-option-picker__option"
              style={{
                backgroundColor: value ?? "rgb(49, 49, 49)",
                color: value ?? "rgb(49, 49, 49)",
              }}
            >
              {isSelecting && (
                <Popover
                  onClick={(e) => e.stopPropagation()}
                  className="ep__popover_color_picker__popover"
                  onFocusOutside={() => this.setState({ isSelecting: false })}
                >
                  <div className="ep__popover_color_picker__root">
                    <ColorPalette
                      colors={basicColorScheme}
                      value={value}
                      onChange={(color) =>
                        this.handleChange(color, "colorPalette")
                      }
                      disableCustomColors
                      clearable={false}
                    />
                    <ColorPicker
                      key={refreshColorPicker}
                      color={value}
                      onChangeComplete={(value) =>
                        this.handleChange(rgba(value), "colorPicker")
                      }
                    />
                  </div>
                </Popover>
              )}
            </button>
          </div>
          {!isEmpty(afterElement) && isObject(afterElement) && afterElement}
        </div>
      </div>
    );
  }
}

export default PopoverColorPicker;
