import React from "react";
import { epControls } from "./controls";
import { TEXT_DOMAIN } from "../../../../global/constants";
import { formatOptionStyling, generateBlockStylings } from "../utils";
import { usePrevious } from "../../../../hooks/hooks";

const { withSelect, withDispatch, subscribe } = wp.data;
const { useEffect, useState, useRef } = wp.element;
const { compose } = wp.compose;
const { has, get, isEmpty, each, isEqual } = lodash;
const { __ } = wp.i18n;

function RenderStyle({
  setAttributes,
  updateControlsSchema,
  attributes,
  getPreviewDeviceType,
  wrapperClass = "",
  clientId,
}) {
  const [generatedStyle, setGeneratedStyles] = useState("");
  const [currentDeviceType, setCurrentDeviceType] = useState("Desktop");
  const prevAttributes = usePrevious(attributes);
  const isFirstRun = useRef(true);

  useEffect(updateControlsSchema, []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const formattedStyling = formatOptionStyling(attributes);
    const newGeneratedStyles = generateBlockStylings(
      formattedStyling,
      attributes,
      currentDeviceType,
      true,
      wrapperClass
    );

    const generatedSavedStyles = generateBlockStylings(
      formattedStyling,
      attributes,
      "Desktop",
      false,
      wrapperClass
    );

    setGeneratedStyles(newGeneratedStyles);

    const savedClientId = get(attributes, "epStylingOptions.clientId");
    const isClientIdUpdated = !isEqual(clientId, savedClientId);

    if (!isEqual(attributes, prevAttributes) || isClientIdUpdated) {
      const savedSettings = get(attributes, "epStylingOptions") ?? {};

      setAttributes({
        epStylingOptions: {
          ...savedSettings,
          savedStyling: generatedSavedStyles,
          clientId: clientId,
        },
      });
    }
  }, [attributes, currentDeviceType]);

  subscribe(() => {
    const updatedDeviceType = getPreviewDeviceType();

    if (!isEqual(currentDeviceType, updatedDeviceType)) {
      setCurrentDeviceType(updatedDeviceType);
    }
  });

  return <style dangerouslySetInnerHTML={{ __html: generatedStyle }}></style>;
}

export function RenderSavedStyles({ attributes }) {
  const savedStyling = get(attributes, "epStylingOptions.savedStyling");

  return <style dangerouslySetInnerHTML={{ __html: savedStyling }}></style>;
}

