import React, { useState, useEffect } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { buildActiveContext, smallFirst } from "../../../functions";
import { connect } from "react-redux";
const { get } = lodash;

function Header({ location: { search, pathname, hash }, history, extensions }) {
  const [pages, setPages] = useState(["General", "Blocks", "Advanced"]);

  const testRequirements = () => {
    const isExtEnabled = get(extensions, "data.register_blocks.enabled");

    const isExtensionEnabled =
      isExtEnabled === true || isExtEnabled === "1" ? true : false;

    if (!isExtensionEnabled) {
      setPages(["General", "Advanced"]);
    } else {
      setPages(["General", "Blocks", "Advanced"]);
    }
  };

  useEffect(() => {
    testRequirements();
  }, []);

  useEffect(() => {
    testRequirements();
  }, [extensions]);

  const navigate = (h) => history.push(h);

  return (
    <div className="ep-header">
      <div className="ep-content">
        <div className="ep-logo">
          <h1 className="ep-heading">
            <span className="dashicons dashicons-plus"></span> Editor{" "}
            <span className="ep_version">2.8.1</span>
          </h1>
          <p>
            EditorPlus extends Gutenberg editor with advanced design controls
            and more features. It adds the missing features to the WordPress
            editor that helps you create awesome websites faster.
          </p>
        </div>
        <nav className="ep-navigation">
          <ul>
            {pages.map((page) => {
              return (
                <li
                  className={buildActiveContext(
                    hash,
                    `#/${smallFirst(page)}`,
                    "active",
                    ""
                  )}
                  onClick={() =>
                    navigate({
                      pathname,
                      search,
                      hash: `#/${smallFirst(page)}`,
                    })
                  }
                >
                  {page}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { extensions } = state;

  return {
    extensions,
  };
};

export default connect(mapStateToProps, null)(withRouter(Header));
