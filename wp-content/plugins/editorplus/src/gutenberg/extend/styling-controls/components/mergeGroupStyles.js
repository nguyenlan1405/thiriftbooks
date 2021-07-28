import StylingControls from "../index";
import ControlsPanel from "./controlsPanel";
import ExtendStyle from "../../../components/styling-controls/extendStyle";
const { Fragment, useState, useEffect } = wp.element;
const { compose } = wp.compose;
const { withSelect, withDispatch, subscribe, useSelect } = wp.data;
const { map, get, has, isEqual } = lodash;

function MultiGroupStyling(props) {
  const currentPreviewType = useSelect((select) => {
    const { __experimentalGetPreviewDeviceType } = select("core/edit-post");

    const previewType = __experimentalGetPreviewDeviceType();
    return previewType;
  }, []);

  const [responsiveState, setResponsiveState] = useState("Desktop");
  const { groups = [], title = "", setAttributes, attributes } = props;

  useEffect(() => {
    if (isEqual(currentPreviewType, responsiveState)) return;

    setResponsiveState(currentPreviewType);
  }, [currentPreviewType]);

  const handleResponsiveState = (status) => {
    const selector = wp.data.select("core/edit-post");
    const dispatcher = wp.data.dispatch("core/edit-post");

    if (
      !has(selector, "__experimentalGetPreviewDeviceType") &&
      !has(dispatcher, "__experimentalSetPreviewDeviceType")
    )
      return;

    const currentPreviewType = selector.__experimentalGetPreviewDeviceType();

    if (!isEqual(currentPreviewType, status)) {
      dispatcher.__experimentalSetPreviewDeviceType(status);
    }

    setResponsiveState(status);
  };

  const MappedStyledControls = ({ viewport }) => {
    return map(groups, (group) => {
      const { name, options } = group;

      return (
        <StylingControls
          defaultViewPort={viewport}
          withPanel={false}
          title={title}
          group={name}
          options={options}
          {...props}
        />
      );
    });
  };
  const defaultAttribute = get(attributes, "epStylingOptions");

  /**
   * Will check all the merged group
   * to check if some of the groups require hover
   */

  const getHoverStatus = () => {
    let groupHovers = groups.map((group) => {
      return get(group, "options.hover") ?? true;
    });

    return groupHovers.every((status) => status === false) ? false : true;
  };

  return (
    <Fragment>
      <ControlsPanel
        setAttributes={setAttributes}
        attributes={attributes}
        group={groups}
        title={title}
        isResponsive={true}
        isHover={getHoverStatus()}
        isMultiple
        initialOpen={false}
      >
        <ExtendStyle
          desktop={MappedStyledControls({ viewport: "Desktop" })}
          tablet={MappedStyledControls({ viewport: "Tablet" })}
          mobile={MappedStyledControls({ viewport: "Mobile" })}
          hover={MappedStyledControls({ viewport: "Hover" })}
          responsiveState={responsiveState}
          handleResponsiveState={handleResponsiveState}
          applyHoverState={() => null}
          removeHoverState={() => null}
          attrs={defaultAttribute}
          attr={get(groups, "[0].name")}
          set={setAttributes}
        />
      </ControlsPanel>
    </Fragment>
  );
}

export default compose([
  withSelect((select) => {
    const { getSelectedBlockClientId, getBlock } = select("core/block-editor");

    const clientId = getSelectedBlockClientId();
    const currentBlock = getBlock(clientId);

    return {
      clientId,
      attributes: get(currentBlock, "attributes"),
    };
  }),
  withDispatch((dispatch, { clientId }) => {
    const { updateBlockAttributes } = dispatch("core/block-editor");

    return {
      setAttributes: (newAttributes) =>
        updateBlockAttributes(clientId, newAttributes),
    };
  }),
])(MultiGroupStyling);
