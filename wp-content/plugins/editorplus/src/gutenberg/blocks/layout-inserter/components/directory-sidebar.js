import React from "react";
import axios from "axios";
import { TEXT_DOMAIN } from "../../../global/constants";

const { Spinner, MenuGroup, MenuItem, Button } = wp.components;
const { useState, useEffect } = wp.element;
const categoriesProxy =
  "https://gutenberghub.com/wp-json/wp/v2/all-terms?term=template-category";
const { map, reduce, isEqual, get, set, clone } = lodash;
const { __ } = wp.i18n;

function DirectorySidebar({ state, setState }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { category } = state;

  const fetchCategories = () => {
    setLoading(true);
    setError(false);

    axios
      .get(categoriesProxy)
      .then((response) => {
        const { data } = response;

        setLoading(false);
        setCategories(data);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        console.error(error);
      });
  };

  useEffect(fetchCategories, []);

  const getTotalTemplatesCount = () => {
    const allCounts = map(categories, "count");
    const totalCount = reduce(allCounts, (a, b) => a + b, 0);

    return totalCount;
  };

  const handleActiveMenu = (label) => {
    if (isEqual(category, label))
      return {
        isDefault: true,
        style: {
          fontWeight: 500,
        },
      };

    return {};
  };

  const handleActiveToggle = (nextMenuLabel) => {
    const newState = clone(state);

    if (loading) return;

    set(newState, "category", nextMenuLabel);
    set(newState, "filters", {
      ...state.filters,
      page: 1,
    });

    setState(newState);
  };

  return (
    <div className="ep-td-sidebar">
      {loading && !error && (
        <div className="ep-td-loader">
          <Spinner />
        </div>
      )}
      <MenuGroup>
        {!loading && !error && (
          <MenuItem
            {...handleActiveMenu("all")}
            onClick={() => handleActiveToggle("all")}
            className="ep-td-category-menu-item"
          >
            <span>All</span>
            <span>{getTotalTemplatesCount()}</span>
          </MenuItem>
        )}
        {!loading &&
          !error &&
          map(categories, (category, idx) => {
            const { name = "", count = 0, term_taxonomy_id = 0 } = category;

            return (
              <MenuItem
                {...handleActiveMenu(term_taxonomy_id)}
                onClick={() => handleActiveToggle(term_taxonomy_id)}
                key={idx}
                className="ep-td-category-menu-item"
              >
                <span>{name}</span>
                <span>{count}</span>
              </MenuItem>
            );
          })}
        {!loading && error && (
          <div className="ep-td-loader">
            <p>
              {__("Error While fetching!", TEXT_DOMAIN)}{" "}
              <Button isLink onClick={fetchCategories}>
                {__("Try Again", TEXT_DOMAIN)}
              </Button>
            </p>
          </div>
        )}
      </MenuGroup>
    </div>
  );
}

export default DirectorySidebar;
