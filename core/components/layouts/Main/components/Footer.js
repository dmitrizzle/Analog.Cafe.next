import { connect } from "react-redux";
import { withRouter } from "next/router";
import LazyLoad from "react-lazyload";
import React from "react";
import styled from "styled-components";

import { setModal } from "../../../../store/actions-modal";
import { title } from "../../../../../constants/styles/typography";
import Link from "../../../controls/Link";
import Point from "../../../icons/Point";
import User from "../../../icons/User";
import menu from "../../../controls/Menu";
import { exploreModal } from "../../../controls/Nav/components/NavExplore";

import { c_white } from "../../../../../constants/styles/colors";

const Wrapper = styled.footer`
  text-align: center;
  width: calc(100% - 3em);
  padding: 3em 1.5em;
  @media print {
    display: none;
  }
  background: ${c_white};
  z-index: 11;
  position: relative;
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
  <LazyLoad once offset={300} height={"100%"}>
    <Wrapper data-cy="Footer">
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
          <Link to="/about">About</Link>
        </em>
        <em>
          <Link
            to="/nav/menu"
            onClick={event => {
              event.preventDefault();
              props.setModal(menu(props));
            }}
          >
            Menu
          </Link>
        </em>
        <em>
          <Link
            to="/nav/explore"
            onClick={event => {
              event.preventDefault();
              props.setModal(exploreModal);
            }}
          >
            Explore
          </Link>
        </em>
      </Links>
      <Links>
        <em>
          <Link to="/write">Submissions</Link>
        </em>
        <em>
          <Link to="/">Homepage</Link>
        </em>
        <em>
          <Link to="/account">
            Your Account <User />
          </Link>
        </em>
      </Links>
      <Links>
        <em>
          <small>
            <Link to="/tos">Terms</Link>
          </small>
        </em>
        <em>
          <small>
            <Link to="/privacy-policy">Privacy</Link>
          </small>
        </em>

        <em>
          <small>
            <Link to="/cookie-policy">Cookies</Link>
          </small>
        </em>
        <em>
          <small>
            <Link to="/disclaimer">Disclaimer</Link>
          </small>
        </em>
        <em>
          <small>
            <Link to="/acceptable-use-policy">AUP</Link>
          </small>
        </em>
        <em>
          <small>
            <Link to="/privacy-settings">Privacy Settings</Link>
          </small>
        </em>
      </Links>
    </Wrapper>
  </LazyLoad>
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
