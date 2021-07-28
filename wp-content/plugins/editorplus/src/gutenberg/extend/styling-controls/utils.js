import { epControls } from "./components/controls";
import { convertToStyleTag } from "../../../functions";
import { ep_Conditions_handler } from "./utilities/class-condition";
const { get, each, pickBy, isObject, isEmpty, trim, filter, has } = lodash;
const { addFilter, doAction, applyFilters } = wp.hooks;

/**
 * Will parse all the handlebars instances and will return an array of found instances
 * @param {string}
 * @return {array} handlebars
 */

export function parseHandlebars(string) {
  if (typeof string !== "string") return [];

  var foundHandleBars = string.match(/{{{?(#[a-z:]+ )?[a-z:]+.[a-z:]*}?}}/gi);

  return foundHandleBars ?? [];
}

/**
 * Will modify the css output value according to the key customValue
 * @param { string } value
 * @param { string } modifiedStructureValue
 * @param { SchemaValue } currentValue
 * @param { viewport } currentViewport
 *
 * @return { string } modifiedValue
 */

export function modifyValueAccordingToStructure(
  value,
  modifiedStructureValue,
  currentValue,
  attributes,
  viewport
) {
  if (
    typeof value !== "string" ||
    typeof value === "undefined" ||
    value === ""
  ) {
    return value;
  }

  if (isEmpty(modifiedStructureValue)) {
    return value;
  }

  let isImportant = /(!important)/.test(value);

  if (isImportant) {
    value = value.replace(/(!important)/g, "");
  }

  // replacing the {{important}} rule to force importance
  modifiedStructureValue = modifiedStructureValue.replace(
    /{{important}}/g,
    isImportant ? "!important" : ""
  );
  // replacing the {{value}} rule to apply value rule
  modifiedStructureValue = modifiedStructureValue.replace(/{{value}}/g, value);

  /**
   *
   * searching/handling for controller values
   * @example {{Range:offset:auto}}
   *
   * */

  let handleBars = parseHandlebars(modifiedStructureValue);

  handleBars.forEach((handleBar) => {
    // checking if it's controller replacer value
    let currentValue = handleBar.replace(/[{}]/g, "");
    let [
      optionController = "",
      optionAttr = "",
      optionViewport = "",
      optionDefault = "",
    ] = currentValue.split(":");

    console.log(currentValue);

    // safety check
    if (
      isEmpty(optionController) ||
      isEmpty(optionAttr) ||
      isEmpty(optionViewport) ||
      !has(epControls, optionController)
    )
      return;

    let requiredConvertedValue = epControls[optionController].convert(
      get(
        attributes,
        `${optionAttr}.${optionViewport === "auto" ? viewport : optionViewport}`
      )
    );

    // replacing default value if empty
    if (isEmpty(requiredConvertedValue)) {
      requiredConvertedValue = optionDefault;
    }

    modifiedStructureValue = modifiedStructureValue.replace(
      `{{${optionController}:${optionAttr}:${optionViewport}:${optionDefault}}}`,
      requiredConvertedValue
    );
  });

  return modifiedStructureValue;
}

/**
 * Will format the epStylingOptions attribute for building styles
 * @param   {object} attributes
 * @return  {object} formattedStyles
 */

export function formatOptionStyling(attributes) {
  let settings = get(attributes, "epStylingOptions");
  // formatted output

  let newSettings = pickBy(settings, isObject);
  let styles = [];

  each(newSettings, (setting, optionGroup) => {
    let newTargetStyles = {
      target: "",
      desktop: {},
      tablet: {},
      mobile: {},
      hover: {},
      pseudo: {},
    };

    const options = get(setting, "options");
    const isResponsive = get(setting, "responsive") || false;
    const isHover = get(setting, "hover") || false;
    const responsiveEnabled = get(settings, `${optionGroup}ResponsiveEnabled`);
    const hoverEnabled = get(settings, `${optionGroup}HoverEnabled`);
    const target = get(setting, "target");
    const hoverTarget = get(setting, "hoverTarget");

    newTargetStyles["includeDotSuffix"] =
      get(setting, "includeDotSuffix") ?? true;

    newTargetStyles["target"] = target;

    if (!isEmpty(hoverTarget)) {
      newTargetStyles["hoverTarget"] = hoverTarget;
    }

    each(options, (option) => {
      const {
        attribute = "",
        control = "",
        css = "",
        custom = false,
        customValue = "",
        pseudoSelector = "",
      } = option;
      const convert = get(epControls, `${control}.convert`);
      const isObject = get(epControls, `${control}.isObject`);

      if (css === "" && !isObject) return;

      // checking for conditions
      const hasCondition = has(option, "show_if");
      const optionCondition = get(option, "show_if");

      const conditionsTester = new ep_Conditions_handler(
        attributes,
        optionCondition
      );
      let isConditionSatisfied = conditionsTester.runTests();

      // it means the option required advance query
      if (has(option, "condition")) {
        isConditionSatisfied = new ep_Conditions_handler(
          attributes,
          get(option, "condition")
        ).runQuery();
      }

      if (custom) return;
      if (!isConditionSatisfied) return;

      const optionValue = get(attributes, attribute);

      const desktopValue = get(optionValue, "desktop");
      const convertedDesktopValue = modifyValueAccordingToStructure(
        convert(desktopValue, css),
        customValue,
        optionValue,
        attributes,
        "desktop"
      );

      if (!isEmpty(trim(convertedDesktopValue))) {
        if (!isObject) {
          newTargetStyles["desktop"][css] = convertedDesktopValue;
        } else {
          newTargetStyles["desktop"] = {
            ...newTargetStyles["desktop"],
            ...convertedDesktopValue,
          };
        }
      }

      if (isResponsive && responsiveEnabled) {
        ["tablet", "mobile"].forEach((viewport) => {
          const viewportValue = get(optionValue, viewport);
          const convertedValue = modifyValueAccordingToStructure(
            convert(viewportValue, css),
            customValue,
            viewportValue,
            attributes,
            viewport
          );

          const isValid = !isEmpty(trim(convertedValue));

          if (isValid) {
            if (!isObject) {
              newTargetStyles[viewport][css] = convertedValue;
            } else {
              newTargetStyles[viewport] = {
                ...newTargetStyles[viewport],
                ...convertedValue,
              };
            }
          }
        });
      }

      if (isHover && hoverEnabled) {
        const hoverValue = get(optionValue, "hover");
        const convertedValue = modifyValueAccordingToStructure(
          convert(hoverValue, css),
          customValue,
          hoverValue,
          attributes,
          "hover"
        );

        if (!isEmpty(trim(convertedValue))) {
          if (isObject) {
            newTargetStyles["hover"] = {
              ...newTargetStyles["hover"],
              ...convertedValue,
            };
          } else {
            newTargetStyles["hover"][css] = convertedValue;
          }
        }
      }
    });

    styles.push(newTargetStyles);
  });

  return styles;
}

/**
 * Will generate the styling for the block
 * @param {object} formattedStyles
 */

export function generateBlockStylings(
  formattedStyles,
  attributes,
  viewPort = "Desktop",
  isEditor = true,
  wrapperClass = ""
) {
  let styling = "";

  each(formattedStyles, (styleGroup, currentViewPort) => {
    let { target, includeDotSuffix } = styleGroup;
    let hoverTarget = get(styleGroup, "hoverTarget") ?? "";

    let suffix = includeDotSuffix ? "." : "";

    target = !isEmpty(target)
      ? suffix + target.replace(/{{class}}/g, "." + wrapperClass)
      : "";

    if (!isEmpty(hoverTarget)) {
      hoverTarget = hoverTarget.replace(/{{class}}/g, "." + wrapperClass);
    }

    let scopedTarget = wrapperClass + " " + target;

    const converted_style = convertToStyleTag(
      styleGroup,
      scopedTarget,
      "",
      [],
      attributes,
      viewPort,
      isEditor,
      hoverTarget,
      true
    );

    styling += converted_style;
  });

  return styling;
}

/**
 * Will switch the sidebar to desired styling element sidebar
 * @param {string} blockClientId
 * @param {string} editorplusSidebarId
 */

export function toggleSidebar(clientId, sidebarId) {
  const savedBlockSidebars = applyFilters(
    `editor_plus.${clientId}.all_sidebars`,
    []
  );

  const sidebarToSwitch = filter(savedBlockSidebars, { id: sidebarId });
  const component = get(sidebarToSwitch, "[0].component");
  const label = get(sidebarToSwitch, "[0].label");

  addFilter(
    `editor_plus.${clientId}.current_sidebar`,
    "editor_plus/toggle/sidebar",
    () => {
      return {
        component: component,
        label: label,
      };
    }
  );
  doAction(`editor_plus.${clientId}.update_sidebar`);
}
