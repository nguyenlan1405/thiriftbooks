import { TEXT_DOMAIN } from "../../global/constants";
// import controls from "./style-controls/controls.json";

// const {
//   StylingControls,
//   RenderStyles,
//   RenderSavedStyles,
//   InspectorControls,
//   SwitchSidebar,
//   RenderMultiStyles,
// } = editorPlus.components;

// const { toggleSidebar } = editorPlus.actions;

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.blockEditor;
// const { RangeControl, PanelBody, SelectControl } = wp.components;

// const CONTROLS_SCHEMA = {
//   type: "object",
//   default: {},
// };

registerBlockType("ep/table-of-content", {
  title: __("Table of Content"),
  icon: "star-empty",
  category: "ep-editorplus-blocks",
  example: {},
  keywords: [__("table of content"), __("table"), __("content"), __("editor plus")],
  description: __(
    "Display star ratings in your content. You can use different icons."
  ),
  attributes: {
    id: {
      type: "string",
      default: "",
    },
  },

  edit: (props) => {
    const { className } = props.attributes;
    const id = props.clientId;
    const wrapperClass = "ep_sr_wrapper__" + id;

    props.setAttributes({
      id: wrapperClass,
    });


    return (
      <div className={`${wrapperClass} ${className}`}>
          <h1>Edit</h1>
      </div>
    );
  },

  save: (props) => {
    const { className, id } = props.attributes;

    return (
      <div className={`${id} ${className}`}>
        <div class="ep-toc"></div>
      </div>
    );
  },
});
