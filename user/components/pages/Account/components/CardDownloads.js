import React from "react";

import { CardIntegratedForColumns } from "../../../../../core/components/controls/Card/components/CardColumns";
import { CardWithDocketsInfo } from "../../../../../core/components/controls/Card/components/CardWithDockets";
import CardHeader from "../../../../../core/components/controls/Card/components/CardHeader";
import LinkButton from "../../../../../core/components/controls/Button/components/LinkButton";

export default () => (
  <CardIntegratedForColumns>
    <CardHeader buttons={[0]} stubborn noStar title="Downloads & Printables" />
    <CardWithDocketsInfo
      style={{
        float: "none",
        width: "calc(100% - 1em)",
        height: "8.5em",
      }}
    >
      <small>
        <em>Downloads & Printables</em>
      </small>
    </CardWithDocketsInfo>

    <LinkButton to="/apps-and-downloads">View All</LinkButton>
  </CardIntegratedForColumns>
);
