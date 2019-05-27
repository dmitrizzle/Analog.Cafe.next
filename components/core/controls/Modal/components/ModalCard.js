import React from "react";
import styled from "styled-components";

const Card = props => <div>Card</div>;

const CardWithTransition = styled(Card)`
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: margin 150ms;
  margin: ${props => props.topOffset}px auto 90.1vh;
`;

export const windowHeight = () =>
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      topOffset: 0,
      topOffsetMax: 20,
      minElementHeight: 80,
      visible: false
    };
  }
  componentWillReceiveProps = () => {
    if (process.browser) {
      const element = document.getElementById("modal-card");
      this.setState({ visible: false });
      if (element) {
        window.requestAnimationFrame(() => {
          const elementHeight = element.offsetHeight;
          const topOffset = (windowHeight() - elementHeight) / 2;
          this.setState({
            topOffset:
              elementHeight >= this.state.minElementHeight
                ? topOffset > this.state.topOffsetMax
                  ? topOffset
                  : this.state.topOffsetMax
                : this.state.topOffsetMax,
            visible: true
          });
        });
      }
    }
  };
  render = () => {
    return (
      <CardWithTransition
        {...this.props}
        visible={this.state.visible}
        topOffset={this.state.topOffset}
        id="modal-card"
      />
    );
  };
}
