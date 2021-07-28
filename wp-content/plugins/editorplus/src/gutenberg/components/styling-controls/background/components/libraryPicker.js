import { TEXT_DOMAIN } from "../../../../../global/constants";

const { toLower } = lodash;

const { Component } = wp.element;
const { MediaUpload, MediaUploadCheck } = wp.editor;
const { Button } = wp.components;
const { __ } = wp.i18n;

class LibraryPicker extends Component {
  render() {
    const { title, allowed, onSelect, value } = this.props;
    const instructions = (
      <p>
        {__(
          `To edit the ${toLower(title)}, you need permission to upload media.`,
          TEXT_DOMAIN
        )}
      </p>
    );

    return (
      <div className="ep-media-picker">
        <MediaUploadCheck fallback={instructions}>
          <MediaUpload
            title={__(title, TEXT_DOMAIN)}
            onSelect={onSelect}
            allowedTypes={allowed}
            value={value}
            render={({ open }) => (
              <Button
                className="editor-post-featured-image__toggle"
                onClick={open}
              >
                {__(`Set ${title}`, TEXT_DOMAIN)}
              </Button>
            )}
          />
        </MediaUploadCheck>
      </div>
    );
  }
}

export default LibraryPicker;
