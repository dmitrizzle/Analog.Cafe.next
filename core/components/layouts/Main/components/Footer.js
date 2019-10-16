import { connect } from "react-redux";
import { withRouter } from "next/router";
import React from "react";
import styled from "styled-components";

import { setModal } from "../../../../store/actions-modal";
import { title } from "../../../../../constants/styles/typography";
import Folder from "../../../icons/Folder";
import Link from "../../../controls/Link";
import NavMenu from "../../../controls/Nav/components/NavMenu";
import Point from "../../../icons/Point";
import topics from "../../../controls/Topics";

const Wrapper = styled.footer`
  text-align: center;
  width: calc(100% - 3em);
  padding: 3em 1.5em 0.5em;
  @media print {
    display: none;
  }
`;
const Links = styled.div`
  font-size: 0.8em;
  a {
    text-decoration: none;
  }
  > em,
  > span {
    padding: 0 0.5em;
  }
  > span {
    ${title}
  }

  @media (max-width: 360px) {
    overflow: scroll;
  }
`;

const Footer = props => (
  <Wrapper>
    <Link
      to="#top"
      onClick={event => {
        event.preventDefault();
        window.scroll({
          top: 0,
          behavior: "smooth",
        });
      }}
    >
      <Point style={{ height: "1.25em" }} />
    </Link>
    <Links>
      <em>
        <Link to="/submit">Submissions</Link>
      </em>
      <em>
        <Link
          to="/nav/topics"
          onClick={event => {
            event.preventDefault();
            props.setModal(topics(props.router.asPath));
          }}
        >
          Topics
        </Link>
      </em>

      <em>
        <Link to="/">Homepage</Link>
      </em>
      <em>
        <Link to="/about">About</Link>
      </em>
      <span>
        <NavMenu nostyles>Menu</NavMenu>
      </span>
    </Links>
    <Links>
      <em>
        <Link to="https://twitter.com/analog_cafe">Twitter</Link>
      </em>
      <em>
        <Link to="http://bit.ly/FeedAnalog">Feedly</Link>
      </em>
      <em>
        <Link to="https://instagram.com/analog_cafe">Instagram</Link>
      </em>
    </Links>
    <Links>
      <em>
        <Link to="/account">
          Your Account <Folder style={{ width: "1em" }} />
        </Link>
      </em>
    </Links>
  </Wrapper>
);

const mapStateToProps = null;
const mapDispatchToProps = dispatch => {
  return {
    setModal: (info, request) => {
      dispatch(setModal(info, request));
    },
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Footer)
);
