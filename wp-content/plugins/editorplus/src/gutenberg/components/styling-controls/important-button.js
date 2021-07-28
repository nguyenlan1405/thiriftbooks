import { TEXT_DOMAIN } from "../../../global/constants";

const { Component } = wp.element;
const { __ } = wp.i18n;
const { Tooltip } = wp.components;

class ImportantButton extends Component {
  render() {
    const { value, onImportant } = this.props;

    return (
      <Tooltip text={__("Force Important!", TEXT_DOMAIN)}>
        <button
          className={`ep-important-btn ${value ? "ep-active" : ""}`}
          onClick={onImportant}
        >
          !
        </button>
      </Tooltip>
    );
  }
}

export default ImportantButton;
