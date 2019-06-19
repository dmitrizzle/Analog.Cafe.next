import React from "react";

import Docket, {
  DocketImage,
  DocketInfo,
  LabelWrap,
} from "../../../controls/Docket";
import Items, { Spacer } from "./Items";
import Label from "../../../vignettes/Label";

const ItemsGroup = ({ item, num, center, items }) => (
  <>
    {num === 0 && <Spacer />}
    <Docket
      to={item.to}
      // onClick={event => {
      //   GA.event({
      //     category: "Navigation",
      //     action: "Features.poster",
      //     label: item.title
      //   })
      // }}
    >
      <DocketImage src={item.poster} center={center} />
      <DocketInfo>
        <h4>
          {item.type && item.type === "↯ PDF Download" && "DOWNLOAD: "}
          {item.title}
        </h4>
        <small>
          <em>{item.text}</em>
        </small>
      </DocketInfo>

      {item.type && (
        <LabelWrap>
          <Label branded>{item.type.replace("_", " ")}</Label>
        </LabelWrap>
      )}
    </Docket>
    {num === items.length - 1 && <Spacer last />}
  </>
);

export const Carousel = props => (
  <Items>
    <div style={{ marginLeft: props.chop ? "1.5em" : undefined }}>
      {props.items.map((item, num) => (
        <ItemsGroup key={item.title} item={item} num={num} {...props} />
      ))}
    </div>
  </Items>
);
