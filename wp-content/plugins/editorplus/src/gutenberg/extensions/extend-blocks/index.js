/**
 *
 * Custom Styles
 *
 */

import "./core-image/image-styles.js";


/**
 *
 * Custom Imports
 *
 */

import { editorPlusData } from "../../extend/index";
import ExtendedList from "./core-list/index";
import ExtendedColumns from "./core-columns/index";
import ExtendedImage from "./core-image/index";
import ExtendedButton from "./core-button/index";

/**
 * Wordpress Dependencies
 */

const { createHigherOrderComponent } = wp.compose;
const { addFilter } = wp.hooks;
const { each, map, get, isEqual, isEmpty } = lodash;
const { useEffect } = wp.element;

const ExtendedBlocks = [ExtendedList, ExtendedButton, ExtendedImage, ExtendedColumns];

// extending each block
ExtendedBlocks.forEach((block) => {
  function addAttributes(settings, name) {
    let extendedAttributes = {};

    if (name === block.name) {
      extendedAttributes = Object.assign(extendedAttributes, block.attributes);
    }

    settings.attributes = Object.assign(
      {},
      settings.attributes,
      extendedAttributes
    );

    return settings;
  }

  const withExtendedControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
      return props.name === block.name ? (
        <block.Controls {...props} BlockEdit={BlockEdit} />
      ) : (
        <BlockEdit {...props} />
      );
    };
  }, "withAdvancedControls");

  const isEnabled =
    editor_plus_extension.blocks_extender.enabled === "1" ||
    editor_plus_extension.blocks_extender.enabled === true
      ? true
      : false;

  if (isEnabled) {
    addFilter(
      "editor.BlockEdit",
      `editor_plus/extended-blocks/${block.name}/extendedControls`,
      withExtendedControls
    );

    addFilter(
      "blocks.registerBlockType",
      `editor_plus/extended-blocks/${block.name}/customAttributes`,
      addAttributes
    );
  }
});
