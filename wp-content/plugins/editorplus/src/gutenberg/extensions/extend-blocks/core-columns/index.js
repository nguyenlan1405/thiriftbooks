import columnsControls from "./option.json";
import { editorPlusData } from "../../../extend/index";
import { TEXT_DOMAIN } from "../../../../global/constants";
import { hasClass, addClass, removeClass } from "../../../../functions";
import VariationsPicker from "./components/variations-picker";

const { InspectorControls } = wp.blockEditor;
const { RenderMultiStyles, RenderStyles } = editorPlusData.components;
const { FormToggle, PanelRow } = wp.components;
const { __ } = wp.i18n;
const { Fragment } = wp.element;

const CONTROLS_SCHEMA = {
  type: "object",
  default: {},
};

const ExtendedColumns = {
  name: "core/columns",
  attributes: {
    epStylingOptions: {
      type: "object",
      default: {
        ...columnsControls,
      },
    },
    epCustomColumns: CONTROLS_SCHEMA,
    epCustomColumnsSpacing: CONTROLS_SCHEMA,
    epCustomColumnsReverse: CONTROLS_SCHEMA,
  },
  Controls: (props) => {
    const { clientId } = props;
    const { epGeneratedClass, className } = props.attributes;
    const currentPreviewType = wp.data
      .select("core/edit-post")
      .__experimentalGetPreviewDeviceType();

    return (
      <Fragment>
        <props.BlockEdit {...props} />
        <RenderStyles
          wrapperClass={epGeneratedClass}
          clientId={props.clientId}
        />
        <InspectorControls>
          <VariationsPicker {...props} clientId={clientId} />
          {currentPreviewType !== "Desktop" && (
            <style>
              {`.ep-custom-column {
                  flex-wrap: wrap !important;
                }
                
                .ep-custom-column .wp-block-column {
                  margin-left: 0 !important;
                  flex-grow: 0 !important;
                }`}
            </style>
          )}
          <RenderMultiStyles
            title={__("+ Columns", TEXT_DOMAIN)}
            initialOpen={false}
            saveToMeta
            metaField="editor_plus_extended_blocks_css"
            wrapperClass={epGeneratedClass}
            ColumnToggle={() => (
              <PanelRow>
                <span>{__("Custom Column Styling", TEXT_DOMAIN)}</span>
                <FormToggle
                  checked={hasClass("ep-custom-column", className)}
                  onChange={() => {
                    if (hasClass("ep-custom-column", className)) {
                      props.setAttributes({
                        className: removeClass("ep-custom-column", className),
                      });
                    } else {
                      props.setAttributes({
                        className: addClass("ep-custom-column", className),
                      });
                    }
                  }}
                />
              </PanelRow>
            )}
            groups={[
              {
                name: "epCustomColumns",
                options: columnsControls.epCustomColumns,
              },
              {
                name: "epCustomColumnsSpacing",
                options: columnsControls.epCustomColumnsSpacing,
              },
              {
                name: "epCustomColumnsReverse",
                options: columnsControls.epCustomColumnsReverse,
              },
            ]}
          />
        </InspectorControls>
      </Fragment>
    );
  },
};

export default ExtendedColumns;
