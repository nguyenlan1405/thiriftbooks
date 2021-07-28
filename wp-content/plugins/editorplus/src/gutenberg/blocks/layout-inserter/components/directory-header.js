import React from "react";
import { TEXT_DOMAIN } from "../../../global/constants";

const { __ } = wp.i18n;
const { TextControl } = wp.components;

function DirectoryHeader() {
  return (
    <div className="ep-td-header">
      {/* <div>
        <TextControl placeholder={__("Search...", TEXT_DOMAIN)} />
      </div> */}
      Templates
    </div>
  );
}

export default DirectoryHeader;
