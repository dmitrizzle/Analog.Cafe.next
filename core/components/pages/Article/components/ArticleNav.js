import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import * as clipboard from "clipboard-polyfill";
import styled, { keyframes, css } from "styled-components";
import throttle from "lodash/throttle";

import { HeartInline } from "../../../icons/Heart";
import { NavLink } from "../../../controls/Nav/components/NavLinks";
import { NavModal } from "../../../controls/Nav/components/NavMenu";
import { addComposerData } from "../../../../../user/store/actions-composer";
import {
  addFavourite,
  deleteFavourite,
  isFavourite as isFavouriteSync,
} from "../../../../../user/store/actions-favourites";
import { addSessionInfo } from "../../../../../user/store/actions-user";
import {
  b_phablet,
  m_column,
  m_radius_sm,
} from "../../../../../constants/styles/measurements";
import { bookmarksModal } from "../../../controls/Features/components/PosterBookmarks";
import { c_red } from "../../../../../constants/styles/colors";
import { fadeIn } from "../../../../../constants/styles/animation";
import { hideModal, setModal } from "../../../../store/actions-modal";
import { withRedux } from "../../../../../utils/with-redux";
import Bookmark from "../../../icons/Bookmark";
import Link from "../../../controls/Link";
import Share from "../../../icons/Share";
import SubNav, { SubNavItem } from "../../../controls/Nav/SubNav";
import document from "../../../../../pages/_document";
import ga from "../../../../../utils/data/ga";

const fave = keyframes`
  from { transform: scale(0)}
  to { transform:scale(1)}
`;
const unfave = keyframes`
  from { transform: scale(1.075); opacity: .5}
  to { transform:scale(.95); opacity: 1}
`;

const NavItem = styled(SubNavItem)`
  a {
  display: inline-block;
  transition: width 250ms;
  overflow: hidden;

  margin-top: 0.075em;
  line-height: 1.25em;

    ${({ fixedToEmWidth, fixedToEmWidthPhablet }) =>
      fixedToEmWidth &&
      css`
        width: ${fixedToEmWidth}em;
        > span {
          width: ${fixedToEmWidth + 5}em;
          text-align: left;
          display: inline-block;
          line-height: 1.25em;
        }
        @media (max-width: ${b_phablet}) {
          width: ${fixedToEmWidthPhablet}em;
          > span {
            width: ${fixedToEmWidthPhablet}em;
          }
        }
      `}
      animation: ${fadeIn} 250ms;
      height: 1.25em;

    svg {
      height: 0.75em;
      margin: -0.25em 0 0 0;
      display: inline-block;
      overflow: visible;

      animation: ${({ isFavourite }) => (isFavourite ? fave : unfave)} 250ms
        cubic-bezier(0.46, 0.88, 0.37, 1.43) forwards;
      path {
        stroke: ${({ theme }) => theme.fg};
        stroke-width: ${({ isFavourite }) => (isFavourite ? 1 : 2)}px;
      }
    }
  }
  a:focus,
  a:active {
    svg path {
      stroke: ${({ theme }) => theme.bg} !important;
      fill: ${({ theme }) => theme.bg};
    }
  }
`;
const NavLinkOutlined = styled(NavLink)`
  box-shadow: 0 0 0 1px ${({ theme }) => theme.fg};
`;
const ToggleSub = styled(Link)`
  font-size: 0.625em;
  display: block !important;
  position: relative;
  font-family: "Exo 2", sans-serif;
  background: #f7f7f7;
  border-radius: ${m_radius_sm};
  margin-top: -1.15em !important;
  padding-top: 0.95em !important;
  z-index: 0;
`;

export const NavBookmark = ({ isFavourite, handleFavourite }) => (
  <NavItem
    isFavourite={isFavourite}
    inverse={isFavourite}
    fixedToEmWidth={isFavourite ? 6.15 : 6.65}
  >
    <NavLinkOutlined onClick={handleFavourite}>
      <span>
        {!isFavourite && (
          <>
            <Bookmark
              style={{
                height: ".9em",
              }}
            />
            +{" "}
          </>
        )}
        Bookmark
        {isFavourite && "ed"}
      </span>
    </NavLinkOutlined>
  </NavItem>
);

