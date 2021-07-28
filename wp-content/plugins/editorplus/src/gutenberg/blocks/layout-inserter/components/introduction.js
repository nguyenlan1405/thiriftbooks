import React from "react";
import { TEXT_DOMAIN } from "../../../global/constants";
const { __ } = wp.i18n;
const { Placeholder, Button } = wp.components;

function Introduction({ onRequestSelection }) {
  return (
    <Placeholder
      icon="admin-appearance"
      label={__("Select a Gutenberghub Layout", TEXT_DOMAIN)}
    >
      <Button isDefault onClick={onRequestSelection}>
        Open Directory
      </Button>
    </Placeholder>
  );
}

export default Introduction;
