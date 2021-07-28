import React from "react";
import axios from "axios";
import Template from "./directory-template";
import { Spinner } from "@wordpress/components";
import { httpQuery } from "../../../functions";
import Pagination from "./directory-pagination";

const { useState, useEffect, Fragment } = wp.element;
const templateProxy =
  "https://gutenberghub.com/wp-json/wp/v2/templates-library?_embed";
const { map, get, isNumber, isEqual } = lodash;

function DirectoryContent({ state, setState, clientId }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { category, filters } = state;

  const passState = {
    state,
    setState,
  };

  const getTemplates = (query = {}) => {
    setLoading(true);
    setError(false);

    const http_query = "&" + httpQuery(query) + "&" + httpQuery(state.filters);
    const queriedProxy = templateProxy + http_query;

    axios
      .get(queriedProxy)
      .then((response) => {
        const totalPages = get(response.headers, "x-wp-totalpages");
        const totalItems = get(response.headers, "x-wp-total");

        setLoading(false);
        setData(response.data);
        setState({
          ...state,
          totalPages,
          totalItems,
        });
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.error(err);
      });
  };

  const updateTemplates = () => {
    const isValidCategory = isNumber(category);
    const isCategoryApplied = !isEqual(category, "all");

    if (isValidCategory && isCategoryApplied) {
      getTemplates({
        "template-category": category,
      });
    } else if (!isValidCategory && !isCategoryApplied) {
      getTemplates();
    }
  };

  useEffect(getTemplates, []);
  useEffect(updateTemplates, [category, filters]);
  const hasLoaded = !loading && !error;

  return (
    <div className="ep-directory-content">
      {hasLoaded && (
        <Fragment>
          {map(data, (post, idx) => (
            <Template data={post} key={idx} clientId={clientId} />
          ))}
          <Pagination {...passState} />
        </Fragment>
      )}
      {!hasLoaded && (
        <div className="ep-td-loader">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default DirectoryContent;
