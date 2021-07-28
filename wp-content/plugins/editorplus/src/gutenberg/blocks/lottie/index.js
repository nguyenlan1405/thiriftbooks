import controls from "./style-controls/controls.json";
import EpIcons from "../../components/icon";

import edit from "./edit";
import save from "./save";

import deprecatedEdit from "./deprecated/edit";
import deprecatedSave from "./deprecated/save";

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

const CONTROLS_SCHEMA = {
  type: "object",
  default: {},
};

const attributes = {
  epStylingOptions: {
    type: "object",
    default: controls,
  },
  id: {
    type: "string",
    default: "",
  },
  sourceMedia: {
    type: "object",
    default: "",
  },
  sourceUrl: {
    type: "string",
    default: "",
  },
  loop: {
    type: "boolean",
    default: true,
  },
  autoplay: {
    type: "boolean",
    default: false,
  },
  onHover: {
    type: "boolean",
    default: false,
  },
  animationSpeed: {
    type: "number",
    default: 1.0,
  },
  href: {
    type: "string",
    default: "",
  },
  hrefTarget: {
    type: "string",
    default: "_self",
  },
  size: CONTROLS_SCHEMA,
  alignment: CONTROLS_SCHEMA,
  background: CONTROLS_SCHEMA,
  border: CONTROLS_SCHEMA,
  borderRadius: CONTROLS_SCHEMA,
  padding: CONTROLS_SCHEMA,
};

registerBlockType("ep/lottie", {
  title: __("Lottie"),
  icon: <EpIcons icon="lottie" width={15} />,
  category: "ep-editorplus-blocks",
  example: {},
  keywords: [__("lottie"), __("animation"), __("animated"), __("editor plus")],
  description: __(
    "Display star ratings in your content. You can use different icons."
  ),
  attributes,
  edit,
  save,
  deprecated: [
    {
      attributes,
      save: deprecatedSave,
      edit: deprecatedEdit,
    },
  ],
});
