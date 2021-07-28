import React from "react";
import GlobalCSS from "../components/advanced/globalCSS";

import { Button, FormToggle, Tip } from "@wordpress/components";
import { connect } from "react-redux";

import { updateAdvancedSettings } from "../redux/actions/advanced/updateAdvancedSettings";
import { saveAdvancedSettings } from "../redux/actions/advanced/saveAdvancedSettings";

import { TEXT_DOMAIN } from "../../global/constants";
import { parseBoolean } from "../../functions";

const { __ } = wp.i18n;

function AdvancedPage(props) {
  const { css, loading, staticFileGeneration } = props.advanced;

  return (
    <div
      className="ep-advanced-page-root"
      style={{ opacity: loading ? ".5" : "1" }}
    >
      <div className="ep-save">
        <Button isDefault isBusy={loading} onClick={props.saveAdvancedSettings}>
          {__("Save", TEXT_DOMAIN)}
        </Button>
      </div>
      <div>
        <div className="ep-option">
          <h3 className="ep-heading" style={{ marginRight: 10 }}>
            {__("Static CSS File Generation", TEXT_DOMAIN)}
          </h3>
          <FormToggle
            disabled={loading}
            onClick={() =>
              props.updateAdvancedSettings(
                !parseBoolean(staticFileGeneration),
                "staticFileGeneration"
              )
            }
            checked={parseBoolean(staticFileGeneration)}
          />
        </div>
        <div className="ep-option">
          <Tip>
            {__(
              "When this option is enabled, the editor plus's inline CSS styles for all pages & global CSS will be served as static minified files. Enabling this option can help improve performance.",
              TEXT_DOMAIN
            )}
          </Tip>
        </div>
      </div>
      <div style={{ marginTop: 40 }}>
        <GlobalCSS
          disabled={loading}
          value={css}
          onChange={(css) => props.updateAdvancedSettings(css, "css")}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { advanced } = state;

  return {
    advanced,
  };
};

const mapDispatchToProps = {
  updateAdvancedSettings,
  saveAdvancedSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedPage);
