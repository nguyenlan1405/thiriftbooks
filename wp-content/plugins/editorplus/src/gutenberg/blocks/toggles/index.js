import controls from "./style-controls/controls.json";
import Icon from "../../components/icon";

import parentEdit from "./parent/edit";
import parentSave from "./parent/save";

import deprecatedParentEdit from "./parent/deprecated/edit";
import deprecatedParentSave from "./parent/deprecated/save";

import childEdit from "./child/edit";
import childSave from "./child/save";

import deprecatedChildEdit from "./child/deprecated/edit";
import deprecatedChildSave from "./child/deprecated/save";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const CONTROLS_SCHEMA = {
  type: "object",
  default: {},
};

const parentAttributes = {
  epStylingOptions: {
    type: "object",
    default: controls,
  },
  id: {
    type: "string",
    default: "",
  },
  // for making the toggles accordion
  isAccordion: {
    type: "boolean",
    default: false,
  },
  accordionIcon: {
    type: "string",
    default: "eplusicon-plus1",
  },
  accordionActiveIcon: {
    type: "string",
    default: "eplusicon-minus1",
  },
  openFirst: {
    type: "boolean",
    default: true,
  },

  itemsColumns: CONTROLS_SCHEMA,
  itemsAlignment: CONTROLS_SCHEMA,
  itemsSizing: CONTROLS_SCHEMA,
  itemsGap: CONTROLS_SCHEMA,
  titleTypography: CONTROLS_SCHEMA,
  titleBackground: CONTROLS_SCHEMA,
  titleActiveBackground: CONTROLS_SCHEMA,
  itemsBorder: CONTROLS_SCHEMA,
  itemsBorderRadius: CONTROLS_SCHEMA,
  itemsBoxShadow: CONTROLS_SCHEMA,
  titlePadding: CONTROLS_SCHEMA,
  titleAlignment: CONTROLS_SCHEMA,
  contentBackground: CONTROLS_SCHEMA,
  contentPadding: CONTROLS_SCHEMA,
  titleActiveColor: CONTROLS_SCHEMA,
};

// Parent
registerBlockType("ep/toggles", {
  title: __("Toggle"),
  icon: __(<Icon icon="toggles" />),
  description: __(
    "Display collapsible content. You can add other blocks inside."
  ),
  category: "ep-editorplus-blocks",
  keywords: [
    __("toggles"),
    __("accordion"),
    __("feature"),
    __("content"),
    __("editor plus"),
  ],
  attributes: parentAttributes,
  edit: parentEdit,
  save: parentSave,
  deprecated: [
    {
      attributes: parentAttributes,
      save: deprecatedParentSave,
      edit: deprecatedParentEdit,
    },
  ],
});

const childAttributes = {
  id: {
    type: "string",
    default: "",
  },
  title: {
    type: "string",
    default: "Title",
  },

  // weather the toggle is currently opened or not!
  isOpen: {
    type: "boolean",
    default: true,
  },
  icon: {
    type: "string",
    default: "",
  },
  activeIcon: {
    type: "string",
    default: "",
  },
};

// Child
registerBlockType("ep/toggle-item", {
  title: __("Toggle Item"),
  icon: "button",
  category: "common",
  keywords: ["toggles"],

  attributes: childAttributes,
  parent: ["ep/toggles"],

  edit: childEdit,
  save: childSave,
  deprecated: [
    {
      attributes: childAttributes,
      save: deprecatedChildSave,
      edit: deprecatedChildEdit,
    },
  ],
});
