import { TEXT_DOMAIN } from "../../../global/constants";

const { Component } = wp.element;
const { Button } = wp.components;
const {
  map,
  get,
  isEqual,
  has,
  set,
  clone,
  includes,
  pull,
  filter,
  isEmpty,
} = window.lodash;
const { __ } = wp.i18n;

class MinimalButtonGroup extends Component {
  constructor() {
    super();
    this.state = {
      value: null,
    };
    this.handleSingleChange = this.handleSingleChange.bind(this);
    this.handleMultipleChange = this.handleMultipleChange.bind(this);
  }

  handleSingleChange(value) {
    const { canBeEmptied = true } = this.props;

    if (!isEqual(value, this.state.value)) {
      this.setState({ value }, () => this.props.onChange(value));
    } else if (canBeEmptied && isEqual(value, this.state.value)) {
      this.setState({ value: null }, () => this.props.onChange(null));
    }
  }

  handleMultipleChange(value) {
    let newValue = clone(this.state.value);
    const hasValue = includes(newValue, value);
    const uniqueValues = get(this.props, "uniqueValue");
    const [uniqueGroup = null] = filter(uniqueValues, (group) =>
      includes(group, value)
    );

    if (!isEmpty(uniqueGroup) && includes(uniqueGroup, value)) {
      //! This value must be unique
      const valuesToRemove = pull(uniqueGroup, value);
      newValue = pull(newValue, ...valuesToRemove);
    }

    if (hasValue) {
      newValue = newValue.filter((v) => !isEqual(v, value));
    } else {
      newValue.push(value);
    }

    this.setState({ value: newValue }, () => this.props.onChange(newValue));
  }

  componentWillMount() {
    this.setState({ value: this.props.value });
  }

  render() {
    const {
      options,
      label,
      btnStyles = {},
      flexWrap = false,
      style = {},
    } = this.props;
    const { value } = this.state;
    const isMultiple = get(this.props, "multiple");
    const isSmall = has(this.props, "isSmall");

    return (
      <div className="ep-btn-grp" style={style}>
        {!isEmpty(label) && <h3>{__(label, TEXT_DOMAIN)}</h3>}

        <div
          className="ep-options"
          style={{ flexWrap: flexWrap ? "wrap" : "nowrap" }}
        >
          {map(options, (option, idx) => {
            const label = get(option, "label");
            const optionValue = get(option, "value");
            const isActive = !isMultiple
              ? isEqual(value, optionValue)
              : includes(value, optionValue);
            const btnProps = isActive ? { className: "ep-active-btn" } : {};
            const layoutProps = isSmall ? { isSmall: true } : {};
            const help = get(option, "help");

            return (
              <Button
                style={btnStyles}
                showTooltip={!isEmpty(help)}
                label={help}
                key={idx}
                {...btnProps}
                {...layoutProps}
                onClick={() =>
                  isMultiple
                    ? this.handleMultipleChange(optionValue)
                    : this.handleSingleChange(optionValue)
                }
              >
                {label}
              </Button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default MinimalButtonGroup;
