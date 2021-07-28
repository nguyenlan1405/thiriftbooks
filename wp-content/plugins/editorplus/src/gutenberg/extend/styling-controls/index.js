import { TEXT_DOMAIN } from "../../../global/constants";
import { epControls } from "./components/controls";
import ControlsPanel from "./components/controlsPanel";
import ExtendStyle from "../../components/styling-controls/extendStyle";
import { ep_Conditions_handler } from "./utilities/class-condition";
import { formatOptionStyling, generateBlockStylings } from "./utils";

const { __ } = wp.i18n;
const {
  has,
  get,
  map,
  isFunction,
  isEmpty,
  each,
  toLower,
  isEqual,
  attempt,
  isError,
} = lodash;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { useEffect, Fragment, useState } = wp.element;
const { useSelect } = wp.data;

function StylingControls(props) {
  const {
    options = [],
    setAttributes,
    attributes,
    title = "",
    group,
    withPanel = true,
    defaultViewPort = "Desktop",
    updateMetaField,
  } = props;

  const currentPreviewType = useSelect((select) => {
    const { __experimentalGetPreviewDeviceType } = select("core/edit-post");

    const previewType = __experimentalGetPreviewDeviceType();
    return previewType;
  }, []);

  const [responsiveState, setResponsiveState] = useState("Desktop");

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

  useEffect(updateMetaField, [attributes]);

  useEffect(() => {
    if (isEqual(responsiveState, currentPreviewType)) return;

    setResponsiveState(currentPreviewType);
  }, [currentPreviewType]);

  const controls = get(options, "options") || [];

  const MappedControls = ({ viewport }) => {
    return (
      <Fragment>
        {map(controls, (option) => {
          const view = toLower(viewport);

          const {
            label = "",
            control = "",
            attribute = "",
            custom = false,
          } = option;
          const ControlComponent = get(epControls, `${control}.component`);
          const value = get(attributes, `${attribute}.${view}`);
          const canAcceptLabel = get(epControls, `${control}.canAcceptLabel`);
          const attrValue = get(attributes, attribute);
          const isAttrFilledWithSchema = !isEmpty(attrValue);

          const controlProps = get(option, "props") || [];
          const optionHover = get(option, "hover");
          const optionResponsive = get(option, "responsive");
          const hasHover =
            typeof optionHover === "undefined" ? true : optionHover;
          const hasResponsive =
            typeof optionResponsive === "undefined" ? true : optionResponsive;

          // checking for conditional control
          const hasConditions = has(option, "show_if");
          const controlConditions = get(option, "show_if");

          let conditionsTester = new ep_Conditions_handler(
            attributes,
            controlConditions
          );

          let isConditionSatisfied = conditionsTester.runTests();

          // if it has advance query conditions
          if (has(option, "condition")) {
            isConditionSatisfied = new ep_Conditions_handler(
              attributes,
              get(option, "condition")
            ).runQuery();
          }

          // skipping current controls when conditions are unsatisfied
          if (!isConditionSatisfied) return;

          // in case user has disabled this control in hover view
          const EpControl = (
            <div className="ep-styling-control-extended">
              {isFunction(ControlComponent) &&
                !isEmpty(label) &&
                !canAcceptLabel && <span>{label}</span>}
              {isFunction(ControlComponent) && (
                <ControlComponent
                  {...controlProps}
                  label={label}
                  viewPort={viewport}
                  attr={attribute}
                  attrs={attributes}
                  value={value}
                  onChange={(css, secondaryArg = null) => {
                    let viewModifiedKey = `${view}Modified`;

                    if (control === "Dimensions") {
                      const updatedValue = {
                        ...value,
                        value: css,
                        unit: secondaryArg,
                      };

                      setAttributes({
                        [attribute]: {
                          ...get(attributes, attribute),
                          [view]: updatedValue,
                          [viewModifiedKey]: true,
                        },
                      });
                    } else {
                      setAttributes({
                        [attribute]: {
                          ...get(attributes, attribute),
                          [view]: css,
                          [viewModifiedKey]: true,
                        },
                      });
                    }
                  }}
                  onImportant={(imp) => {
                    let viewModifiedKey = `${view}Modified`;

                    let updatedValue = {
                      ...value,
                      important: imp,
                    };

                    setAttributes({
                      [attribute]: {
                        ...get(attributes, attribute),
                        [view]: updatedValue,
                        [viewModifiedKey]: true,
                      },
                    });
                  }}
                />
              )}
            </div>
          );

          if (
            view === "hover" &&
            hasHover &&
            isAttrFilledWithSchema &&
            !custom
          ) {
            return EpControl;
          }

          if (view === "desktop" && !custom) {
            return EpControl;
          }

          if (
            !["hover", "desktop"].includes(view) &&
            isAttrFilledWithSchema &&
            hasResponsive &&
            !custom
          ) {
            return EpControl;
          }
          const CustomControl = get(props, control);

          if (custom && isFunction(CustomControl)) {
            return <CustomControl viewport={viewport} />;
          }
        })}
      </Fragment>
    );
  };

  const groupSettings = get(attributes, `epStylingOptions.${group}`),
    hover = get(groupSettings, "hover"),
    responsive = get(groupSettings, "responsive");

  const defaultAttribute = get(attributes, "epStylingOptions");

  const pseudoControls = responsive || hover;

  return (
    <div className="ep-styling-controls__component">
      {pseudoControls && withPanel ? (
        <ControlsPanel
          group={group}
          title={title}
          isResponsive={responsive}
          isHover={hover}
          {...props}
        >
          <ExtendStyle
            desktop={MappedControls({ viewport: "Desktop" })}
            tablet={MappedControls({ viewport: "Tablet" })}
            mobile={MappedControls({ viewport: "Mobile" })}
            hover={MappedControls({ viewport: "Hover" })}
            responsiveState={responsiveState}
            handleResponsiveState={handleResponsiveState}
            applyHoverState={() => null}
            removeHoverState={() => null}
            attrs={defaultAttribute}
            attr={group}
            set={setAttributes}
          />
        </ControlsPanel>
      ) : (
        MappedControls({ viewport: defaultViewPort })
      )}
    </div>
  );
}

