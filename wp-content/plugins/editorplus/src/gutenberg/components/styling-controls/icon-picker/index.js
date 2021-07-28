import CustomIconPicker from "../../icon-picker/index";
import glyphs from "../../../../gutenberg/extensions/icon-inserter/glyphs.json";
import { getInheritedValues } from "../../../../functions/index";
const { has, isEmpty, get } = lodash;

const { Component } = wp.element;

/***
 *  Will provide the selected icon glyph-code
 */

function getGlyphCode(name) {
  let currentGlyph = glyphs.find((glyph) => glyph.iconName === name);

  return !isEmpty(currentGlyph) ? currentGlyph.content : {};
}

export function convertIconToSchema(value) {
  return {
    icon: value,
  };
}

export function IconPickerConverter(value) {
  if (!has(value, "icon")) return;

  const { icon } = value;

  let code = getGlyphCode(icon);
  let cssCode = `"\\${code}"`;

  return {
    content: !isEmpty(code) ? cssCode : "",
  };
}

export const IconPickerSchema = {
  type: "object",
  default: {
    icon: "",
  },
};

class IconPicker extends Component {
  constructor() {
    super();
    this.state = {
      value: IconPickerSchema.default,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(newIcon) {
    this.setState({ value: newIcon }, () =>
      this.props.onChange({ icon: newIcon })
    );
  }

  componentWillMount() {
    const { value } = this.props;

    if (isEmpty(value)) return;

    const inheritedValue = getInheritedValues(this.props);

    this.setState({
      value: inheritedValue,
    });
  }

  render() {
    const { label } = this.props;
    const { value } = this.state;

    return (
      <div className="ep-icon-picker">
        <CustomIconPicker
          label={label}
          value={value.icon}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default IconPicker;
