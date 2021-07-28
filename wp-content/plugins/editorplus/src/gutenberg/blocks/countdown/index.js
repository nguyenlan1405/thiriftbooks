import { Fragment } from "react";
import Icon from "../../components/icon";
import { TEXT_DOMAIN } from "../../../global/constants";
import Countdown from "./components/countdown";
import controls from "./style-controls/controls.json";

const {
  StylingControls,
  RenderStyles,
  RenderSavedStyles,
  RenderMultiStyles,
  InspectorControls,
  SwitchSidebar,
} = editorPlus.components;

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
  RangeControl,
  PanelBody,
  SelectControl,
  DateTimePicker,
  FormToggle,
  PanelRow,
} = wp.components;
const { RichText } = wp.blockEditor;

const CONTROLS_SCHEMA = {
  type: "object",
  default: {},
};

// setting the preview date to the next day calculated from the current day
var tomorrowDate = new Date();
tomorrowDate.setDate(new Date().getDate() + 2);

registerBlockType("ep/countdown", {
  title: __("Countdown"),
  icon: __(<Icon icon="countdown" />),
  example: {
    attributes: {
      dateTimePicker: tomorrowDate.toJSON(),
    },
  },
  description: __("Create & display a countdown timer in content."),
  category: "ep-editorplus-blocks",
  keywords: [
    __("countdown"),
    __("number"),
    __("editor plus"),
    __("timer"),
    __("clock"),
  ],
  attributes: {
    epStylingOptions: {
      type: "object",
      default: controls,
    },
    dateTimePicker: {
      type: "string",
      default: "",
    },
    stackOnMobile: {
      type: "boolean",
      default: true,
    },
    id: {
      type: "string",
      default: "",
    },
    daysLabel: {
      type: "string",
      default: "Days",
    },
    hoursLabel: {
      type: "string",
      default: "Hours",
    },
    minutesLabel: {
      type: "string",
      default: "Minutes",
    },
    secondsLabel: {
      type: "string",
      default: "Seconds",
    },
    countdownBackground: CONTROLS_SCHEMA,
    countdownBorder: CONTROLS_SCHEMA,
    countdownBorderRadius: CONTROLS_SCHEMA,
    countdownShadow: CONTROLS_SCHEMA,
    numberTypography: CONTROLS_SCHEMA,
    labelTypography: CONTROLS_SCHEMA,
    itemGap: CONTROLS_SCHEMA,
  },

  edit: (props) => {
    const { className, dateTimePicker, stackOnMobile } = props.attributes;
    const id = props.clientId;
    const wrapperClass = "ep_countdown__" + id;

    props.setAttributes({
      id: wrapperClass,
    });

    return (
      <Fragment>
        <div className={`ep_countdown_wrapper ${wrapperClass} ${className}`}>
          <Countdown date={new Date(dateTimePicker)} {...props} />
        </div>
        <RenderStyles wrapperClass={wrapperClass} clientId={props.clientId} />
        <InspectorControls clientId={props.clientId}>
          <PanelBody title={__("General", TEXT_DOMAIN)}>
            <DateTimePicker
              currentDate={
                dateTimePicker === "" ? new Date().toJSON() : dateTimePicker
              }
              onChange={(newDate) => {
                var GivenDate = new Date(newDate);
                var CurrentDate = new Date();

                if (GivenDate >= CurrentDate) {
                  props.setAttributes({ dateTimePicker: newDate });
                }
              }}
              is12Hour={true}
            />
            <div className="epb_toggle_inline" style={{ margin: "20px 0px" }}>
              <p>{__("Stack on Mobile", TEXT_DOMAIN)}</p>
              <FormToggle
                checked={stackOnMobile}
                onChange={() =>
                  props.setAttributes({ stackOnMobile: !stackOnMobile })
                }
              />
            </div>
          </PanelBody>

          <PanelBody title={__("Design", TEXT_DOMAIN)}>
            <SwitchSidebar label="Digit" id="digit">
              <StylingControls
                initialOpen={false}
                title={__("Typography", TEXT_DOMAIN)}
                group="numberTypography"
                options={controls.numberTypography}
              />
            </SwitchSidebar>

            <SwitchSidebar label="Label" id="label">
              <StylingControls
                initialOpen={false}
                title={__("Typography", TEXT_DOMAIN)}
                group="labelTypography"
                options={controls.labelTypography}
              />
            </SwitchSidebar>

            <SwitchSidebar label="Block" id="block">
              <StylingControls
                initialOpen={false}
                title={__("Background", TEXT_DOMAIN)}
                group="countdownBackground"
                options={controls.countdownBackground}
              />

              <RenderMultiStyles
                title={__("Border", TEXT_DOMAIN)}
                initialOpen={false}
                groups={[
                  {
                    name: "countdownBorder",
                    options: controls.countdownBorder,
                  },
                  {
                    name: "countdownBorderRadius",
                    options: controls.countdownBorderRadius,
                  },
                ]}
              />
              <StylingControls
                initialOpen={false}
                title={__("Shadow", TEXT_DOMAIN)}
                group="countdownShadow"
                options={controls.countdownShadow}
              />
              <StylingControls
                initialOpen={false}
                title={__("Extras", TEXT_DOMAIN)}
                group="itemGap"
                options={controls.itemGap}
              />
            </SwitchSidebar>
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  },

  save: (props) => {
    const {
      className,
      id,
      dateTimePicker,
      stackOnMobile,
      daysLabel,
      hoursLabel,
      minutesLabel,
      secondsLabel,
    } = props.attributes;

    return (
      <Fragment>
        <div
          className={`ep_countdown_wrapper ${id} ${className}`}
          data-date={dateTimePicker}
        >
          <div
            className={`ep_countdown ${
              stackOnMobile === true ? "ep_cd_stack_mobile" : ""
            }`}
          >
            <div className="ep_cd_item">
              <span className="ep_cd_digit ep_cd_days"></span>
              <span
                className="ep_cd_label"
                dangerouslySetInnerHTML={{ __html: daysLabel }}
              ></span>
            </div>
            <div className="ep_cd_item">
              <span className="ep_cd_digit ep_cd_hours"></span>
              <span
                className="ep_cd_label"
                dangerouslySetInnerHTML={{ __html: hoursLabel }}
              ></span>
            </div>
            <div className="ep_cd_item">
              <span className="ep_cd_digit ep_cd_minutes"></span>
              <span
                className="ep_cd_label"
                dangerouslySetInnerHTML={{ __html: minutesLabel }}
              ></span>
            </div>
            <div className="ep_cd_item">
              <span className="ep_cd_digit ep_cd_seconds"></span>
              <span
                className="ep_cd_label"
                dangerouslySetInnerHTML={{ __html: secondsLabel }}
              ></span>
            </div>
          </div>
        </div>
        <RenderSavedStyles {...props} />
      </Fragment>
    );
  },
});
