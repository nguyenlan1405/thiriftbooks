import { Fragment } from "react";
import { TEXT_DOMAIN } from "../../../global/constants";
import controls from "./style-controls/controls.json";
import IconPicker from "../../components/icon-picker/index";
import Icon from "../../components/icon";

const {
  StylingControls,
  RenderStyles,
  RenderSavedStyles,
  RenderMultiStyles,
  InspectorControls,
  SwitchSidebar,
} = editorPlus.components;

const { toggleSidebar } = editorPlus.actions;

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.blockEditor;
const { PanelBody } = wp.components;

const CONTROLS_SCHEMA = {
  type: "object",
  default: {},
};

registerBlockType("ep/icon", {
  title: __("Icon"),
  icon: __(<Icon icon="heart" />),
  description: __("Pick & display a customizable icon in your content."),
  category: "ep-editorplus-blocks",
  keywords: [
    __("icon"),
    __("font awesome"),
    __("icon moon"),
    __("media"),
    __("image"),
  ],
  attributes: {
    epStylingOptions: {
      type: "object",
      default: controls,
    },
    id: {
      type: "string",
      default: "",
    },
    icon: {
      type: "string",
      default: "eplusicon-heart1",
    },
    iconBackground: CONTROLS_SCHEMA,
    iconBorder: CONTROLS_SCHEMA,
    iconRadius: CONTROLS_SCHEMA,
    iconSize: CONTROLS_SCHEMA,
    iconPadding: CONTROLS_SCHEMA,
    iconMargin: CONTROLS_SCHEMA,
    iconAlignment: CONTROLS_SCHEMA,
    iconColor: CONTROLS_SCHEMA,
  },

  edit: (props) => {
    const { className, icon } = props.attributes;
    const id = props.clientId;
    const wrapperClass = "ep_icon__" + id;

    props.setAttributes({
      id: wrapperClass,
    });

    return (
      <Fragment>
        <div className={`${wrapperClass} ${className}`}>
          <div className="ep_icon_wrapper">
            <span className={icon}></span>
          </div>
        </div>
        <RenderStyles wrapperClass={wrapperClass} clientId={props.clientId} />
        <InspectorControls clientId={props.clientId}>
          <PanelBody title={__("General", TEXT_DOMAIN)}>
            <IconPicker
              allowReset={false}
              value={icon}
              label={__("Icon", TEXT_DOMAIN)}
              onChange={(newIcon) => props.setAttributes({ icon: newIcon })}
            />
          </PanelBody>

          <PanelBody title={__("Design", TEXT_DOMAIN)}>
            <SwitchSidebar label={__("Icon Styling", TEXT_DOMAIN)} id="icon">
              {
                <StylingControls
                  initialOpen={false}
                  title="Colors"
                  group="iconColor"
                  options={controls.iconColor}
                />
              }
              <RenderMultiStyles
                title={__("Background", TEXT_DOMAIN)}
                initialOpen={false}
                groups={[
                  {
                    name: "iconBackground",
                    options: controls.iconBackground,
                  },
                ]}
              />
              <RenderMultiStyles
                title={__("Border", TEXT_DOMAIN)}
                initialOpen={false}
                groups={[
                  {
                    name: "iconBorder",
                    options: controls.iconBorder,
                  },
                  {
                    name: "iconRadius",
                    options: controls.iconRadius,
                  },
                ]}
              />
              {
                <StylingControls
                  initialOpen={false}
                  title="Sizing"
                  group="iconSize"
                  options={controls.iconSize}
                />
              }
              <RenderMultiStyles
                title={__("Spacing", TEXT_DOMAIN)}
                initialOpen={false}
                groups={[
                  {
                    name: "iconMargin",
                    options: controls.iconMargin,
                  },
                  {
                    name: "iconPadding",
                    options: controls.iconPadding,
                  },
                ]}
              />
              {
                <StylingControls
                  initialOpen={false}
                  title="Extras"
                  group="iconAlignment"
                  options={controls.iconAlignment}
                />
              }
            </SwitchSidebar>
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  },

  save: (props) => {
    const { className, id, icon } = props.attributes;

    return (
      <Fragment>
        <div className={`${id} ${className}`}>
          <div className="ep_icon_wrapper">
            <span className={icon}></span>
          </div>
        </div>
        <RenderSavedStyles {...props} />
      </Fragment>
    );
  },
});
