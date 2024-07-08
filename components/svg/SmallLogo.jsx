import * as React from "react";
const SmallLogo = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={43}
    fill="none"
    stroke="#C6BCEF"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={6}
      d="m3.662 9.048 5.024 12.346M32 9.048l-5.125 12.346m-18.189 0 8.143 17.422a1 1 0 0 0 1.81.004l8.236-17.426m-18.189 0h18.189"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={6}
      d="m32 33.951-5.024-12.345M3.662 33.951l5.125-12.345m18.189 0L18.832 4.184a1 1 0 0 0-1.81-.004L8.787 21.606m18.189 0H8.786"
    />
  </svg>
);
export default SmallLogo;
