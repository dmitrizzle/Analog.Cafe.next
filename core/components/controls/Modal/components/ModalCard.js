import React from "react";
import styled from "styled-components";

import Card from "../../Card";

export const windowHeight = () =>
  window
    ? window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    : 0;

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      topOffset: 0,
      topOffsetMax: 20,
      minElementHeight: 80,
      style: {
        opacity: 0,
        margin: `0 auto 90.1vh`,
      },
    };
  }

  componentWillReceiveProps = () => {
    if (process.browser) {
      const element = document.getElementById("modal-card");
      if (element) {
        window.requestAnimationFrame(() => {
          const elementHeight = element.offsetHeight;
          let topOffset = (windowHeight() - elementHeight) / 2;
          topOffset =
            elementHeight >= this.state.minElementHeight
              ? topOffset > this.state.topOffsetMax
                ? topOffset
                : this.state.topOffsetMax
              : this.state.topOffsetMax;
          this.setState({
            topOffset,
            visible: true,
            style: {
              opacity: 1,
              margin: `${topOffset}px auto 90.1vh`,
            },
          });

          // add ability to animate height after to avoid animating on reveal
          window.requestAnimationFrame(() =>
            this.setState({
              style: {
                ...this.state.style,
                transition: "margin 150ms ease 0s",
              },
            })
          );
        });
      }
    }
  };
  render = () => (
    <Card {...this.props} style={this.state.style} id="modal-card" />
  );
}
