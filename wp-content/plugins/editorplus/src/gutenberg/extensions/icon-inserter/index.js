import edit from "./edit";
import { TEXT_DOMAIN } from "../../../global/constants";

const { __ } = wp.i18n;
const name = "ep/icon-insert";
const { registerFormatType } = wp.richText;

const iconInsert = {
  name,
  title: __("Icon", TEXT_DOMAIN),
  keywords: [__("icon"), __("library")],
  className: "eplus-icon",
  tagName: "span",
  attributes: {
    style: "data-style",
    styling: "style",
    class: "class",
  },
  edit,
};

const isExtensionEnabled =
  editor_plus_extension.icon_inserter.enabled === "1" ||
  editor_plus_extension.icon_inserter.enabled === true
    ? true
    : false;

if (isExtensionEnabled) {
  [iconInsert].forEach(({ name, ...settings }) =>
    registerFormatType(name, settings)
  );
}
