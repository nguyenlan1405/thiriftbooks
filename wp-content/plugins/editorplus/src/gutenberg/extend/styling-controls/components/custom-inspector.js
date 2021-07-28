import { TEXT_DOMAIN } from "../../../../global/constants";
import { toggleSidebar } from "../utils";

const { InspectorControls } = wp.blockEditor;
const { compose, withState } = wp.compose;
const { useEffect, useState } = wp.element;
const { addAction, applyFilters, removeFilter, removeAction } = wp.hooks;
const { withSelect } = wp.data;
const { isEmpty, isObject, isEqual, get } = lodash;
const { Button, Icon } = wp.components;
const { __ } = wp.i18n;

function CustomInspector({ children, clientId, isSelected }) {
  const [state, setState] = useState({
    currentSidebar: "",
  });

  const updateCurrentSidebar = () => {
    const updatedCurrentSidebar = applyFilters(
      `editor_plus.${clientId}.current_sidebar`,
      ""
    );
    setState({ currentSidebar: updatedCurrentSidebar });
  };

  useEffect(() => {
    return () => {
      removeFilter(
        `editor_plus.${clientId}.current_sidebar`,
        "editor_plus/toggle/sidebar"
      );
      removeAction(
        `editor_plus.${clientId}.update_sidebar`,
        "editor_plus/update/sidebar"
      );
    };
  }, []);

  useEffect(() => {
    addAction(
      `editor_plus.${clientId}.update_sidebar`,
      "editor_plus/update/sidebar",
      updateCurrentSidebar
    );
  }, []);

  useEffect(() => {
    if (!isSelected) {
      toggleSidebar(clientId, "");
    }
  }, [isSelected]);

  const currentSidebar = get(state.currentSidebar, "component");
  const label = get(state.currentSidebar, "label");

  return (
    <InspectorControls>
      {!isEmpty(currentSidebar) && isObject(currentSidebar) && (
        <style>
          {`.components-panel__body.block-editor-block-inspector__advanced { display: none !important; } `}
        </style>
      )}

      {!isEmpty(currentSidebar) && isObject(currentSidebar) ? (
        <div className="ep-styling-sidebar">
          <div className="ep-styling-sidebar-header">
            <span> {__(label, TEXT_DOMAIN)}</span>
            <Button
              className="ep-customized-btn ep-left-icon"
              isSmall
              onClick={() => toggleSidebar(clientId, "")}
            >
              <Icon icon="arrow-left-alt2" size={15} />
              {__("Go Back", TEXT_DOMAIN)}
            </Button>
          </div>
          {currentSidebar}
        </div>
      ) : (
        <div className="ep-sidebar-inspector">{children}</div>
      )}
    </InspectorControls>
  );
}

export default compose([
  withSelect((select, { clientId }) => {
    const { getSelectedBlockClientId } = select("core/block-editor");

    return {
      // for checking if the current block is selected
      isSelected: isEqual(getSelectedBlockClientId(), clientId),
    };
  }),
])(CustomInspector);
