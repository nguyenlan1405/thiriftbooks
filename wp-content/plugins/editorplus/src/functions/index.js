const {
  isEqual,
  isEmpty,
  each,
  get,
  omit,
  omitBy,
  endsWith,
  map,
  assign,
  startsWith,
  isString,
  isArray,
  isNumber,
  has,
  isError,
  attempt,
  trim,
  filter,
  includes,
} = lodash;

import styleToCss from "style-object-to-css-string";
const { getEditedPostAttribute, getBlock } = wp.data.select("core/editor");
const { editPost } = wp.data.dispatch("core/editor");
const { getBlockSupport } = wp.blocks;

export function buildActiveContext(
  initialValue,
  matchValue,
  returnValue,
  defaultValue
) {
  if (isEqual(initialValue, matchValue)) {
    return returnValue;
  }

  return defaultValue;
}
export function id(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function smallFirst(str) {
  let res = str.substring(0, 1).toLowerCase() + str.substring(1, str.length);

  return res;
}

export function convertCamelCase(string) {
  string = string.replace(/([a-z])([A-Z])/g, "$1 $2");
  string = string.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
  return string;
}

export function hasOurClass(classes) {
  if (typeof classes !== "string") return false;

  classes = classes.trim();

  const classList = map(classes.split(" "), (className) =>
    className.replace(/\s/g, "")
  );
  let hasEditorPlusClass = false;
  let exceptions = ["eplus-layer", "eplus-flow"];

  classList.forEach((className) => {
    if (exceptions.includes(className)) return;

    const regExp = /(eplus)[\-\w]+/;

    if (regExp.test(className)) {
      hasEditorPlusClass = true;
    }
  });

  return hasEditorPlusClass;
}

export function getBlockInnerTarget(name, target, isHover = false) {
  const hoverPseudo = isHover ? ":hover" : "";

  if (name === "core/image") {
    return ` img`;
  } else if (name === "core/button") {
    return ` a${hoverPseudo}, .${target} .wp-block-button__link`;
  } else {
    return "";
  }
}

export function filter_empty_css_properties(object) {
  const desktop = omitBy(object.desktop, (value) => isEmpty(value));
  const tablet = omitBy(object.tablet, (value) => isEmpty(value));
  const mobile = omitBy(object.mobile, (value) => isEmpty(value));
  const hover = omitBy(object.hover, (value) => isEmpty(value));
  const before = omitBy(object.before, (value) => isEmpty(value));

  const filtered_object = {
    desktop,
    tablet,
    mobile,
    hover,
    before,
  };

  return filtered_object;
}

/**
 * some css need's to be modified in the gutenberg editor
 * like display: none ; should not be applied in the editor
 */

export function modify_css_according_to_editor(css) {
  let modified_css = {};

  each(css, (css_value, property) => {
    if (isEqual(property, "display")) {
      if (isEqual(css_value, "none")) modified_css["opacity"] = "0.5";
      if (isEqual(css_value, "none !important"))
        modified_css["opacity"] = "0.5 !important";
    } else {
      modified_css[property] = css_value;
    }
  });

  return modified_css;
}

export function convertToStyleTag(
  cssObject,
  target,
  blockName,
  hoverState = [],
  attributes,
  responsiveStatus = "Desktop",
  isEditor = false,
  hoverTarget = "",
  isBlockStyling
) {
  const styles = filter_empty_css_properties(cssObject);

  let { desktop, tablet, mobile, hover, before } = styles;
  // if the responsive is not enabled th  an the desktop css can contain display property
  const wrapperTarget = isEditor
    ? "div.editor-styles-wrapper "
    : ".eplus_styles ";
  const innerTarget = getBlockInnerTarget(blockName, target);
  const hoverInnerTarget = getBlockInnerTarget(blockName, target, true);

  const isHoverState = hoverState.length >= 1;

  if (isEditor) {
    // modifying the css according to the editor
    desktop = modify_css_according_to_editor(desktop);
    tablet = modify_css_according_to_editor(tablet);
    mobile = modify_css_according_to_editor(mobile);
    hover = modify_css_according_to_editor(hover);
  }

  let asString = styleToCss(desktop);
  let secondaryResponsiveCss = "";

  if (responsiveStatus === "Tablet") {
    secondaryResponsiveCss = styleToCss(tablet);
  } else if (responsiveStatus === "Mobile") {
    secondaryResponsiveCss = styleToCss(mobile);
  }

  let styling = `

        ${
          !isEmpty(asString)
            ? `
            ${wrapperTarget}.${target}${innerTarget} {
                ${!isBlockStyling ? `position: relative;` : ""}
                ${asString}
            }
            `
            : ``
        }

        ${
          !isEmpty(secondaryResponsiveCss)
            ? `
            ${wrapperTarget}.${target}${innerTarget} {
              ${!isBlockStyling ? `position: relative;` : ""}
                ${secondaryResponsiveCss}
            }
            `
            : ``
        }

        ${
          !isEmpty(styleToCss(before))
            ? `
            ${wrapperTarget}.${target}${innerTarget}:before {
            content: "" !important;
            ${styleToCss(before)}
         }
        
        `
            : ``
        } 

        ${
          !isEmpty(styleToCss(hover)) && !isHoverState && isEmpty(hoverTarget)
            ? `
            ${wrapperTarget}.${target}${
                isEmpty(hoverInnerTarget) ? "" : " ".concat(hoverInnerTarget)
              }:hover {
                ${styleToCss(hover)}
            }
            `
            : ``
        }
        ${
          !isEmpty(styleToCss(hover)) && !isEmpty(hoverTarget)
            ? `
      ${wrapperTarget} ${hoverTarget} {
        ${styleToCss(hover)}
      }
    `
            : ``
        }

        ${
          isHoverState
            ? ` 
            ${wrapperTarget}.${target}${hoverInnerTarget} {
                ${styleToCss(hover)}
            }
            `
            : ""
        }


        ${
          !isEmpty(styleToCss(tablet))
            ? `

            @media (max-width: 981px) {
              ${wrapperTarget}.${target}${innerTarget} {
                    ${styleToCss(tablet)}
                }
            }

            `
            : ``
        }

        
        ${
          !isEmpty(styleToCss(mobile))
            ? `
            @media (max-width: 600px) {
              ${wrapperTarget}.${target}${innerTarget} {
                    ${styleToCss(mobile)}
                }
            }
            `
            : ``
        }

          
    `;

  return styling.trim();
}

export const basicColorScheme = [
  {
    color: "rgb(247, 141, 167)",
    name: "Pale Pink",
  },
  {
    name: "Vivid red",
    color: "rgb(207, 46, 46)",
  },
  {
    name: "Luminous vivid orange",
    color: "rgb(255, 105, 0)",
  },
  {
    color: "rgb(252, 185, 0)",
    name: "Luminous vivid amber",
  },
  {
    color: "rgb(123, 220, 181)",
    name: "Light green cyan",
  },
  {
    color: "rgb(0, 208, 132)",
    name: "Vivid green cyan",
  },
  {
    color: "rgb(142, 209, 252)",
    name: "Pale cyan blue",
  },
  {
    color: "rgb(6, 147, 227)",
    name: "Vivid cyan blue",
  },
  {
    color: "rgb(155, 81, 224)",
    name: "Vivid purple",
  },
  {
    color: "rgb(238, 238, 238)",
    name: "Very light gray",
  },
  {
    color: "rgb(171, 184, 195)",
    name: "Cyan bluish gray",
  },
  {
    color: "rgb(49, 49, 49)",
    name: "Very dark gray",
  },
];

export function removeBlockMeta(id, META_KEY) {
  const metaData = getEditedPostAttribute("meta"),
    currentStyling = get(metaData, META_KEY);

  let parsedCurrentStyling = JSON.parse(
    isEmpty(currentStyling) ? "{}" : currentStyling
  );

  if (isEmpty(currentStyling)) return;

  const newParsedStyling = omit(parsedCurrentStyling, [id]);

  editPost({ meta: { [META_KEY]: JSON.stringify(newParsedStyling) } });
}

export function rgba(color) {
  const rgb = get(color, "rgb");

  if (isEmpty(rgb)) return;

  const { r, g, b, a } = rgb;

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function extendAttribute(
  extendProperties,
  attr,
  schema,
  withType = true
) {
  let hoverAttr = `${attr}Hover`; // attr name use for hover
  let hoverModifiedAttribute = `${attr}HoverModified`;

  let tabletAttr = `${attr}Tablet`; // attr name use for Tablet
  let modifiedTabletAttr = `${attr}TabletModified`;

  let desktopAttr = `${attr}`; // attr name use for Desktop

  let mobileAttr = `${attr}Mobile`; // attr name use for Mobile
  let modifiedMobileAttr = `${attr}MobileModified`;

  let booleanSchema = withType
    ? {
        type: "boolean",
        default: false,
      }
    : false;

  let hoverEnabled = `${attr}HoverEnabled`;
  let responsiveEnabled = `${attr}ResponsiveEnabled`;

  let attrs = {};

  if (extendProperties.includes("hover")) {
    attrs[hoverAttr] = schema;
    attrs[hoverEnabled] = booleanSchema;
    attrs[hoverModifiedAttribute] = booleanSchema;
  }

  if (extendProperties.includes("responsive")) {
    attrs[responsiveEnabled] = booleanSchema;
    attrs[modifiedTabletAttr] = booleanSchema;
    attrs[modifiedMobileAttr] = booleanSchema;

    [tabletAttr, desktopAttr, mobileAttr].forEach((a) => {
      attrs[a] = schema;
    });
  } else {
    attrs[desktopAttr] = schema;
  }

  return attrs;
}

export function getExtendedAttributes(attributes, view) {
  const extendedAttributes = map(attributes, (_, key) =>
    endsWith(key, view) ? key : null
  );

  const requiredAttributes = extendedAttributes.filter((v) => !isEmpty(v));

  let result = {};

  each(requiredAttributes, (name) => {
    result[name] = get(attributes, name);
  });

  return result;
}

export function getExtendedAttributesName(attributes) {
  const extendedAttributes = map(attributes, (_, key) => {
    if (startsWith(key, "epCustom")) {
      return key;
    }
  });

  const extendedAttrs = extendedAttributes.filter((v) => !isEmpty(v));

  return extendedAttrs;
}

export function buildStylingContext(attributes, stylings) {
  let desktop = {};
  let tablet = {};
  let mobile = {};
  let hover = {};
  let before = {};

  each(stylings, (config, attr) => {
    const callback = get(config, "callback"),
      css = get(config, "css"),
      isObject = get(config, "isObject");

    let hoverAttr = `${attr}Hover`,
      tabletAttr = `${attr}Tablet`,
      desktopAttr = `${attr}`,
      mobileAttr = `${attr}Mobile`;

    const isBeforeAttribute = attr.endsWith("Before");

    if (attr.startsWith("epCustom") && attr.endsWith("Before")) {
      // this styling will be applied to before pseudo element
      assign(before, callback(attributes[attr]));
    }

    let hoverEnabled = `${attr}HoverEnabled`;
    let responsiveEnabled = `${attr}ResponsiveEnabled`;

    if (!isBeforeAttribute) {
      if (!isObject) {
        desktop[css] = callback(attributes[desktopAttr]);

        if (attributes[responsiveEnabled]) {
          tablet[css] = callback(attributes[tabletAttr]);
          mobile[css] = callback(attributes[mobileAttr]);
        }

        if (attributes[hoverEnabled]) {
          hover[css] = callback(attributes[hoverAttr]);
        }
      } else {
        assign(desktop, callback(attributes[desktopAttr]));

        if (attributes[responsiveEnabled]) {
          assign(tablet, callback(attributes[tabletAttr]));
          assign(mobile, callback(attributes[mobileAttr]));
        }

        if (attributes[hoverEnabled]) {
          assign(hover, callback(attributes[hoverAttr]));
        }
      }
    }
  });

  return {
    desktop,
    tablet,
    mobile,
    hover,
    before,
  };
}

export function testAndRemoveUnusedMeta(key) {
  const meta = getEditedPostAttribute("meta");
  const value = get(meta, key);

  if (isEmpty(value)) return;

  const cssObject = JSON.parse(value);

  each(cssObject, (_, clientId) => {
    const block = getBlock(clientId);

    if (isEmpty(block)) {
      removeBlockMeta(clientId, key);
    }
  });
}

export function isSupportedBlock(blockName, support = "") {
  const excludedBlocks = ["core/nextpage"];
  const isCoreBlock = startsWith(blockName, "core/");
  const hasSupport = getBlockSupport(blockName, support);
  if ((isCoreBlock || hasSupport) && !excludedBlocks.includes(blockName)) {
    return true;
  } else {
    return false;
  }
}

export function isBlock(block) {
  if (isError(attempt(JSON.parse, block))) return false;

  const parsedBlock = JSON.parse(block);

  const id = has(parsedBlock, "id") && isNumber(parsedBlock.id);
  const title =
    has(parsedBlock, "title") &&
    isString(parsedBlock.title) &&
    !isEmpty(parsedBlock.title);
  const category =
    has(parsedBlock, "post_categories") &&
    isArray(parsedBlock.post_categories) &&
    !isEmpty(parsedBlock.post_categories);
  const screenshot =
    has(parsedBlock, "screenshot") &&
    isString(parsedBlock.screenshot) &&
    !isEmpty(parsedBlock.screenshot);
  const template =
    has(parsedBlock, "post_template") &&
    isString(parsedBlock.post_template) &&
    !isEmpty(parsedBlock.post_template);
  const slug =
    has(parsedBlock, "slug") &&
    isString(parsedBlock.slug) &&
    !isEmpty(parsedBlock.slug);

  const satisfied = [
    id,
    title,
    category,
    screenshot,
    template,
    slug,
  ].every((condition) => isEqual(condition, true));

  return satisfied;
}

export function isUrl(s) {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regexp.test(s);
}

// stripHTML will strip all the tags from the given html string...

export function stripHTML(string) {
  let strippedString = string.replace(/(<([^>]+)>)/gi, "");

  return strippedString;
}

// isOurAttribute will check if the given attributes name is our applied custom attribute ( & is responsive ) that starts With "epCustom" and for responsive eventually ends With Hover | Tablet | Mobile

export function isOurAttribute(name) {
  const isResponsive =
    endsWith(name, "Tablet") ||
    endsWith(name, "Mobile") ||
    endsWith(name, "Hover");
  const isCustom = startsWith(name, "epCustom");

  return isCustom && isResponsive;
}

// setModificationStatus will update the status of the changed attributes for example if the mobile attribute is changed than it will update the 'epCustomPaddingMobileModified' attribute => true

export function setModificationStatus(
  updatedAttributes,
  attributes,
  setAttributes
) {
  each(updatedAttributes, (_, attr) => {
    const modifiedAttributeName = attr + "Modified";

    if (has(attributes, modifiedAttributeName)) {
      const currentModifiedValue = get(attributes, modifiedAttributeName);

      if (!currentModifiedValue) {
        setAttributes({ [modifiedAttributeName]: true });
      }
    }
  });
}

// getInheritedValues will return the inherited values of the component..
// for example if the viewPort is Tablet and Tablet is not modified than it
// will return the value of desktop ( otherWise will return tablet values i.e "modified" )

export function getInheritedValues(props) {
  const { viewPort, attrs, attr, value } = props;

  const tabletModifiedKey = attr.concat("TabletModified");
  const isTabletModified = get(attrs, tabletModifiedKey);

  const mobileModifiedKey = attr.concat("MobileModified");
  const isMobileModified = get(attrs, mobileModifiedKey);

  const hoverModifiedKey = attr.concat("HoverModified");
  const isHoverModified = get(attrs, hoverModifiedKey);

  if (
    has(attrs, tabletModifiedKey) &&
    has(attrs, mobileModifiedKey) &&
    has(attrs, hoverModifiedKey) &&
    has(attrs, attr)
  ) {
    switch (viewPort) {
      case "Desktop":
        return value;

      case "Tablet":
        if (isTabletModified) {
          return value;
        } else {
          return get(attrs, attr); // inherit desktop value
        }

      case "Mobile":
        if (isMobileModified) {
          return value;
        } else if (isTabletModified) {
          return get(attrs, attr.concat("Tablet")); // inherit desktop value
        } else {
          return get(attrs, attr);
        }

      case "Hover":
        if (isHoverModified) {
          return value;
        } else {
          return get(attrs, attr); //inherit desktop value
        }
    }
  } else {
    let tabModified = get(attrs, `${attr}.tabletModified`);
    let mobModified = get(attrs, `${attr}.mobileModified`);
    let hovModified = get(attrs, `${attr}.hoverModified`);

    // this means this component is used from extended feature
    switch (viewPort) {
      case "Desktop":
        return value;

      case "Tablet":
        if (tabModified) {
          return value;
        } else {
          return get(attrs, `${attr}.desktop`); // inherit desktop value
        }

      case "Mobile":
        if (mobModified) {
          return value;
        } else if (tabModified) {
          return get(attrs, `${attr}.tablet`); // inherit desktop value
        } else {
          return get(attrs, `${attr}.desktop`);
        }

      case "Hover":
        if (hovModified) {
          return value;
        } else {
          return get(attrs, `${attr}.desktop`); //inherit desktop value
        }
    }
  }
}

export const availableDisplayProperties = [
  {
    label: "Block",
    value: "block",
  },
  {
    label: "Inline",
    value: "inline",
  },
  {
    label: "Run-in",
    value: "run-in",
  },
  {
    label: "Flow",
    value: "flow",
  },
  {
    label: "Flow-root",
    value: "flow-root",
  },
  {
    label: "Table",
    value: "table",
  },
  {
    label: "Flex",
    value: "flex",
  },
  {
    label: "Grid",
    value: "grid",
  },
  {
    label: "Table-row-group",
    value: "table-row-group",
  },
  {
    label: "Table-header-group",
    value: "table-header-group",
  },
  {
    label: "Table-footer-group",
    value: "table-footer-group",
  },
  {
    label: "Table-row",
    value: "table-row",
  },
  {
    label: "Table-cell",
    value: "table-cell",
  },
  {
    label: "Table-column-group",
    value: "table-column-group",
  },
  {
    label: "Table-column",
    value: "table-column",
  },
  {
    label: "Table-caption",
    value: "table-caption",
  },
  {
    label: "None",
    value: "none",
  },
  {
    label: "Inline-block",
    value: "inline-block",
  },
  {
    label: "Inline-table",
    value: "inline-table",
  },
  {
    label: "Inline-flex",
    value: "inline-flex",
  },
  {
    label: "Inline-grid",
    value: "inline-grid",
  },
];

export const makeid = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const dividers = [
  `<svg
    fill="#BEC9D6"
    preserveAspectRatio="none"
    viewBox="0 0 1280 140"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <path d="M1280 140V0H0l1280 140z"></path>
  </svg>`,
  `<svg
    fill="#BEC9D6"
    preserveAspectRatio="none"
    viewBox="0 0 1280 140"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <path d="M640 140L1280 0H0z"></path>
  </svg>`,
  `<svg
    fill="#BEC9D6"
    preserveAspectRatio="none"
    viewBox="0 0 1280 140"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <path d="M0 0s573.08 140 1280 140V0z"></path>
  </svg>`,
  `<svg
    fill="#BEC9D6"
    preserveAspectRatio="none"
    viewBox="0 0 1280 140"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <path d="M640 140C286.54 140 0 0 0 0h1280S993.46 140 640 140z"></path>
  </svg>`,

  `<svg
    fill="#BEC9D6"
    preserveAspectRatio="none"
    viewBox="0 0 1280 140"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <path d="M1280 69.65l-320 49.24L320 20.4 0 69.65V0h1280v69.65z"></path>
  </svg>`,
  `<svg
    fill="#BEC9D6"
    preserveAspectRatio="none"
    viewBox="0 0 1280 140"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <path d="M320 28C160 28 80 49 0 70V0h1280v70c-80 21-160 42-320 42-320 0-320-84-640-84z"></path>
  </svg>`,
  `<svg
    fill="#BEC9D6"
    preserveAspectRatio="none"
    viewBox="0 0 1280 140"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <path d="M0 0v100c20 17.3 40 29.51 80 29.51 51.79 0 74.69-48.57 151.75-48.57 73.72 0 91 54.88 191.56 54.88C543.95 135.8 554 14 665.69 14c109.46 0 98.85 87 188.2 87 70.37 0 69.81-33.73 115.6-33.73 55.85 0 62 39.62 115.6 39.62 58.08 0 57.52-46.59 115-46.59 39.8 0 60 22.48 79.89 39.69V0z"></path>
  </svg>`,
  `<svg
    fill="#BEC9D6"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 1280 140"
  >
    <path d="M978.81 122.25L0 0h1280l-262.1 116.26a73.29 73.29 0 0 1-39.09 5.99z"></path>
  </svg>`,
  `<svg
    fill="#BEC9D6"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 1280 140"
  >
    <path d="M156.258 127.903l86.363-18.654 78.684 13.079L411.441 99.4l94.454 10.303L582.82 93.8l82.664 18.728 76.961-11.39L816.109 71.4l97.602 9.849L997.383 50.4l66.285 14.694 70.793-24.494h79.863L1280 0H0v122.138l60.613 9.965z"></path>
  </svg>`,
  `<svg
    fill="#BEC9D6"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 1280 140"
  >
    <path d="M156 35.51l95.46 34.84 120.04.24 71.5 33.35 90.09-3.91L640 137.65l102.39-37.17 85.55 10.65 88.11-7.19L992 65.28l73.21 5.31 66.79-22.1 77-.42L1280 0H0l64.8 38.69 91.2-3.18z"></path>
  </svg>`,
  `<svg
    fill="#BEC9D6"
    preserveAspectRatio="none"
    viewBox="0 0 1280 140"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <path d="M720 140L640 0l-80 140H0V0h1280v140H720z"></path>
  </svg>`,
  `<svg
    fill="#BEC9D6"
    preserveAspectRatio="none"
    viewBox="0 0 1280 140"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <path d="M1280,0H0S0,116.17,0,116.17a79.47,79.47,0,0,1,20.07,2.57,46.91,46.91,0,0,1,78.8-.07,46.76,46.76,0,0,1,21.82,1.62A67.67,67.67,0,0,1,248.93,94.17a46.88,46.88,0,0,1,78.77,33.31c.42.22.84.43,1.25.66a38.38,38.38,0,0,1,8.94,6.92,61.44,61.44,0,0,1,72.79-23.32A61.43,61.43,0,0,1,513.26,90.87a23.42,23.42,0,0,1,25.4-4.8,86,86,0,0,1,150.15,28.37,46.65,46.65,0,0,1,13.56,3.77,46.9,46.9,0,0,1,89.25-.45A67.85,67.85,0,0,1,830.13,134a67.7,67.7,0,0,1,119.73-19.38,43,43,0,0,1,37.93.57,26.07,26.07,0,0,1,27.65-17.54c.16-.28.29-.57.45-.85A86,86,0,0,1,1166.37,98a67.71,67.71,0,0,1,102.21,19,81.66,81.66,0,0,1,11.42-.81Z"></path>
  </svg>`,
];

export function httpQuery(params) {
  const qs = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return qs;
}

export function parseBoolean(str) {
  switch (str) {
    case "true":
      return true;
      break;
    case "false":
      return false;
      break;
    case true:
      return true;
      break;
    case false:
      return false;
      break;
    default:
      return false;
  }
}

export function replaceSelector(css, classes) {
  let classList = isString(classes) ? classes.split(" ") : [];

  if (isArray(classList)) {
    // removing bad classes
    classList = classList.filter((className) => !isEmpty(trim(className)));
    const className = "." + classList.join(".");
    return css.replace(/(\bselector\b)/g, className);
  } else {
    return css;
  }
}

export function hasAnimationClass(classes) {
  const regExp = /(edplus_anim)[\-\w]+/;

  return regExp.test(classes);
}

export function getAnimBlockInnerTarget(name, target, isHover = false) {
  const hoverPseudo = isHover ? ":hover" : "";

  if (name === "core/image") {
    return ` img`;
  } else if (name === "core/button") {
    return ` a${hoverPseudo}, .${target} .wp-block-button__link`;
  } else {
    return "";
  }
}

/**
 * Remove Editor Plus classes from the block
 * @param {string} className
 */

export function removeEditorPlusClasses(className, onlyAnim = false) {
  if (typeof className !== "string") {
    return "";
  }

  let classList = className.split(" ");
  classList = filter(classList, (className) => {
    let condition = onlyAnim
      ? startsWith(className, "edplus_anim-")
      : startsWith(className, "eplus-") ||
        startsWith(className, "edplus_anim-");

    if (condition) {
      return false;
    }
    return true;
  });

  return classList.join(" ");
}

export function changeGeneratedClass(styling, block) {
  const epGeneratedClass = get(block, "attributes.epGeneratedClass");

  const newStyling = replace(
    styling,
    /(\.eplus-|\.edplus_anim-)(\w+)/g,
    ".".concat(epGeneratedClass)
  );

  return newStyling;
}
/**
 * Check if the given block slug/name is supported by the editor plus pro features
 * @param {string} blockName
 * @return {boolean}
 */

export function isBlockSupported(blockName) {
  // currently supporting core blocks only
  return startsWith(blockName, "core/");
}

/**
 * Will parse value of css properties such as 100px !important -> 100px
 */

export function parsePropertyValue(property, defaultValue) {
  if (typeof property !== "string") return defaultValue;

  const regExp = /([\s\S]*?)(\s?!important)/;
  const hasImportant = /(!important)/.test(property);

  const groupIndex = 1; // regex group index

  const result = property.match(regExp);
  const capturedGroup = hasImportant ? get(result, groupIndex) : property;

  if (has(result, groupIndex) || !hasImportant) {
    return !isNaN(capturedGroup) ? ~~capturedGroup : capturedGroup;
  }

  return defaultValue;
}

function filterUnusedAttributes(attributes, slug) {
  const blockType = wp.blocks.getBlockType(slug);

  if (_.isEmpty(blockType)) return {};

  const defaultAttributes = lodash.get(blockType, "attributes");

  const filteredAttributes = lodash.omitBy(attributes, (value, attr) => {
    const defaultValue = lodash.get(defaultAttributes, `${attr}.default`);

    return _.isEqual(defaultValue, value);
  });

  return filteredAttributes;
}

export function getSelectedBlockTemplate(rootBlock = null) {
  const template = [];
  const selectedBlock = _.isEmpty(rootBlock)
    ? wp.data.select("core/block-editor").getSelectedBlock()
    : rootBlock;

  const thisName = selectedBlock.name;
  const thisAttr = filterUnusedAttributes(selectedBlock.attributes, thisName);
  const thisInnerBlocks = selectedBlock.innerBlocks;

  const thisTemplate = [thisName, thisAttr];

  if (!_.isEmpty(thisInnerBlocks)) {
    thisTemplate.push(mapInnerBlocksAsTemplate(thisInnerBlocks));
    template.push(thisTemplate);
  } else {
    template.push(thisTemplate);
  }

  return [...template];
}

function mapInnerBlock(innerBlock) {
  const template = [
    innerBlock.name,
    filterUnusedAttributes(innerBlock.attributes, innerBlock.name),
    [],
  ];

  if (!_.isEmpty(innerBlock.innerBlocks)) {
    innerBlock.innerBlocks.forEach((child) => {
      template[2].push(...getSelectedBlockTemplate(child));
    });
  }

  return template;
}

function mapInnerBlocksAsTemplate(innerBlocks) {
  const template = [];

  innerBlocks.forEach((childBlock) => {
    template.push(mapInnerBlock(childBlock));
  });

  return template;
}

/***
 * Will add the custom class to the classList
 */

export function addClass(classToAdd, className) {
  if (typeof className !== "string") return false;

  let classList = className.split(" ");

  if (!includes(classList, classToAdd)) {
    classList.push(classToAdd);
  }

  return classList.join(" ");
}

/***
 * Will remove the custom class
 */

export function removeClass(classToRemove, className) {
  if (typeof className !== "string") return false;

  let classList = className.split(" ");

  classList = classList.filter((c) => !isEqual(c, classToRemove));

  return classList.join(" ");
}

/***
 * Will remove the custom class
 */

export function hasClass(classToTest, className) {
  if (typeof className !== "string") return false;

  let classList = className.split(" ");

  return classList.includes(classToTest);
}
