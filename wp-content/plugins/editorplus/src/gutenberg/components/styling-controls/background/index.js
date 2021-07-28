import {
  buildActiveContext,
  rgba,
  getInheritedValues,
} from "../../../../functions";

// my components
import MediaPicker from "./components/mediaPicker";
import { TEXT_DOMAIN } from "../../../../global/constants";
import ButtonGroup from "../buttonGroup";
import Tags from "../tags";

const { Component } = wp.element;
const {
  capitalize,
  isEqual,
  get,
  isEmpty,
  has,
  pick,
  keys,
  clone,
  assign,
  isObject,
} = lodash;

const {
  Button,
  __experimentalGradientPicker,
  ColorPicker,
  Popover,
} = wp.components;
const { __ } = wp.i18n;

/**
 * Will convert the background property into actual background control schema
 * @param {object} background
 * @return {object} backgroundSchema
 */

export function convertBackgroundToSchema(background) {
  // some safety check
  if (!isObject(background)) return backgroundSchema.default;

  // TODO provide the default option for media

  return {
    solid: get(background, "solid") ?? backgroundSchema.default.solid,
    gradient: get(background, "gradient") ?? backgroundSchema.default.gradient,
    media: backgroundSchema.default.media,
  };
}

export const backgroundSchema = {
  type: "object",
  default: {
    solid: "",
    gradient: "",
    media: {
      backgroundPositionX: "",
      backgroundPositionY: "",
      background: {},
      backgroundSize: "",
      backgroundRepeat: "",
      backgroundAttachment: "",
      backgroundPlacement: "back",
    },
  },
};

export function convertBackground(bg) {
  if (!bg) return {};
  if (!has(bg, "solid") && !has(bg, "gradient") && !has(bg, "media")) return {};

  const {
    solid,
    gradient,
    media,
    media: {
      background,
      backgroundPositionX,
      backgroundPositionY,
      backgroundSize,
      backgroundRepeat,
    },
  } = bg;

  const placement = get(media, "backgroundPlacement") ?? "back";

  const PERCENTAGE_UNIT = 100;

  let res = {};

  const bgImage = !isEmpty(background)
    ? `,url("${get(background, "url")}")`
    : "";

  let solidBg = `linear-gradient(${solid}, ${solid})` + bgImage;
  let gradientBg = gradient + bgImage;
  let normalBg = `url("${get(background, "url")}")`;

  if (placement !== "back") {
    // changing each bg to back
    let bgImageBack = !isEmpty(bgImage)
      ? bgImage.substring(1, bgImage.length)
      : "";

    solidBg = bgImageBack + `,linear-gradient(${solid}, ${solid})`;
    gradientBg = bgImageBack + "," + gradient;
  }

  if (isEmpty(solid) && isEmpty(gradient)) {
    res["backgroundImage"] = normalBg;
  } else if (!isEmpty(solid) && isEmpty(gradient)) {
    res["backgroundImage"] = solidBg;
  } else if (isEmpty(solid) && !isEmpty(gradient)) {
    res["backgroundImage"] = gradientBg;
  }

  let bgAttachment = get(bg, "media.backgroundAttachment");

  if (!isEmpty(bgAttachment)) {
    res["background-attachment"] = bgAttachment;
  }

  if (isEmpty(solid) && isEmpty(gradient) && isEmpty(background)) {
    res["backgroundImage"] = "";
  }

  if (
    !isEmpty(bgImage) ||
    (!isEmpty(backgroundPositionX) && !isEmpty(backgroundPositionY))
  ) {
    res["backgroundPositionX"] = `${backgroundPositionX * PERCENTAGE_UNIT}%`;
    res["backgroundPositionY"] = `${backgroundPositionY * PERCENTAGE_UNIT}%`;
  }

  res["backgroundSize"] = backgroundSize;
  res["background-repeat"] = backgroundRepeat;

  return res;
}

export class Background extends Component {
  constructor() {
    super();
    this.state = {
      currentPicker: "solid",
      background: backgroundSchema.default,
      isSelecting: false,
    };

    // default control config
    this.config = {
      // default controls to render
      controls: ["solid", "gradient", "media"],
    };

    this.handleNav = this.handleNav.bind(this);
    this.getActiveStatus = this.getActiveStatus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getConfig = this.getConfig.bind(this);
    this.getColorIndication = this.getColorIndication.bind(this);
  }

  componentWillMount() {
    const { value } = this.props;

    if (isEmpty(value)) return;

    const inheritedValue = getInheritedValues(this.props);

    this.setState({
      background: inheritedValue,
    });
  }

  handleNav(picker) {
    this.setState({ currentPicker: picker });
  }

