import React from "react";
import { FormToggle } from "@wordpress/components";
import { connect } from "react-redux";
const { isEqual } = lodash;

// actions

import { toggleExtension } from "../../redux/actions/extension/toggle";

function Extension(props) {
  const { name, title, description, enabled } = props;

  const loadingExt = props.extensions.loading.name;

  return (
    <div
      className={`ep-extension ${
        isEqual(name, loadingExt) ? "is-loading" : ""
      }`}
    >
      <div className="enable">
        <FormToggle
          label={"Enable"}
          checked={enabled}
          onChange={() => props.toggleExtension(name, !enabled)}
        />
      </div>
      <div className="content">
        <h1 className="ep-heading">{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  toggleExtension,
};

const mapStateToProps = (state) => {
  const { extensions } = state;

  return {
    extensions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Extension);
