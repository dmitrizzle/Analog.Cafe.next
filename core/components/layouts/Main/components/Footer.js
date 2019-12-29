import { connect } from "react-redux";
import { withRouter } from "next/router";
import React from "react";
import styled from "styled-components";

import { c_white, c_red } from "../../../../../constants/styles/colors";
import { menuModal } from "../../../controls/Nav/components/NavMenu";
import { setModal } from "../../../../store/actions-modal";
import { title } from "../../../../../constants/styles/typography";
import Burger from "../../../icons/Burger";
import Link from "../../../controls/Link";
import Point from "../../../icons/Point";
import User from "../../../icons/User";
import ga from "../../../../../utils/data/ga";

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
    display: inline-block;
  }
  > span {
    ${title}
  }

  @media (max-width: 360px) {
    overflow: scroll;
  }
`;

const Footer = props => (
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
        <Link to="https://www.etsy.com/shop/FilmBase">
          Etsy <span style={{ color: c_red }}>Shop</span>
        </Link>
      </em>
      <em>
        <Link to="/about">About</Link>
      </em>
      <em>
        <Link to="/write">Submissions</Link>
      </em>
      <em>
        <Link to="/">Front Page</Link>
      </em>
      <em>
        <Link to="/account">
          Your Account <User />
        </Link>
      </em>
      <em>
        <Link
          to="/nav/menu"
          onClick={event => {
            event.preventDefault();
            props.setModal(menuModal);
          }}
        >
          Menu <Burger style={{ margin: "0 0 0 0.25em" }} />{" "}
        </Link>
      </em>
    </Links>
    <Links>
      <em>
        <strong>
          <small>
            <Link
              to="http://bit.ly/FeedAnalog"
              onClick={() => {
                ga("event", {
                  category: "Campaign",
                  action: "FollowButtons_footer.follow_feedly",
                });
              }}
            >
              Feedly
            </Link>
          </small>
        </strong>
      </em>
      <em>
        <strong>
          <small>
            <Link
              to="https://twitter.com/analog_cafe"
              onClick={() => {
                ga("event", {
                  category: "Campaign",
                  action: "FollowButtons_footer.follow_twitter",
                });
              }}
            >
              Twitter
            </Link>
          </small>
        </strong>
      </em>
      <em>
        <strong>
          <small>
            <Link
              to="https://instagram.com/analog_cafe"
              onClick={() => {
                ga("event", {
                  category: "Campaign",
                  action: "FollowButtons_footer.follow_instagram",
                });
              }}
            >
              Instagram
            </Link>
          </small>
        </strong>
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
);

const mapStateToProps = ({ user }) => {
  return { user };
};
const mapDispatchToProps = dispatch => {
  return {
    setModal: (info, request) => {
      dispatch(setModal(info, request));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer));
