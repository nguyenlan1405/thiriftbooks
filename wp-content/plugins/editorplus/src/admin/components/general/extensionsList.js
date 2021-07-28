import React from "react";

import { connect } from "react-redux";
import Extension from "./extension";

const { map, isEmpty } = lodash;

function ExtensionsList(props) {
  const extensions = !isEmpty(props.extensions.data)
    ? props.extensions.data
    : {};

  return (
    <div>
      <h1 className="ep-heading">Extensions</h1>
      {map(extensions, (value, key) => {
        return <Extension name={key} {...value} />;
      })}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { extensions } = state;

  return {
    extensions,
  };
};

export default connect(mapStateToProps, null)(ExtensionsList);