  getActiveStatus(t) {
    const { currentPicker } = this.state;

    return buildActiveContext(
      t,
      currentPicker,
      { isPrimary: true },
      { isSecondary: true }
    );
  }

  handleChange(type, value) {
    const newBackground = {
      ...this.state.background,
      [type]: value,
    };

    this.setState(
      {
        background: newBackground,
      },
      () => this.props.onChange(newBackground)
    );
  }

  /**
   * Will provide control configuration assigning some default values
   * @return {object} config
   */

  getConfig() {
    // default configuration
    const { config } = this;
    // picking user config
    const userConfig = pick(this.props, keys(config));
    const finalConfig = clone(config);

    // merging user config
    assign(finalConfig, userConfig);

    return finalConfig;
  }

  getColorIndication() {
    const { background } = this.state;

    let convertedBackground = convertBackground(background);

    let styleToApply = {
      color: "transparent",
      backgroundImage: get(convertedBackground, "backgroundImage"),
      backgroundSize: "contain",
    };

    return styleToApply;
  }

  render() {
    const { currentPicker, background, isSelecting } = this.state;
    const media = get(background, "media");
    const gradient = get(background, "gradient");
    const solid = get(background, "solid");
    const { controls = this.config.controls } = this.getConfig();
    const { label = "" } = this.props;

    let navs = [
      {
        label: "Solid",
        value: "solid",
        component: (
          <div>
            <ColorPicker
              color={solid}
              onChangeComplete={(value) => {
                this.handleChange("gradient", "");
                this.handleChange("solid", rgba(value));
              }}
            />
            <div style={{ width: "100%", textAlign: "right" }}>
              <Button
                isSmall
                isDefault
                onClick={() => this.handleChange("solid", "")}
              >
                {__("Clear Solid", TEXT_DOMAIN)}
              </Button>
            </div>
          </div>
        ),
      },
      {
        label: "Gradient",
        value: "gradient",

        component: (
          <__experimentalGradientPicker
            value={gradient}
            onChange={(gradient) => {
              this.handleChange("solid", "");
              this.handleChange("gradient", gradient);
            }}
          />
        ),
      },
      {
        label: "Media",
        value: "media",

        component: (
          <MediaPicker
            value={media}
            onChange={(media) => this.handleChange("media", media)}
          />
        ),
      },
    ];

    // no need to render tabs for only one background control
    const shouldRenderNavigation = controls.length > 1;

    // removing unwanted navigations
    navs = navs.filter((nav) => controls.includes(nav.value));

    return (
      <div className="ep-background">
        <Tags
          label={__(label, TEXT_DOMAIN)}
          initialValue={backgroundSchema.default}
          currentValue={background}
          onClear={() =>
            this.setState({ background: backgroundSchema.default }, () =>
              this.props.onChange(backgroundSchema.default)
            )
          }
        />
        <div
          style={{ margin: 0 }}
          className="components-circular-option-picker__option-wrapper"
        >
          <button
            onClick={() => this.setState({ isSelecting: !isSelecting })}
            type="button"
            aria-pressed="false"
            aria-label="Color: Very dark gray"
            className="components-button components-circular-option-picker__option"
            style={{
              ...this.getColorIndication(),
            }}
          >
            {isSelecting && (
              <Popover
                position="left"
                className="ep__background_picker_popover"
                onClick={(e) => e.stopPropagation()}
                expandOnMobile={true}
                // onFocusOutside={() => this.setState({ isSelecting: false })}
              >
                {shouldRenderNavigation && (
                  <div className="ep__background_nav">
                    <ButtonGroup
                      canBeEmptied={false}
                      btnStyles={{
                        fontWeight: 400,
                        fontSize: "12px",
                      }}
                      multiple={false}
                      uniqueValue={[]}
                      value={currentPicker}
                      options={navs}
                      onChange={(newNav) => {
                        this.handleNav(newNav);
                      }}
                    />
                  </div>
                )}

                {navs.map((nav, index) => {
                  const { label, component, value } = nav;

                  const isActiveNav = isEqual(controls.length, 1)
                    ? true
                    : isEqual(value, currentPicker);

                  // if there is only one bg control to render then making it active by default
                  const isActiveControl =
                    isEqual(controls.length, 1) &&
                    this.config.controls.includes(get(controls, 0)) &&
                    value === get(controls, 0)
                      ? true
                      : false;

                  if (isEqual(controls.length, 1)) {
                    return (
                      isActiveNav &&
                      isActiveControl && (
                        <div key={index} className="ep-bg-component">
                          {component}
                        </div>
                      )
                    );
                  } else {
                    return (
                      isActiveNav && (
                        <div key={index} className="ep-bg-component">
                          {component}
                        </div>
                      )
                    );
                  }
                })}
              </Popover>
            )}
          </button>
        </div>
      </div>
    );
  }
}
