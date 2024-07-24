import * as React from "react";
const CloseIcon
 = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={33}
    fill="none"
    {...props}
  >
    <g>
      <path
        fill="#000"
        d="M16 17.867 9.467 24.4c-.245.244-.556.367-.934.367-.377 0-.688-.123-.933-.367-.244-.244-.367-.556-.367-.933 0-.378.123-.69.367-.934L14.133 16 7.6 9.467c-.244-.245-.367-.556-.367-.934 0-.377.123-.689.367-.933.245-.244.556-.367.933-.367.378 0 .69.123.934.367L16 14.133 22.533 7.6c.245-.244.556-.367.934-.367s.689.123.933.367c.245.244.367.556.367.933 0 .378-.122.69-.367.934L17.867 16l6.533 6.533c.245.245.367.556.367.934 0 .377-.122.689-.367.933-.244.244-.555.367-.933.367s-.69-.123-.934-.367L16 17.867Z"
      />
    </g>
    {/* <defs>
      <filter
        id="a"
        width={40}
        height={40}
        x={-4}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_42_385" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_42_385"
          result="shape"
        />
      </filter>
    </defs> */}
  </svg>
);
export default CloseIcon
;
