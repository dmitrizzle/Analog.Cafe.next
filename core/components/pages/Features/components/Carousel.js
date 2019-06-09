import LazyLoad from "react-lazyload";
import React from "react";

import GridButton from "../../../controls/Button/components/GridButton";
import Posters, { Poster, PosterImage, PosterInfo, Spacer } from "./Posters";

const PosterGroup = ({ item, num, center, items }) => (
  <>
    {num === 0 && <Spacer />}
    <Poster
      to={item.to}
      onClick={event => {
        // GA.event({
        //   category: "Navigation",
        //   action: "Features.poster",
        //   label: item.title
        // })
      }}
    >
      <PosterImage src={item.poster} center={center} />
      <PosterInfo>
        <h4>
          {item.type && item.type === "↯ PDF Download" && "DOWNLOAD: "}
          {item.title}
        </h4>
        <small>
          <em>{item.text}</em>
        </small>
      </PosterInfo>

      {item.type && (
        <GridButton style={{ margin: "13.25em 0 0 .5em" }} branded>
          {item.type.replace("_", " ")}
        </GridButton>
      )}
    </Poster>
    {num === items.length - 1 && <Spacer last />}
  </>
);

export const Carousel = props => (
  <Posters>
    <div style={{ marginLeft: props.chop ? "1.5em" : undefined }}>
      {props.items.map((item, num) => (
        <LazyLoad once height="12em" key={item.title}>
          <PosterGroup item={item} num={num} {...props} />
        </LazyLoad>
      ))}
    </div>
  </Posters>
);
