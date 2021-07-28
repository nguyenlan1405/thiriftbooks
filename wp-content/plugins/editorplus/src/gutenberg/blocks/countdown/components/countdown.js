import { TEXT_DOMAIN } from "../../../../global/constants";

const { Component } = wp.element;
const { RichText } = wp.blockEditor;
const { __ } = wp.i18n;

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    };
  }

  componentDidMount() {
    // update every second
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(this.props.date);
      date ? this.setState(date) : this.stop();
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  calculateCountdown(endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

    // clear countdown when date is reached
    if (diff <= 0) return false;
    let now = new Date().getTime(),
      distance = endDate - now;

    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    const timeLeft = {
      days: Math.floor(distance / day),
      hours: Math.floor((distance % day) / hour),
      min: Math.floor((distance % hour) / minute),
      sec: Math.floor((distance % minute) / second),
    };

    return timeLeft;
  }

  stop() {
    clearInterval(this.interval);
  }

  addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = "0" + value;
    }
    return value;
  }

  render() {
    const countDown = this.state;
    const {
      stackOnMobile,
      daysLabel,
      hoursLabel,
      minutesLabel,
      secondsLabel,
    } = this.props.attributes;
    const { setAttributes } = this.props;

    const days = this.addLeadingZeros(countDown.days),
      hours = this.addLeadingZeros(countDown.hours),
      min = this.addLeadingZeros(countDown.min),
      sec = this.addLeadingZeros(countDown.sec);

    return (
      <div className="Countdown">
        <div
          className={`ep_countdown ${
            stackOnMobile === true ? "ep_cd_stack_mobile" : ""
          }`}
        >
          <div className="ep_cd_item">
            <span className="ep_cd_digit">{isNaN(days) ? 0 : days}</span>
            <RichText
              className="ep_cd_label"
              placeholder={__("Add Label...", TEXT_DOMAIN)}
              tagName="span"
              value={daysLabel}
              onChange={(newDaysLabel) =>
                setAttributes({ daysLabel: newDaysLabel })
              }
            />
          </div>
          <div className="ep_cd_item">
            <span className="ep_cd_digit">{isNaN(hours) ? 0 : hours}</span>
            <RichText
              className="ep_cd_label"
              tagName="span"
              placeholder={__("Add Label...", TEXT_DOMAIN)}
              value={hoursLabel}
              onChange={(newHoursLabel) =>
                setAttributes({ hoursLabel: newHoursLabel })
              }
            />
          </div>
          <div className="ep_cd_item">
            <span className="ep_cd_digit">{isNaN(min) ? 0 : min}</span>
            <RichText
              className="ep_cd_label"
              tagName="span"
              value={minutesLabel}
              placeholder={__("Add Label...", TEXT_DOMAIN)}
              onChange={(newMinutesLabel) =>
                setAttributes({ minutesLabel: newMinutesLabel })
              }
            />
          </div>
          <div className="ep_cd_item">
            <span className="ep_cd_digit">{isNaN(sec) ? 0 : sec}</span>
            <RichText
              className="ep_cd_label"
              tagName="span"
              value={secondsLabel}
              placeholder={__("Add Label...", TEXT_DOMAIN)}
              onChange={(newSecondsLabel) =>
                setAttributes({ secondsLabel: newSecondsLabel })
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Countdown;
