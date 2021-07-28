import buttonControls from "./option.json";
import { editorPlusData } from "../../../extend/index";
import { TEXT_DOMAIN } from "../../../../global/constants";
import { hasClass, addClass, removeClass } from "../../../../functions";

const { InspectorControls } = wp.blockEditor;
const { RenderMultiStyles, RenderStyles } = editorPlusData.components;
const { FormToggle, PanelRow } = wp.components;
const { __ } = wp.i18n;
const { Fragment } = wp.element;

const CONTROLS_SCHEMA = {
  type: "object",
  default: {},
};

const ExtendedButton = {
  name: "core/button",
  attributes: {
    epStylingOptions: {
      type: "object",
      default: {
        ...buttonControls,
      },
    },
    epCustomButtonsAlignment: CONTROLS_SCHEMA,
    epCustomConnectorIcon: CONTROLS_SCHEMA,
    epCustomBeforeIconSpace: CONTROLS_SCHEMA,
    epCustomAfterIconSpace: CONTROLS_SCHEMA,
    epCustomButtonIconBefore: CONTROLS_SCHEMA,
    epCustomButtonIconAfter: CONTROLS_SCHEMA,
    epCustomIconBackground: CONTROLS_SCHEMA,
    epCustomIconColor: CONTROLS_SCHEMA,
    epCustomIconSize: CONTROLS_SCHEMA,
    epCustomIconRadius: CONTROLS_SCHEMA,
    epCustomIconPadding: CONTROLS_SCHEMA,
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
            title={__("+ Button", TEXT_DOMAIN)}
            initialOpen={false}
            saveToMeta
            metaField="editor_plus_extended_blocks_css"
            wrapperClass={epGeneratedClass}
            IconClassToggle={() => (
              <PanelRow>
                <span>{__("Use Icon", TEXT_DOMAIN)}</span>
                <FormToggle
                  checked={hasClass("ep-custom-buttons-icon", className)}
                  onChange={() => {
                    if (hasClass("ep-custom-buttons-icon", className)) {
                      props.setAttributes({
                        className: removeClass(
                          "ep-custom-buttons-icon",
                          className
                        ),
                      });
                    } else {
                      props.setAttributes({
                        className: addClass(
                          "ep-custom-buttons-icon",
                          className
                        ),
                      });
                    }
                  }}
                />
              </PanelRow>
            )}
            groups={[
              {
                name: "buttonsAlignment",
                options: buttonControls.buttonsAlignment,
              },
              {
                name: "buttonIconBefore",
                options: buttonControls.buttonIconBefore,
              },
              {
                name: "buttonIconAfter",
                options: buttonControls.buttonIconAfter,
              },
              {
                name: "connectorIcon",
                options: buttonControls.connectorIcon,
              },
            ]}
          />
        </InspectorControls>
      </Fragment>
    );
  },
};

export default ExtendedButton;
