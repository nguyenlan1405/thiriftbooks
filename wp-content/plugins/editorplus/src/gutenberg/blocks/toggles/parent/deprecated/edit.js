/**
 * !DEPRECATED VERSION
 */

import { TEXT_DOMAIN } from "../../../../../global/constants";
import controls from "../../style-controls/controls.json";
import IconPicker from "../../../../components/icon-picker/index";

const { FormToggle, PanelRow, PanelBody } = wp.components;
const { updateBlockAttributes } = wp.data.dispatch("core/block-editor");
const { getBlock } = wp.data.select("core/block-editor");
const { get } = lodash;

const {
  StylingControls,
  RenderStyles,
  RenderMultiStyles,
  InspectorControls,
  SwitchSidebar,
} = editorPlus.components;

const { __ } = wp.i18n;
const { InnerBlocks } = wp.blockEditor;

const $ = jQuery;

function edit(props) {
  const { className, isAccordion, openFirst } = props.attributes;
  const id = props.clientId;
  const wrapperClass = "ep_toggles_wrapper__" + id;

  props.setAttributes({
    id: wrapperClass,
  });

  const template = [
    [
      "ep/toggle-item", // block slug
      {}, // attributes
      [], // inner blocks
    ],
  ];

  /**
   * Switching from tab to accordion
   */

  const toggleAccordion = () => {
    props.setAttributes({ isAccordion: !isAccordion });

    if (!isAccordion === false) return;

    // current root block
    const currentBlock = getBlock(id);

    // sliding down all toggles
    const toggles = get(currentBlock, "innerBlocks") ?? [];

    toggles.forEach((childBlock) => {
      const childClientId = get(childBlock, "clientId");
      updateBlockAttributes(childClientId, { isOpen: false });
    });
  };

  return (
    <div className={`${wrapperClass} ${className}`}>
      <div className={`ep_toggles_wrapper`}>
        <InnerBlocks template={template} allowedBlocks={["ep/toggle-item"]} />
      </div>
      <RenderStyles wrapperClass={wrapperClass} clientId={props.clientId} />
      <InspectorControls clientId={props.clientId}>
        <PanelBody title={__("General", TEXT_DOMAIN)}>
          <IconPicker
            value={props.attributes.accordionActiveIcon}
            label={__("Active Icon", TEXT_DOMAIN)}
            onChange={(newActiveIcon) =>
              props.setAttributes({ accordionActiveIcon: newActiveIcon })
            }
          />
          <IconPicker
            value={props.attributes.accordionIcon}
            label={__("Unactive Icon", TEXT_DOMAIN)}
            onChange={(newIcon) =>
              props.setAttributes({ accordionIcon: newIcon })
            }
          />
          <PanelRow>
            <span>{__("One at a time", TEXT_DOMAIN)}</span>
            <FormToggle checked={isAccordion} onChange={toggleAccordion} />
          </PanelRow>
          <PanelRow>
            <span>{__("Open First Item", TEXT_DOMAIN)}</span>
            <FormToggle
              checked={openFirst}
              onChange={() => props.setAttributes({ openFirst: !openFirst })}
            />
          </PanelRow>
        </PanelBody>

        <PanelBody title={__("Design", TEXT_DOMAIN)}>
          <SwitchSidebar label="Title" id="title">
            <RenderMultiStyles
              initialOpen={false}
              title={__("Typography", TEXT_DOMAIN)}
              groups={[
                {
                  name: "titleTypography",
                  options: controls.titleTypography,
                },
                {
                  name: "titleActiveColor",
                  options: controls.titleActiveColor,
                },
              ]}
            />
            <RenderMultiStyles
              title={__("Background", TEXT_DOMAIN)}
              groups={[
                {
                  name: "titleBackground",
                  options: controls.titleBackground,
                },
                {
                  name: "titleActiveBackground",
                  options: controls.titleActiveBackground,
                },
              ]}
            />

            <StylingControls
              initialOpen={false}
              title="Spacing"
              group="titlePadding"
              options={controls.titlePadding}
            />
            <StylingControls
              initialOpen={false}
              title="Extras"
              group="titleAlignment"
              options={controls.titleAlignment}
            />
          </SwitchSidebar>

          <SwitchSidebar label="Content" id="content">
            <StylingControls
              initialOpen={false}
              title="Background"
              group="contentBackground"
              options={controls.contentBackground}
            />

            <StylingControls
              initialOpen={false}
              title="Spacing"
              group="contentPadding"
              options={controls.contentPadding}
            />
          </SwitchSidebar>

          <SwitchSidebar label="Block" id="block">
            <RenderMultiStyles
              title={__("Border", TEXT_DOMAIN)}
              groups={[
                {
                  name: "itemsBorder",
                  options: controls.itemsBorder,
                },
                {
                  name: "itemsBorderRadius",
                  options: controls.itemsBorderRadius,
                },
              ]}
            />
            <StylingControls
              initialOpen={false}
              title="Shadow"
              group="itemsBoxShadow"
              options={controls.itemsBoxShadow}
            />
            <StylingControls
              initialOpen={false}
              title="Extras"
              group="itemsGap"
              options={controls.itemsGap}
            />
          </SwitchSidebar>
        </PanelBody>
      </InspectorControls>
    </div>
  );
}

export default edit;
