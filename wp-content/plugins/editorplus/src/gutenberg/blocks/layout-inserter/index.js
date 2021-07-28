import { TEXT_DOMAIN } from "../../global/constants";
import edit from "./edit";
import save from "./save";
import { attributes, title } from "./block.json";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType("ep/templates-directory", {
  title: __(title, TEXT_DOMAIN),
  icon: "admin-appearance",
  category: "common",
  keywords: [__("gutenberg-directory"), __("style"), __("directory")],
  edit,
  save,
  attributes,
});
