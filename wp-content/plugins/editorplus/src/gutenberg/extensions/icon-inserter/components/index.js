import React, { Component } from "react";
import IconSettings from "./settings";
import IconList from "./icon-list";
const { TabPanel } = wp.components;
const {
  isEmpty,
  has,
  clone,
  set,
  get,
  attempt,
  isError,
  isEqual,
  assign,
} = lodash;
const { __ } = wp.i18n;

class IconPicker extends Component {
  constructor() {
    super();
    this.state = {
      settings: {
        enabled: false,
        color: "",
        iconBackground: false,
        activeIcon: "",
        iconBackgroundColor: "",
        iconBorder: false,
        iconBorderColor: "",
        iconBorderRadius: 0,
      },
      icon: {},
      tab: "picker",
    };

    this.toggleSettings = this.toggleSettings.bind(this);
  }

  componentWillMount() {
    // console.log(this.props.value);

    if (has(this.props, "value") && !isEmpty(this.props.value)) {
      const { value } = this.props;
      const newSettings = clone(this.state.settings);

      if (!isEmpty(value.style)) {
        this.setState({ icon: value });

        set(newSettings, "enabled", true);

        const parsedStyling = JSON.parse(value.style);

        assign(newSettings, parsedStyling);

        if (has(value, "data") && !isEmpty(value.data)) {
          set(newSettings, "activeIcon", value.data);
        }

        this.setState({
          settings: newSettings,
        });
      }
    }
  }

  toggleSettings() {
    const { settings } = this.state;

    this.setState({
      settings: {
        ...settings,
        enabled: !settings.enabled,
      },
    });
  }

  render() {
    const { settings, search } = this.state;
    const { props } = this;

    return (
      <TabPanel
        className="ep-icons-selector-tabs"
        activeClass="ep-icons-select-active"
        tabs={[
          {
            name: "icons",
            title: "Select Icon",
            className: "ep-icon-select-tab",
          },
          {
            name: "design",
            title: "Design",
            className: "ep-icon-select-tab",
          },
        ]}
      >
        {(tab) => {
          if (isEqual(tab.name, "icons")) {
            return (
              <div className="ep-icon-picker__component ep-tab-content">
                <IconList
                  onSelect={(icon) => {
                    this.setState({ icon, activeIcon: icon.data }, () => {
                      props.onSelect({
                        ...icon,
                        style: this.state.settings,
                      });
                    });
                  }}
                  activeIcon={this.state.settings.activeIcon}
                  settings={settings}
                />
              </div>
            );
          } else {
            return (
              <div className="ep-tab-content-design ep-tab-content">
                <IconSettings
                  value={settings}
                  onChange={(newSettings) => {
                    this.setState({
                      settings: { ...settings, ...newSettings },
                    });

                    const newStyle = clone(get(this.state.icon, "style"));

                    const canBeParsed = !isError(attempt(JSON.parse, newStyle));
                    let parsedStyling = {};

                    if (canBeParsed) {
                      parsedStyling = JSON.parse(newStyle);
                    }

                    assign(parsedStyling, newSettings);

                    this.props.onSelect({
                      ...this.state.icon,
                      style: parsedStyling,
                    });
                  }}
                />
              </div>
            );
          }
        }}
      </TabPanel>
    );
  }
}

export default IconPicker;
