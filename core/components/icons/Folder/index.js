import React from "react";

const Index = ({ style, stroke, fill }) => <svg style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 36">
  <path
    style={{ stroke, fill, strokeWidth: "1px" }}
    d="M40 4H25c-4 0-5-4-10-4H4a4 4 0 00-4 4v6h44V8a4 4 0 00-4-4zM0 32a4 4 0 004 4h36a4 4 0 004-4V12H0v20z"
  />
</svg>;

export default Index;
