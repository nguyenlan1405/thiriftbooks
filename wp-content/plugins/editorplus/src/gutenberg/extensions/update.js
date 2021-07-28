/**
 *
 * Optimized Utility area for the editor plus extension to update meta fields
 * without any extra function calls resulting in the editor lag
 *
 */

const { subscribe, select } = wp.data;
const { noop } = lodash;

/**
 * @property { string } META_KEY
 */

export class UpdateHandler {
  constructor(META_KEY) {
    this.META_KEY = META_KEY;
  }

  /**
   * Will update the required meta updates when the post saves
   * @param {function} unsubscribe
   * @param {function} callback
   */

  update(unsubscribe, callback) {
    const { isAutosavingPost, isSavingPost, isPublishingPost } = select(
      "core/editor"
    );

    // basically subscribing when the post updates
    if (isAutosavingPost() || isSavingPost() || isPublishingPost()) {
      callback();
      unsubscribe();
    }
  }

  initialize(callback) {
    // null exception
    callback = callback ?? noop;

    // subscribing to whenever the user updates the editor
    const unsubscribe = subscribe(() => this.update(unsubscribe, callback));
  }
}
