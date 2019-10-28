import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import styled, { keyframes, css } from "styled-components";

import { CoffeeInline } from "../../../icons/Coffee";
import { NavLink } from "../../../controls/Nav/components/NavLinks";
import { NavModal } from "../../../controls/Nav/components/NavMenu";
import {
  addFavourite,
  deleteFavourite,
  isFavourite,
} from "../../../../../user/store/actions-favourites";
import {
  b_phablet,
  b_tablet,
} from "../../../../../constants/styles/measurements";
import { c_black, c_white } from "../../../../../constants/styles/colors";
import { m_column } from "../../../../../constants/styles/measurements";
import { eventGA } from "../../../../../utils/data/ga";
import { hideModal, setModal } from "../../../../store/actions-modal";
import Link from "../../../controls/Link";
import Save from "../../../icons/Save";
import Present from "../../../icons/Present";
import SubNav, { SubNavItem } from "../../../controls/Nav/SubNav";

const fave = keyframes`
  from { transform: scale(0)}
  to { transform:scale(1)}
`;
const unfave = keyframes`
  from { transform: scale(1.075); opacity: .5}
  to { transform:scale(.95); opacity: 1}
`;
const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

export const PresentWrap = styled.span`
  svg {
    height: 0.75em;
    path {
      stroke: none !important;
    }
  }
`;

const NavItem = styled(SubNavItem)`
  a {
    ${({ fixedToEmWidth, fixedToEmWidthPhablet }) =>
      fixedToEmWidth &&
      css`
        width: ${fixedToEmWidth}em;
        display: inline-block;
        transition: width 250ms;
        overflow: hidden;

        padding: 0.05em 0.45em 0.15em !important;
        margin-top: 0.15em;
        @media (max-width: ${b_tablet}) {
          margin-top: 0.075em;
          padding: 0.05em 0.45em 0.15em !important;
        }

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
        stroke: ${c_black};
        stroke-width: ${({ isFavourite }) => (isFavourite ? 1 : 2)}px;
      }
    }
  }
  a:focus,
  a:active {
    svg path {
      stroke: ${c_white} !important;
      fill: ${c_white};
    }
  }
`;

const ToggleSub = styled(Link)`
  font-size: 0.625em;
  display: block;
  font-family: "Exo 2";
  line-height: 1.5em;
  background: #f7f7f7;
  border-radius: 0.33em;
  margin-top: -1.15em;
  padding-top: 1em !important;
  z-index: 0;
`;
const LargerScreens = styled.span`
  @media (max-width: ${b_phablet}) {
    display: none;
  }
`;
export const NavBookmark = ({ isFavourite, handleFavourite }) => (
  <NavItem
    isFavourite={isFavourite}
    fixedToEmWidth={isFavourite ? 6.15 : 10.5}
    fixedToEmWidthPhablet={isFavourite ? 6.15 : 6.25}
  >
    <NavLink onClick={handleFavourite} black>
      <span>
        {!isFavourite && (
          <>
            <Save
              style={{
                marginTop: "-.25em",
                color: c_white,
              }}
              stroke={c_white}
            />{" "}
          </>
        )}
        <LargerScreens>{!isFavourite && "Save to "}</LargerScreens>Bookmark
        <LargerScreens>{!isFavourite && "s"}</LargerScreens>
        {isFavourite && "ed"}
      </span>
    </NavLink>
  </NavItem>
);

export const FixedSubNav = styled(SubNav)`
  ${props =>
    props.fixed &&
    css`
      position: fixed;
      width: 100%;
      bottom: 0em;
      z-index: 11;
      padding: 0 0 0.5em 0;
      div {
        max-width: ${m_column};
        margin: 0 auto;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
      }
    `}
