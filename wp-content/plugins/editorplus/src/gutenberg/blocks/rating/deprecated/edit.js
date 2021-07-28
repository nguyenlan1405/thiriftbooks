import { TEXT_DOMAIN } from "../../../../global/constants";
import controls from "../style-controls/controls.json";
import IconPicker from "../../../components/icon-picker/index";

const {
  StylingControls,
  RenderStyles,
  InspectorControls,
  SwitchSidebar,
  RenderMultiStyles,
} = editorPlus.components;

const { toggleSidebar } = editorPlus.actions;

const { __ } = wp.i18n;
const { RichText } = wp.blockEditor;
const { RangeControl, PanelBody, SelectControl } = wp.components;

function edit(props) {
  const { className, ratingRange, icon, selectLayout } = props.attributes;
  const id = props.clientId;
  const wrapperClass = "ep_sr_wrapper__" + id;

  props.setAttributes({
    id: wrapperClass,
  });

  const srLayout = selectLayout === "row" ? "ep_sr_inline" : "ep_sr_stack";

  return (
    <div className={`${wrapperClass} ${className}`}>
      <div className={`ep_sr_wrapper ${srLayout}`}>
        <div onClick={() => toggleSidebar(props.clientId, "title")}>
          <RichText
            tag="div"
            className="ep_sr_before_text"
            value={props.attributes.titleText}
            onChange={(newTitle) =>
              props.setAttributes({ titleText: newTitle })
            }
            placeholder={__("Add title...", TEXT_DOMAIN)}
          />
        </div>
        <div
          className="ep_sr_icon_wrapper"
          onClick={() => toggleSidebar(props.clientId, "icon")}
        >
          {new Array(5).fill(0).map((_, idx) => {
            return (
              <div
                className={`ep_sr_icon ${
                  idx < ratingRange ? "ep_sr_icon_checked" : ""
                }`}
              >
                <span className={icon}></span>
              </div>
            );
          })}
        </div>
      </div>
      <RenderStyles wrapperClass={wrapperClass} clientId={props.clientId} />
      <InspectorControls clientId={props.clientId}>
        <PanelBody title={__("General", TEXT_DOMAIN)}>
          <SelectControl
            label={__("Select Layout", TEXT_DOMAIN)}
            value={props.attributes.selectLayout}
            options={[
              { label: "Inline", value: "row" },
              { label: "Stacked", value: "column" },
            ]}
            help={__("Change layout of star rating.", TEXT_DOMAIN)}
            onChange={(selectLayout) => {
              props.setAttributes({ selectLayout });
            }}
          />

          <RangeControl
            label={__("Rating", TEXT_DOMAIN)}
            value={props.attributes.ratingRange}
            onChange={(ratingRange) => props.setAttributes({ ratingRange })}
            min={0}
            max={5}
            beforeIcon="star-filled"
            marks={[
              {
                value: 1,
                label: "1",
              },
              {
                value: 2,
                label: "2",
              },
              {
                value: 3,
                label: "3",
              },
              {
                value: 4,
                label: "4",
              },
              {
                value: 5,
                label: "5",
              },
            ]}
          />
          <IconPicker
            value={icon}
            label={__("Icon", TEXT_DOMAIN)}
            onChange={(newIcon) => props.setAttributes({ icon: newIcon })}
            allowReset={false}
          />
        </PanelBody>

        <PanelBody title={__("Design", TEXT_DOMAIN)}>
          <SwitchSidebar label="Title" id="title">
            <StylingControls
              initialOpen={false}
              title={__("Typography", TEXT_DOMAIN)}
              group="titleTypography"
              options={controls.titleTypography}
            />
          </SwitchSidebar>

          <SwitchSidebar label="Icon" id="icon">
            <RenderMultiStyles
              title={__("Colors", TEXT_DOMAIN)}
              groups={[
                {
                  name: "iconColor",
                  options: controls.iconColor,
                },
                {
                  name: "iconActiveColor",
                  options: controls.iconActiveColor,
                },
              ]}
            />
            <RenderMultiStyles
              title={__("Sizing", TEXT_DOMAIN)}
              groups={[
                {
                  name: "iconSize",
                  options: controls.iconSize,
                },
              ]}
            />
            <RenderMultiStyles
              title={__("Extras", TEXT_DOMAIN)}
              groups={[
                {
                  name: "iconGap",
                  options: controls.iconGap,
                },
              ]}
            />
          </SwitchSidebar>

          <SwitchSidebar label="Block" id="block">
            <RenderMultiStyles
              title={__("Extras", TEXT_DOMAIN)}
              groups={[
                {
                  name: "inlineAlignment",
                  options: controls.inlineAlignment,
                },
                {
                  name: "stackAlignment",
                  options: controls.stackAlignment,
                },
              ]}
            />
          </SwitchSidebar>
        </PanelBody>
      </InspectorControls>
    </div>
  );
}

export default edit;
