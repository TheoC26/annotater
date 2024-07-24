import * as React from "react";
const Logo = ({ color1, color2, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={46}
    height={29}
    fill="none"
    className={className}
  >
    <path
      stroke={color2 ? color2 : "#E0D9FA"}
      strokeWidth={11}
      d="M23 6v13a4 4 0 0 0 4 4h.095a4 4 0 0 0 4-4v-9a4 4 0 0 1 4-4H36a4 4 0 0 1 4 4v13"
    />
    <path
      stroke={color1 ? color1 : "#C6BCEF"}
      strokeWidth={11}
      d="M23 6H10a4 4 0 0 0-4 4v.095a4 4 0 0 0 4 4h9a4 4 0 0 1 4 4V19a4 4 0 0 1-4 4H6"
    />
  </svg>
);
export default Logo;
