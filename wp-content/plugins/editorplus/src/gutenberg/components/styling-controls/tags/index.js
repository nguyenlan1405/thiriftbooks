const { Component } = wp.element;
const { get, isEmpty, isEqual } = lodash;
const { Icon } = wp.components;

class Tags extends Component {
  render() {
    const {
      label = "",
      initialValue,
      currentValue,
      labelClass = "",
    } = this.props;

    const shouldRenderTag = !isEqual(initialValue, currentValue);

    return shouldRenderTag ? (
      <div className={`ep-tag-root ${labelClass}`}>
        <div className="ep-tag" onClick={this.props.onClear}>
          {label} <Icon icon="no-alt" />
        </div>
      </div>
    ) : (
      <span className={labelClass}>{label}</span>
    );
  }
}

export default Tags;
