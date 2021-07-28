import { isEmpty, get, map } from "lodash";
const { createBlock } = wp.blocks;
const { getBlock } = wp.data.select("core/block-editor");
const { replaceInnerBlocks, selectBlock } = wp.data.dispatch(
  "core/block-editor"
);

/**
 *
 * @param {The template of blocks} innerBlocksTemplate
 */

export const createBlocksFromInnerBlocksTemplate = (innerBlocksTemplate) => {
  return map(innerBlocksTemplate, ([name, attributes, innerBlocks = []]) =>
    createBlock(
      name,
      attributes,
      createBlocksFromInnerBlocksTemplate(innerBlocks)
    )
  );
};

/**
 *
 * @param {clientId of the target block} clientId
 * @param {slug of the block that will be appended} slug
 * @param {attributes of the block that will be appended} attributes
 *
 */

export function addInnerBlock(clientId, slug, attributes = {}) {
  const currentBlock = getBlock(clientId); // target block
  const currentInnerBlocks = get(currentBlock, "innerBlocks"); // inner blocks of the block where new block will be appended

  if (isEmpty(currentBlock)) return; // checking if the required block is available

  const blockTemplate = [
    [
      slug, // block name/slug
      attributes, // block attribute
      [], // block innerBlocks
    ],
  ];

  const blockToAppend = createBlocksFromInnerBlocksTemplate(blockTemplate); // creating block from the template

  currentInnerBlocks.push(...blockToAppend); // pushing the required innerBlock to the blockInnerBlocks

  replaceInnerBlocks(clientId, currentInnerBlocks); // finally replacing the inner blocks in the editor

  selectBlock(clientId); // selecting the block
}