export default compose([
  withSelect((select) => {
    const { getBlock, getSelectedBlockClientId } = select("core/block-editor");
    const { getEditedPostAttribute } = select("core/editor");
    const currentClientId = getSelectedBlockClientId();
    const currentBlock = getBlock(currentClientId);
    const attributes = get(currentBlock, "attributes");

    return {
      clientId: currentClientId,
      attributes,
      currentPostMeta: getEditedPostAttribute("meta"),
    };
  }),
  withDispatch(
    (
      dispatch,
      {
        clientId,
        saveToMeta = false,
        metaField,
        currentPostMeta,
        attributes,
        wrapperClass,
      }
    ) => {
      const { updateBlockAttributes } = dispatch("core/block-editor");
      const { editPost } = dispatch("core/editor");

      return {
        /**
         * Will update the custom css in the meta field
         * should only be used when there is a meta field available
         */

        updateMetaField() {
          if (!saveToMeta || isEmpty(metaField)) return;

          const currentBlockMeta = get(currentPostMeta, metaField);
          const isMetaParsable = !isError(
            attempt(JSON.parse, currentBlockMeta)
          );

          if (!isMetaParsable) return;

          const currentBlockParsedMeta = JSON.parse(currentBlockMeta);
          const formattedStyling = formatOptionStyling(attributes);
          const generatedSavedStyles = generateBlockStylings(
            formattedStyling,
            attributes,
            "Desktop",
            false,
            wrapperClass
          );

          currentBlockParsedMeta[clientId] = generatedSavedStyles;

          editPost({
            meta: {
              [metaField]: JSON.stringify(currentBlockParsedMeta),
            },
          });
        },
        setAttributes(newAttributes) {
          updateBlockAttributes(clientId, newAttributes);
        },
      };
    }
  ),
])(StylingControls);
