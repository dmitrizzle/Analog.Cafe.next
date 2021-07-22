import { useDispatch } from "react-redux";
import React from "react";
import styled, { css } from "styled-components";

import { menuModal } from "../../../controls/Nav/components/NavMenu";
import { setModal } from "../../../../store/actions-modal";
import { title } from "../../../../../constants/styles/typography";
import { withRedux } from "../../../../../utils/with-redux";
import Link from "../../../controls/Link";
import ga from "../../../../../utils/data/ga";

const Wrapper = styled.footer`
  text-align: center;
  width: calc(100% - 3em);
  padding: 0 1.5em 6em;
  @media print {
    display: none;
  }
  background: ${({ theme }) => theme.bg};

  ${({ withinArticle }) =>
    !withinArticle &&
    css`
      margin-top: 3em;
    `}
`;
const Links = styled.div`
  font-size: 0.8em;
  line-height: 1.25em;
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
      <Links>
        <em>
          <small>
            <Link to="/about">About</Link>
          </small>
        </em>
        <em>
          <small>
            <Link to="/write">Submissions</Link>
          </small>
        </em>
        <em>
          <small>
            <Link to="/shop">
              <span>Shop</span>
            </Link>
          </small>
        </em>
        <em>
          <small>
            <Link to="/account/profile">You</Link>
          </small>
        </em>
        <em>
          <small>
            <Link
              to="/nav/menu"
              onClick={event => {
                event.preventDefault();
                dispatch(setModal(menuModal));
              }}
            >
              More…
            </Link>
          </small>
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
