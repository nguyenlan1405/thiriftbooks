/**
 * ! DEPRECATED SAVE
 */

const { RenderSavedStyles } = editorPlus.components;
const { InnerBlocks } = wp.blockEditor;

function save(props) {
  const { className, id, isAccordion, openFirst } = props.attributes;

  return (
    <div className={`${id} ${className}`}>
      <div
        data-isaccordion={isAccordion}
        data-open_first={openFirst}
        className={`ep_toggles_wrapper`}
      >
        <InnerBlocks.Content />
      </div>
      <RenderSavedStyles {...props} />
    </div>
  );
}

export default save;
