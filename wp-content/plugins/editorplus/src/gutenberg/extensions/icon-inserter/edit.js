import React, { Fragment, Component } from "react";
import IconPicker from "./components/index";
import { TEXT_DOMAIN } from "../../../global/constants";
const { has, isEqual, isEmpty, get, clone } = lodash;
const { RichTextToolbarButton, RichTextShortcut } = wp.editor;
const { toggleFormat, insertObject } = wp.richText;
const { __ } = wp.i18n;
const { getRectangleFromRange } = wp.dom;
const { Popover } = wp.components;

const name = "ep/icon-insert";
let lastValue;

wp.domReady(() => {
  if (has(window, "editor_plus_tag")) {
    window.editor_plus_tag(); // updating the icons css
  }
});

class edit extends Component {
  constructor() {
    super();
    this.state = {
      anchorRange: null,
    };
    this.onToggle = this.onToggle.bind(this);
    this.anchorRect = this.anchorRect.bind(this);
    this.generateStyle = this.generateStyle.bind(this);
    this.getRange = this.getRange.bind(this);
    this.setRange = this.setRange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !isEqual(prevProps.value, this.props.value) ||
      !isEqual(prevProps.isObjectActive, this.props.isObjectActive) ||
      !isEqual(prevProps.isActive, this.props.isActive)
    ) {
      this.setState({
        anchorRange: this.getRange(),
      });
    }
  }

  getRange() {
    const selection = window.getSelection();
    return selection.rangeCount ? selection.getRangeAt(0) : null;
  }

  setRange() {
    this.setState({
      anchorRange: this.getRange(),
    });
  }

  onToggle() {
    const { onChange, value } = this.props;

    // Set up the anchorRange when the Popover is opened.
    const selection = window.getSelection();
    const caretPos = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

    this.setState({
      anchorRange: caretPos,
    });

    onChange(
      toggleFormat(value, {
        type: name,
      })
    );
  }

  componentDidMount() {
    this.setRange();
  }

  generateStyle(style) {
    let styles = "";

    if (has(style, "color") && !isEmpty(style.color)) {
      styles += `color:${style.color};`;
    }

    const hasBackground = has(style, "iconBackground") && style.iconBackground;
    const hasBorder = has(style, "iconBorder") && style.iconBorder;

    if (hasBackground || hasBorder) {
      styles += "padding:30px;";
    }

    if (
      has(style, "iconBackgroundColor") &&
      !isEmpty(style.iconBackgroundColor) &&
      hasBackground
    ) {
      styles += `background-color:${style.iconBackgroundColor};`;
    }

    if (hasBorder && !isEmpty(get(style, "iconBorderColor"))) {
      styles += `border:3px solid ${style.iconBorderColor};`;
    }

    if (has(style, "iconBorderRadius")) {
      styles += `border-radius:${style.iconBorderRadius}px;`;
    }

    return styles;
  }

  anchorRect() {
    const { anchorRange } = this.state;

    const rect = getRectangleFromRange(anchorRange);
    return rect;
  }

  render() {
    const {
      isActive,
      value,
      onChange,
      isObjectActive,
      activeObjectAttributes,
    } = this.props;

    if (isActive && !isObjectActive) {
      return (
        <Popover
          position="bottom center"
          focusOnMount="container"
          expandOnMobile={true}
          className="ep-icon-picker__component__popup"
          getAnchorRect={this.anchorRect}
          headerTitle={__("Insert Icon", TEXT_DOMAIN)}
          onClose={() => {
            onChange(toggleFormat(value, { type: name }));
          }}
        >
          <IconPicker
            onSelect={(icon) => {
              this.setRange();
              const newValue = clone(value);

              if (newValue.text.length === newValue.start) {
                newValue.text = newValue.text.concat(" ");
              }

              onChange(
                insertObject(newValue, {
                  type: name,
                  attributes: {
                    style: JSON.stringify(icon.style),
                    styling: this.generateStyle(icon.style),
                    class: has(icon, "className") ? icon.className : icon.class,
                  },
                })
              ); // insert object allow inserting registered format object
            }}
          />
        </Popover>
      );
    }

    if (isObjectActive && !isEmpty(activeObjectAttributes)) {
      return (
        <Popover
          position="bottom center"
          focusOnMount="container"
          expandOnMobile={true}
          className="ep-icon-picker__component__popup"
          getAnchorRect={this.anchorRect}
          headerTitle={__("Insert Icon", TEXT_DOMAIN)}
          onClose={() => {
            onChange(toggleFormat(value, { type: name }));
          }}
        >
          <IconPicker
            value={activeObjectAttributes}
            onSelect={(icon) => {
              const newReplacements = value.replacements.slice();

              newReplacements[value.start] = {
                type: name,
                attributes: {
                  style: JSON.stringify(icon.style),
                  styling: this.generateStyle(icon.style),
                  class: has(icon, "className") ? icon.className : icon.class,
                },
              };

              if (Math.floor(value.text.length - 1) === value.start) {
                value.text = value.text.concat(" ");
              }

              onChange({
                ...value,
                replacements: newReplacements,
              });

              event.preventDefault();
            }}
          />
        </Popover>
      );
    }

    return (
      <Fragment>
        <RichTextToolbarButton
          icon="star-filled"
          title={__("Icon", TEXT_DOMAIN)}
          onClick={this.onToggle}
          isActive={isActive}
          shortcutType="primary"
          shortcutCharacter="i"
        />
      </Fragment>
    );
  }
}

export default edit;
