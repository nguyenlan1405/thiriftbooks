import { getInheritedValues } from "../../../../functions";
import { TEXT_DOMAIN } from "../../../../global/constants";
import MinimalButtonGroup from "../buttonGroup";

const { Component } = wp.element;
const {
  __experimentalRadio: Radio,
  __experimentalRadioGroup: RadioGroup,
  Icon,
} = wp.components;
const {
  map,
  get,
  isEmpty,
  isEqual,
  trim,
  has,
  pick,
  keys,
  clone,
  assign,
} = lodash;
const { __ } = wp.i18n;

export const buttonGroupSchema = {
  type: "object",
  default: "",
};

export const convertButtonGroup = (active) => {
  return !isEmpty(active) ? active : "";
};

class ButtonGroup extends Component {
  constructor() {
    super();
    this.state = {
      value: buttonGroupSchema.default,
    };
    this.handleChange = this.handleChange.bind(this);
    this.getConfig = this.getConfig.bind(this);

    // control config
    this.config = {
      layout: "inline",
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

  handleChange(newValue) {
    let updatedValue = newValue;
    const currentValue = get(this.state, "value");

    if (isEqual(currentValue, updatedValue)) {
      updatedValue = "";
    }

    this.setState(
      {
        value: updatedValue,
      },
      () => {
        this.props.onChange(updatedValue);
      }
    );
  }

  getConfig() {
    const { config } = this;

    const userConfig = pick(this.props, keys(config));

    const finalConfig = clone(config);

    assign(finalConfig, userConfig);

    return userConfig;
  }

  render() {
    const { label = "", options = [] } = this.props;
    const { value } = this.state;

    const defaultConfig = this.config;
    const { layout = defaultConfig.layout } = this.getConfig();

    const buttonGroupOptions = map(options, (option) => {
      const hasIcon = has(option, "icon");
      const hasCustomIcon = has(option, "customIcon");
      let icon = <Icon icon={get(option, "icon")} />;

      if (hasCustomIcon) {
        icon = (
          <div
            dangerouslySetInnerHTML={{ __html: get(option, "customIcon") }}
          ></div>
        );
      }

      return {
        label: hasIcon || hasCustomIcon ? __(icon) : get(option, "label"),
        value: get(option, "value"),
      };
    });

    return (
      <div
        className={`ep-button-group-component cwp-opt ${
          layout === "inline" ? "ep-flexed" : ""
        }`}
      >
        {!isEmpty(trim(label)) && (
          <span
            style={{ marginBottom: layout === "inline" ? 0 : 10 }}
            className="ep-button-group-component-label ep-flex-1"
          >
            {label}
          </span>
        )}
        <div className="ep-flex-2">
          <MinimalButtonGroup
            multiple={false}
            uniqueValue={[]}
            value={value}
            options={buttonGroupOptions}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default ButtonGroup;
