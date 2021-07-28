import React from "react";
import { addInnerBlock } from "../../functions";
import { TEXT_DOMAIN } from "../../../../global/constants";
import Toolbar from "./toolbar";

import controls from "../style-controls/controls.json";
const { __ } = wp.i18n;
const { InnerBlocks, RichText } = wp.blockEditor;
const { get, map, isEqual } = lodash;
const {
  Button,
  PanelBody,
  SelectControl,
  ButtonGroup,
  PanelRow,
  FormToggle,
  __experimentalRadio: Radio,
  __experimentalRadioGroup: RadioGroup,
  RangeControl,
} = wp.components;
const { Fragment, useEffect, useState } = wp.element;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;

const {
  StylingControls,
  RenderStyles,
  RenderSavedStyles,
  RenderMultiStyles,
  InspectorControls,
  SwitchSidebar,
} = editorPlus.components;

function edit({
  attributes,
  clientId,
  setAttributes,
  updateBlockAttributes,
  currentBlock,
  getBlock,
}) {
  const [selectedTab, setSelectedTab] = useState(0);

  const { className, autoplay, autoplayDelay } = attributes;
  const id = clientId;
  const wrapperClass = "ep_tabs_wrapper__" + id;

  useEffect(() => {
    const updatedBlock = getBlock(clientId);
    const updatedChildBlocks = get(updatedBlock, "innerBlocks");
    const tabs = map(updatedChildBlocks, (childBlock) => {
      const label = get(childBlock, "attributes.label");
      const subLabel = get(childBlock, "attributes.subLabel");
      const id = get(childBlock, "attributes.id");
      return {
        label,
        subLabel,
        id,
      };
    });
    const currentTabs = get(attributes, "tabs");

    if (isEqual(currentTabs, tabs)) return;

    setAttributes({ tabs });
  }, [currentBlock]);

  setAttributes({
    id: wrapperClass,
  });

  const updateCurrentTab = (index) => {
    currentChildBlocks.forEach((childBlock, idx) => {
      const childBlockId = get(childBlock, "clientId");

      // hiding all the tabs excluding the active one
      if (index !== idx) {
        updateBlockAttributes(childBlockId, { hide: true });
      } else {
        updateBlockAttributes(childBlockId, { hide: false });
      }
    });
    setSelectedTab(index);
  };

  useEffect(() => updateCurrentTab(selectedTab), [selectedTab]);

  const template = [["ep/tab-item", { hide: false }, []]];
  const currentChildBlocks = get(currentBlock, "innerBlocks");

  // handling tab addition
  const addTab = () => {
    // updating the innerBlocks
    addInnerBlock(id, "ep/tab-item");
  };

  const titleAlignment = get(attributes, "titleAlignment");
  const hasSpaceAround =
    get(titleAlignment, "mobile") === "space-around" ||
    get(titleAlignment, "desktop") === "space-around" ||
    get(titleAlignment, "tablet") === "space-around";

  const { showSubTitle } = attributes;

  return (
    <Fragment>
      <div className={`${wrapperClass} ${className}`}>
        <div className={`ep_tabs_root ep_tabs_wrapper ${attributes.tabsStyle}`}>
          <div
            className={`ep_tabs_header ${hasSpaceAround ? "ep_th_full" : ""}`}
          >
            {currentChildBlocks.map((childBlock, index) => {
              const label = get(childBlock, "attributes.label");
              const subLabel = get(childBlock, "attributes.subLabel");

              const clientId = get(childBlock, "clientId");
              const isActiveLabel =
                get(childBlock, "attributes.hide") && index !== selectedTab
                  ? false
                  : true;

              return (
                <div
                  className={`ep_label_main ${
                    isActiveLabel ? "ep_active_tab" : ""
                  }`}
                  onClick={() => updateCurrentTab(index)}
                >
                  <RichText
                    tagName="span"
                    value={label}
                    className="ep_label"
                    onChange={(newLabel) =>
                      updateBlockAttributes(clientId, { label: newLabel })
                    }
                  />
                  {showSubTitle === true ? (
                    <RichText
                      tagName="span"
                      value={subLabel}
                      className="ep_sub_label"
                      onChange={(newSubLabel) =>
                        updateBlockAttributes(clientId, {
                          subLabel: newSubLabel,
                        })
                      }
                    />
                  ) : null}
                </div>
              );
            })}
            <Button onClick={addTab}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-2 -2 24 24"
                width="24"
                height="24"
                role="img"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M10 1c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm1-11H9v3H6v2h3v3h2v-3h3V9h-3V6zM10 1c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm1-11H9v3H6v2h3v3h2v-3h3V9h-3V6z"></path>
              </svg>
            </Button>
          </div>
          <InnerBlocks
            renderAppender={() => null}
            allowedBlocks={["ep/tab-item"]}
            template={template}
          />
        </div>
      </div>
      <Toolbar
        clientId={clientId}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <RenderStyles wrapperClass={wrapperClass} clientId={clientId} />

      <InspectorControls clientId={clientId}>
        <PanelBody title="General">
          <PanelRow>
            <span>{__("Tabs Style", TEXT_DOMAIN)}</span>
            <RadioGroup
              label={__("Tabs Style", TEXT_DOMAIN)}
              onChange={(tabsStyle) => {
                setAttributes({ tabsStyle });
              }}
              checked={attributes.tabsStyle}
            >
              <Radio value="ep_tabs_top">
                <span class="dashicons dashicons-arrow-up-alt"></span>
              </Radio>
              <Radio value="ep_tabs_bottom">
                <span class="dashicons dashicons-arrow-down-alt"></span>
              </Radio>
              <Radio value="ep_tabs_left">
                <span class="dashicons dashicons-arrow-left-alt"></span>
              </Radio>
              <Radio value="ep_tabs_right">
                <span class="dashicons dashicons-arrow-right-alt"></span>
              </Radio>
            </RadioGroup>
          </PanelRow>
          <PanelRow>
            <span>{__("Show Sub Title", TEXT_DOMAIN)}</span>
            <FormToggle
              checked={showSubTitle}
              onChange={() => setAttributes({ showSubTitle: !showSubTitle })}
            />
          </PanelRow>

          <PanelRow>
            <span>{__("Autoplay", TEXT_DOMAIN)}</span>
            <FormToggle
              checked={autoplay}
              onChange={() => setAttributes({ autoplay: !autoplay })}
            />
          </PanelRow>
          {autoplay && (
            <RangeControl
              label={__("Delay (sec)", TEXT_DOMAIN)}
              value={autoplayDelay}
              min={0.5}
              step={0.1}
              max={20}
              onChange={(newDelay) =>
                setAttributes({ autoplayDelay: newDelay })
              }
            />
          )}
        </PanelBody>

        <PanelBody title={__("Design", TEXT_DOMAIN)}>
          <SwitchSidebar label="Title" id="title">
            <RenderMultiStyles
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
                {
                  name: "subTitleTypography",
                  options: controls.subTitleTypography,
                },
                {
                  name: "subTitleActiveColor",
                  options: controls.subTitleActiveColor,
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

            <RenderMultiStyles
              title={__("Border", TEXT_DOMAIN)}
              groups={[
                {
                  name: "titleBorder",
                  options: controls.titleBorder,
                },
                {
                  name: "titleBorderRadius",
                  options: controls.titleBorderRadius,
                },
              ]}
            />

            <StylingControls
              initialOpen={false}
              title={__("Shadow", TEXT_DOMAIN)}
              group="titleBoxShadow"
              options={controls.titleBoxShadow}
            />

            <RenderMultiStyles
              title={__("Spacing", TEXT_DOMAIN)}
              groups={[
                {
                  name: "titlePadding",
                  options: controls.titlePadding,
                },
              ]}
            />

            <RenderMultiStyles
              title={__("Extras", TEXT_DOMAIN)}
              groups={[
                {
                  name: "titleAlignment",
                  options: controls.titleAlignment,
                },
                {
                  name: "titleGap",
                  options: controls.titleGap,
                },
              ]}
            />
          </SwitchSidebar>

          <SwitchSidebar label="Content" id="content">
            <StylingControls
              initialOpen={false}
              title={__("Background", TEXT_DOMAIN)}
              group="contentBackground"
              options={controls.contentBackground}
            />

            <RenderMultiStyles
              title={__("Border", TEXT_DOMAIN)}
              groups={[
                {
                  name: "contentBorder",
                  options: controls.contentBorder,
                },
                {
                  name: "contentBorderRadius",
                  options: controls.contentBorderRadius,
                },
              ]}
            />

            <StylingControls
              initialOpen={false}
              title={__("Shadow", TEXT_DOMAIN)}
              group="contentBoxShadow"
              options={controls.contentBoxShadow}
            />

            <StylingControls
              initialOpen={false}
              title={__("Spacing", TEXT_DOMAIN)}
              group="contentPadding"
              options={controls.contentPadding}
            />
          </SwitchSidebar>

          <SwitchSidebar label="Block" id="block">
            <StylingControls
              initialOpen={false}
              title={__("Sizing", TEXT_DOMAIN)}
              group="tabsHeaderSizing"
              options={controls.tabsHeaderSizing}
            />

            <StylingControls
              initialOpen={false}
              title={__("Extras", TEXT_DOMAIN)}
              group="blockGap"
              options={controls.blockGap}
            />
          </SwitchSidebar>
        </PanelBody>
      </InspectorControls>
    </Fragment>
  );
}

export default compose([
  withSelect((select, { clientId }) => {
    const { getBlock } = select("core/block-editor");
    const currentBlock = getBlock(clientId);

    return {
      getBlock,
      currentBlock,
    };
  }),
  withDispatch((dispatch) => {
    const { updateBlockAttributes } = dispatch("core/block-editor");

    return {
      updateBlockAttributes,
    };
  }),
])(edit);
