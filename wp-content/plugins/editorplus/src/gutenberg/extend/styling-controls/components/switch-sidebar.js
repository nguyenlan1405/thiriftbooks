import { TEXT_DOMAIN } from "../../../../global/constants";

const { __ } = wp.i18n;
const { PanelRow, Button, Icon } = wp.components;
const { get } = lodash;
const { compose } = wp.compose;
const { doAction, addFilter, removeFilter } = wp.hooks;
const { withSelect } = wp.data;
const { Fragment, useEffect } = wp.element;

/**
 * Will render a sidebar switcher for the block styling api
 */

function SwitchSidebar(props) {
  const label = get(props, "label");
  const id = get(props, "id");

  const toggleSidebar = () => {
    addFilter(
      `editor_plus.${props.clientId}.current_sidebar`,
      "editor_plus/toggle/sidebar",
      () => {
        return {
          component: props.children,
          label: label,
        };
      }
    );
    doAction(`editor_plus.${props.clientId}.update_sidebar`);
  };

  useEffect(() => {
    addFilter(
      `editor_plus.${props.clientId}.all_sidebars`,
      "editor_plus/saved/sidebar",
      (sidebars) => {
        return [
          ...sidebars,
          {
            id: id,
            label: label,
            component: props.children,
          },
        ];
      }
    );
  }, []);

  return (
    <Fragment>
      <PanelRow>
        <span>{__(label, TEXT_DOMAIN)}</span>
        <Button
          isSmall
          onClick={toggleSidebar}
          className="ep-customized-btn ep-right-icon"
        >
          <Icon icon="arrow-right-alt2" size={15} />
        </Button>
      </PanelRow>
    </Fragment>
  );
}

export default compose([
  withSelect((select) => {
    const { getSelectedBlockClientId } = select("core/block-editor");

    return {
      clientId: getSelectedBlockClientId(),
    };
  }),
])(SwitchSidebar);
