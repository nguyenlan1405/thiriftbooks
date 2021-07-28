import React, { Fragment } from "react";
import { TEXT_DOMAIN } from "../../../../global/constants";
const { Tooltip, Toolbar, ToolbarButton, IconButton } = wp.components;

const { BlockControls } = wp.blockEditor;
const { __ } = wp.i18n;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { has, get } = lodash;

function toolbar({
  deleteTab,
  isTabAvailable,
  duplicateTab,
  moveTabUp,
  moveTabDown,
}) {
  return (
    <BlockControls>
      <Toolbar>
        {isTabAvailable() && (
          <Fragment>
            <Tooltip text={__("Move Tab Up", TEXT_DOMAIN)}>
              <IconButton icon="arrow-left-alt2" onClick={moveTabUp} />
            </Tooltip>
            <Tooltip text={__("Move Tab Down", TEXT_DOMAIN)}>
              <IconButton icon="arrow-right-alt2" onClick={moveTabDown} />
            </Tooltip>
            <Tooltip text={__("Delete Tab", TEXT_DOMAIN)}>
              <IconButton icon="trash" onClick={deleteTab} />
            </Tooltip>
            <Tooltip text={__("Duplicate Tab", TEXT_DOMAIN)}>
              <IconButton icon="admin-page" onClick={duplicateTab} />
            </Tooltip>
          </Fragment>
        )}
      </Toolbar>
    </BlockControls>
  );
}

export default compose([
  withSelect((select, { clientId, selectedTab }) => {
    const { getBlock } = select("core/block-editor");

    const currentBlock = getBlock(clientId);
    const currentInnerBlocks = get(currentBlock, "innerBlocks");

    return {
      /**
       * Will return the tab on the given index
       * @param {number} index
       */

      getTabFromIndex(index) {
        if (has(currentInnerBlocks, index)) {
          return get(currentInnerBlocks, index);
        }

        return false;
      },

      /**
       * Will check if current selected tab is available
       * @return {boolean} tab available
       */

      isTabAvailable() {
        return has(currentInnerBlocks, selectedTab);
      },
      currentInnerBlocks,
    };
  }),
  withDispatch(
    (
      dispatch,
      {
        clientId,
        getTabFromIndex,
        selectedTab,
        currentInnerBlocks,
        setSelectedTab,
      }
    ) => {
      const {
        removeBlock,
        moveBlocksUp,
        moveBlocksDown,
        selectBlock,
        duplicateBlocks,
      } = dispatch("core/block-editor");

      return {
        /**
         * will delete the currently selected tab
         */

        deleteTab() {
          const currentTab = getTabFromIndex(selectedTab);
          const tabClientId = get(currentTab, `clientId`);

          removeBlock(tabClientId).then(() => {
            // on success
            let beforeSelectedTab = selectedTab - 1;

            if (has(currentInnerBlocks, beforeSelectedTab)) {
              setSelectedTab(beforeSelectedTab); // setting the current tab position to -1 (if available)
            }

            // after deletion the selection moves to another block therefore
            // selecting the root block again

            selectBlock(clientId);
          });
        },

        /**
         * Will duplicate the current selected tab
         */

        duplicateTab() {
          const currentTab = getTabFromIndex(selectedTab);
          const currentTabClientId = get(currentTab, "clientId");

          duplicateBlocks(
            [currentTabClientId], // client IDS of blocks to duplicate
            clientId // root clientId
          ).then(() => {
            const newTabIndex = selectedTab + 1;

            setSelectedTab(newTabIndex);

            // after duplication the selection moves to another block therefore
            // selecting the root block again
            selectBlock(clientId);
          });
        },

        /**
         * Will move the current selected (tab up) -> (or left in horizontal context)
         */

        moveTabUp() {
          const currentTab = getTabFromIndex(selectedTab);
          const currentTabClientId = get(currentTab, "clientId");
          const newTabIndex = selectedTab - 1; // selecting the before tab because this will move to the left

          if (!has(currentInnerBlocks, newTabIndex)) {
            return; // breaking if no tab are available to move
          }

          moveBlocksUp(
            [currentTabClientId], // client ids of the blocks which will move up
            clientId // client id of root block
          ).then(() => {
            // on success

            setSelectedTab(newTabIndex);
          });
        },

        /**
         * Will move the selected (tab Down) -> or (left in horizontal context)
         */

        moveTabDown() {
          const currentTab = getTabFromIndex(selectedTab);
          const currentTabClientId = get(currentTab, "clientId");
          const newTabIndex = selectedTab + 1; // selecting the after tab because this will move to the right

          if (!has(currentInnerBlocks, newTabIndex)) {
            return; // breaking if no tabs are available to move
          }

          moveBlocksDown(
            [currentTabClientId], // client ids of the blocks which will move up
            clientId // client id of root block
          ).then(() => {
            // on success

            setSelectedTab(newTabIndex);
          });
        },
      };
    }
  ),
])(toolbar);
