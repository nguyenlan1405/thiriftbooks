import LibraryPicker from "./libraryPicker";
import ButtonGroup from "../../buttonGroup";
import { TEXT_DOMAIN } from "../../../../../global/constants";

const { isEqual, get, isEmpty, keys } = lodash;
const { Component, Fragment } = wp.element;
const { FocalPointPicker, Button, TextControl } = wp.components;
const { __ } = wp.i18n;

class MediaPicker extends Component {
  constructor() {
    super();
    this.state = {
      media: {
        backgroundPositionX: 0.5,
        backgroundPositionY: 0.5,
        background: {},
        position: "relative",
        backgroundSize: "",
        backgroundRepeat: "",
        backgroundAttachment: "",
        backgroundPlacement: "back",
      },
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDirectURL = this.handleDirectURL.bind(this);
    this.getMediaSourceType = this.getMediaSourceType.bind(this);
  }

  handleChange(type, value) {
    const { media } = this.state;

    const shouldApplyProperty = !isEqual(media[type], value);

    this.setState({
      media: {
        ...this.state.media,
        [type]: shouldApplyProperty ? value : "",
      },
    });
  }

  componentDidMount() {
    this.setState({ media: this.props.value });
  }

  componentWillUpdate(newProps, newState) {
    if (isEqual(this.state.media, newState.media)) return;

    const { media } = newState;

    this.props.onChange(media);
  }

  handleSelect(newMedia) {
    if (isEmpty(newMedia)) return;

    this.setState({
      media: {
        ...this.state.media,
        background: newMedia,
      },
    });
  }

  handleClear() {
    this.setState({
      media: {
        backgroundPositionX: 0.5,
        backgroundPositionY: 0.5,
        position: "relative",
        background: {},
        backgroundSize: "",
        backgroundRepeat: "",
        backgroundAttachment: "",
        backgroundPlacement: "back",
      },
    });
  }

  /**
   * Handles url directly pasted in the text control rather than uploaded
   * @param { string } value
   */

  handleDirectURL(value) {
    this.handleChange("background", { url: value });
  }

  /**
   * Will return a boolean value indicating weather the current media is uploaded from
   * media library or from a url pasted directly in the text control
   *
   * @return { boolean } sourceType
   */

  getMediaSourceType() {
    const { background } = this.state.media;

    // if the source type is url than there is only the url key-value in the background

    const bgProps = keys(background);
    const sourceType = isEqual(bgProps, ["url"]) ? "url" : "mediaLibrary";

    return sourceType;
  }

  render() {
    const {
      background,
      backgroundPositionX,
      backgroundPositionY,
      backgroundSize,
      backgroundRepeat,
      backgroundAttachment,
      backgroundPlacement,
    } = this.state.media;
    const ALLOWED_TYPES = ["image"];

    const dimensions = {
      width: get(background, "width"),
      height: get(background, "height"),
    };

    const url = get(background, "url");
    const type = get(background, "type");

    const focalValue = {
      x: backgroundPositionX,
      y: backgroundPositionY,
    };

    const supportedBackgroundSizes = [
      {
        label: __("Auto", TEXT_DOMAIN),
        value: "auto",
      },
      {
        label: __("Cover", TEXT_DOMAIN),
        value: "cover",
      },
      {
        label: __("Contain", TEXT_DOMAIN),
        value: "contain",
      },
    ];

    const supportedRepeats = [
      {
        label: __("All", TEXT_DOMAIN),
        value: "repeat",
      },
      {
        label: __("None", TEXT_DOMAIN),
        value: "no-repeat",
      },
      {
        label: __("X", TEXT_DOMAIN),
        value: "repeat-x",
      },
      {
        label: __("Y", TEXT_DOMAIN),
        value: "repeat-y",
      },
    ];

    const supportedAttachments = [
      {
        label: __("Scroll", TEXT_DOMAIN),
        value: "scroll",
      },
      {
        label: __("Fixed", TEXT_DOMAIN),
        value: "fixed",
      },
    ];

    const supportedBackgroundPlacements = [
      {
        label: __("Front", TEXT_DOMAIN),
        value: "front",
      },
      {
        label: __("Back", TEXT_DOMAIN),
        value: "back",
      },
    ];

    const currentSourceType = this.getMediaSourceType();

    if (isEmpty(background)) {
      return (
        <Fragment>
          <TextControl
            label={__("Media Url", TEXT_DOMAIN)}
            placeholder={__("Url...", TEXT_DOMAIN)}
            onChange={this.handleDirectURL}
            value={get(background, "url")}
            type="url"
          />
          <LibraryPicker
            allowed={ALLOWED_TYPES}
            value={background}
            onSelect={this.handleSelect}
            title={__("Background Image", TEXT_DOMAIN)}
          />
        </Fragment>
      );
    } else {
      return (
        <div>
          {currentSourceType === "url" && (
            <TextControl
              label={__("Media Url", TEXT_DOMAIN)}
              placeholder={__("Url...", TEXT_DOMAIN)}
              onChange={this.handleDirectURL}
              value={get(background, "url")}
              type="url"
            />
          )}
          <FocalPointPicker
            url={url}
            dimensions={dimensions}
            value={focalValue}
            onChange={(focalPoint) => {
              this.setState({
                media: {
                  ...this.state.media,
                  backgroundPositionX: focalPoint.x,
                  backgroundPositionY: focalPoint.y,
                },
              });
            }}
          />

          <div className="cwp-opt ep-flexed">
            <span className="ep-flex-1">{__("Size")}</span>
            <div className="ep-flex-2">
              <ButtonGroup
                btnStyles={{
                  fontWeight: 400,
                  fontSize: "12px",
                }}
                multiple={false}
                uniqueValue={[]}
                value={backgroundSize}
                options={supportedBackgroundSizes}
                onChange={(newSize) => {
                  this.handleChange("backgroundSize", newSize);
                }}
              />
            </div>
          </div>
          <div className="cwp-opt ep-flexed">
            <span className="ep-flex-1">{__("Repeat", TEXT_DOMAIN)}</span>
            <div className="ep-flex-2">
              <ButtonGroup
                btnStyles={{
                  fontWeight: 400,
                  fontSize: "12px",
                }}
                multiple={false}
                uniqueValue={[]}
                value={backgroundRepeat}
                options={supportedRepeats}
                onChange={(newRepeat) => {
                  this.handleChange("backgroundRepeat", newRepeat);
                }}
              />
            </div>
          </div>
          <div className="cwp-opt ep-flexed">
            <span className="ep-flex-1">{__("Attachment", TEXT_DOMAIN)}</span>
            <div className="ep-flex-2">
              <ButtonGroup
                btnStyles={{
                  fontWeight: 400,
                  fontSize: "12px",
                }}
                multiple={false}
                uniqueValue={[]}
                value={backgroundAttachment}
                options={supportedAttachments}
                onChange={(newAttachment) => {
                  this.handleChange("backgroundAttachment", newAttachment);
                }}
              />
            </div>
          </div>
          <div className="cwp-opt ep-flexed">
            <span className="ep-flex-1">{__("Placement")}</span>
            <div className="ep-flex-2">
              <ButtonGroup
                btnStyles={{
                  fontWeight: 400,
                  fontSize: "12px",
                }}
                canBeEmptied={false}
                multiple={false}
                uniqueValue={[]}
                value={backgroundPlacement}
                options={supportedBackgroundPlacements}
                onChange={(newPlacement) =>
                  this.handleChange("backgroundPlacement", newPlacement)
                }
              />
            </div>
          </div>

          <div className="ep-clear">
            <Button isSmall isDefault onClick={this.handleClear}>
              {__("Clear Media", TEXT_DOMAIN)}
            </Button>
          </div>
        </div>
      );
    }
  }
}

export default MediaPicker;
