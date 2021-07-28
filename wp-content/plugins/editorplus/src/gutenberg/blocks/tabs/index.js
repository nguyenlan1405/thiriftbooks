import { Fragment } from "react";
import Icon from "../../components/icon";
import { TEXT_DOMAIN } from "../../../global/constants";
import "./child/index";
import edit from "./parent/edit";
import save from "./parent/save";

import deprecatedEdit from "./parent/deprecated/edit";
import deprecatedSave from "./parent/deprecated/save";

import controls from "./style-controls/controls.json";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const CONTROLS_SCHEMA = {
  type: "object",
  default: {},
};

// ------------------------ PARENT ------------------------------------//

const attributes = {
  epStylingOptions: {
    type: "object",
    default: controls,
  },
  id: {
    type: "string",
    default: "",
  },
  activeTabId: {
    type: "string",
    default: "",
  },
  tabs: {
    type: "array",
    default: [],
  },
  tabsStyle: {
    type: "string",
    default: "ep_tabs_top",
  },
  showSubTitle: {
    type: "boolean",
    default: false,
  },
  autoplay: {
    type: "boolean",
    default: false,
  },
  autoplayDelay: {
    type: "number",
    default: 1000,
  },
  tabsHeaderSizing: CONTROLS_SCHEMA,
  blockGap: CONTROLS_SCHEMA,
  titleAlignment: CONTROLS_SCHEMA,
  titleGap: CONTROLS_SCHEMA,
  titleBorder: CONTROLS_SCHEMA,
  titleBorderRadius: CONTROLS_SCHEMA,
  titleBoxShadow: CONTROLS_SCHEMA,
  titleTypography: CONTROLS_SCHEMA,
  subTitleTypography: CONTROLS_SCHEMA,
  titleActiveColor: CONTROLS_SCHEMA,
  subTitleActiveColor: CONTROLS_SCHEMA,
  titleBackground: CONTROLS_SCHEMA,
  titleActiveBackground: CONTROLS_SCHEMA,
  contentBackground: CONTROLS_SCHEMA,
  titlePadding: CONTROLS_SCHEMA,
  contentBorder: CONTROLS_SCHEMA,
  contentBorderRadius: CONTROLS_SCHEMA,
  contentBoxShadow: CONTROLS_SCHEMA,
  contentPadding: CONTROLS_SCHEMA,
};

registerBlockType("ep/tabs", {
  title: __("Tabs"),
  icon: __(<Icon icon="tabs" />),
  description: __(
    "Tab block allows you to add content inside tabs. You can add other blocks inside tab content."
  ),
  category: "ep-editorplus-blocks",
  keywords: [
    __("editor"),
    __("editor plus"),
    __("tab"),
    __("content"),
    __("feature"),
  ],
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
