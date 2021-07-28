import { Fragment } from "react";
import { TEXT_DOMAIN } from "../../../../global/constants";
import controls from "../style-controls/controls.json";

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
const { MediaUpload, MediaUploadCheck } = wp.blockEditor;
const {
  PanelBody,
  SelectControl,
  TextControl,
  Button,
  FormToggle,
  RangeControl,
  __experimentalRadio: Radio,
  __experimentalRadioGroup: RadioGroup,
  Icon,
} = wp.components;

const { isEmpty, get } = lodash;

function edit(props) {
  const {
    className,
    sourceMedia,
    sourceUrl,
    loop,
    autoplay,
    onHover,
    animationSpeed,
  } = props.attributes;

  const id = props.clientId;
  const wrapperClass = "ep_lottie_wrapper__" + id;

  const getSourceType = () => {
    if (!isEmpty(sourceUrl)) {
      return "url";
    } else if (!isEmpty(sourceMedia)) {
      return "media";
    }

    return source;
  };

  const source = getSourceType();

  props.setAttributes({
    id: wrapperClass,
  });

  let lottie_markup = `<lottie-player src="${
    source === "media" ? get(sourceMedia, "url") : sourceUrl
  }" class="ep_lottie_player" speed="${animationSpeed}" ${
    loop ? "loop" : ""
  } autoplay="${autoplay}" ${onHover ? "hover" : ""}></lottie-player>`;

  return (
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
    </Fragment>
  );
}

export default edit;
