import React from "react";

import { CardIntegratedForColumns } from "../../../../../core/components/controls/Card/components/CardColumns";
import { LabelWrap } from "../../../../../core/components/controls/Docket";
import { makeFroth } from "../../../../../utils/froth";
import { turnicateSentence } from "../../../../../utils/author-credits";
import CardWithDockets, {
  CardWithDocketsImage,
  CardWithDocketsInfo,
} from "../../../../../core/components/controls/Card/components/CardWithDockets";
import Label from "../../../../../core/components/vignettes/Label";
import LinkButton from "../../../../../core/components/controls/Button/components/LinkButton";

export default props => (
  <CardIntegratedForColumns>
    <CardWithDockets href={`/u/${props.id}`}>
      <CardWithDocketsImage
        src={makeFroth({ src: props.image, size: "m" }).src}
      >
        <LabelWrap>
          <Label branded>{props.role}</Label>
        </LabelWrap>
      </CardWithDocketsImage>
      <CardWithDocketsInfo>
        <h4>{props.title}</h4>
        <small>
          <em>{props.text && turnicateSentence(props.text, 40)}</em>
        </small>
      </CardWithDocketsInfo>
    </CardWithDockets>
    <LinkButton href="/account/profile">Edit Your Profile</LinkButton>
  </CardIntegratedForColumns>
);
