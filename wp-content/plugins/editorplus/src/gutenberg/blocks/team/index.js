import { Fragment } from "react";
import { TEXT_DOMAIN } from "../../../global/constants";
import { controls } from "./style-controls/index";

const {
  StylingControls,
  RenderStyles,
  RenderSavedStyles,
} = editorPlus.components;
const {
  InspectorControls,
  RichText,
  MediaUpload,
  MediaUploadCheck,
} = wp.blockEditor;
const { PanelBody, Button } = wp.components;

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { isEmpty } = lodash;

registerBlockType("ep/team", {
  title: __("Team"),
  icon: "backup",
  category: "common",
  keywords: ["team"],
  attributes: {
    image: {
      type: "object",
      default: "",
    },
    name: {
      type: "string",
      default: "Name",
    },
    position: {
      type: "string",
      default: "Position",
    },
    content: {
      type: "string",
      default:
        "Description for this block. Use this space for describing your block. Any text will do. Description for this block. You can use this space for describing your block.",
    },
    id: {
      type: "string",
      default: "",
    },
    imageWidth: {
      type: "object",
      default: {},
    },
    imageHeight: {
      type: "object",
      default: {},
    },
    imageRadius: {
      type: "object",
      default: {},
    },
    nameTypography: {
      type: "object",
      default: {},
    },
    positionTypography: {
      type: "object",
      default: {},
    },
    contentTypography: {
      type: "object",
      default: {},
    },
    bgColor: {
      type: "object",
      default: {},
    },
    bgPadding: {
      type: "object",
      default: {},
    },
    epStylingOptions: {
      type: "object",
      default: controls,
    },
  },
  edit: (props) => {
    const { className, image, name, position, content } = props.attributes;
    const id = props.clientId;
    const wrapperClass = "ep_team_wrapper__" + id;

    props.setAttributes({
      id: wrapperClass,
    });

    return (
      <div className={`${wrapperClass} ${className}`}>
        <div className={`ep_team_wrapper`}>
          {image ? (
            <img src={image.url} className="ep_team_image" />
          ) : (
            <img
              src="http://localhost/gutenbergblocks/wp-content/uploads/2020/10/placeholder.jpg"
              className="ep_team_image"
            />
          )}
          <RichText
            tag="h4"
            className="ep_team_name"
            value={name}
            onChange={(name) => props.setAttributes({ name })}
            placeholder={__("Name", TEXT_DOMAIN)}
          />
          <RichText
            tag="p"
            className="ep_team_position"
            value={position}
            onChange={(position) => props.setAttributes({ position })}
            placeholder={__("Position", TEXT_DOMAIN)}
          />
          <RichText
            tag="p"
            className="ep_team_content"
            value={content}
            onChange={(content) => props.setAttributes({ content })}
            placeholder={__(
              "Description for this block. Use this space for describing your block. Any text will do. Description for this block. You can use this space for describing your block.",
              TEXT_DOMAIN
            )}
          />
        </div>
        <RenderStyles wrapperClass={wrapperClass} clientId={props.clientId} />
        <InspectorControls>
          <PanelBody title="General">
            <MediaUploadCheck>
              <MediaUpload
                title="Image"
                allowedTypes={["image"]}
                render={({ open }) => (
                  <Button
                    onClick={() => {
                      if (!isEmpty(props.attributes.image)) {
                        props.setAttributes({ image: {} });
                      } else {
                        open();
                      }
                    }}
                    style={{ marginBottom: 20 }}
                    isPrimary
                  >
                    {isEmpty(props.attributes.image)
                      ? "Choose Image"
                      : "Remove Image"}
                  </Button>
                )}
                onSelect={(media) => props.setAttributes({ image: media })}
              />
            </MediaUploadCheck>
          </PanelBody>
          <StylingControls
            initialOpen={false}
            title={__("Image", TEXT_DOMAIN)}
            group="imageStyling"
            options={controls.imageStyling}
          />
          <StylingControls
            initialOpen={false}
            title={__("Name Typography", TEXT_DOMAIN)}
            group="nameStyling"
            options={controls.nameStyling}
          />
          <StylingControls
            initialOpen={false}
            title={__("Position Typography", TEXT_DOMAIN)}
            group="positionStyling"
            options={controls.positionStyling}
          />
          <StylingControls
            initialOpen={false}
            title={__("Content Typography", TEXT_DOMAIN)}
            group="contentStyling"
            options={controls.contentStyling}
          />
          <StylingControls
            initialOpen={false}
            title={__("Background", TEXT_DOMAIN)}
            group="backgroundStyling"
            options={controls.backgroundStyling}
          />
        </InspectorControls>
      </div>
    );
  },

  save: (props) => {
    const { className, id, image, name, position, content } = props.attributes;

    return (
      <div className={`${id} ${className}`}>
        <div className={`ep_team_wrapper`}>
          {!isEmpty(image) ? (
            <img src={image.url} className="ep_team_image" />
          ) : null}
          <h4
            className="ep_team_name"
            dangerouslySetInnerHTML={{
              __html: name,
            }}
          ></h4>
          <p
            className="ep_team_position"
            dangerouslySetInnerHTML={{
              __html: position,
            }}
          ></p>
          <p
            className="ep_team_content"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></p>
        </div>
        <RenderSavedStyles {...props} />
      </div>
    );
  },
});
