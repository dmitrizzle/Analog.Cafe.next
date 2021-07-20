import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import styled, { keyframes, css } from "styled-components";
import throttle from "lodash.throttle";

import { ClampedSubtitle } from "../../List/components/ClampedListItems";
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
import {
  c_charcoal,
  c_red,
  c_white,
} from "../../../../../constants/styles/themes";
import { dateFromUnix } from "../../../../../utils/time";
import { fadeIn } from "../../../../../constants/styles/animation";
import { hideModal, setModal } from "../../../../store/actions-modal";
import { rewrites } from "../../../../../constants/router/transformations";
import { shareModal, ShareButtonText } from "../../../../../utils/share-modal";
import { title } from "../../../../../constants/styles/typography";
import { toggleTheme } from "../../../../store/actions-theme";
import { withRedux } from "../../../../../utils/with-redux";
import Bookmark from "../../../icons/Bookmark";
import Label from "../../../vignettes/Label";
import Link from "../../../controls/Link";
import SubNav, { SubNavItem } from "../../../controls/Nav/SubNav";
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
    color: ${({ theme }) => (theme.__type === "light" ? c_charcoal : c_white)};

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
  box-shadow: 0 0 0 1px ${c_charcoal};
`;
const ToggleSub = styled(Link)`
  ${title};

  font-size: 0.625em;
  display: block !important;
  position: relative;

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
    <NavLinkOutlined onClick={handleFavourite} opaque={1}>
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
  ${props =>
    props.fixedPosition
      ? fixedSubNavCss
      : css`
          margin-top: 1em;
        `}
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
  const windowScrollHandlerArticleNav = () => {
    const position =
      document.documentElement.scrollTop > 600
        ? document.documentElement.scrollTop
        : 0;

    // pop up at the bottom
    if (document.documentElement.scrollTop > document.body.scrollHeight - 3500)
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
        throttle(windowScrollHandlerArticleNav, 100),
        true
      );

    return fixedPosition
      ? () => {
          window.removeEventListener(
            "scroll",
            throttle(windowScrollHandlerArticleNav, 100),
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
      Router.router.push("/account");
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

  // const coffeeLink = props.leadAuthorButton?.to;
  // const isKoFi = coffeeLink ? coffeeLink.includes("ko-fi") : false;
  // const isBuyMeACoffee = coffeeLink ? coffeeLink.includes("buymeacoff") : false;

  const dateModified = props.article.date?.updated
    ? dateFromUnix(props.article.date.updated)
    : null;
  const datePublished = props.article.date?.published
    ? dateFromUnix(props.article.date.published)
    : null;

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

        {/*
          props.coffee && (
          <NavItem>
            <NavModal
              unmarked
              opaque={1}
              noStar
              css={css`
                box-shadow: 0 0 0 1px ${c_charcoal};
              `}
              with={{
                info: {
                  title: "Thank the Author",
                  image: props.leadAuthor.image,
                  text: (
                    <ThankTheAuthor
                      authorName={props.leadAuthor.title}
                      isKoFi={isKoFi}
                      isBuyMeACoffee={isBuyMeACoffee}
                    />
                  ),
                  buttons: [
                    {
                      to: coffeeLink,
                      text: (
                        <>
                          <small>
                            <HeartInline />
                          </small>{" "}
                          Buy {getFirstNameFromFull(props.leadAuthor.title)} a
                          Coffee
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
              <HeartInline branded /> Thank the Author
            </NavModal>
          </NavItem>
        )
        */}

        {props.article?.slug && !props.article.isSubmission && (
          <NavItem>
            <NavModal
              opaque={1}
              unmarked
              noStar
              css={css`
                box-shadow: 0 0 0 1px ${c_charcoal};
              `}
              onClick={() =>
                ga("event", {
                  category: "nav",
                  action: "aritcle.subnav.share",
                  label: props.article?.slug,
                })
              }
              with={shareModal({
                url: `https://www.analog.cafe/r/${props.article?.slug}`,
                title: props.article?.title,
                subtitle: props.article?.subtitle,
                authorName: props.leadAuthor?.title,
                id: props.article?.slug,
              })}
            >
              <ShareButtonText marginLeft={"0em"} />
            </NavModal>
          </NavItem>
        )}

        <NavItem>
          <NavModal
            opaque={1}
            unmarked
            noStar
            css={css`
              box-shadow: 0 0 0 1px ${c_charcoal};
            `}
            with={{
              info: {
                image: props.article?.poster,
                text: props.article?.title && props.article?.summary && (
                  <>
                    <h3 style={{ fontStyle: "normal" }}>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`https://www.analog.cafe/r/${props.article?.slug}`}
                        onClick={() => dispatch(hideModal())}
                      >
                        {props.article.title}
                      </Link>
                    </h3>
                    {props.article.subtitle && (
                      <h4 style={{ fontStyle: "normal" }}>
                        <small>{props.article.subtitle}</small>
                      </h4>
                    )}
                    <small>
                      {(() => {
                        if (!datePublished) return null;
                        return (
                          <ClampedSubtitle
                            style={{
                              opacity: 0.5,
                            }}
                          >
                            <span title="Date this article was published">
                              {datePublished.human}
                            </span>
                            {dateModified.human !== datePublished.human && (
                              <>
                                {" "}
                                —{" "}
                                <span title="Date this article was updated">
                                  {dateModified.human}
                                </span>
                              </>
                            )}
                          </ClampedSubtitle>
                        );
                      })()}
                    </small>
                    {!props.article.isSubmission && (
                      <div>
                        <Label
                          inverse
                          style={{
                            marginLeft: 0,
                            marginRight: "0.5em",
                            display: "inline-block",
                          }}
                        >
                          <Link
                            to={`/${props.article.tag}`}
                            style={{
                              textDecoration: "none",
                              fontStyle: "normal",
                            }}
                            onClick={() => dispatch(hideModal())}
                          >
                            {props.article.tag}
                          </Link>
                        </Label>

                        {props.article.collections &&
                          Object.keys(props.article.collections).map(key => (
                            <Label
                              key={key}
                              style={{
                                marginLeft: 0,
                                marginRight: "0.5em",
                                display: "inline-block",
                              }}
                            >
                              <Link
                                to={
                                  rewrites.find(({ url }) => url.includes(key))
                                    .url
                                }
                                style={{
                                  textDecoration: "none",
                                  fontStyle: "normal",
                                }}
                                onClick={() => dispatch(hideModal())}
                              >
                                {key}
                              </Link>
                            </Label>
                          ))}
                      </div>
                    )}
                    <p style={{ paddingTop: "1em" }}>{props.article.summary}</p>
                  </>
                ),
                title: <>Reading Tools & Info</>,
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
                    to: "#dark-mode",
                    text: "RENDER_DARK_MODE_SWITCHER",
                    onClick: event => {
                      event.preventDefault();
                      event.stopPropagation();
                      event.target.blur();
                      dispatch(toggleTheme());
                    },
                  },
                  // shareModalTrigger({
                  //   url: `https://www.analog.cafe/r/${props.article.slug}`,
                  //   title: props.article.title,
                  //   subtitle: props.article.subtitle,
                  //   authorName: props.leadAuthor.title,
                  //   id: props.article.slug,
                  // }),
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
                opaque={1}
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
                    opaque={1}
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
                  opaque={1}
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
                    opaque={1}
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
                      opaque={1}
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
                    opaque={1}
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
                  opaque={1}
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
