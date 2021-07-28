import React from "react";
const { Button } = wp.components;

function DirectoryPagination({ state, setState }) {
  const {
    totalItems = 0,
    totalPages = 0,
    filters: { page },
  } = state;

  const prevPage = () => {
    const prevIndex = ~~page - 1;
    const hasPrevPage = prevIndex > 0;

    if (hasPrevPage) {
      setState({
        ...state,
        filters: {
          ...state.filters,
          page: prevIndex,
        },
      });
    }
  };

  const nextPage = () => {
    const nextIndex = ~~page + 1;
    const hasNextPage = nextIndex <= totalPages;

    if (hasNextPage) {
      setState({
        ...state,
        filters: {
          ...state.filters,
          page: nextIndex,
        },
      });
    }
  };

  const testPageAvailability = (pos) => {
    let disabledProp = { disabled: true };

    const nextIndex = page + 1;
    const hasNextPage = nextIndex > totalPages ? disabledProp : {};

    const prevIndex = page - 1;
    const hasPrevPage = prevIndex <= 0 ? disabledProp : {};

    if (pos === "next") return hasNextPage;
    if (pos === "prev") return hasPrevPage;
  };

  return (
    <div className="ep-td-pagin">
      <span>{totalItems}</span>
      <Button isDefault onClick={prevPage} {...testPageAvailability("prev")}>
        ‹
      </Button>
      <span>{page}</span>
      <span>of</span>
      <span>{totalPages}</span>
      <Button onClick={nextPage} isDefault {...testPageAvailability("next")}>
        ›
      </Button>
    </div>
  );
}

export default DirectoryPagination;