const fixedSubNavCss = css`
  position: fixed;
  width: 100%;
  bottom: 0em;
  z-index: 11;
  padding: 0 0 0.5em 0;
  transition: transform 250ms;
`;
export const FixedSubNav = styled(SubNav)`
  ${props => props.fixedPosition && fixedSubNavCss}
  ${props =>
    props.hide &&
    props.fixedPosition &&
    css`
      transform: translateY(5.5em);
    `}
`;

export const FixedSubNavSpan = styled.div`
  max-width: ${m_column};
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const ArticleNav = props => {
  const user = useSelector(state => state.user);
  const favourites = useSelector(state => state.favourites);
  const dispatch = useDispatch();

  // determine favourite status
  const [isFavourite, setFavouriteStatus] = useState(false);
  const thisFavourite = favourites[props.article.id];

  const fixedPosition = !(props.article.tag === "link" && !props.fixed);

  let scrollYCache = 0;
  const [isScrollingUp, setScrollingUp] = useState();
  const windowScrollHandler = () => {
    const position = window.scrollY > 600 ? window.scrollY : 0;

    // pop up at the bottom
    if (window.scrollY > document.body.scrollHeight - 3500)
      return setScrollingUp(false);

    // skip if not enough distance elapsed
    if (Math.abs(position - scrollYCache) < 100) return;
    setScrollingUp(scrollYCache < position);
    scrollYCache = position;
  };

  useEffect(() => {
    if (!thisFavourite) dispatch(isFavouriteSync(props.article.id));
    setFavouriteStatus(thisFavourite && thisFavourite.user > 0);

    fixedPosition &&
      window.addEventListener(
        "scroll",
        throttle(windowScrollHandler, 100),
        true
      );

    return fixedPosition
      ? () => {
          window.removeEventListener(
            "scroll",
            throttle(windowScrollHandler, 100),
            true
          );
        }
      : undefined;
  }, [thisFavourite]);

  // take action on favourite button
  const handleFavourite = event => {
    if (!props.article) return;

    if (!user || user.status !== "ok") {
      ga("event", {
        category: "auth",
        action: "article.subnav.fav.signin",
        label: `/r/${props.article.slug}`,
      });
      dispatch(
        addSessionInfo({
          loginAction: `/r/${props.article.slug}`,
        })
      );
      Router.router.push("/sign-in");
      return;
    }

    event.preventDefault();
    !isFavourite && event.target.blur();
    !isFavourite && setFavouriteStatus(!isFavourite);
    isFavourite
      ? dispatch(
          setModal({
            status: "ok",
            info: {
              noStar: true,
              title: (
                <>
                  <Bookmark
                    style={{
                      height: ".9em",
                    }}
                  />{" "}
                  Bookmarked
                </>
              ),
              buttons: [
                {
                  to: "/account/bookmarks",
                  text: "See All Bookmarks",
                  onClick: event => {
                    event.preventDefault();
                    event.stopPropagation();
                    dispatch(setModal(bookmarksModal));
                  },
                },
                {
                  to: "#",
                  onClick: event => {
                    event.preventDefault();
                    setFavouriteStatus(!isFavourite);
                    dispatch(deleteFavourite(props.article.id));
                  },
                  text: "Remove from Bookmarks",
                  branded: true,
                },
              ],
            },
          })
        )
      : dispatch(
          addFavourite({
            id: props.article.id,
            slug: props.article.slug,
          })
        );

    ga("event", {
      category: "auth",
      action: isFavourite ? "article.subnav.fav" : "article.subnav.fav.undo",
      label: `/r/${props.article.slug}`,
    });
  };

  const userHasPermission = () => {
    if (!user.info.id) return false;
    if (!props.article.submittedBy) return false;
    if (user.info.role === "admin" || user.info.role === "editor") return true;
    if (user.info.id === props.article.submittedBy.id) return true;
    return false;
  };

  const coffeeLink = props.leadAuthorButton?.to;
  const isKoFi = coffeeLink ? coffeeLink.includes("ko-fi") : false;
  const isBuyMeACoffee = coffeeLink ? coffeeLink.includes("buymeacoff") : false;

  return (
    <FixedSubNav
      data-cy="ArticleNav"
      fixedPosition={fixedPosition}
      hide={isScrollingUp}
    >
      <FixedSubNavSpan>
        {!props.article.isSubmission && (
          <NavBookmark
            isFavourite={isFavourite}
            handleFavourite={handleFavourite}
          />
        )}

        {props.coffee && (
          <NavItem>
            <NavModal
              unmarked
              noStar
              css={css`
                box-shadow: 0 0 0 1px ${({ theme }) => theme.fg};
              `}
              with={{
                info: {
                  title: "Thank the Author",
                  text: (
                    <>
                      <strong>
                        If you like the read, you can thank its author with a
                        “coffee.”
                      </strong>
                      <br />
                      <br />
                      The red button, below, will take you to{" "}
                      {props.leadAuthor.title}’s{" "}
                      {isKoFi && <Link to="https://ko-fi.com">Ko-fi</Link>}
                      {isBuyMeACoffee && (
                        <Link to="https://www.buymeacoffee.com">
                          Buy Me A Coffee
                        </Link>
                      )}{" "}
                      page where you can send a quick buck with PayPal,
                      ApplePay, or a credit card.
                    </>
                  ),
                  buttons: [
                    {
                      to: coffeeLink,
                      text: (
                        <>
                          Buy {props.leadAuthor.title} a Coffee{" "}
                          <small>
                            <HeartInline />
                          </small>
                        </>
                      ),
                      branded: true,
                      onClick: () =>
                        ga("event", {
                          category: "out",
                          action: "article.subnav.coffee",
                          label: coffeeLink || "#",
                        }),
                    },
                  ],
                },
                id: "help/coffee",
              }}
              onClick={() =>
                ga("event", {
                  category: "nav",
                  action: "aritcle.subnav.coffee",
                  label: coffeeLink || "#",
                })
              }
              to={coffeeLink || "#"}
            >
              Thank the Author <HeartInline branded />
            </NavModal>
          </NavItem>
        )}

        <NavItem>
          <NavModal
            unmarked
            noStar
            css={css`
              box-shadow: 0 0 0 1px ${({ theme }) => theme.fg};
            `}
            with={{
              info: {
                title: <>Reading Tools</>,
                buttons: [
                  {
                    to: "/account/bookmarks",
                    text: (
                      <span
                        style={{
                          display: "inline-block",
                          marginLeft: "-1.25em",
                        }}
                      >
                        <Bookmark style={{ height: "1em" }} /> Bookmarks
                      </span>
                    ),
                    onClick: event => {
                      event.preventDefault();
                      event.stopPropagation();
                      dispatch(setModal(bookmarksModal));
                    },
                  },
                  {
                    to: `/r/${props.article.slug}`,
                    text: (
                      <span
                        style={{
                          display: "inline-block",
                          marginLeft: "-1.25em",
                        }}
                      >
                        <Share style={{ height: "1em", marginTop: "-.45em" }} />{" "}
                        Share
                      </span>
                    ),
                    onClick: event => {
                      event.preventDefault();
                      event.stopPropagation();
                      const shareUrl = `https://www.analog.cafe/r/${props.article.slug}`;

                      dispatch(
                        setModal({
                          info: {
                            title: props.article.title,
                            text: (
                              <>
                                <span style={{ userSelect: "none" }}>
                                  Link URL:{" "}
                                </span>
                                <strong>{shareUrl}</strong>
                              </>
                            ),
                            buttons: [
                              {
                                to: shareUrl,
                                onClick: event => {
                                  event.preventDefault();
                                  clipboard.writeText(shareUrl);
                                },
                                text: "Copy Link",
                              },
                              {
                                to:
                                  "https://twitter.com/intent/tweet?text=" +
                                  encodeURIComponent(
                                    `“${props.article.title +
                                      (props.article.subtitle
                                        ? ": " + props.article.subtitle
                                        : "")}” – by ${
                                      props.leadAuthor.title
                                    }. Read on: ${shareUrl}`
                                  ),
                                text: "Share on Twitter",
                              },
                              {
                                to:
                                  "https://www.facebook.com/sharer/sharer.php?u=" +
                                  encodeURIComponent(shareUrl),
                                text: "Share on Facebook",
                              },
                            ],
                          },
                          id: "share/" + props.article.slug,
                        })
                      );
                    },
                  },
                ],
              },
              id: "nav/reading-tools",
            }}
          >
            ⋯
          </NavModal>
        </NavItem>

        {user &&
          user.status === "ok" &&
          userHasPermission() &&
          props.article.isSubmission && (
            <NavItem>
              <NavLinkOutlined
                onClick={async event => {
                  event.preventDefault();
                  const sendToComposer = await import(
                    "../../../../../utils/editor/send-to-composer"
                  );
                  sendToComposer.default({
                    ...props,
                    addComposerData: data => dispatch(addComposerData(data)),
                    setModal: data => dispatch(setModal(data)),
                  });
                }}
              >
                Edit
              </NavLinkOutlined>
            </NavItem>
          )}
        {user && (user.info.role === "admin" || user.info.role === "editor") && (
          <>
            {!props.article.isSubmission &&
              props.article.status === "published" && (
                <NavItem>
                  <NavLinkOutlined
                    onClick={async event => {
                      event.preventDefault();
                      const unpublish = await import(
                        "../../../../../utils/editor/unpublish"
                      );
                      unpublish.default({
                        ...props,
                        setModal: data => dispatch(setModal(data)),
                      });
                    }}
                  >
                    Unpublish
                  </NavLinkOutlined>
                </NavItem>
              )}
            {props.article.isSubmission && props.article.status === "pending" && (
              <NavItem>
                <NavLinkOutlined
                  onClick={async event => {
                    event.preventDefault();
                    const reject = await import(
                      "../../../../../utils/editor/reject"
                    );
                    reject.default({
                      ...props,
                      setModal: data => dispatch(setModal(data)),
                    });
                  }}
                >
                  Reject
                </NavLinkOutlined>
              </NavItem>
            )}
            {props.article.isSubmission &&
              props.article.status !== "published" && (
                <NavItem>
                  <NavLinkOutlined
                    onClick={async event => {
                      event.preventDefault();
                      const archive = await import(
                        "../../../../../utils/editor/archive"
                      );
                      archive.default({
                        ...props,
                        setModal: data => dispatch(setModal(data)),
                      });
                    }}
                  >
                    Archive
                  </NavLinkOutlined>
                </NavItem>
              )}
            {props.article.isSubmission ? (
              <>
                {props.article.status === "pending" && (
                  <NavItem>
                    <NavLinkOutlined
                      red={1}
                      onClick={async event => {
                        event.preventDefault();
                        const publishArticle = await import(
                          "../../../../../utils/editor/publish-article"
                        );
                        publishArticle.default({
                          ...props,
                          setModal: data => dispatch(setModal(data)),
                          hideModal: () => dispatch(hideModal()),
                        });
                      }}
                    >
                      Publish ◎
                    </NavLinkOutlined>
                  </NavItem>
                )}
                <NavItem>
                  <NavLinkOutlined
                    style={{ zIndex: 1 }}
                    blue
                    to={
                      props.article.status === "published"
                        ? `/r/${props.article.slug}`
                        : "#"
                    }
                    disabled={props.article.status !== "published"}
                  >
                    Submission ❡
                  </NavLinkOutlined>
                  {props.article.status === "published" && (
                    <ToggleSub to={`/r/${props.article.slug}`}>
                      Switch to Live
                    </ToggleSub>
                  )}
                </NavItem>
              </>
            ) : (
              <NavItem>
                <NavLinkOutlined
                  style={{ zIndex: 1, width: "4em" }}
                  black
                  to={`/account/submission/${props.article.slug}`}
                >
                  Live <span style={{ color: c_red }}>◉</span>
                </NavLinkOutlined>

                <ToggleSub to={`/account/submission/${props.article.slug}`}>
                  Submission
                </ToggleSub>
              </NavItem>
            )}
          </>
        )}
      </FixedSubNavSpan>
    </FixedSubNav>
  );
};

export default withRedux(ArticleNav);
