import { TEXT_DOMAIN } from "../../../../global/constants";

const { updateBlockAttributes } = wp.data.dispatch("core/block-editor");
const { getBlock, getBlockRootClientId } = wp.data.select("core/block-editor");
const { get } = lodash;

const { __ } = wp.i18n;
const { useEffect } = wp.element;
const { RichText, InnerBlocks } = wp.blockEditor;
const $ = jQuery;

function edit(props) {
  const { className, title, isOpen } = props.attributes;
  const id = props.clientId;
  const wrapperClass = "ep_toggle_item_wrapper__" + id;

  const rootToggleClientId = getBlockRootClientId(id);
  const rootToggle = getBlock(rootToggleClientId);

  const rootToggleIcon = get(rootToggle, "attributes.accordionIcon") ?? "";
  const rootToggleActiveIcon =
    get(rootToggle, "attributes.accordionActiveIcon") ?? "";

  const handleToggle = () => {
    props.setAttributes({ isOpen: !isOpen });

    const rootToggleClientId = getBlockRootClientId(id);
    const rootToggle = getBlock(rootToggleClientId);

    const isAccordion = get(rootToggle, "attributes.isAccordion") ?? false;

    if (isAccordion) {
      const siblingToggles = get(rootToggle, "innerBlocks") ?? [];

      siblingToggles.forEach((toggle) => {
        const childClientId = get(toggle, "clientId");

        if (childClientId !== id) {
          updateBlockAttributes(childClientId, { isOpen: false });
        }
      });
    }
  };

  useEffect(() => {
    props.setAttributes({
      icon: rootToggleIcon,
      activeIcon: rootToggleActiveIcon,
    });
  }, [rootToggleIcon, rootToggleActiveIcon]);

  useEffect(() => {
    const containerClass = "." + wrapperClass;
    const containerElement = $(containerClass);

    containerElement.find(".ep_toggle_item_content").slideToggle("fast");
  }, []);

  useEffect(() => {
    const containerClass = "." + wrapperClass;
    const containerElement = $(containerClass);
    const contentContainer = containerElement.find(".ep_toggle_item_content");

    if (isOpen) {
      contentContainer.slideDown("fast");
    } else {
      contentContainer.slideUp("fast");
    }
  }, [isOpen]);

  props.setAttributes({
    id: wrapperClass,
  });

  const template = [
    [
      "core/paragraph",
      {
        content:
          "Content Toggle Block for Gutenberg makes it super easy to create toggle-able content. This toggle block comes with well-thought customization options.",
      },
      [],
    ],
  ];

  return (
    <div className={`${wrapperClass} ${className}`}>
      <div className={`ep_toggle_item_wrapper ${isOpen ? "ep_ti_open" : ""}`}>
        <div className="ep_toggle_item_title" onClick={handleToggle}>
          <span>
            <RichText
              tag="span"
              value={title}
              onChange={(title) => props.setAttributes({ title })}
              placeholder={__("Add title...", TEXT_DOMAIN)}
            />
          </span>
          {isOpen ? (
            <span className={rootToggleActiveIcon}></span>
          ) : (
            <span className={rootToggleIcon}></span>
          )}
        </div>
        <div className="ep_toggle_item_content">
          <InnerBlocks template={template} />
        </div>
      </div>
    </div>
  );
}

export default edit;
