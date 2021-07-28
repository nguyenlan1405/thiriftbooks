import React, { useState } from "react";
import CodeEditor from "../../../components/code-editor/index";

function GlobalCSS(props) {
  const classes = `ep-global-css ${props.disabled ? "is-loading" : ""}`;

  return (
    <div className={classes}>
      <h1 className="ep-heading">Global CSS</h1>
      <CodeEditor
        mode="css"
        readOnly={props.disabled}
        onChange={props.onChange}
        value={props.value}
        maxLines={20}
        minLines={5}
        fontSize="18px"
        height="600px"
      />
    </div>
  );
}

export default GlobalCSS;
