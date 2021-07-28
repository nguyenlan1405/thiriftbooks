import { TEXT_DOMAIN } from "../../../global/constants";
import { labels as IconPacks } from "../../extensions/icon-inserter/data.json";

const { Component } = wp.element;
const { __ } = wp.i18n;
const { Popover, Button, PanelBody, Icon } = wp.components;
const { map, invoke, get, isEmpty, isEqual } = lodash;

class IconPicker extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: false,
      selectedClassName: "",
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  componentDidMount() {
    const value = get(this.props, "value");

    if (!isEmpty(value)) {
      this.setState({ selectedClassName: value });
    }
  }

  handleSelect(IconClassName) {
    const { props } = this;

    this.setState({ selectedClassName: IconClassName }, () => {
      // invoking change listener safely
      invoke(props, "onChange", IconClassName);
      this.toggleVisibility(false);
    });
  }

  toggleVisibility(state = undefined) {
    this.setState({
      isVisible: typeof state === "undefined" ? !this.state.isVisible : state,
    });
  }

  render() {
    const { isVisible, selectedClassName } = this.state;
    const { label = "Select Icon", allowReset = true } = this.props;

    return (
      <div className="ep-icon-picker">
        <div className="ep-flex">
          {__(label, TEXT_DOMAIN)}
          <div>
            {!isEmpty(selectedClassName) && allowReset && (
              <Button
                isSmall
                showTooltip={true}
                label={__("Reset Icon", TEXT_DOMAIN)}
                style={{ marginLeft: 5 }}
                onClick={() => this.handleSelect("")}
                key={selectedClassName}
              >
                <Icon icon="redo" />
              </Button>
            )}
            <Button isDefault onClick={this.toggleVisibility}>
              {!isEmpty(selectedClassName) ? (
                <span className={selectedClassName}></span>
              ) : (
                <Icon icon="list-view" />
              )}
              {isVisible && (
                <Popover
                  expandOnMobile={true}
                  headerTitle={__("Icons", TEXT_DOMAIN)}
                  position="top"
                  className="ep-icon-picker-popover"
                  onFocusOutside={() => this.setState({ isVisible: false })}
                >
                  <div
                    className="ep-icon-picker-root"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {map(IconPacks, (pack) => {
                      return (
                        <PanelBody title={pack.category.label}>
                          {
                            <div className="ep-icon-picker-grid">
                              {map(pack.icons, (icon) => {
                                const className = "eplusicon-".concat(icon);
                                const isActive = isEqual(
                                  className,
                                  this.state.selectedClassName
                                );

                                return (
                                  <div
                                    className={`ep-icon ${
                                      isActive ? "ep-active" : ""
                                    }`}
                                    onClick={() => this.handleSelect(className)}
                                  >
                                    <span className={className}></span>
                                  </div>
                                );
                              })}
                            </div>
                          }
                        </PanelBody>
                      );
                    })}
                  </div>
                </Popover>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default IconPicker;
