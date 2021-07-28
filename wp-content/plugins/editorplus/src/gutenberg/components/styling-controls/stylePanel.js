import { TEXT_DOMAIN } from "../../../global/constants";
import { buildActiveContext } from "../../../functions";

import Icon from "../icon";

const { __ } = wp.i18n;
const { PanelBody, Tooltip } = wp.components;
const { get, omit, isEmpty, includes } = lodash;

export const StylePanelTitle = (props) => {
  const title = get(props, "title"),
    responsiveValue = get(props, "responsiveValue"),
    hoverValue = get(props, "hoverValue"),
    hasExtraSupports = get(props, "hasExtraSupports");

  const panel_title = __(title, TEXT_DOMAIN);

  return hasExtraSupports === false ? (
    panel_title
  ) : (
    <div className="ep-style-panel">
      <span>{panel_title}</span>
      <div className="controls">
        <Tooltip text={__("Toggle Responsive Controls", TEXT_DOMAIN)}>
          <button
            className={buildActiveContext(
              responsiveValue,
              true,
              "ep-style-button ep-active",
              "ep-style-button"
            )}
            onClick={props.onResponsive}
          >
            <Icon icon="mobile" width={12} />
          </button>
        </Tooltip>
        <Tooltip text={__("Toggle Hover Controls", TEXT_DOMAIN)}>
          <button
            className={buildActiveContext(
              hoverValue,
              true,
              "ep-style-button ep-active",
              "ep-style-button"
            )}
            onClick={props.onHover}
          >
            <Icon icon="cursor" width={12} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export function StyledPanel(props) {
  const children = get(props, "children"),
    title = get(props, "title"),
    set = get(props, "set"),
    attr = get(props, "attr"),
    attrs = get(props, "attrs"),
    supportedBlocks = get(props, "supportedBlocks"),
    currentBlock = get(props, "currentBlock"),
    hasExtraSupports = get(props, "hasExtraSupports");

  const panelProperties = omit(props, ["children", "title"]); //? otherwise ;)

  const responsiveAttr = `${attr}ResponsiveEnabled`;
  const hoverAttr = `${attr}HoverEnabled`;

  const has_conditions = !isEmpty(supportedBlocks) && !isEmpty(currentBlock);
  const condition_satisfied = includes(supportedBlocks, currentBlock);

  const panel = (
    <PanelBody
      {...panelProperties}
      title={__(
        <StylePanelTitle
          responsiveValue={get(attrs, responsiveAttr)}
          hoverValue={get(attrs, hoverAttr)}
          hasExtraSupports={hasExtraSupports}
          title={title}
          onResponsive={(e) => {
            e.stopPropagation();
            set({ [responsiveAttr]: !get(attrs, responsiveAttr) });
          }}
          onHover={(e) => {
            e.stopPropagation();
            set({ [hoverAttr]: !get(attrs, hoverAttr) });
          }}
        />,
        TEXT_DOMAIN
      )}
    >
      {children}
    </PanelBody>
  );

  if (has_conditions && condition_satisfied) {
    return panel;
  } else if (has_conditions && !condition_satisfied) {
    return null;
  } else if (!has_conditions) {
    return panel;
  }
}