// some default compose to make the component less prop receiver
export default compose([
  withSelect((select, { clientId }) => {
    const { getBlock } = select("core/block-editor");
    const { getBlockType } = wp.blocks;
    const { __experimentalGetPreviewDeviceType: getPreviewDeviceType } = select(
      "core/edit-post"
    );
    const currentBlock = getBlock(clientId);
    const blockType = getBlockType(get(currentBlock, "name"));

    return {
      currentBlock,
      attributes: get(currentBlock, "attributes"),
      name: get(currentBlock, "name"),
      getPreviewDeviceType,
      defaultBlockAttributes: get(blockType, "attributes"),
    };
  }),
  withDispatch(
    (dispatch, { clientId, attributes, name, defaultBlockAttributes }) => {
      const { updateBlockAttributes } = dispatch("core/block-editor");

      const setAttributes = (newAttributes) =>
        updateBlockAttributes(clientId, newAttributes);

      return {
        setAttributes,

        /**
         * Will update all the schema of all the css controls used in their respective attributes
         * Including some additional properties for containing responsive and hover detection
         */

        updateControlsSchema() {
          const attributesToUpdate = {};
          const optionAttrKeys = [];
          const settings = get(attributes, "epStylingOptions");
          const defaultAttributeUpdate = {};

          each(settings, (group, optionGroup) => {
            let optionsInCurrentGroup = get(group, "options") || [];

            const responsive = get(group, "responsive") || false;
            const hover = get(group, "hover") || false;

            const responsiveEnabledKey = `${optionGroup}ResponsiveEnabled`;
            const hoverEnabledKey = `${optionGroup}HoverEnabled`;

            if (
              responsive &&
              typeof get(
                attributes,
                `epStylingOptions.${responsiveEnabledKey}`
              ) === "undefined"
            ) {
              defaultAttributeUpdate[responsiveEnabledKey] = false;
            }

            if (
              hover &&
              typeof get(attributes, `epStylingOptions.${hoverEnabledKey}`) ===
                "undefined"
            ) {
              defaultAttributeUpdate[hoverEnabledKey] = false;
            }

            each(optionsInCurrentGroup, (option) => {
              const { attribute = "", control } = option;
              const attributeFound = has(attributes, attribute),
                controlFound = has(epControls, control);
              optionAttrKeys.push(attribute);
              const isCustomControl = get(option, "custom") ?? false;

              if (isCustomControl) {
                return;
              }

              const optionHover =
                typeof get(option, "hover") === "undefined"
                  ? hover
                  : get(option, "hover");
              const optionResponsive =
                typeof get(option, "responsive") === "undefined"
                  ? responsive
                  : get(option, "responsive");

              // displaying some errors
              // checking if the attribute is actually defined in the block before updating it
              if (!attributeFound) {
                console.error(
                  __(
                    `Attribute ${attribute} is not defined in the block ${name}`,
                    TEXT_DOMAIN
                  )
                );
              }

              // checking if the required controller actually exist?
              if (!controlFound) {
                console.error(
                  __(
                    `Undefined Control ${control} in the block ${name}`,
                    TEXT_DOMAIN
                  )
                );
              }

              if (
                attributeFound &&
                controlFound &&
                isEmpty(get(attributes, attribute))
              ) {
                // this means that the attribute and control both are valid and available
                const currentControlSchema = get(
                  epControls,
                  `${control}.schema.default`
                );

                const convertToSchema = get(
                  epControls,
                  `${control}.convertToSchema`
                );

                const defaultDesktopValue = get(option, "defaults.desktop");
                const finalDesktopValue = !isEmpty(defaultDesktopValue)
                  ? convertToSchema(defaultDesktopValue)
                  : currentControlSchema;

                const controlSchema = {
                  desktop: finalDesktopValue,
                };

                // adding responsive holder if the control is responsive
                if (responsive && optionResponsive) {
                  let viewportsModified = [];

                  ["tablet", "mobile"].forEach((viewport) => {
                    const defaultValue = get(option, "defaults." + viewport);

                    controlSchema[viewport] = !isEmpty(defaultValue)
                      ? convertToSchema(defaultValue)
                      : currentControlSchema;

                    // for checking  if these viewport have been modified
                    const modifiedKey = viewport + "Modified";
                    let isModified = false;

                    if (!isEmpty(defaultValue)) {
                      isModified = true;
                    }

                    viewportsModified.push(isModified);
                    controlSchema[modifiedKey] = isModified;
                  });

                  if (viewportsModified.includes(true)) {
                    defaultAttributeUpdate[responsiveEnabledKey] = true;
                  }
                }

                // adding hover holder if the control is hover enabled
                if (hover && optionHover) {
                  const defaultValue = get(option, "defaults.hover");

                  controlSchema["hover"] = !isEmpty(defaultValue)
                    ? convertToSchema(defaultValue)
                    : currentControlSchema;

                  let isModified = false;

                  if (!isEmpty(defaultValue)) {
                    isModified = true;
                  }

                  defaultAttributeUpdate[hoverEnabledKey] = isModified;
                  controlSchema["hoverModified"] = isModified;
                }

                attributesToUpdate[attribute] = controlSchema;
              }

              // initializing with these schema
              setAttributes({
                ...attributesToUpdate,
                epStylingOptions: {
                  ...defaultAttributeUpdate,
                  ...(get(attributes, "epStylingOptions") ?? {}),
                },
              });
            });
          });
        },
      };
    }
  ),
])(RenderStyle);
