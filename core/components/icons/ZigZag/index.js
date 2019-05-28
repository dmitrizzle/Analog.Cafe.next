import React from "react";

export default props => {
  return (
    <svg
      viewBox="0 0 500 1000"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none slice"
      style={props.style}
    >
      <path
        d="M 4 1001 L 0 1001 L 0 -1 L 4 -1 L 169 343 L 4 1001 Z"
        fill={props.fill || "#ffffff"}
      />
    </svg>
  );
};
