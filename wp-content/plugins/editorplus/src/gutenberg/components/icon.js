const { Component } = wp.element;
const { Icon: DashIcon } = wp.components;
const { has } = lodash;

export default class Icon extends Component {
  constructor() {
    super();
    this.state = {
      responsive: () => (
        <svg
          style={{ width: 20, height: 20 }}
          xmlns="http://www.w3.org/2000/svg"
          xlink="http://www.w3.org/1999/xlink"
          width={100}
          height={100}
          viewBox="0 0 100 100"
          fill="none"
        >
          <rect width={100} height={100} fill="url(#pattern0)" />
          <defs>
            <pattern
              id="pattern0"
              patternContentUnits="objectBoundingBox"
              width={1}
              height={1}
            >
              <use xlinkHref="#image0" transform="scale(0.01)" />
            </pattern>
            <image
              id="image0"
              width={100}
              height={100}
              xlinkHref="data:image/png;base64,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"
            />
          </defs>
        </svg>
      ),
      hover: () => (
        <svg
          style={{ width: 20, height: 20 }}
          xmlns="http://www.w3.org/2000/svg"
          xlink="http://www.w3.org/1999/xlink"
          width={100}
          height={100}
          viewBox="0 0 100 100"
          fill="none"
        >
          <rect width={100} height={100} fill="url(#pattern0)" />
          <defs>
            <pattern
              id="pattern0"
              patternContentUnits="objectBoundingBox"
              width={1}
              height={1}
            >
              <use xlinkHref="#image0" transform="scale(0.01)" />
            </pattern>
            <image
              id="image0"
              width={100}
              height={100}
              xlinkHref="data:image/png;base64,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"
            />
          </defs>
        </svg>
      ),
      fade: () => (
        <svg
          viewBox="0 0 28 28"
          preserveAspectRatio="xMidYMid meet"
          shapeRendering="geometricPrecision"
          style={{ width: this.props.width }}
        >
          <g fillRule="evenodd">
            <circle cx="8.5" cy="19.5" r="1.5" />
            <circle cx="8.5" cy="14.5" r="1.5" />
            <circle cx={5} cy={12} r={1} />
            <circle cx={5} cy={17} r={1} />
            <circle cx="8.5" cy="9.5" r="1.5" />
            <path d="M15.7 4c-.4 0-.8.1-1.2.3-.6.3-.5.7-1.5.7-1.1 0-2 .9-2 2s.9 2 2 2c.3 0 .5.2.5.5s-.2.5-.5.5c-1.1 0-2 .9-2 2s.9 2 2 2c.3 0 .5.2.5.5s-.2.5-.5.5c-1.1 0-2 .9-2 2s.9 2 2 2c.3 0 .5.2.5.5s-.2.5-.5.5c-1.1 0-2 .9-2 2s.9 2 2 2c1 0 .9.4 1.4.7.4.2.8.3 1.2.3 4.3-.4 8.3-5.3 8.3-10.5s-4-10-8.2-10.5z" />
          </g>
        </svg>
      ),
      slide: () => (
        <svg
          viewBox="0 0 28 28"
          preserveAspectRatio="xMidYMid meet"
          shapeRendering="geometricPrecision"
          style={{ width: this.props.width }}
        >
          <g fillRule="evenodd">
            <path d="M22 4h-5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h5c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM10 14c0 .6.4 1 1 1h.6L10 16.6c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0l3.3-3.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7L11.4 10c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l1.6 1.6H11c-.6 0-1 .4-1 1z" />
            <circle cx={7} cy={14} r="1.5" />
            <circle cx={3} cy={14} r={1} />
          </g>
        </svg>
      ),
      bounce: () => (
        <svg
          viewBox="0 0 28 28"
          preserveAspectRatio="xMidYMid meet"
          shapeRendering="geometricPrecision"
          style={{ width: this.props.width }}
        >
          <g fillRule="evenodd">
            <circle cx="21.5" cy="8.5" r="3.5" />
            <circle cx={16} cy={12} r="1.7" />
            <circle cx={13} cy={15} r="1.2" />
            <circle cx={11} cy={18} r={1} />
            <circle cx={9} cy={22} r={1} />
            <circle cx={7} cy={19} r={1} />
            <circle cx={4} cy={17} r={1} />
          </g>
        </svg>
      ),
      zoom: () => (
        <svg
          viewBox="0 0 28 28"
          preserveAspectRatio="xMidYMid meet"
          shapeRendering="geometricPrecision"
          style={{ width: this.props.width }}
        >
          <g fillRule="evenodd">
            <path d="M23.7 4.3c-.1-.1-.2-.2-.3-.2-.1-.1-.3-.1-.4-.1h-5c-.6 0-1 .4-1 1s.4 1 1 1h2.6l-3.1 3.1c-.2-.1-.3-.1-.5-.1h-6c-.2 0-.3 0-.5.1L7.4 6H10c.6 0 1-.4 1-1s-.4-1-1-1H5c-.1 0-.3 0-.4.1-.2.1-.4.3-.5.5-.1.1-.1.3-.1.4v5c0 .6.4 1 1 1s1-.4 1-1V7.4l3.1 3.1c-.1.2-.1.3-.1.5v6c0 .2 0 .3.1.5L6 20.6V18c0-.6-.4-1-1-1s-1 .4-1 1v5c0 .1 0 .3.1.4.1.2.3.4.5.5.1.1.3.1.4.1h5c.6 0 1-.4 1-1s-.4-1-1-1H7.4l3.1-3.1c.2 0 .3.1.5.1h6c.2 0 .3 0 .5-.1l3.1 3.1H18c-.6 0-1 .4-1 1s.4 1 1 1h5c.1 0 .3 0 .4-.1.2-.1.4-.3.5-.5.1-.1.1-.3.1-.4v-5c0-.6-.4-1-1-1s-1 .4-1 1v2.6l-3.1-3.1c0-.2.1-.3.1-.5v-6c0-.2 0-.3-.1-.5L22 7.4V10c0 .6.4 1 1 1s1-.4 1-1V5c0-.1 0-.3-.1-.4 0-.1-.1-.2-.2-.3z" />
          </g>
        </svg>
      ),
      flip: () => (
        <svg
          viewBox="0 0 28 28"
          preserveAspectRatio="xMidYMid meet"
          shapeRendering="geometricPrecision"
          style={{ width: this.props.width }}
        >
          <g fillRule="evenodd">
            <path d="M22 2.4l-7 2.9V7h-2v-.8L7.6 8.7c-.4.2-.6.5-.6.9v8.7c0 .4.2.7.6.9l5.4 2.5V21h2v1.7l7 2.9c.5.2 1-.2 1-.7V3.1c0-.5-.5-.9-1-.7zM15 19h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zM13 2h2v2.5h-2zM13 23.5h2V26h-2z" />
          </g>
        </svg>
      ),
      fold: () => (
        <svg
          viewBox="0 0 28 28"
          preserveAspectRatio="xMidYMid meet"
          shapeRendering="geometricPrecision"
          style={{ width: this.props.width }}
        >
          <g fillRule="evenodd">
            <path d="M24 7h-4V3.4c0-.8-.6-1.4-1.3-1.4-.2 0-.5.1-.7.2l-6.5 3.9c-.9.6-1.5 1.6-1.5 2.6V23c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-6 10.5c0 .2-.1.4-.3.5L12 21.5V8.7c0-.4.2-.7.5-.9L18 4.5v13zM6 7h2v2H6zM6 23h2v2H6zM2.6 7.1c-.1 0-.1.1-.2.1v.1l-.1.1-.1.1c-.1.1-.2.3-.2.5v1h2V7H3c-.1 0-.2 0-.4.1zM2 23v1c0 .4.3.8.7.9.1.1.2.1.3.1h1v-2H2zM2 11h2v2H2zM2 19h2v2H2zM2 15h2v2H2z" />
          </g>
        </svg>
      ),
      roll: () => (
        <svg
          viewBox="0 0 28 28"
          preserveAspectRatio="xMidYMid meet"
          shapeRendering="geometricPrecision"
          style={{ width: this.props.width }}
        >
          <g fillRule="evenodd">
            <path d="M18.8 5c-5.3-2.7-11.8.2-14 5.6-1.1 2.8-1 6 .2 8.8.4 1 3.9 6.5 5 3.6.5-1.2-1.3-2.2-1.9-3-.8-1.2-1.4-2.5-1.6-3.9-.4-2.7.5-5.5 2.4-7.4 4-4 11.6-2.5 12.6 3.4.4 2.7-.9 5.5-3.4 6.6-2.6 1.1-6 0-6.8-2.8-.7-2.4 1.2-5.7 4-4.8 1.1.3 2 1.5 1.5 2.7-.3.7-1.7 1.2-1.6.1 0-.3.2-.4.2-.8-.1-.4-.5-.6-.9-.6-1.1.1-1.6 1.6-1.3 2.5.3 1.2 1.5 1.9 2.7 1.9 2.9 0 4.2-3.4 3.1-5.7-1.2-2.6-4.6-3.4-7-2.2-2.6 1.3-3.8 4.4-3.1 7.2 1.6 5.9 9.3 6.8 13.1 2.5 3.8-4.2 1.9-11.1-3.2-13.7z" />
          </g>
        </svg>
      ),
      none: () => (
        <svg
          viewBox="0 0 28 28"
          preserveAspectRatio="xMidYMid meet"
          shapeRendering="geometricPrecision"
          style={{ width: this.props.width }}
        >
          <g fillRule="evenodd">
            <path d="M14 24c5.5 0 10-4.5 10-10S19.5 4 14 4 4 8.5 4 14s4.5 10 10 10zm0-17.5c4.1 0 7.5 3.4 7.5 7.5 0 1.5-.5 2.9-1.2 4.1L9.9 7.7c1.2-.7 2.6-1.2 4.1-1.2zM7.7 9.9l10.4 10.4c-1.2.8-2.6 1.2-4.1 1.2-4.1 0-7.5-3.4-7.5-7.5 0-1.5.5-2.9 1.2-4.1z" />
          </g>
        </svg>
      ),
      strikeThrough: () => (
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
          focusable="false"
          style={{ width: this.props.width }}
        >
          <path d="M9.1 9v-.5c0-.6.2-1.1.7-1.4.5-.3 1.2-.5 2-.5.7 0 1.4.1 2.1.3.7.2 1.4.5 2.1.9l.2-1.9c-.6-.3-1.2-.5-1.9-.7-.8-.1-1.6-.2-2.4-.2-1.5 0-2.7.3-3.6 1-.8.7-1.2 1.5-1.2 2.6V9h2zM20 12H4v1h8.3c.3.1.6.2.8.3.5.2.9.5 1.1.8.3.3.4.7.4 1.2 0 .7-.2 1.1-.8 1.5-.5.3-1.2.5-2.1.5-.8 0-1.6-.1-2.4-.3-.8-.2-1.5-.5-2.2-.8L7 18.1c.5.2 1.2.4 2 .6.8.2 1.6.3 2.4.3 1.7 0 3-.3 3.9-1 .9-.7 1.3-1.6 1.3-2.8 0-.9-.2-1.7-.7-2.2H20v-1z"></path>
        </svg>
      ),
      lineHeight: () => (
        <svg
          style={{ width: this.props.width }}
          viewBox="0 0 14 14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 1H0V0h14v1zm0 13H0v-1h14v1z"
            fill-rule="nonzero"
            fill-opacity="1"
            fill="#000"
            stroke="none"
          ></path>
          <path
            d="M3.548 11l2.8-8h1.304l2.8 8h-.954l-.7-2H5.202l-.7 2h-.954zM7 3.862L8.448 8H5.552L7 3.862z"
            fill-rule="evenodd"
            fill-opacity="1"
            fill="#000"
            stroke="none"
          ></path>
        </svg>
      ),
      letterSpacing: () => (
        <svg
          style={{ width: this.props.width }}
          viewBox="0 0 16 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 12V0h1v12H0zm15 0V0h1v12h-1z"
            fill-rule="nonzero"
            fill-opacity="1"
            fill="#000"
            stroke="none"
          ></path>
          <path
            d="M4.548 10l2.8-8h1.304l2.8 8h-.954l-.7-2H6.202l-.7 2h-.954zM8 2.862L9.448 7H6.552L8 2.862z"
            fill-rule="evenodd"
            fill-opacity="1"
            fill="#000"
            stroke="none"
          ></path>
        </svg>
      ),
      tabs: () => (
        <svg
          height="512pt"
          viewBox="0 -20 512 512"
          width="512pt"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: this.props.width }}
        >
          <path d="m465 81.433594v-21.433594c0-33.085938-26.914062-60-60-60h-345c-33.085938 0-60 26.914062-60 60v352c0 33.085938 26.914062 60 60 60h392c33.085938 0 60-26.914062 60-60v-272c0-28.617188-20.148438-52.609375-47-58.566406zm-40-21.433594v20h-90v-20c0-7.011719-1.21875-13.738281-3.441406-20h73.441406c11.027344 0 20 8.972656 20 20zm-150-20c11.027344 0 20 8.972656 20 20v20h-91v-20c0-7.011719-1.21875-13.738281-3.441406-20zm197 372c0 11.027344-8.972656 20-20 20h-392c-11.027344 0-20-8.972656-20-20v-352c0-11.027344 8.972656-20 20-20h84c11.027344 0 20 8.972656 20 20v60h288c11.027344 0 20 8.972656 20 20zm0 0" />
        </svg>
      ),
      square: () => (
        <svg
          enable-background="new 0 0 482.239 482.239"
          height="512"
          viewBox="0 0 482.239 482.239"
          width="512"
          style={{ width: this.props.width }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m465.016 0h-447.793c-9.52 0-17.223 7.703-17.223 17.223v447.793c0 9.52 7.703 17.223 17.223 17.223h447.793c9.52 0 17.223-7.703 17.223-17.223v-447.793c0-9.52-7.703-17.223-17.223-17.223zm-17.223 447.793h-413.347v-413.347h413.348v413.347z" />
        </svg>
      ),
      heart: () => (
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          style={{ width: this.props.width }}
        >
          <g>
            <g>
              <path
                d="M469.585,80.732c-55.679-52.984-146.306-52.984-202.003-0.012l-11.581,11l-11.569-10.995
			c-55.703-52.979-146.318-52.973-202.021,0C15.061,106.739,0,141.244,0,177.874c0,36.642,15.061,71.141,42.415,97.166
			l201.219,191.033c3.461,3.294,7.917,4.934,12.366,4.934c4.449,0,8.899-1.647,12.366-4.94l201.219-191.027
			C496.933,249.021,512,214.517,512,177.88C512,141.244,496.933,106.745,469.585,80.732z M444.829,248.991L256,428.269
			L67.177,248.997C47.026,229.835,35.93,204.576,35.93,177.88s11.096-51.955,31.247-71.117
			c21.019-20.001,48.625-29.995,76.237-29.995c27.618,0,55.236,10.006,76.255,30.007l23.953,22.75c6.934,6.593,17.815,6.593,24.75,0
			l23.959-22.762c42.044-39.996,110.448-39.996,152.492,0c20.145,19.163,31.247,44.421,31.247,71.117
			S464.968,229.829,444.829,248.991z"
              />
            </g>
          </g>
        </svg>
      ),
      toggles: () => (
        <svg
          width="24px"
          height="24px"
          role="img"
          aria-hidden="true"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          version="1.1"
          style={{ width: this.props.width }}
        >
          <g transform="translate(2, 2)">
            <path
              d="M18 16a1 1 0 1 1 0 2H2a1 1 0 1 1 0-2h16zm0-4a1 1 0 1 1 0 2H2a1 1 0 1 1 0-2h16zm-.917-10c1.006 0 1.838.82 1.91 1.85L19 4v4c0 1.05-.786 1.918-1.774 1.994l-.142.006H2.917C1.9 10 1.08 9.18 1.005 8.15L1 8V4c0-1.05.786-1.918 1.774-1.994L2.917 2h14.167zm0 2H2.917v4h14.167V4z"
              fillRule="nonzero"
              fill="currentColor"
            />
          </g>
        </svg>
      ),
      countdown: () => (
        <svg
          height="512pt"
          viewBox="-53 0 512 512"
          width="512pt"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: this.props.width }}
        >
          <path d="m374.894531 201.429688 25.792969-25.796876c5.859375-5.855468 5.859375-15.355468 0-21.210937l-42.425781-42.429687c-2.8125-2.8125-6.628907-4.390626-10.605469-4.390626s-7.792969 1.578126-10.605469 4.390626l-25.636719 25.640624c-14.933593-9.484374-31.183593-17.078124-48.410156-22.429687v-25.203125h22c8.28125 0 15-6.714844 15-15v-60c0-8.285156-6.71875-15-15-15h-164.132812c-8.285156 0-15 6.714844-15 15v60c0 8.285156 6.714844 15 15 15h22v25.207031c-82.667969 25.664063-142.871094 102.863281-142.871094 193.859375 0 111.898438 91.035156 202.933594 202.933594 202.933594 111.898437 0 202.9375-91.035156 202.9375-202.933594 0-39.511718-11.363282-76.417968-30.976563-107.636718zm-27.238281-57.617188 21.214844 21.214844-11.980469 11.980468c-6.523437-7.597656-13.59375-14.710937-21.15625-21.269531zm-211.785156-113.8125h134.128906v30h-134.128906zm37 60h60.132812v18.363281c-9.816406-1.464843-19.855468-2.230469-30.066406-2.230469-10.214844 0-20.253906.765626-30.066406 2.230469zm162.472656 330.171875-17.058594-17.058594c-5.855468-5.859375-15.351562-5.859375-21.210937 0-5.859375 5.855469-5.859375 15.355469 0 21.210938l17.066406 17.066406c-26.476563 22.289063-59.707031 36.789063-96.140625 39.945313v-24.203126c0-8.285156-6.714844-15-15-15-8.28125 0-15 6.714844-15 15v24.214844c-36.433594-3.128906-69.675781-17.605468-96.167969-39.871094l17.058594-17.058593c5.859375-5.855469 5.859375-15.355469 0-21.214844-5.855469-5.855469-15.355469-5.855469-21.210937 0l-17.070313 17.066406c-22.285156-26.476562-36.785156-59.707031-39.945313-96.136719h24.207032c8.28125 0 15-6.71875 15-15 0-8.285156-6.71875-15-15-15h-24.21875c3.132812-36.4375 17.609375-69.679687 39.875-96.171874l17.058594 17.058593c2.925781 2.929688 6.765624 4.394531 10.605468 4.394531 3.835938 0 7.675782-1.464843 10.605469-4.394531 5.855469-5.855469 5.855469-15.351562 0-21.210937l-17.066406-17.066406c26.476562-22.289063 59.707031-36.785157 96.136719-39.945313v24.203125c0 8.285156 6.71875 15 15 15 8.285156 0 15-6.714844 15-15v-24.214844c36.4375 3.128906 69.679687 17.605469 96.171874 39.871094l-17.058593 17.058594c-5.859375 5.855468-5.859375 15.355468 0 21.214844 2.925781 2.925781 6.765625 4.390624 10.605469 4.390624 3.835937 0 7.675781-1.464843 10.605468-4.390624l17.066406-17.070313c22.289063 26.480469 36.789063 59.710937 39.945313 96.140625h-24.203125c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h24.214844c-3.128906 36.4375-17.605469 69.675781-39.871094 96.171875zm0 0" />
          <path d="m256.261719 239.660156c-8.457031 4.347656-19.371094 8.960938-29.921875 13.425782-20.890625 8.832031-40.617188 17.175781-51.320313 26.878906-7.925781 7.191406-12.578125 17.035156-13.101562 27.726562-.523438 10.6875 3.148437 20.941406 10.335937 28.867188 7.898438 8.710937 18.777344 13.136718 29.699219 13.136718 9.605469 0 19.238281-3.425781 26.894531-10.367187 7.609375-6.898437 15.714844-21.6875 28.3125-45.238281 6.414063-11.992188 13.042969-24.390625 18.566406-32.964844 3.679688-5.703125 3.0625-13.171875-1.496093-18.199219-4.558594-5.03125-11.929688-6.371093-17.96875-3.265625zm-47.566407 77.445313c-4.109374 3.726562-10.488281 3.414062-14.214843-.699219-1.808594-1.988281-2.730469-4.566406-2.597657-7.25.128907-2.6875 1.300782-5.160156 3.289063-6.964844 5.574219-5.054687 19.023437-11.269531 32.835937-17.214844-6.671874 12.421876-15.683593 28.835938-19.3125 32.128907zm0 0" />
        </svg>
      ),
      cursor: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-95 0 511 511.6402"
          style={{ width: this.props.width }}
        >
          <path d="m315.710938 292.25-288.894532-288.792969c-10.582031-8.402343-26.496094-.382812-26.496094 12.183594v394.667969c0 8.832031 7.167969 16 16 16 4.160157 0 8.148438-1.601563 10.433594-3.90625l80.039063-69.738282 65.28125 152.511719c1.109375 2.601563 3.199219 4.652344 5.824219 5.71875 1.28125.488281 2.625.746094 3.96875.746094 1.429687 0 2.859374-.300781 4.203124-.875l68.691407-29.441406c5.417969-2.300781 7.9375-8.574219 5.613281-13.992188l-63.191406-147.691406h107.136718c8.832032 0 16-7.167969 16-16 0-2.582031-.660156-6.464844-4.609374-11.390625zm0 0" />
        </svg>
      ),
      mobile: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          style={{
            enableBackground: "new 0 0 512 512",
            width: this.props.width,
          }}
          xmlSpace="preserve"
        >
          <g>
            <g>
              <path d="M384,0H128c-17.632,0-32,14.368-32,32v448c0,17.664,14.368,32,32,32h256c17.664,0,32-14.336,32-32V32    C416,14.368,401.664,0,384,0z M384,416H128V64h256V416z" />
            </g>
          </g>
        </svg>
      ),
      lottie: () => (
        <svg
          style={{
            enableBackground: "new 0 0 512 512",
            width: this.props.width,
          }}
          viewBox="0 0 49.7 49.7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m27 13.85h9v8.964l13.7-9.964-13.7-9.964v8.964h-9c-7.168 0-13 5.832-13 13 0 6.065-4.935 11-11 11h-2c-0.553 0-1 0.447-1 1s0.447 1 1 1h2c7.168 0 13-5.832 13-13 0-6.065 4.935-11 11-11zm11-7.036 8.3 6.036-8.3 6.036v-12.072z"></path>
          <path d="m1 13.85h2c2.713 0 5.318 0.994 7.336 2.799 0.191 0.171 0.43 0.255 0.667 0.255 0.274 0 0.548-0.112 0.745-0.333 0.368-0.412 0.333-1.044-0.078-1.412-2.385-2.134-5.464-3.309-8.67-3.309h-2c-0.553 0-1 0.447-1 1s0.447 1 1 1z"></path>
          <path d="m36 35.85h-9c-2.685 0-5.27-0.976-7.278-2.748-0.411-0.365-1.044-0.327-1.411 0.089-0.365 0.414-0.326 1.046 0.089 1.411 2.374 2.095 5.429 3.248 8.601 3.248h9v8.964l13.7-9.964-13.701-9.964v8.964zm2-5.036 8.3 6.036-8.3 6.036v-12.072z"></path>
        </svg>
      ),
    };
  }

  render() {
    const { state, props } = this;

    if (has(state, props.icon)) {
      const RequiredIcon = state[props.icon];
      return <RequiredIcon />;
    } else {
      return <DashIcon icon={props.icon} {...props} />;
    }
  }
}
