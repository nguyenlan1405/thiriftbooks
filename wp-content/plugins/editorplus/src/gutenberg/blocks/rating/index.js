import edit from "./edit";
import save from "./save";


import deprecatedEdit from "./deprecated/edit";
import deprecatedSave from "./deprecated/save";

import controls from "./style-controls/controls.json";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

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
  icon: {
    type: "string",
    default: "eplusicon-star",
  },
  displayTitleText: {
    type: "boolean",
    default: false,
  },
  titleText: {
    type: "string",
    default: "Title",
  },
  displayRatingSuffix: {
    type: "boolean",
    default: false,
  },
  ratingSuffix: {
    type: "string",
    default: "",
  },
  ratingRange: {
    type: "number",
    default: 2,
  },
  selectLayout: {
    type: "string",
    default: "row",
  },
  titleTypography: CONTROLS_SCHEMA,
  iconSize: CONTROLS_SCHEMA,
  iconGap: CONTROLS_SCHEMA,
  iconCheckedColor: CONTROLS_SCHEMA,
  iconUncheckedColor: CONTROLS_SCHEMA,
  suffixTypography: CONTROLS_SCHEMA,
  iconSuffixGap: CONTROLS_SCHEMA,
  inlineAlignment: CONTROLS_SCHEMA,
  stackAlignment: CONTROLS_SCHEMA,
}

registerBlockType("ep/rating", {
  title: __("Rating"),
  icon: "star-empty",
  category: "ep-editorplus-blocks",
  example: {},
  keywords: [__("star rating"), __("feature"), __("icon"), __("editor plus")],
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
