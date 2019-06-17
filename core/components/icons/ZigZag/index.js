import React from "react";

import { c_white } from "../../../../constants/styles/colors";

export default props => {
  return (
    <svg
      viewBox="2 4 214 1000"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none slice"
      style={props.style}
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g fillRule="nonzero" fill={c_white}>
          <path
            d="M5,1005 C3.88851657,1009.32755 2.55518324,1009.32755 1,1005 L1,3 C2.40714385,0.436237582 3.74047718,0.436237582 5,3 C5,192.276378 170,182.312024 170,347 C170,473.71636 -1.38860941,620.346383 5,1005 Z M20,3 C28.9332361,3 36.8523166,3 44,3 C42.9030794,152.763826 211.362702,172.114866 211.362702,347 C211.362702,506.375905 44,631.18241 44,1005 C38.5065174,1005 28.7538123,1005 20,1005 C23.9337088,609.730944 185.613283,501.137488 185.613283,347 C185.613283,174.061721 20.7672722,172.717466 20,3 Z"
            id="zigzag"
            fill={c_white}
            fillRule="nonzero"
          />
        </g>
      </g>
    </svg>
  );
};
