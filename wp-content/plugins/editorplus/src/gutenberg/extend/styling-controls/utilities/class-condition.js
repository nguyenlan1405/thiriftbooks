import { epControls } from "../components/controls";
const { each, isEqual, isEmpty, get, includes, toLower } = lodash;

/**
 * Will handle all the condition that need's to be checked before rendering
 * a styling control
 *
 * @property { object } attributes - Block Attributes
 * @property { object } condition - Conditions object
 */

export class ep_Conditions_handler {
  constructor(attributes, conditions, clientId) {
    this.attributes = attributes;
    this.conditions = conditions;
    this.clientId = clientId;
  }

  /***
   * Will compare the fieldValue with the given value
   * according to given rule
   */

  compareValue(fieldValue, value, compare, controlledBy = "") {
    let fieldControl = get(epControls, controlledBy);

    if (!isEmpty(controlledBy) && !isEmpty(fieldControl)) {
      fieldValue = fieldControl.convert(fieldValue);
    }

    if (typeof fieldValue === "string") {
      fieldValue = fieldValue.trim();
    }

    if (typeof value === "string") {
      value = value.trim();
    }

    switch (compare) {
      case "EQUAL":
        return isEqual(fieldValue, value);
        break;

      case "NOT EQUAL":
        return !isEqual(fieldValue, value);
        break;

      case "INCLUDES":
        return includes(fieldValue, value);
        break;
      case "IN":
        if (typeof fieldValue === "string") {
          return fieldValue.indexOf(value) !== -1;
        }

      case "NOT IN":
        if (typeof fieldValue === "string") {
          return fieldValue.indexOf(value) === -1;
        }

      default:
        return false;
    }
  }

  /**
   * Will run advance query tests for given condition
   */

  runQuery() {
    const { attributes, conditions } = this;
    let selector = wp.data.select("core/edit-post");

    const blockProps = {
      attributes,
      viewport: toLower(selector.__experimentalGetPreviewDeviceType()),
    };

    const relation = get(conditions, "relation") ?? "AND";
    const queries = get(conditions, "query") ?? [];
    let queryResults = [];

    each(queries, (query) => {
      if (query instanceof Object && !Array.isArray(query)) {
        let field = get(query, "field"),
          compare = get(query, "compare"),
          value = get(query, "value"),
          controlledBy = get(query, "controlledBy") ?? "";

        let isQuerySatisfied = false;

        let fieldValue = get(blockProps, field);

        isQuerySatisfied = this.compareValue(
          fieldValue,
          value,
          compare,
          controlledBy
        );
        queryResults.push(isQuerySatisfied);
      }

      if (Array.isArray(query)) {
        // this means there is nested condition
        // resolving it by recursive approach
        let nestedCondition = new ep_Conditions_handler(
          attributes,
          get(query, 0),
          this.clientId
        );

        queryResults.push(nestedCondition.runQuery());
      }
    });

    if (relation === "AND") {
      return queryResults.every((result) => result === true);
    }

    if (relation === "OR") {
      return queryResults.some((result) => result === true);
    }

    return false;
  }

  /**
   * Will run some tests based on the given conditions
   * and provide results
   * ! DEPRECATED @use runQuery method
   * @return { boolean } condition satisfaction
   */

  runTests() {
    const { attributes, conditions } = this;

    let conditionResults = [];

    let className = get(attributes, "className");
    let classList = className ? className.split(" ") : [];

    each(conditions, (attrValue, attrName) => {
      const currentAttrValue = get(attributes, attrName);
      const isClassAttr = isEqual(attrName, "className");
      let isSatisfied = true;

      if (isClassAttr) {
        isSatisfied = attrValue.every((blockClass) =>
          includes(classList, blockClass)
        );
      }

      if (!isEqual(currentAttrValue, attrValue) && !isClassAttr) {
        isSatisfied = false;
      }

      conditionResults.push(isSatisfied);
    });

    return conditionResults.every((condition) => condition === true);
  }
}
