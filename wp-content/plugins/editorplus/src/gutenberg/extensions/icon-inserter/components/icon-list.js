import React, { Fragment } from "react";
import iconPacks from "../data.json";
import { TEXT_DOMAIN } from "../../../../global/constants";

const { map, get, isEqual, has } = lodash;
const { PanelBody } = wp.components;
const { __ } = wp.i18n;

function IconList(props) {
  const { settings } = props;

  return (
    <div className="cwp-icon-list">
      {map(iconPacks.labels, (data, index) => {
        const category = get(data, "category");
        const icons = get(data, "icons");

        const label = get(category, "label");
        const packSlug = get(category, "short");
        const isOpened = index === 0; // opening the first panel..

        return (
          <Fragment>
            <PanelBody title={__(label, TEXT_DOMAIN)} initialOpen={isOpened}>
              <div className="cwp-icon-list-wrapper">
                {map(icons, (icon) => {
                  const styling = {
                    color: settings.color,
                  };
                  const className = "eplusicon-".concat(icon);

                  const dataIcon = `${packSlug}:${icon}`;
                  const selectedIcon = {
                    data: dataIcon,
                    style: styling,
                    className,
                  };

                  const isActive = isEqual(dataIcon, props.activeIcon);

                  const activeStyling = isActive
                    ? {
                        style: {
                          backgroundColor: "#ccc",
                        },
                      }
                    : {};

                  return (
                    <div
                      onClick={() => props.onSelect(selectedIcon)}
                      className="cwp-icon-block"
                      {...activeStyling}
                    >
                      <span className={className} data-icon={dataIcon}></span>
                    </div>
                  );
                })}
              </div>
            </PanelBody>
          </Fragment>
        );
      })}
    </div>
  );
}

export default IconList;
