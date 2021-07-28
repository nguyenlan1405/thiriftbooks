import React, { Context } from "react";
import Sidebar from "./directory-sidebar";
import Content from "./directory-content";

const { useState, useEffect } = wp.element;

function Directory(props) {
  const [state, setState] = useState({
    totalItems: 0,
    totalPages: 0,
    category: "all",
    filters: {
      per_page: 10,
      page: 1,
    },
  });

  const passState = {
    state,
    setState,
    ...props,
  };

  return (
    <div className="ep-directory-main">
      <div className="root">
        <Sidebar {...passState} />
        <Content {...passState} />
      </div>
    </div>
  );
}

export default Directory;
