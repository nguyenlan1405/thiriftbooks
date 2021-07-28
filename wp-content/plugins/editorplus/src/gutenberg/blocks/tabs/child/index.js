import { Fragment } from "react";
import Icon from "../../../components/icon";
import { TEXT_DOMAIN } from "../../../../global/constants";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl } = wp.components;

// ------------------------ CHILD ------------------------------------//
registerBlockType("ep/tab-item", {
  title: __("Tab Item"),
  icon: "button",
  category: "common",
  keywords: ["tab"],
  attributes: {
    id: {
      type: "string",
      default: "",
    },
    label: {
      type: "string",
      default: "Tab Label",
    },
    subLabel: {
      type: "string",
      default: "Sub Label",
    },
    hide: {
      type: "boolean",
      default: true,
    },
  },
  parent: ["ep/tabs"],

  edit: (props) => {
    const { className, hide } = props.attributes;
    const id = props.clientId;
    const wrapperClass = "ep_tab_wrapper__" + id;

    props.setAttributes({
      id: wrapperClass,
    });

    return (
      <div style={{ display: hide ? "none" : "block" }}>
        <div
          id={wrapperClass}
          className={`ep_tab_item_wrapper ${wrapperClass} ${className}`}
        >
          <InnerBlocks
            templateLock={false}
            renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
          />
        </div>
        <InspectorControls>
          <PanelBody title="General">
            <TextControl
              value={props.attributes.label}
              onChange={(label) => props.setAttributes({ label })}
              placeholder="Enter Label..."
            />
            <TextControl
              value={props.attributes.subLabel}
              onChange={(subLabel) => props.setAttributes({ subLabel })}
              placeholder="Enter Sub Label..."
            />
          </PanelBody>
        </InspectorControls>
      </div>
    );
  },

  save: (props) => {
    const { className, id } = props.attributes;

    return (
      <Fragment>
        <div id={id} className={`ep_tab_item_wrapper ${id} ${className}`}>
          <InnerBlocks.Content />
        </div>
      </Fragment>
    );
  },
});
