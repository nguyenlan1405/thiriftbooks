import { buildActiveContext } from "../../../functions";
import ButtonGroup from "../styling-controls/buttonGroup";

const { get, capitalize, isEqual, toLower, has } = lodash;
const { Component, Fragment } = wp.element;
const { Button, IconButton } = wp.components;
const { select } = wp.data;

class ExtendStyle extends Component {
  constructor() {
    super();

    this.state = {
      activeTab: "desktop",
    };
    this.handleTab = this.handleTab.bind(this);
    this.hasExtraSupport = this.hasExtraSupport.bind(this);
    this.isResponsiveEnabled = this.isResponsiveEnabled.bind(this);
    this.getAvailableTabs = this.getAvailableTabs.bind(this);
  }

  componentWillMount() {
    const selector = select("core/edit-post");
    const { activeTab } = this.state;

    // safety check for the required selector
    if (!has(selector, "__experimentalGetPreviewDeviceType")) return;

    const currentPreviewType = selector.__experimentalGetPreviewDeviceType();

    // PreviewTypes works capitalized ["Desktop", "Tablet", "Mobile"]
    // Therefore converting active tab into capitalize string
    const currentTab = capitalize(activeTab);

    // checking if the tabs are equal
    if (isEqual(currentTab, currentPreviewType)) return;
    // if responsive is not enabled then return the desktop default
    if (!this.isResponsiveEnabled()) return;

    this.handleTab(currentPreviewType);
  }

  isResponsiveEnabled(props = this.props) {
    const { attrs, attr } = props;

    const responsiveAttr = `${attr}ResponsiveEnabled`;

    const isEnabled = get(attrs, responsiveAttr);
    return isEnabled;
  }

  componentWillUpdate(newProps) {
    const isResponsiveStateUpdated = !isEqual(
      newProps.responsiveState,
      this.props.responsiveState
    );
    const isResponsiveEnabledForCurrentControl = this.isResponsiveEnabled();
    const isResponsiveChanged = !isEqual(
      isResponsiveEnabledForCurrentControl,
      this.isResponsiveEnabled(newProps)
    );

    if (isResponsiveStateUpdated && isResponsiveEnabledForCurrentControl) {
      this.setState({ activeTab: toLower(newProps.responsiveState) });
    }

    if (isResponsiveChanged) {
      this.setState({ activeTab: toLower(newProps.responsiveState) });
    }
  }

  handleTab(t) {
    if (isEqual(t, "hover")) {
      this.props.applyHoverState(this.props.attr);
    } else {
      this.props.removeHoverState(this.props.attr);
    }

    if (["tablet", "desktop", "mobile"].includes(t)) {
      this.props.handleResponsiveState(capitalize(t));
    }

    this.setState({ activeTab: toLower(t) });
  }

  hasExtraSupport() {
    const { attrs, attr } = this.props;
    const responsiveAttr = `${attr}ResponsiveEnabled`;
    const hoverAttr = `${attr}HoverEnabled`;

    let support = false;

    if (attrs[responsiveAttr] || attrs[hoverAttr]) {
      support = true;
    }

    return support;
  }

  getAvailableTabs() {
    const { attrs, set, attr, hover, desktop, tablet, mobile } = this.props;
    const { activeTab, loaded } = this.state;

    const responsiveAttr = `${attr}ResponsiveEnabled`;
    const hoverAttr = `${attr}HoverEnabled`;
    let availableTabs = [];

    const isHoverEnabled = get(attrs, hoverAttr);
    const isResponsiveEnabled = get(attrs, responsiveAttr);

    if (isResponsiveEnabled) {
      availableTabs.push(
        ...[
          {
            label: "Desktop",
            value: "desktop",
          },
          {
            label: "Tablet",
            value: "tablet",
          },
          {
            label: "Mobile",
            value: "mobile",
          },
        ]
      );
    }

    if (isHoverEnabled && !isResponsiveEnabled) {
      availableTabs.push({
        label: "Normal",
        value: "desktop",
      });
    }

    if (isHoverEnabled) {
      availableTabs.push({
        label: "Hover",
        value: "hover",
      });
    }
    return availableTabs;
  }

  render() {
    const { hover, desktop, tablet, mobile, responsiveState } = this.props;
    const { activeTab } = this.state;

    return (
      <div className="ep-extend-styles">
        {this.hasExtraSupport() && (
          <div className="ep-extend-navs">
            <ButtonGroup
              key={activeTab}
              canBeEmptied={false}
              style={{ width: "100%" }}
              multiple={false}
              uniqueValue={[]}
              btnStyles={{
                fontWeight: 400,
                fontSize: "12px",
                padding: "0px 5px",
              }}
              value={activeTab}
              options={this.getAvailableTabs()}
              onChange={(newTab) => this.handleTab(newTab)}
            />
          </div>
        )}

        <div className={buildActiveContext(activeTab, "mobile", "", "d-none")}>
          {activeTab === "mobile" && mobile}
        </div>

        <div className={buildActiveContext(activeTab, "tablet", "", "d-none")}>
          {activeTab === "tablet" && tablet}
        </div>

        <div className={buildActiveContext(activeTab, "desktop", "", "d-none")}>
          {activeTab === "desktop" && desktop}
        </div>
        <div className={buildActiveContext(activeTab, "hover", "", "d-none")}>
          {activeTab === "hover" && hover}
        </div>
      </div>
    );
  }
}

export default ExtendStyle;
