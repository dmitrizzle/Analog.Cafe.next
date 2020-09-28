import React from "react";

const Index = ({ style, stroke, fill }) => (
  <svg
    style={{ overflow: "visible", ...style }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="25 18 40 65"
  >
    <path
      style={{ stroke, fill, strokeWidth: "1px" }}
      d="M33.7 18v60L48 68.7 62.3 78V18z"
    />
  </svg>
);

export default Index;
