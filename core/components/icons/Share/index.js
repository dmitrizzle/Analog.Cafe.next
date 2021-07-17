import React from "react";

const Index = ({ style, stroke, fill }) => (
  <svg
    style={{ overflow: "visible", ...style }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 44"
  >
    <path
      style={{ stroke, fill, strokeWidth: "1px" }}
      d="M10 8a.997.997 0 00.707-.293L15 3.414V33a1 1 0 102 0V3.414l4.293 4.293a1 1 0 101.414-1.414l-6-6a.997.997 0 00-1.414 0l-6 6A1 1 0 0010 8zm20 6h-8a1 1 0 100 2h8v26H2V16h8a1 1 0 100-2H2a2 2 0 00-2 2v26a2 2 0 002 2h28a2 2 0 002-2V16a2 2 0 00-2-2z"
    />
  </svg>
);

export default Index;