`;

const ArticleNav = props => {
  // determine favourite status
  const [isFavourite, setFavouriteStatus] = useState(false);
  const thisFavourite = props.favourites[props.article.id];

  useEffect(() => {
    if (!thisFavourite) props.isFavourite(props.article.id);
    setFavouriteStatus(thisFavourite && thisFavourite.user > 0);
  }, [thisFavourite]);

  // take action on favourite button
  const handleFavourite = event => {
    if (!props.article) return;

    if (!props.user || props.user.status !== "ok") {
      eventGA({
        category: "User",
        action: "Favourite.SignIn",
        label: `/r/${props.article.slug}`,
      });
      Router.router.push("/sign-in");
      return;
    }

    event.preventDefault();
    !isFavourite && event.target.blur();
    setFavouriteStatus(!isFavourite);
    isFavourite
      ? props.deleteFavourite(props.article.id)
      : props.addFavourite({
          id: props.article.id,
          slug: props.article.slug,
        });

    eventGA({
      category: "User",
      action: isFavourite ? "UnFavourite" : "Favourite",
      label: `/r/${props.article.slug}`,
    });
  };

  const userHasPermission = () => {
    if (!props.user.info.id) return false;
    if (!props.article.submittedBy) return false;
    if (props.user.info.role === "admin" || props.user.info.role === "editor")
      return true;
    if (props.user.info.id === props.article.submittedBy.id) return true;
    return false;
  };

  const coffeeLink = props.leadAuthorButton.to;
  const isKoFi = coffeeLink ? coffeeLink.includes("ko-fi") : false;
  const isBuyMeACoffee = coffeeLink ? coffeeLink.includes("buymeacoff") : false;

  return (
    <FixedSubNav data-cy="ArticleNav" fixed={props.article.tag !== "link"}>
      <div>
        {!props.article.isSubmission && (
          <NavBookmark
            isFavourite={isFavourite}
            handleFavourite={handleFavourite}
          />
        )}

        {props.coffee && (
          <NavItem>
            <NavModal
              black
              unmarked
              noStar
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
                      This button will take you to {
                        props.leadAuthor.title
                      }’s {isKoFi && <Link to="https://ko-fi.com">Ko-fi</Link>}
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
                          Buy {props.leadAuthor.title} a Coffee
                          <CoffeeInline />
                        </>
                      ),
                      branded: true,
                      onClick: () =>
                        eventGA({
                          category: "Campaign",
                          action: "Article.author_cta_coffee",
                          label: coffeeLink || "#",
                        }),
                    },
                  ],
                },
                id: "help/coffee",
              }}
              onClick={() =>
                eventGA({
                  category: "Campaign",
                  action: "Article.author_cta_coffee.Help",
                  label: coffeeLink || "#",
                })
              }
              to={coffeeLink || "#"}
            >
              Thank the Author <CoffeeInline />
            </NavModal>
          </NavItem>
        )}

        {props.user &&
          props.user.status === "ok" &&
          userHasPermission() &&
          props.article.isSubmission && (
            <NavItem>
              <NavLink
                onClick={async event => {
                  event.preventDefault();
                  const sendToComposer = await import(
                    "../../../../../utils/editor/send-to-composer"
                  );
                  sendToComposer.default(props);
                }}
              >
                Edit
              </NavLink>
            </NavItem>
          )}
        {props.user &&
          (props.user.info.role === "admin" ||
            props.user.info.role === "editor") && (
            <>
              {!props.article.isSubmission &&
                props.article.status === "published" && (
                  <NavItem>
                    <NavLink
                      onClick={async event => {
                        event.preventDefault();
                        const unpublish = await import(
                          "../../../../../utils/editor/unpublish"
                        );
                        unpublish.default(props);
                      }}
                    >
                      Unpublish
                    </NavLink>
                  </NavItem>
                )}
              {props.article.isSubmission &&
                props.article.status === "pending" && (
                  <NavItem>
                    <NavLink
                      onClick={async event => {
                        event.preventDefault();
                        const reject = await import(
                          "../../../../../utils/editor/reject"
                        );
                        reject.default(props);
                      }}
                    >
                      Reject
                    </NavLink>
                  </NavItem>
                )}
              {props.article.isSubmission &&
                props.article.status !== "published" && (
                  <NavItem>
                    <NavLink
                      onClick={async event => {
                        event.preventDefault();
                        const archive = await import(
                          "../../../../../utils/editor/archive"
                        );
                        archive.default(props);
                      }}
                    >
                      Archive
                    </NavLink>
                  </NavItem>
                )}
              {props.article.isSubmission ? (
                <>
                  {props.article.status === "pending" && (
                    <NavItem>
                      <NavLink
                        red={1}
                        onClick={async event => {
                          event.preventDefault();
                          const publishArticle = await import(
                            "../../../../../utils/editor/publish-article"
                          );
                          publishArticle.default(props);
                        }}
                      >
                        Publish ◎
                      </NavLink>
                    </NavItem>
                  )}
                  <NavItem>
                    <NavLink
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
                    </NavLink>
                    {props.article.status === "published" && (
                      <ToggleSub to={`/r/${props.article.slug}`}>
                        Switch to Live
                      </ToggleSub>
                    )}
                  </NavItem>
                </>
              ) : (
                <NavItem>
                  <NavLink
                    style={{ zIndex: 1 }}
                    red={1}
                    to={`/account/submission/${props.article.slug}`}
                  >
                    Live ◉
                  </NavLink>

                  <ToggleSub to={`/account/submission/${props.article.slug}`}>
                    Submission
                  </ToggleSub>
                </NavItem>
              )}
            </>
          )}
      </div>
    </FixedSubNav>
  );
};

// redux to be connected on client side for favourites button
const mapStateToProps = ({ user, favourites }) => {
  return { user, favourites };
};
const mapDispatchToProps = dispatch => {
  return {
    isFavourite: article => {
      dispatch(isFavourite(article));
    },
    addFavourite: favourite => {
      dispatch(addFavourite(favourite));
    },
    deleteFavourite: id => {
      dispatch(deleteFavourite(id));
    },
    setModal: (info, request) => {
      dispatch(setModal(info, request));
    },
    hideModal: () => {
      dispatch(hideModal());
    },
    addComposerData: async data => {
      const actions = await import(
        "../../../../../user/store/actions-composer"
      );
      dispatch(actions.addComposerData(data));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleNav);
