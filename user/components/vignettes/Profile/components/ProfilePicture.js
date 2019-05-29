import React from "react";

import { CardIntegratedForColumns } from "../../../../../core/components/controls/Card/components/CardColumns";
import { makeFroth } from "../../../../../utils/froth";
import Placeholder from "../../Picture/components/Placeholder";

export default props => (
  <CardIntegratedForColumns>
    <figure style={{ lineHeight: 0 }}>
      <Placeholder frothId={props.list.author.image}>
        <img
          src={
            makeFroth({
              src: props.list.author.image,
              size: "s"
            }).src
          }
          alt={props.list.author.title}
        />
      </Placeholder>
    </figure>
  </CardIntegratedForColumns>
);
