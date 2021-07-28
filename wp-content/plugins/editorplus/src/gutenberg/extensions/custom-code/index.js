/**
 * External Dependencies
 */
import CodeEditor from "../../../components/code-editor";

import { id } from "brace/worker/css";
import {
  removeBlockMeta,
  isSupportedBlock,
  stripHTML,
  testAndRemoveUnusedMeta,
  replaceSelector,
} from "../../../functions";
import { TEXT_DOMAIN } from "../../../global/constants";
/**
 * WordPress Dependencies
 */
const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { Fragment, useEffect } = wp.element;
const { InspectorControls } = wp.editor;
const { createHigherOrderComponent } = wp.compose;
const { PanelBody, Button, Tip } = wp.components;
const { editPost } = wp.data.dispatch("core/editor");
const { getEditedPostAttribute, getBlock } = wp.data.select("core/editor");
const { get, isEmpty, each, omit, has, clone } = lodash;

function addAttributes(settings) {
  if (
    has(settings, "attributes") &&
    !isEmpty(settings.attributes) &&
    isSupportedBlock(settings.name)
  ) {
    settings.attributes = Object.assign(settings.attributes, {
      editorPlusCustomCSS: {
        type: "string",
        default: "selector { \n\n}",
      },
    });
  }

  return settings;
}

const withAdvancedControls = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    if (!isSupportedBlock(get(getBlock(props.clientId), "name"))) {
      return <BlockEdit {...props} />;
    }

    const { name, attributes, setAttributes, isSelected, clientId } = props;

    const { editorPlusCustomCSS, className } = attributes;

    const updateCustomCss = () => {
      handleCSS(editorPlusCustomCSS);
      testAndRemoveUnusedMeta("editor_plus_custom_css");
    };

    useEffect(updateCustomCss, []);
    useEffect(updateCustomCss, [editorPlusCustomCSS, className]);

    useEffect(() => {
      return () => {
        testAndRemoveUnusedMeta("editor_plus_custom_css");
        removeBlockMeta(clientId, "editor_plus_custom_css");
      };
    }, []);

    const handleCSS = (value) => {
      const metaData = getEditedPostAttribute("meta");
      const oldCSS = get(metaData, "editor_plus_custom_css");

      const parsedCSS = JSON.parse(isEmpty(oldCSS) ? "{}" : oldCSS);

      const __static_file_version__ =
        "latest-" + Math.floor(Math.random() * 1000);

      const cssValue = replaceSelector(value, className);

      const newCSS = {
        ...parsedCSS,
        [clientId]: stripHTML(cssValue),
      };

      editPost({
        meta: {
          editor_plus_custom_css: JSON.stringify(newCSS),
          editor_plus_custom_css_file_version: __static_file_version__,
        },
      });

      setAttributes({ editorPlusCustomCSS: value });
    };

    return (
      <Fragment>
        <BlockEdit {...props} />
        <style
          dangerouslySetInnerHTML={{
            __html: replaceSelector(editorPlusCustomCSS, className),
          }}
        ></style>

        {isSelected && (
          <InspectorControls>
            <PanelBody title="Custom CSS" initialOpen={false}>
              <CodeEditor
                mode="css"
                onChange={(value) => handleCSS(value)}
                value={editorPlusCustomCSS}
                maxLines={20}
                minLines={5}
              />
              <div style={{ marginTop: 20 }}>
                <Tip>
                  {__(`Use "selector" to insert the current block selection.`)}
                </Tip>
              </div>
            </PanelBody>
          </InspectorControls>
        )}
      </Fragment>
    );
  };
}, "withAdvancedControls");

const isEnabled =
  editor_plus_extension.custom_block_code.enabled === "1" ||
  editor_plus_extension.custom_block_code.enabled === true
    ? true
    : false;

if (isEnabled) {
  addFilter(
    "blocks.registerBlockType",
    "editor-plus/custom-attributes",
    addAttributes
  );

  addFilter(
    "editor.BlockEdit",
    "editor-plus/custom-advanced-control",
    withAdvancedControls
  );
}
