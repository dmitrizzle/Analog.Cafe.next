import { useSelector } from "react-redux";
import React from "react";

import { CardIntegratedForColumns } from "../../../../../core/components/controls/Card/components/CardColumns";
import { b_mobile } from "../../../../../constants/styles/measurements";
import { interpretTheme } from "../../../../../core/components/controls/Theme/utils";
import { makeFroth } from "../../../../../utils/froth";
import { themeOptions } from "../../../../../constants/styles/themes";
import { withRedux } from "../../../../../utils/with-redux";
import Placeholder from "../../../../../core/components/vignettes/Picture/components/Placeholder";

const ProfilePicture = ({ image, title }) => {
  const theme = interpretTheme(useSelector(({ theme }) => theme));

  return (
    <CardIntegratedForColumns withOutline>
      {image ? (
        <figure style={{ lineHeight: 0 }}>
          <Placeholder frothId={image}>
            <img
              src={
                makeFroth({
                  src: image,
                  size: "s",
                }).src
              }
              alt={title}
            />
          </Placeholder>
        </figure>
      ) : (
        <div
          style={{
            height: b_mobile,
            background: themeOptions[theme].grey_light,
          }}
        >
          <h3
            style={{
              height: "100%",
              padding: 0,
              margin: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                display: "inline",
              }}
            >
              {title.substring(0, 2)}
            </span>
          </h3>
        </div>
      )}
    </CardIntegratedForColumns>
  );
};

export default withRedux(ProfilePicture);
