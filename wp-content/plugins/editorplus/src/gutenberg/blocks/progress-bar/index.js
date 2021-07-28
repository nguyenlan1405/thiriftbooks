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

const { RichText } = wp.blockEditor;
const { PanelBody, FormToggle, RangeControl } = wp.components;

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const CONTROLS_SCHEMA = {
  type: "object",
  default: {},
};

registerBlockType("ep/progress-bar", {
  title: __("Progress Bar"),
  icon: __(
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path fill="#000000" d="M0 5v6h16v-6h-16zM15 10h-14v-4h14v4z"></path>
      <path fill="#000000" d="M2 7h7v2h-7v-2z"></path>
    </svg>
  ),
  example: {},
  category: "ep-editorplus-blocks",
  description: __("Display customizable progress bars in your content."),
  keywords: [__("progress bar"), __("stats"), __("line")],
  attributes: {
    epStylingOptions: {
      type: "object",
      default: controls,
    },
    id: {
      type: "string",
      default: "",
    },
    title: {
      type: "string",
      default: "Add Title",
    },
    barTitle: {
      type: "string",
      default: "Web Designer",
    },
    percentage: {
      type: "number",
      default: 50,
    },
    displayTitle: {
      type: "boolean",
      default: true,
    },
    displayBarTitle: {
      type: "boolean",
      default: true,
    },
    displayPercentage: {
      type: "boolean",
      default: true,
    },
    titleTypography: CONTROLS_SCHEMA,
    barTextTypography: CONTROLS_SCHEMA,
    barBackground: CONTROLS_SCHEMA,
    barRadius: CONTROLS_SCHEMA,
    barShadow: CONTROLS_SCHEMA,
    barActiveBackground: CONTROLS_SCHEMA,
    barHeight: CONTROLS_SCHEMA,
  },
  edit: (props) => {
    const {
      className,
      displayPercentage,
      percentage,
      displayBarTitle,
      barTitle,
      title,
      displayTitle,
    } = props.attributes;
    const id = props.clientId;
    const wrapperClass = "ep_progress_bar_wrapper__" + id;

    props.setAttributes({
      id: wrapperClass,
    });

    return (
      <Fragment>
        <div className={`ep_pb_wrapper ${wrapperClass} ${className}`}>
          <div onClick={() => toggleSidebar(props.clientId, "title")}>
            {displayTitle === true ? (
              <RichText
                tag="span"
                className="ep_pb_title"
                value={title}
                onChange={(title) => props.setAttributes({ title })}
                placeholder={__("Add Title", TEXT_DOMAIN)}
              />
            ) : null}
          </div>
          <div
            class="ep_pb_wrap"
            onClick={() => toggleSidebar(props.clientId, "progressbar")}
          >
            <div class="ep_pb" style={{ width: percentage + "%" }}>
              <RichText
                tag="span"
                className="ep_pb_text"
                value={displayBarTitle === true ? barTitle : null}
                onChange={(barTitle) => props.setAttributes({ barTitle })}
                placeholder={__("Inner Text")}
              />
              <span class="ep_pb_percentage">
                {displayPercentage === true ? percentage + "%" : null}
              </span>
            </div>
          </div>
        </div>
        <RenderStyles wrapperClass={wrapperClass} clientId={props.clientId} />
        <InspectorControls clientId={props.clientId}>
          <PanelBody title="General">
            <RangeControl
              label="Percentage"
              value={percentage}
              onChange={(percentage) => props.setAttributes({ percentage })}
              min={0}
              max={100}
            />
            <div className="epb_toggle_inline">
              <p>Show Title</p>
              <FormToggle
                checked={displayTitle}
                onChange={() =>
                  props.setAttributes({ displayTitle: !displayTitle })
                }
              />
            </div>
            <div className="epb_toggle_inline">
              <p>Show Inner Text</p>
              <FormToggle
                checked={displayBarTitle}
                onChange={() =>
                  props.setAttributes({ displayBarTitle: !displayBarTitle })
                }
              />
            </div>
            <div className="epb_toggle_inline">
              <p>Show Percentage</p>
              <FormToggle
                checked={displayPercentage}
                onChange={() =>
                  props.setAttributes({ displayPercentage: !displayPercentage })
                }
              />
            </div>
          </PanelBody>

          <PanelBody title={__("Design", TEXT_DOMAIN)}>
            <SwitchSidebar label="Title" id="title">
              <StylingControls
                initialOpen={false}
                title={__("Typography", TEXT_DOMAIN)}
                group="titleTypography"
                options={controls.titleTypography}
              />
            </SwitchSidebar>

            <SwitchSidebar label="Progress Bar" id="progressbar">
              <StylingControls
                initialOpen={false}
                title={__("Typography", TEXT_DOMAIN)}
                group="barTextTypography"
                options={controls.barTextTypography}
              />

              <RenderMultiStyles
                title={__("Background", TEXT_DOMAIN)}
                initialOpen={false}
                groups={[
                  {
                    name: "Background",
                    options: controls.Background,
                  },
                  {
                    name: "activeBackground",
                    options: controls.activeBackground,
                  },
                ]}
              />

              <StylingControls
                initialOpen={false}
                title={__("Sizing", TEXT_DOMAIN)}
                group="sizing"
                options={controls.sizing}
              />

              <StylingControls
                initialOpen={false}
                title={__("Border", TEXT_DOMAIN)}
                group="border"
                options={controls.border}
              />

              <StylingControls
                initialOpen={false}
                title={__("Shadow", TEXT_DOMAIN)}
                group="shadow"
                options={controls.shadow}
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
      title,
      displayPercentage,
      percentage,
      displayBarTitle,
      barTitle,
      displayTitle,
    } = props.attributes;

    return (
      <Fragment>
        <div
          data-eppercentage={percentage}
          data-epdpercentage={displayPercentage}
          className={`progress_bar_wrapper ${id} ${className}`}
        >
          {displayTitle === true ? (
            <span
              className="ep_pb_title"
              dangerouslySetInnerHTML={{
                __html: displayTitle === true ? title : null,
              }}
            ></span>
          ) : null}
          <div class="ep_pb_wrap">
            <div class="ep_pb">
              <span
                className="ep_pb_text"
                dangerouslySetInnerHTML={{
                  __html: displayBarTitle === true ? barTitle : null,
                }}
              ></span>
              <span class="ep_pb_percentage">
                {displayPercentage === true ? percentage + "%" : null}
              </span>
            </div>
          </div>
        </div>
        <RenderSavedStyles {...props} />
      </Fragment>
    );
  },
});
