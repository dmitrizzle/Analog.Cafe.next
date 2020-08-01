import { useDispatch } from "react-redux";
import React from "react";
import styled from "styled-components";

import { NAME } from "../../../../../constants/messages/system";
import { c_red } from "../../../../../constants/styles/themes";
import { menuModal } from "../../../controls/Nav/components/NavMenu";
import { setModal } from "../../../../store/actions-modal";
import { title } from "../../../../../constants/styles/typography";
import { withRedux } from "../../../../../utils/with-redux";
import Link from "../../../controls/Link";
import Point from "../../../icons/Point";
import ga from "../../../../../utils/data/ga";

const Wrapper = styled.footer`
  text-align: center;
  width: calc(100% - 3em);
  padding: 3em 1.5em 6em;
  @media print {
    display: none;
  }
  background: ${({ theme }) => theme.bg};
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

const Footer = () => {
  const dispatch = useDispatch();

  return (
    <Wrapper data-cy="Footer">
      <Link
        to="#top"
        onClick={event => {
          event.preventDefault();
          window.scroll({
            top: 0,
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
          <Link to="/shop">
            <span style={{ color: c_red }}>Shop</span>
          </Link>
        </em>
        <em>
          <Link to="/account/profile">Profile</Link>
        </em>
        <em>
          <Link to="/">{NAME}</Link>
        </em>
        <em>
          <Link to="/write">Submissions</Link>
        </em>
        <em>
          <Link
            to="/nav/menu"
            onClick={event => {
              event.preventDefault();
              dispatch(setModal(menuModal));
            }}
          >
            Menu
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
                    category: "out",
                    action: "footer.feedly",
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
                    category: "out",
                    action: "footer.twitter",
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
                    category: "out",
                    action: "footer.instagram",
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
            <Link to="/privacy-tools">Privacy Tools</Link>
          </small>
        </em>
      </Links>
    </Wrapper>
  );
};

export default withRedux(Footer);
