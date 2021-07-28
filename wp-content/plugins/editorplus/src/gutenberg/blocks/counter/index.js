import { Fragment } from "react";
import { TEXT_DOMAIN } from "../../../global/constants";

import controls from "./style-controls/controls.json";

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
const { PanelBody, TextControl, RangeControl } = wp.components;

const CONTROLS_SCHEMA = {
  type: "object",
  default: {},
};

registerBlockType("ep/counter", {
  title: __("Counter"),
  icon: "backup",
  example: {},
  category: "ep-editorplus-blocks",
  keywords: [__("counter"), __("editor plus"), __("number"), __("stats")],
  description: __("Display facts & stats nicely with counter block."),
  attributes: {
    epStylingOptions: {
      type: "object",
      default: controls,
    },
    id: {
      type: "string",
      default: "",
    },
    prefix: {
      type: "string",
      default: "",
    },
    startingNumber: {
      type: "number",
      default: 0,
    },
    endingNumber: {
      type: "number",
      default: 1000,
    },
    suffix: {
      type: "string",
      default: "",
    },
    title: {
      type: "string",
      default: "Title",
    },
    animationDuration: {
      type: "number",
      default: 4,
    },
    counterTypography: CONTROLS_SCHEMA,
    titleTypography: CONTROLS_SCHEMA,
    alignment: CONTROLS_SCHEMA,
  },
  edit: (props) => {
    const {
      className,
      prefix,
      startingNumber,
      endingNumber,
      suffix,
      title,
      animationDuration,
    } = props.attributes;
    const id = props.clientId;
    const wrapperClass = "ep_counter_wrapper__" + id;

    props.setAttributes({
      id: wrapperClass,
    });

    return (
      <Fragment>
        <div className={`${wrapperClass} ${className}`}>
          <div className="ep_counter_wrapper">
            <div
              className="ep_counter"
              onClick={() => toggleSidebar(props.clientId, "digit")}
            >
              <RichText
                tag="span"
                className="ep_counter_prefix"
                value={prefix}
                onChange={(prefix) => props.setAttributes({ prefix })}
                // placeholder={__("prefix", TEXT_DOMAIN)}
              />

              <span className="ep_counter_number">{endingNumber}</span>

              <RichText
                tag="span"
                className="ep_counter_suffix"
                value={suffix}
                onChange={(suffix) => props.setAttributes({ suffix })}
                // placeholder={__("suffix", TEXT_DOMAIN)}
              />
            </div>

            <div onClick={() => toggleSidebar(props.clientId, "title")}>
              <RichText
                tag="div"
                className="ep_counter_title"
                value={title}
                onChange={(title) => props.setAttributes({ title })}
                // placeholder={__("Add title...", TEXT_DOMAIN)}
              />
            </div>
          </div>
        </div>
        <RenderStyles wrapperClass={wrapperClass} clientId={props.clientId} />
        <InspectorControls clientId={props.clientId}>
          <PanelBody title={__("General", TEXT_DOMAIN)}>
            <TextControl
              label={__("Starting Number", TEXT_DOMAIN)}
              type="number"
              help={__("Set Counter starting number.", TEXT_DOMAIN)}
              value={startingNumber}
              type="number"
              onChange={(startingNumber) =>
                props.setAttributes({ startingNumber: Number(startingNumber) })
              }
            />
            <TextControl
              label={__("Ending Number", TEXT_DOMAIN)}
              help={__("Set Counter ending number.", TEXT_DOMAIN)}
              type="number"
              value={endingNumber}
              onChange={(endingNumber) =>
                props.setAttributes({ endingNumber: Number(endingNumber) })
              }
            />
            <TextControl
              label={__("Prefix", TEXT_DOMAIN)}
              value={prefix}
              placeholder={__("Enter prefix...")}
              onChange={(prefix) => props.setAttributes({ prefix })}
            />
            <TextControl
              label={__("Suffix", TEXT_DOMAIN)}
              value={suffix}
              placeholder={__("Enter suffix...")}
              onChange={(suffix) => props.setAttributes({ suffix })}
            />
            <RangeControl
              label={__("Animation Duration (seconds)", TEXT_DOMAIN)}
              value={animationDuration}
              onChange={(animationDuration) =>
                props.setAttributes({ animationDuration })
              }
              beforeIcon="controls-play"
              step={1}
              min={1}
              max={10}
            />
          </PanelBody>

          <PanelBody title={__("Design", TEXT_DOMAIN)}>
            <SwitchSidebar label={__("Counter", TEXT_DOMAIN)} id="digit">
              <StylingControls
                initialOpen={false}
                title={__("Typography", TEXT_DOMAIN)}
                group="counterTypography"
                options={controls.counterTypography}
              />
            </SwitchSidebar>

            <SwitchSidebar label={__("Title", TEXT_DOMAIN)} id="title">
              <StylingControls
                initialOpen={false}
                title={__("Typography", TEXT_DOMAIN)}
                group="titleTypography"
                options={controls.titleTypography}
              />
            </SwitchSidebar>

            <SwitchSidebar label={__("Block", TEXT_DOMAIN)} id="block">
              <StylingControls
                initialOpen={false}
                title={__("Extras", TEXT_DOMAIN)}
                group="counterAlignment"
                options={controls.counterAlignment}
              />
            </SwitchSidebar>
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  },

  save: (props) => {
    const {
      className,
      id,
      prefix,
      startingNumber,
      endingNumber,
      suffix,
      title,
      animationDuration,
    } = props.attributes;

    return (
      <Fragment>
        <div
          className={`epc_num ${id} ${className}`}
          data-startnum={startingNumber}
          data-endnum={endingNumber}
          data-animduration={animationDuration}
        >
          <div className="ep_counter_wrapper">
            <div className="ep_counter">
              {prefix.trim() !== "" ? (
                <span className="ep_counter_prefix">{prefix}</span>
              ) : (
                ""
              )}
              <span className="ep_counter_number">{endingNumber}</span>
              {suffix.trim() !== "" ? (
                <span className="ep_counter_suffix">{suffix}</span>
              ) : (
                ""
              )}
            </div>
            <div
              className="ep_counter_title"
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            ></div>
          </div>
        </div>
        <RenderSavedStyles {...props} />
      </Fragment>
    );
  },
});
