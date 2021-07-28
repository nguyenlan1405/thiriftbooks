import { Fragment } from "react";
import { TEXT_DOMAIN } from "../../../global/constants";
import controls from "./style-controls/controls.json";
import EpIcons from "../../components/icon";

const {
  StylingControls,
  RenderStyles,
  RenderSavedStyles,
  InspectorControls,
  SwitchSidebar,
  RenderMultiStyles,
} = editorPlus.components;

const { toggleSidebar } = editorPlus.actions;

const { __ } = wp.i18n;
const {
  MediaUpload,
  MediaUploadCheck,
  BlockControls,
  URLPopover,
} = wp.blockEditor;

const {
  PanelBody,
  SelectControl,
  TextControl,
  Button,
  FormToggle,
  RangeControl,
  Icon,
  Placeholder,
  ExternalLink,
  ToolbarButton,
  Toolbar,
  ToggleControl,
} = wp.components;

const { useState } = wp.element;

const { isEmpty, get, truncate } = lodash;

function edit(props) {
  const [editingHref, setEditingHrefStatus] = useState(false);
  const [modifyHref, setModifyHrefStatus] = useState(false);

  const {
    className,
    sourceMedia,
    sourceUrl,
    loop,
    autoplay,
    onHover,
    animationSpeed,
    href,
    hrefTarget,
  } = props.attributes;

  const id = props.clientId;
  const wrapperClass = "ep_lottie_wrapper__" + id;

  const isValidURL = (str) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };

  const getSourceType = () => {
    if (!isEmpty(sourceUrl)) {
      return "url";
    } else if (!isEmpty(sourceMedia)) {
      return "media";
    }

    return source;
  };

  const source = getSourceType();
  const hasSource =
    !isEmpty(sourceMedia) || (!isEmpty(sourceUrl) && isValidURL(sourceUrl));

  props.setAttributes({
    id: wrapperClass,
  });

  let lottie_markup = `<lottie-player src="${
    source === "media" ? get(sourceMedia, "url") : sourceUrl
  }" class="ep_lottie_player" speed="${animationSpeed}" ${
    loop ? "loop" : ""
  } autoplay="${autoplay}" ${onHover ? "hover" : ""}></lottie-player>`;

  const advancedOptions = (
    <ToggleControl
      label={__("Open in new tab", TEXT_DOMAIN)}
      onChange={() =>
        props.setAttributes({
          hrefTarget: hrefTarget === "_blank" ? "_self" : "_blank",
        })
      }
      checked={hrefTarget === "_blank"}
    />
  );

  return hasSource ? (
    <Fragment>
      <div className={`${wrapperClass} ${className}`}>
        <div
          className="ep_lottie_wrap"
          dangerouslySetInnerHTML={{ __html: lottie_markup }}
        ></div>
      </div>
      <RenderStyles wrapperClass={wrapperClass} clientId={props.clientId} />
      <InspectorControls clientId={props.clientId}>
        <PanelBody title="General">
          <p>External URL or Upload</p>
          <div className="epb_toggle_inline lottie_src_inline">
            <TextControl
              value={sourceUrl}
              onChange={(sourceUrl) => props.setAttributes({ sourceUrl })}
            />
            <MediaUploadCheck>
              <MediaUpload
                title="Image"
                allowedTypes={["text"]}
                render={({ open }) => (
                  <Button
                    onClick={() => {
                      if (!isEmpty(sourceMedia)) {
                        props.setAttributes({
                          sourceMedia: {},
                          sourceUrl: "",
                        });
                      } else {
                        open();
                      }
                    }}
                    style={{ marginBottom: 20 }}
                    isPrimary
                  >
                    {isEmpty(sourceMedia) ? (
                      <span className="dashicons dashicons-text-page"></span>
                    ) : (
                      <span className="dashicons dashicons-trash"></span>
                    )}
                  </Button>
                )}
                onSelect={(newMedia) =>
                  props.setAttributes({
                    sourceMedia: newMedia,
                    sourceUrl: get(newMedia, "url"),
                  })
                }
              />
            </MediaUploadCheck>
          </div>

          <div className="epb_toggle_inline">
            <p>Autoplay</p>
            <FormToggle
              checked={autoplay}
              onChange={() => props.setAttributes({ autoplay: !autoplay })}
            />
          </div>

          <div className="epb_toggle_inline">
            <p>Loop</p>
            <FormToggle
              checked={loop}
              onChange={() => props.setAttributes({ loop: !loop })}
            />
          </div>

          <div className="epb_toggle_inline">
            <p>Hover</p>
            <FormToggle
              checked={onHover}
              onChange={() => props.setAttributes({ onHover: !onHover })}
            />
          </div>

          <RangeControl
            label="Animation Speed"
            value={animationSpeed}
            onChange={(animationSpeed) =>
              props.setAttributes({ animationSpeed })
            }
            step={0.5}
            min={0.5}
            max={5}
          />
        </PanelBody>

        <PanelBody title={__("Design", TEXT_DOMAIN)}>
          <SwitchSidebar label="Block" id="block">
            <StylingControls
              initialOpen={false}
              title={__("Background", TEXT_DOMAIN)}
              group="background"
              options={controls.background}
            />

            <RenderMultiStyles
              title={__("Border", TEXT_DOMAIN)}
              initialOpen={false}
              groups={[
                {
                  name: "border",
                  options: controls.border,
                },
                {
                  name: "borderRadius",
                  options: controls.borderRadius,
                },
              ]}
            />

            <StylingControls
              initialOpen={false}
              title={__("Sizing", TEXT_DOMAIN)}
              group="size"
              options={controls.size}
            />

            <StylingControls
              initialOpen={false}
              title={__("Spacing", TEXT_DOMAIN)}
              group="padding"
              options={controls.padding}
            />

            <StylingControls
              initialOpen={false}
              title={__("Extras", TEXT_DOMAIN)}
              group="alignment"
              options={controls.alignment}
            />
          </SwitchSidebar>
        </PanelBody>
      </InspectorControls>
      <BlockControls>
        <Toolbar>
          <ToolbarButton
            onClick={() => {
              setEditingHrefStatus(!editingHref);
              setModifyHrefStatus(false);
            }}
          >
            <Icon icon="admin-links" />
          </ToolbarButton>
        </Toolbar>
        {editingHref && (
          <URLPopover
            renderSettings={() => advancedOptions}
            onFocusOutside={() => setEditingHrefStatus(false)}
          >
            {(isEmpty(href) || modifyHref) && (
              <URLPopover.LinkEditor
                className="block-editor-format-toolbar__link-container-content"
                value={href}
                onChangeInputValue={(newUrl) =>
                  props.setAttributes({ href: newUrl })
                }
                onKeyPress={(event) => event.stopPropagation()}
                onSubmit={(event) => event.preventDefault()}
              />
            )}
            {!isEmpty(href) && !modifyHref && (
              <URLPopover.LinkViewer
                className="block-editor-format-toolbar__link-container-content"
                onKeyPress={(e) => e.stopPropagation()}
                url={href}
                onEditLinkClick={() => setModifyHrefStatus(true)}
                urlLabel={truncate(href)}
              />
            )}
          </URLPopover>
        )}
      </BlockControls>
    </Fragment>
  ) : (
    <Placeholder
      className="ep-lottie-placeholder"
      isColumnLayout={true}
      instructions={__(
        "Paste an external link or upload Lottie file ( JSON ).",
        TEXT_DOMAIN
      )}
      icon={<EpIcons icon="lottie" width={20} />}
      label={__("Lottie", TEXT_DOMAIN)}
    >
      <div className="ep-lottie-placeholder-form">
        <TextControl
          className="ep-url-input"
          type="url"
          value={sourceUrl}
          onChange={(sourceUrl) => props.setAttributes({ sourceUrl })}
          placeholder={__("Enter URL to lottie here…", TEXT_DOMAIN)}
        />
        <MediaUploadCheck>
          <MediaUpload
            title="Image"
            allowedTypes={["text"]}
            render={({ open }) => (
              <Button
                onClick={() => {
                  if (!isEmpty(sourceMedia)) {
                    props.setAttributes({
                      sourceMedia: {},
                      sourceUrl: "",
                    });
                  } else {
                    open();
                  }
                }}
                isPrimary
              >
                {__("Upload", TEXT_DOMAIN)}
              </Button>
            )}
            onSelect={(newMedia) =>
              props.setAttributes({
                sourceMedia: newMedia,
                sourceUrl: get(newMedia, "url"),
              })
            }
          />
        </MediaUploadCheck>
      </div>
      <div className="components-placeholder__learn-more">
        <ExternalLink href={__("https://lottiefiles.com/")}>
          {__("Get Lottie Animations", TEXT_DOMAIN)}
        </ExternalLink>
      </div>
    </Placeholder>
  );
}

export default edit;
