import listControls from "./option.json";
import { editorPlusData } from "../../../extend/index";
import { TEXT_DOMAIN } from "../../../../global/constants";
import { hasClass, addClass, removeClass } from "../../../../functions";

const { InspectorControls } = wp.blockEditor;
const {
  RenderMultiStyles,
  RenderStyles,
  StylingControls,
} = editorPlusData.components;
const { FormToggle, PanelRow } = wp.components;
const { __ } = wp.i18n;
const { Fragment } = wp.element;

const CONTROLS_SCHEMA = {
  type: "object",
  default: {},
};

const ExtendedList = {
  name: "core/list",
  className: "ep-extended-list",
  attributes: {
    epStylingOptions: {
      type: "object",
      default: {
        ...listControls,
      },
    },
    columns: CONTROLS_SCHEMA,
    itemsSpacing: CONTROLS_SCHEMA,
    listStyle: CONTROLS_SCHEMA,
    unorderListStyle: CONTROLS_SCHEMA,
    orderListStyle: CONTROLS_SCHEMA,
    listIcon: CONTROLS_SCHEMA,
    icon: CONTROLS_SCHEMA,
    iconBackground: CONTROLS_SCHEMA,
    iconColor: CONTROLS_SCHEMA,
    iconSize: CONTROLS_SCHEMA,
    iconRadius: CONTROLS_SCHEMA,
    iconPadding: CONTROLS_SCHEMA,
  },
  Controls: (props) => {
    const { epGeneratedClass, className } = props.attributes;

    return (
      <Fragment>
        <props.BlockEdit {...props} />
        <RenderStyles
          wrapperClass={epGeneratedClass}
          clientId={props.clientId}
        />
        <InspectorControls>
          <RenderMultiStyles
            title={__("+ List", TEXT_DOMAIN)}
            initialOpen={false}
            saveToMeta
            metaField="editor_plus_extended_blocks_css"
            wrapperClass={epGeneratedClass}
            ToggleOptions={() => (
              <PanelRow>
                <span>{__("Use Custom List Styling", TEXT_DOMAIN)}</span>
                <FormToggle
                  checked={hasClass("ep-custom-list", className)}
                  onChange={() => {
                    if (hasClass("ep-custom-list", className)) {
                      props.setAttributes({
                        className: removeClass("ep-custom-list", className),
                      });
                    } else {
                      props.setAttributes({
                        className: addClass("ep-custom-list", className),
                      });
                    }
                  }}
                />
              </PanelRow>
            )}
            IconClassToggle={() => (
              <PanelRow>
                <span>{__("Use Icon", TEXT_DOMAIN)}</span>
                <FormToggle
                  checked={hasClass("ep-custom-icon-list", className)}
                  onChange={() => {
                    if (hasClass("ep-custom-icon-list", className)) {
                      props.setAttributes({
                        className: removeClass(
                          "ep-custom-icon-list",
                          className
                        ),
                      });
                    } else {
                      props.setAttributes({
                        className: addClass("ep-custom-icon-list", className),
                      });
                    }
                  }}
                />
              </PanelRow>
            )}
            groups={[
              {
                name: "columns",
                options: listControls.columns,
              },
              {
                name: "itemsSpacing",
                options: listControls.itemsSpacing,
              },
              {
                name: "listStyle",
                options: listControls.listStyle,
              },
              {
                name: "listIcon",
                options: listControls.listIcon,
              },
            ]}
          />

          {/* <StylingControls
            initialOpen={false}
            saveToMeta
            metaField="editor_plus_extended_blocks_css"
            title={__("+ List", TEXT_DOMAIN)}
            wrapperClass={epGeneratedClass}
            group="textStyles"
            options={listControls.textStyles}
          /> */}
        </InspectorControls>
      </Fragment>
    );
  },
};

export default ExtendedList;
