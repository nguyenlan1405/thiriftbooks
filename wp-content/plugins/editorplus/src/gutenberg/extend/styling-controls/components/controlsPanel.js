import React from "react";
import Icon from "../../../components/icon";
import { buildActiveContext } from "../../../../functions";
import { TEXT_DOMAIN } from "../../../../global/constants";

const { PanelBody, Tooltip } = wp.components;
const { get, omit, has, each } = lodash;
const { __ } = wp.i18n;

function ControlsPanel(props) {
  const {
    setAttributes,
    attributes,
    isResponsive = true,
    isHover = true,
    group,
  } = props;

  const isMultiple = has(props, "isMultiple");

  const getResponsiveEnabledKey = (group) => `${group}ResponsiveEnabled`;
  const getHoverEnabledKey = (group) => `${group}HoverEnabled`;

  const ResponsiveEnabledKey = `${group}ResponsiveEnabled`;
  const HoverEnabledKey = `${group}HoverEnabled`;

  const responsiveValue = get(
      attributes,
      `epStylingOptions.${ResponsiveEnabledKey}`
    ),
    hoverValue = get(attributes, `epStylingOptions.${HoverEnabledKey}`);

  const multiResponsiveValue = () => {
    let resValue = false;

    each(group, (group) => {
      const { name } = group;

      const currentGroupResponsiveEnabledKey = getResponsiveEnabledKey(name);

      const currentResponsiveGroupValue = get(
        attributes,
        `epStylingOptions.${currentGroupResponsiveEnabledKey}`
      );

      if (currentResponsiveGroupValue === true) {
        resValue = true;
      }
    });

    return resValue;
  };

  const multiHoverValue = () => {
    let resValue = false;

    each(group, (group) => {
      const { name } = group;

      const currentGroupHoverEnabledKey = getHoverEnabledKey(name);

      const currentHoverGroupValue = get(
        attributes,
        `epStylingOptions.${currentGroupHoverEnabledKey}`
      );

      if (currentHoverGroupValue === true) {
        resValue = true;
      }
    });

    return resValue;
  };

  const onResponsive = (e) => {
    e.stopPropagation();

    if (!isMultiple) {
      setAttributes({
        epStylingOptions: {
          ...get(attributes, "epStylingOptions"),
          [ResponsiveEnabledKey]: !responsiveValue,
        },
      });
    } else {
      const attrsToUpdate = {};

      each(group, (group) => {
        const { name } = group;
        const currentGroupResponsiveEnabledKey = getResponsiveEnabledKey(name);

        attrsToUpdate[
          currentGroupResponsiveEnabledKey
        ] = !multiResponsiveValue();
      });

      setAttributes({
        epStylingOptions: {
          ...get(attributes, "epStylingOptions"),
          ...attrsToUpdate,
        },
      });
    }
  };

  const onHover = (e) => {
    e.stopPropagation();
    if (!isMultiple) {
      setAttributes({
        epStylingOptions: {
          ...get(attributes, "epStylingOptions"),
          [HoverEnabledKey]: !hoverValue,
        },
      });
    } else {
      const attrsToUpdate = {};

      each(group, (group) => {
        const { name } = group;
        const currentGroupHoveEnabledKey = getHoverEnabledKey(name);

        attrsToUpdate[currentGroupHoveEnabledKey] = !multiHoverValue();
      });

      setAttributes({
        epStylingOptions: {
          ...get(attributes, "epStylingOptions"),
          ...attrsToUpdate,
        },
      });
    }
  };

  const title = (
    <div className="ep-style-panel">
      <span>{props.title}</span>
      <div className="controls">
        {isResponsive && (
          <Tooltip text={__("Toggle Responsive Controls", TEXT_DOMAIN)}>
            <button
              className={buildActiveContext(
                isMultiple ? multiResponsiveValue() : responsiveValue,
                true,
                "ep-style-button ep-active",
                "ep-style-button"
              )}
              onClick={onResponsive}
            >
              <Icon icon="mobile" width={12} />
            </button>
          </Tooltip>
        )}
        {isHover && (
          <Tooltip text={__("Toggle Hover Controls")}>
            <button
              className={buildActiveContext(
                isMultiple ? multiHoverValue() : hoverValue,
                true,
                "ep-style-button ep-active",
                "ep-style-button"
              )}
              onClick={onHover}
            >
              <Icon icon="cursor" width={12} />
            </button>
          </Tooltip>
        )}
      </div>
    </div>
  );

  return (
    <PanelBody title={title} {...omit(props, ["title", "group", "options"])}>
      {props.children}
    </PanelBody>
  );
}

export default ControlsPanel;
