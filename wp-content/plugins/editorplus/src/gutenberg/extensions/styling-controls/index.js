/**
 * External Dependencies
 */

import { TEXT_DOMAIN } from "../../../global/constants";
import {
  removeBlockMeta,
  extendAttribute,
  getExtendedAttributes,
  buildStylingContext,
  getExtendedAttributesName,
  testAndRemoveUnusedMeta,
  isSupportedBlock,
  setModificationStatus,
} from "../../../functions";

import ExtendStyle from "../../components/styling-controls/extendStyle";
import Dimensions, {
  dimensionSchema,
  convertDimensions,
} from "../../components/styling-controls/dimensions/index";
import Sizing, {
  convertSizing,
  sizingSchema,
} from "../../components/styling-controls/sizing";
import OtherSettings, {
  otherSettingsSchema,
  convertOtherSettings,
} from "../../components/styling-controls/other/index";
import {
  Border,
  bordersSchema,
  convertBorders,
} from "../../components/styling-controls/border/border";
import { StyledPanel } from "../../components/styling-controls/stylePanel";
import {
  Shadow,
  shadowSchema,
  convertShadow,
} from "../../components/styling-controls/shadow";
import {
  Background,
  backgroundSchema,
  convertBackground,
} from "../../components/styling-controls/background/index";
import {
  convertCamelCase,
  id,
  hasOurClass,
  convertToStyleTag,
  isOurAttribute,
} from "../../../functions";
import { usePrevious } from "../../../hooks/hooks";

import ShapeDivider, {
  convertShapeDivider,
  ShapeDividerSchema,
} from "../../components/styling-controls/shape-divider";
import Typography, {
  convertTypography,
  typographySchema,
} from "../../components/styling-controls/typography";

const {
  isEqual,
  has,
  get,
  isEmpty,
  toString,
  pickBy,
  each,
  attempt,
  isError,
  omit,
} = lodash;

/**
 * WordPress Dependencies
 */
const { domReady } = wp;
const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { Fragment, useEffect, useState } = wp.element;
const { InspectorControls } = wp.editor;
const { createHigherOrderComponent } = wp.compose;
const { PanelBody, Button } = wp.components;
const { editPost } = wp.data.dispatch("core/editor");
const { getBlockType } = wp.blocks;
const { subscribe, useSelect } = wp.data;
const $ = jQuery;
const { getEditedPostAttribute, getBlock } = wp.data.select("core/editor");

const META_KEY = "editor_plus_custom_styling_options_css";

const additionalDimensions = ["BorderRadius", "Margin", "Padding"];

function addAttributes(settings) {
  if (
    has(settings, "attributes") &&
    !isEmpty(settings.attributes) &&
    isSupportedBlock(settings.name, "epStyling")
  ) {
    const extend = ["hover", "responsive"];

    const extendedAttributes = {
      ...extendAttribute(extend, "epCustomPadding", dimensionSchema),
      ...extendAttribute(extend, "epCustomMargin", dimensionSchema),
      ...extendAttribute(extend, "epCustomBorderRadius", dimensionSchema),
      epGeneratedClass: {
        type: "string",
        default: "",
      },
      ...extendAttribute(extend, "epCustomBorder", bordersSchema),
      ...extendAttribute(extend, "epCustomSizing", sizingSchema),
      ...extendAttribute(extend, "epCustomBackground", backgroundSchema),
      ...extendAttribute(extend, "epCustomShadow", shadowSchema),
      ...extendAttribute(extend, "epCustomOtherSettings", otherSettingsSchema),
      ...extendAttribute(extend, "epCustomTypography", typographySchema),
      epCustomShapeDividerBefore: ShapeDividerSchema,
    };

    settings.attributes = Object.assign(
      settings.attributes,
      extendedAttributes
    );
  }

  return settings;
}

