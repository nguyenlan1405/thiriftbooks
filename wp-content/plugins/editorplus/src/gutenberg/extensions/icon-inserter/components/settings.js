import React from "react";
import { basicColorScheme } from "../../../../functions/index";
import { TEXT_DOMAIN } from "../../../../global/constants";

const { __ } = wp.i18n;
const { ColorPalette, FormToggle, PanelRow, RangeControl } = wp.components;

function Settings(props) {
  const {
    color,
    iconBackground,
    iconBackgroundColor,
    iconBorder,
    iconBorderColor,
    iconBorderRadius,
  } = props.value;

  return (
    <div className="cwp-icon-settings">
      <div>
        <h3>{__("Color", TEXT_DOMAIN)}</h3>
        <ColorPalette
          colors={basicColorScheme}
          value={color}
          onChange={(color) => props.onChange({ ...props.value, color })}
        />
      </div>
      <div>
        <PanelRow>
          <h3>{__("Background", TEXT_DOMAIN)}</h3>
          <FormToggle
            checked={iconBackground}
            onChange={() =>
              props.onChange({
                ...props.value,
                iconBackground: !iconBackground,
              })
            }
          />
        </PanelRow>
      </div>
      {iconBackground && (
        <div>
          <ColorPalette
            colors={basicColorScheme}
            value={iconBackgroundColor}
            onChange={(iconBackgroundColor) =>
              props.onChange({ ...props.value, iconBackgroundColor })
            }
          />
        </div>
      )}
      <div>
        <PanelRow>
          <h3>{__("Border", TEXT_DOMAIN)}</h3>
          <FormToggle
            checked={iconBorder}
            onChange={() =>
              props.onChange({ ...props.value, iconBorder: !iconBorder })
            }
          />
        </PanelRow>
      </div>
      {iconBorder && (
        <div>
          <ColorPalette
            colors={basicColorScheme}
            value={iconBorderColor}
            onChange={(iconBorderColor) =>
              props.onChange({ ...props.value, iconBorderColor })
            }
          />
          <RangeControl
            label={__("Border Radius", TEXT_DOMAIN)}
            value={iconBorderRadius}
            onChange={(iconBorderRadius) =>
              props.onChange({ ...props.value, iconBorderRadius })
            }
            min={0}
            max={200}
          />
        </div>
      )}
    </div>
  );
}

export default Settings;
