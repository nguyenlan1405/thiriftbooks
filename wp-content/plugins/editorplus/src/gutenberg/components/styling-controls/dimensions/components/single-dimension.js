import { TEXT_DOMAIN } from "../../../../../global/constants";
import ImportantButton from "../../important-button";

const { Component } = wp.element;
const {
  __experimentalUnitControl: UnitControl,
  CheckboxControl,
  Disabled,
} = wp.components;
const { get, isEqual, toLower } = lodash;
const { __ } = wp.i18n;

/**
 * Single row for dimensions picker i.e single dimension
 */

class SingleDimension extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.getControl = this.getControl.bind(this);
  }

  componentWillMount() {
    this.setState({ value: this.props.value });
  }

  handleChange(newDimension) {
    let dimensionWithoutUnit = "";

    const matchedNumbers = newDimension.match(/[-]{0,1}[\d]*[.]{0,1}[\d]+/g);

    if (get(matchedNumbers, "length") >= 1) {
      dimensionWithoutUnit = get(matchedNumbers, 0);
    }

    if (toLower(newDimension) === "auto") {
      dimensionWithoutUnit = "auto";
    }

    this.setState({ value: dimensionWithoutUnit }, () =>
      this.props.onChange(dimensionWithoutUnit)
    );
  }

  getControl(convertedValue, isValueAuto) {
    let control = (
      <UnitControl
        value={convertedValue}
        onChange={this.handleChange}
        onUnitChange={this.props.onUnitChange}
        min={-1000}
      />
    );

    return isValueAuto ? (
      <Disabled style={{ cursor: "no-drop" }}>{control}</Disabled>
    ) : (
      control
    );
  }

  render() {
    const {
      positionLabel,
      currentUnit,
      disableAuto = false,
      important,
      onImportant,
      isDimensionValueUpdated,
    } = this.props;
    const { value } = this.state;

    const convertedValue = value + currentUnit;
    const isValueAuto = isEqual(toLower(value), "auto");

    return (
      <div
        className={`ep-dimension ${
          isValueAuto ? "ep-dimension-auto" : ""
        } cwp-opt ep-flexed ep-space-between`}
      >
        <div className="ep-flexed ep-flex-1">
          {!disableAuto && (
            <CheckboxControl
              className="ep-checkbox-control"
              checked={isValueAuto}
              onChange={() => this.handleChange(isValueAuto ? "" : "auto")}
            />
          )}
          <span className="ep-flex-1">{positionLabel}</span>
        </div>
        <div
          className="ep-flex-2 ep-flexed ep-unit-root ep-flex-end"
          style={{ gap: 10 }}
        >
          <div className="ep-unit-control">
            {this.getControl(convertedValue, isValueAuto)}
          </div>
          {isDimensionValueUpdated && (
            <ImportantButton value={important} onImportant={onImportant} />
          )}
        </div>
      </div>
    );
  }
}

export default SingleDimension;