const withCustomControls = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    const currentBlock = getBlock(props.clientId);
    const currentBlockName = get(currentBlock, "name");
    const copyStylingMetaKey = "editor_plus_copied_stylings";

    const isBlockSupported = isSupportedBlock(currentBlockName, "epStyling");
    if (!isBlockSupported) {
      return <BlockEdit {...props} />;
    }

    const currentPreviewType = useSelect((select) => {
      const { __experimentalGetPreviewDeviceType } = select("core/edit-post");

      const previewType = __experimentalGetPreviewDeviceType();
      return previewType;
    }, []);

    const [hoverState, setHoverState] = useState([]); // those attribute names that are currently in their hover state
    const [responsiveState, setResponsiveState] = useState("Desktop");

    const [hasCopiedStyling, setCopiedStylingStatus] = useState(false);
    const [copyBtnLabel, setCopyBtnLabel] = useState("Copy Styling");

    const prevAttributes = usePrevious(props.attributes);

    const { name, attributes, setAttributes, isSelected, clientId } = props;

    const {
      epGeneratedClass,
      epCustomBorder,
      epCustomBackground,
      epCustomShadow,
      className,
      epCustomShapeDividerBefore,
    } = attributes;

    const styling = buildStylingContext(attributes, {
      epCustomPadding: {
        isObject: true,
        callback: (p) => convertDimensions(p, "padding"),
      },
      epCustomMargin: {
        isObject: true,
        callback: (p) => convertDimensions(p, "margin"),
      },
      epCustomBorderRadius: {
        isObject: true,
        callback: (b) => convertDimensions(b, "borderRadius"),
      },
      epCustomShadow: {
        css: "boxShadow",
        callback: (b) => convertShadow(b),
      },
      epCustomBackground: {
        isObject: true,
        callback: (bc) => convertBackground(bc),
      },
      epCustomBorder: {
        isObject: true,
        callback: (b) => convertBorders(b),
      },
      epCustomSizing: {
        isObject: true,
        callback: (b) => convertSizing(b),
      },
      epCustomOtherSettings: {
        isObject: true,
        callback: (b) => convertOtherSettings(b),
      },
      epCustomShapeDividerBefore: {
        isObject: true,
        callback: (s) => convertShapeDivider(s),
      },
      epCustomTypography: {
        isObject: true,
        callback: (t) => convertTypography(t),
      },
    });

    const blockName = get(getBlock(clientId), "name");

    const handleHoverState = (attr) => {
      setHoverState([...hoverState, attr]);
    };

    const removeHoverState = (attr) => {
      const withoutAttr = hoverState.filter((s) => s !== attr);
      setHoverState(withoutAttr);
    };

    const handleResponsiveState = (status) => {
      const selector = wp.data.select("core/edit-post");
      const dispatcher = wp.data.dispatch("core/edit-post");

      if (
        !has(selector, "__experimentalGetPreviewDeviceType") &&
        !has(dispatcher, "__experimentalSetPreviewDeviceType")
      )
        return;

      const currentPreviewType = selector.__experimentalGetPreviewDeviceType();

      if (!isEqual(currentPreviewType, status)) {
        dispatcher.__experimentalSetPreviewDeviceType(status);
      }
    };

    /**
     * Will return true if the style is copied
     */

    const hasCopiedStylings = () => {
      const meta_value = getEditedPostAttribute("meta");
      const copiedValue = get(meta_value, copyStylingMetaKey);
      const canBeParsed = !isError(attempt(JSON.parse, copiedValue));

      if (!canBeParsed) {
        return false;
      }

      const parsedStyling = JSON.parse(copiedValue);

      return isEmpty(parsedStyling) ? false : true;
    };

    /**
     * Will paste the copied Styling
     */

    const pasteStyling = () => {
      const meta_value = getEditedPostAttribute("meta");
      const copiedValue = get(meta_value, copyStylingMetaKey);
      const canBeParsed = !isError(attempt(JSON.parse, copiedValue));

      if (!canBeParsed) return;

      const parsedCopiedValue = JSON.parse(copiedValue);

      props.setAttributes({ ...parsedCopiedValue });
    };

    useEffect(() => {
      if (isEmpty(epGeneratedClass)) return;

      const targetEl = $(`.${epGeneratedClass}`);

      if (targetEl.length > 1) {
        const newClassList = attributes.className.split(" ");
        const newClasses = newClassList.filter(
          (className) => !isEqual(className, epGeneratedClass)
        );

        setAttributes({
          epGeneratedClass: "",
          className: newClasses.join(" "),
        });
      }

      if (hasCopiedStylings()) {
        setCopiedStylingStatus(true);
      } else {
        setCopiedStylingStatus(false);
      }
    }, []);

    useEffect(() => {
      if (!hasOurClass(className)) {
        const randomGeneratedClassName = `eplus-${id(6)}`;

        const blockClassList = toString(className).split(" ");

        blockClassList.push(randomGeneratedClassName);

        setAttributes({
          className: blockClassList.join(" "),
          epGeneratedClass: randomGeneratedClassName,
        });
      }
    }, [className]);

    useEffect(() => handleMetaUpdate(), [epGeneratedClass]);

    useEffect(() => {
      const updatedAttribute = pickBy(props.attributes, (value, key) => {
        return !isEmpty(prevAttributes) && isOurAttribute(key)
          ? !isEqual(value, prevAttributes[key])
          : false;
      }); // changed attributes

      setModificationStatus(updatedAttribute, attributes, setAttributes); // update the modification status
    }, [props.attributes]);

    useEffect(() => {
      return () => {
        testAndRemoveUnusedMeta(META_KEY);
        removeBlockMeta(clientId, META_KEY); // removing the meta related to this block when the block delete / un mount
      };
    }, []);

    useEffect(() => {
      if (!props.isSelected) {
        setHoverState([]);
      }
    }, [props.isSelected]);

    useEffect(() => {
      testAndRemoveUnusedMeta(META_KEY);
      handleMetaUpdate();

      if (hasCopiedStylings()) {
        setCopiedStylingStatus(true);
      } else {
        setCopiedStylingStatus(false);
      }

      return () => {
        removeBlockMeta(clientId, META_KEY); // removing the meta related to this block when the block delete / un mount
      };
    }, [
      ...getExtendedAttributesName(attributes).map((attr) => attributes[attr]),
    ]);

    useEffect(() => {
      if (isEqual(responsiveState, currentPreviewType)) return;

      setResponsiveState(currentPreviewType);
    }, [currentPreviewType]);

    const handleMetaUpdate = () => {
      const converted_style = convertToStyleTag(
        styling,
        epGeneratedClass,
        blockName,
        [],
        props.attributes
      );
      const current_styling = get(getEditedPostAttribute("meta"), META_KEY);

      const parsed_styling = JSON.parse(
        isEmpty(current_styling) ? "{}" : current_styling
      );
      const __static_file_version__ =
        "latest-" + Math.floor(Math.random() * 10000);

      parsed_styling[clientId] = converted_style;

      editPost({
        meta: {
          [META_KEY]: JSON.stringify(parsed_styling),
          editor_plus_custom_styling_options_file_version: __static_file_version__,
        },
      });
    };

    const convertedStyle = convertToStyleTag(
      styling,
      epGeneratedClass,
      blockName,
      hoverState,
      props.attributes,
      responsiveState,
      true // is Editor view
    );

    const copyStyling = () => {
      const extendedAttributes = getExtendedAttributesName(attributes);
      const attributesToCopy = {};

      const defaultAttrs = get(getBlockType(name), "attributes");

      each(extendedAttributes, (attrName) => {
        const attrValue = get(props.attributes, attrName);
        const attrDefault = get(defaultAttrs, attrName);
        const attrDefaultValue = get(attrDefault, "default");

        if (!isEqual(attrValue, attrDefaultValue)) {
          attributesToCopy[attrName] = attrValue;
        }
      });

      setCopyBtnLabel("Copied !");

      setTimeout(() => {
        setCopyBtnLabel("Copy Styles");
      }, 500);

      editPost({
        meta: { [copyStylingMetaKey]: JSON.stringify(attributesToCopy) },
      });
    };

    const copyBtnDisability =
      copyBtnLabel === "Copied !"
        ? {
            disabled: true,
          }
        : {};

    return (
      <Fragment>
        <InspectorControls>
          <div className="ep-inspector-actions">
            <Button
              {...copyBtnDisability}
              isDefault
              className="maxed"
              onClick={copyStyling}
            >
              {__(copyBtnLabel, TEXT_DOMAIN)}
            </Button>
            {hasCopiedStyling && (
              <Button
                isPrimary
                onClick={pasteStyling}
                className="maxed"
                style={{ marginTop: 10 }}
              >
                {__("Paste Styles", TEXT_DOMAIN)}
              </Button>
            )}
          </div>
        </InspectorControls>
        <BlockEdit {...props} />
        {!isEmpty(convertedStyle) && (
          <style
            dangerouslySetInnerHTML={{ __html: convertedStyle }}
            className="ep-stylings"
          ></style>
        )}
        {isSelected && (
          <InspectorControls>
            <StyledPanel
              initialOpen={false}
              title={__("Typography", TEXT_DOMAIN)}
              set={setAttributes}
              attr={`epCustomTypography`}
              attrs={attributes}
              supportedBlocks={[
                "core/paragraph",
                "core/heading",
                "core/button",
              ]}
              currentBlock={name}
            >
              <ExtendStyle
                responsiveState={responsiveState}
                handleResponsiveState={handleResponsiveState}
                applyHoverState={handleHoverState}
                removeHoverState={removeHoverState}
                attrs={attributes}
                attr={`epCustomTypography`}
                set={setAttributes}
                desktop={
                  <Typography
                    attrs={attributes}
                    attr={`epCustomTypography`}
                    value={attributes[`epCustomTypography`]}
                    viewPort={"Desktop"}
                    onChange={(newTypo) => {
                      if (typeof newTypo === "undefined") return;

                      setAttributes({ epCustomTypography: newTypo });
                    }}
                  />
                }
                tablet={
                  <Typography
                    attrs={attributes}
                    attr={`epCustomTypography`}
                    value={attributes[`epCustomTypographyTablet`]}
                    viewPort={"Tablet"}
                    onChange={(newTypo) => {
                      if (typeof newTypo === "undefined") return;

                      setAttributes({ epCustomTypographyTablet: newTypo });
                    }}
                  />
                }
                mobile={
                  <Typography
                    attrs={attributes}
                    attr={`epCustomTypography`}
                    value={attributes[`epCustomTypographyMobile`]}
                    viewPort={"Mobile"}
                    onChange={(newTypo) => {
                      if (typeof newTypo === "undefined") return;

                      setAttributes({ epCustomTypographyMobile: newTypo });
                    }}
                  />
                }
                hover={
                  <Typography
                    attrs={attributes}
                    attr={`epCustomTypography`}
                    value={attributes[`epCustomTypographyHover`]}
                    viewPort={"Hover"}
                    onChange={(newTypo) => {
                      if (typeof newTypo === "undefined") return;

                      setAttributes({ epCustomTypographyHover: newTypo });
                    }}
                  />
                }
              />
            </StyledPanel>
            <StyledPanel
              set={setAttributes}
              attr={`epCustomBackground`}
              attrs={attributes}
              title={__("Background", TEXT_DOMAIN)}
              initialOpen={false}
            >
              <ExtendStyle
                responsiveState={responsiveState}
                handleResponsiveState={handleResponsiveState}
                applyHoverState={handleHoverState}
                removeHoverState={removeHoverState}
                attrs={attributes}
                set={setAttributes}
                attr={`epCustomBackground`}
                desktop={
                  <Background
                    viewPort={"Desktop"}
                    attrs={attributes}
                    attr={`epCustomBackground`}
                    value={epCustomBackground}
                    label={"Background"}
                    onChange={(newbg) => {
                      setAttributes({ epCustomBackground: newbg });
                    }}
                  />
                }
                tablet={
                  <Background
                    viewPort={"Tablet"}
                    attrs={attributes}
                    label={"Background"}
                    attr={`epCustomBackground`}
                    value={attributes[`epCustomBackgroundTablet`]}
                    onChange={(newbg) => {
                      setAttributes({ epCustomBackgroundTablet: newbg });
                    }}
                  />
                }
                mobile={
                  <Background
                    viewPort={"Mobile"}
                    attrs={attributes}
                    attr={`epCustomBackground`}
                    label={"Background"}
                    value={attributes[`epCustomBackgroundMobile`]}
                    onChange={(newbg) => {
                      setAttributes({ epCustomBackgroundMobile: newbg });
                    }}
                  />
                }
                hover={
                  <Background
                    viewPort={"Hover"}
                    attrs={attributes}
                    attr={`epCustomBackground`}
                    label={"Background"}
                    value={attributes[`epCustomBackgroundHover`]}
                    onChange={(newbg) => {
                      setAttributes({ epCustomBackgroundHover: newbg });
                    }}
                  />
                }
              />
            </StyledPanel>
            <StyledPanel
              initialOpen={false}
              title={__("Box Shadow", TEXT_DOMAIN)}
              set={setAttributes}
              attr={`epCustomShadow`}
              attrs={attributes}
            >
              <ExtendStyle
                responsiveState={responsiveState}
                handleResponsiveState={handleResponsiveState}
                applyHoverState={handleHoverState}
                removeHoverState={removeHoverState}
                attrs={attributes}
                set={setAttributes}
                attr={`epCustomShadow`}
                desktop={
                  <Shadow
                    attrs={attributes}
                    label="Box Shadow"
                    attr={`epCustomShadow`}
                    value={epCustomShadow}
                    viewPort={"Desktop"}
                    onChange={(epCustomShadow) => {
                      setAttributes({ epCustomShadow });
                    }}
                  />
                }
                tablet={
                  <Shadow
                    attrs={attributes}
                    viewPort={"Tablet"}
                    label="Box Shadow"
                    attr={`epCustomShadow`}
                    value={attributes[`epCustomShadowTablet`]}
                    onChange={(shadow) => {
                      setAttributes({ epCustomShadowTablet: shadow });
                    }}
                  />
                }
                mobile={
                  <Shadow
                    attrs={attributes}
                    viewPort={"Mobile"}
                    label="Box Shadow"
                    attr={`epCustomShadow`}
                    value={attributes[`epCustomShadowMobile`]}
                    onChange={(shadow) => {
                      setAttributes({ epCustomShadowMobile: shadow });
                    }}
                  />
                }
                hover={
                  <Shadow
                    viewPort={"Hover"}
                    attrs={attributes}
                    label="Box Shadow"
                    attr={`epCustomShadow`}
                    value={attributes[`epCustomShadowHover`]}
                    onChange={(shadow) => {
                      setAttributes({ epCustomShadowHover: shadow });
                    }}
                  />
                }
              />
            </StyledPanel>
            <StyledPanel
              initialOpen={false}
              title={__("Border", TEXT_DOMAIN)}
              set={setAttributes}
              attr={`epCustomBorder`}
              attrs={attributes}
            >
              <ExtendStyle
                responsiveState={responsiveState}
                handleResponsiveState={handleResponsiveState}
                applyHoverState={handleHoverState}
                removeHoverState={removeHoverState}
                attrs={attributes}
                attr={`epCustomBorder`}
                set={setAttributes}
                desktop={
                  <Border
                    attrs={attributes}
                    attr={`epCustomBorder`}
                    value={epCustomBorder}
                    viewPort={"Desktop"}
                    onChange={(newBorders) => {
                      if (typeof newBorders === "undefined") return;

                      setAttributes({ epCustomBorder: newBorders });
                    }}
                  />
                }
                tablet={
                  <Border
                    attrs={attributes}
                    attr={`epCustomBorder`}
                    viewPort={"Tablet"}
                    value={attributes[`epCustomBorderTablet`]}
                    onChange={(newBorders) => {
                      if (typeof newBorders === "undefined") return;

                      setAttributes({ epCustomBorderTablet: newBorders });
                    }}
                  />
                }
                mobile={
                  <Border
                    attrs={attributes}
                    viewPort={"Mobile"}
                    attr={`epCustomBorder`}
                    value={attributes[`epCustomBorderMobile`]}
                    onChange={(newBorders) => {
                      if (typeof newBorders === "undefined") return;

                      setAttributes({ epCustomBorderMobile: newBorders });
                    }}
                  />
                }
                hover={
                  <Border
                    attrs={attributes}
                    viewPort={"Hover"}
                    attr={`epCustomBorder`}
                    value={attributes[`epCustomBorderHover`]}
                    onChange={(newBorders) => {
                      if (typeof newBorders === "undefined") return;

                      setAttributes({ epCustomBorderHover: newBorders });
                    }}
                  />
                }
              />
            </StyledPanel>

            {additionalDimensions.map((dimension, index) => {
              const dimensionAttr = `epCustom${dimension}`;
              const dimensionAttrValue = props.attributes[dimensionAttr];
              const title = convertCamelCase(dimension);

              // because margin supports auto syntax.
              const disableAuto = isEqual(dimension, "Margin") ? false : true;

              return (
                <StyledPanel
                  set={setAttributes}
                  attr={dimensionAttr}
                  attrs={attributes}
                  key={index}
                  title={__(title, TEXT_DOMAIN)}
                  initialOpen={false}
                >
                  <ExtendStyle
                    responsiveState={responsiveState}
                    handleResponsiveState={handleResponsiveState}
                    applyHoverState={handleHoverState}
                    removeHoverState={removeHoverState}
                    attrs={attributes}
                    set={setAttributes}
                    attr={dimensionAttr}
                    desktop={
                      <Dimensions
                        viewPort={"Desktop"}
                        attrs={attributes}
                        attr={dimensionAttr}
                        disableAuto={disableAuto}
                        label={title}
                        value={dimensionAttrValue}
                        onChange={(dim, unit) => {
                          setAttributes({
                            [dimensionAttr]: {
                              ...dimensionAttrValue,
                              value: dim,
                              unit: unit,
                            },
                          });
                        }}
                        onImportant={(imp) => {
                          setAttributes({
                            [dimensionAttr]: {
                              ...dimensionAttrValue,
                              important: imp,
                            },
                          });
                        }}
                      />
                    }
                    tablet={
                      <Dimensions
                        viewPort={"Tablet"}
                        attrs={attributes}
                        attr={dimensionAttr}
                        value={attributes[`${dimensionAttr}Tablet`]}
                        label={title}
                        disableAuto={disableAuto}
                        onChange={(dim, unit) => {
                          setAttributes({
                            [`${dimensionAttr}Tablet`]: {
                              ...attributes[`${dimensionAttr}Tablet`],
                              value: dim,
                              unit: unit,
                            },
                          });
                        }}
                        onImportant={(imp, unit) => {
                          setAttributes({
                            [`${dimensionAttr}Tablet`]: {
                              ...attributes[`${dimensionAttr}Tablet`],
                              important: imp,
                              unit,
                            },
                          });
                        }}
                      />
                    }
                    mobile={
                      <Dimensions
                        viewPort={"Mobile"}
                        attrs={attributes}
                        label={title}
                        attr={dimensionAttr}
                        disableAuto={disableAuto}
                        value={attributes[`${dimensionAttr}Mobile`]}
                        onChange={(dim, unit) => {
                          setAttributes({
                            [`${dimensionAttr}Mobile`]: {
                              ...attributes[`${dimensionAttr}Mobile`],
                              value: dim,
                              unit: unit,
                            },
                          });
                        }}
                        onImportant={(imp) => {
                          setAttributes({
                            [`${dimensionAttr}Mobile`]: {
                              ...attributes[`${dimensionAttr}Mobile`],
                              important: imp,
                            },
                          });
                        }}
                      />
                    }
                    hover={
                      <Dimensions
                        viewPort={"Hover"}
                        attrs={attributes}
                        attr={dimensionAttr}
                        disableAuto={disableAuto}
                        value={attributes[`${dimensionAttr}Hover`]}
                        label={title}
                        onChange={(dim, unit) => {
                          setAttributes({
                            [`${dimensionAttr}Hover`]: {
                              ...attributes[`${dimensionAttr}Hover`],
                              value: dim,
                              unit: unit,
                            },
                          });
                        }}
                        onImportant={(imp) => {
                          setAttributes({
                            [`${dimensionAttr}Hover`]: {
                              ...attributes[`${dimensionAttr}Hover`],
                              important: imp,
                            },
                          });
                        }}
                      />
                    }
                  ></ExtendStyle>
                </StyledPanel>
              );
            })}
            <StyledPanel
              initialOpen={false}
              title={__("Sizing", TEXT_DOMAIN)}
              set={setAttributes}
              attr={`epCustomSizing`}
              attrs={attributes}
            >
              <ExtendStyle
                responsiveState={responsiveState}
                handleResponsiveState={handleResponsiveState}
                applyHoverState={handleHoverState}
                removeHoverState={removeHoverState}
                attrs={attributes}
                set={setAttributes}
                attr={`epCustomSizing`}
                desktop={
                  <Sizing
                    viewPort={"Desktop"}
                    attrs={attributes}
                    attr={`epCustomSizing`}
                    value={attributes[`epCustomSizing`]}
                    onChange={(newSizing) =>
                      setAttributes({ epCustomSizing: newSizing })
                    }
                  />
                }
                tablet={
                  <Sizing
                    viewPort={"Tablet"}
                    attrs={attributes}
                    attr={`epCustomSizing`}
                    value={attributes[`epCustomSizingTablet`]}
                    onChange={(newSizing) =>
                      setAttributes({ epCustomSizingTablet: newSizing })
                    }
                  />
                }
                mobile={
                  <Sizing
                    viewPort={"Mobile"}
                    attrs={attributes}
                    attr={`epCustomSizing`}
                    value={attributes[`epCustomSizingMobile`]}
                    onChange={(newSizing) =>
                      setAttributes({ epCustomSizingMobile: newSizing })
                    }
                  />
                }
                hover={
                  <Sizing
                    viewPort={"Hover"}
                    attrs={attributes}
                    attr={`epCustomSizing`}
                    value={attributes[`epCustomSizingHover`]}
                    onChange={(newSizing) =>
                      setAttributes({ epCustomSizingHover: newSizing })
                    }
                  />
                }
              />
            </StyledPanel>
            <StyledPanel
              title={__("Extras", TEXT_DOMAIN)}
              initialOpen={false}
              set={setAttributes}
              attr={`epCustomOtherSettings`}
              attrs={attributes}
            >
              <ExtendStyle
                responsiveState={responsiveState}
                handleResponsiveState={handleResponsiveState}
                applyHoverState={handleHoverState}
                removeHoverState={removeHoverState}
                attrs={attributes}
                set={setAttributes}
                attr={`epCustomOtherSettings`}
                desktop={
                  <OtherSettings
                    viewPort={"Desktop"}
                    attrs={attributes}
                    attr={`epCustomOtherSettings`}
                    value={attributes[`epCustomOtherSettings`]}
                    onChange={(newS) =>
                      setAttributes({ epCustomOtherSettings: newS })
                    }
                  />
                }
                tablet={
                  <OtherSettings
                    viewPort={"Tablet"}
                    attrs={attributes}
                    attr={`epCustomOtherSettings`}
                    value={attributes[`epCustomOtherSettingsTablet`]}
                    onChange={(newS) =>
                      setAttributes({ epCustomOtherSettingsTablet: newS })
                    }
                  />
                }
                mobile={
                  <OtherSettings
                    viewPort={"Mobile"}
                    attrs={attributes}
                    attr={`epCustomOtherSettings`}
                    value={attributes[`epCustomOtherSettingsMobile`]}
                    onChange={(newS) =>
                      setAttributes({ epCustomOtherSettingsMobile: newS })
                    }
                  />
                }
                hover={
                  <OtherSettings
                    viewPort={"Hover"}
                    attrs={attributes}
                    attr={`epCustomOtherSettings`}
                    value={attributes[`epCustomOtherSettingsHover`]}
                    onChange={(newS) =>
                      setAttributes({ epCustomOtherSettingsHover: newS })
                    }
                  />
                }
              />
            </StyledPanel>
            <StyledPanel
              title={__("Shape Divider", TEXT_DOMAIN)}
              initialOpen={false}
              supportedBlocks={[
                "core/columns",
                "core/column",
                "core/group",
                "core/cover",
              ]}
              hasExtraSupports={false}
              currentBlock={name}
            >
              <ShapeDivider
                value={epCustomShapeDividerBefore}
                onChange={(newShape) =>
                  setAttributes({ epCustomShapeDividerBefore: newShape })
                }
              />
            </StyledPanel>
          </InspectorControls>
        )}
      </Fragment>
    );
  };
}, "withAdvancedControls");

const isExtensionEnabled =
  editor_plus_extension.styling.enabled === "1" ||
  editor_plus_extension.styling.enabled === true
    ? true
    : false;

if (isExtensionEnabled) {
  addFilter(
    "blocks.registerBlockType",
    "editor-plus/custom-attributes",
    addAttributes
  );

  addFilter(
    "editor.BlockEdit",
    "editor-plus/custom-styling-controls",
    withCustomControls
  );
}
