import { connect } from "react-redux";
import React from "react";
import styled, { keyframes } from "styled-components";

import { addSessionInfo } from "../../../../../user/store/actions-user";
import { c_blue, c_white } from "../../../../../constants/styles/colors";
import { title } from "../../../../../constants/styles/typography";
import Link from "../../../controls/Link";

const colorReveal = keyframes`
  0% {
    transform: scale(.005,0) rotateZ(360deg);
  }
  80% {
    transform: scale(.01,1) rotateZ(360deg);
  }
  100% {
    transform: scale(1,1) rotateZ(360deg);
  }
`;
const textReveal = keyframes`
  0% { opacity: 0 }
  50% { opacity: 0 }
  100% { opacity: 1 }
`;

const NotificationAnimation = styled.div`
   {
    position: fixed;
    top: 0;
    left: -0.25em;
    right: -0.25em;

    background: ${c_blue};
    height: 1.5em;
    animation: ${colorReveal} 500ms forwards;
    transform-origin: top;
    z-index: -1;
  }
`;
const NotificationWrapper = styled.div`
  ${title}
  cursor: pointer;
  position: fixed;
  top: 0;
  text-align: center;
  font-size: 0.8em;
  width: calc(100% - 0.5em);
  line-height: 1em;
  padding: 0.25em;
  color: ${c_white};
`;
const TextWrapper = styled.span`
  animation: ${textReveal} 500ms forwards;
`;

const Text = ({ sessionInfo }) => {
  return (
    <NotificationWrapper>
      <TextWrapper>{sessionInfo && sessionInfo.notification.text}</TextWrapper>
      <NotificationAnimation />
    </NotificationWrapper>
  );
};
const Linked = ({ sessionInfo }) => (
  <Link to={sessionInfo && sessionInfo.notification.to}>
    <Text sessionInfo={sessionInfo} />
  </Link>
);

// eslint-disable-next-line
const Notification = ({ user, addSessionInfo }) => {
  if (user.sessionInfo.notification.to)
    return <Linked sessionInfo={user.sessionInfo} />;
  return <Text sessionInfo={user.sessionInfo} />;
};
const NotificationDismissable = props => (
  <div
    onClick={() => {
      props.addSessionInfo({
        notification: {},
      });
    }}
    style={{ zIndex: 21, position: "relative" }}
  >
    {props.user.sessionInfo &&
      props.user.sessionInfo.notification &&
      props.user.sessionInfo.notification.text && <Notification {...props} />}
  </div>
);

export default connect(
  ({ user }) => {
    return { user };
  },
  dispatch => {
    return {
      addSessionInfo: sessionInfo => {
        dispatch(addSessionInfo(sessionInfo));
      },
    };
  }
)(NotificationDismissable);
