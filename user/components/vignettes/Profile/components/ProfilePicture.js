import React from "react";

import { CardIntegratedForColumns } from "../../../../../core/components/controls/Card/components/CardColumns";
import { makeFroth } from "../../../../../utils/froth";
import Placeholder from "../../../../../core/components/vignettes/Picture/components/Placeholder";

const ProfilePicture = ({ image, title }) => <CardIntegratedForColumns withOutline>
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
    <>&nbsp;</>
  )}
</CardIntegratedForColumns>;

export default ProfilePicture;
