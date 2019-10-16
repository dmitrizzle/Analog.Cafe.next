import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

import { NavLink } from "../../../controls/Nav/components/NavLinks";
import { addComposerData } from "../../../../../user/store/actions-composer";
import {
  addFavourite,
  deleteFavourite,
  isFavourite,
} from "../../../../../user/store/actions-favourites";
import { b_phablet } from "../../../../../constants/styles/measurements";
import { c_black, c_white } from "../../../../../constants/styles/colors";
import { eventGA } from "../../../../../utils/data/ga";
import { hideModal, setModal } from "../../../../store/actions-modal";
import Link from "../../../controls/Link";
import Save from "../../../icons/Save";
import SubNav, { SubNavItem } from "../../../controls/Nav/SubNav";
import archive from "../../../../../utils/editor/archive";
import publishArticle from "../../../../../utils/editor/publish-article";
import reject from "../../../../../utils/editor/reject";
import sendToComposer from "../../../../../utils/editor/send-to-composer";
import unpublish from "../../../../../utils/editor/unpublish";

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

const NavItem = styled(SubNavItem)`
  a {
    ${({ fixedToEmWidth }) =>
      fixedToEmWidth &&
      css`
        width: ${fixedToEmWidth}em;
        display: inline-block;
      `}
      animation: ${fadeIn} 250ms;
    svg {
      height: 0.75em;
      margin: -0.25em 0 0 0;
      display: inline-block;
      overflow: visible;

      animation: ${({ isFavourite }) => (isFavourite ? fave : unfave)} 250ms
        cubic-bezier(0.46, 0.88, 0.37, 1.43) forwards;
      path {
        fill: ${c_black};
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
      label: `/zine/${props.article.slug}`,
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

  return (
    <SubNav wedge>
      {props.user && props.user.status === "ok" && !props.article.isSubmission && (
        <NavItem
          isFavourite={isFavourite}
          fixedToEmWidth={isFavourite ? 4.5 : 8.5}
        >
          <NavLink onClick={handleFavourite}>
            <Save
              style={{
                marginTop: "-.25em",
                color: c_black,
              }}
              stroke={c_black}
            />{" "}
            {!isFavourite ? "Save For Later" : "Saved"}
          </NavLink>
        </NavItem>
      )}
      {props.user &&
        props.user.status === "ok" &&
        userHasPermission() &&
        props.article.isSubmission && (
          <NavItem>
            <NavLink onClick={event => sendToComposer(event, props)}>
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
                  <NavLink onClick={event => unpublish(event, props)}>
                    Unpublish
                  </NavLink>
                </NavItem>
              )}
            {props.article.isSubmission && props.article.status === "pending" && (
              <NavItem>
                <NavLink onClick={event => reject(event, props)}>
                  Reject
                </NavLink>
              </NavItem>
            )}
            {props.article.isSubmission &&
              props.article.status !== "published" && (
                <NavItem>
                  <NavLink onClick={event => archive(event, props)}>
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
                      onClick={event => publishArticle(event, props)}
                    >
                      <LargerScreens>Publish </LargerScreens>◎
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
                    <LargerScreens>Submission </LargerScreens>❡
                  </NavLink>
                  {props.article.status === "published" && (
                    <LargerScreens>
                      <ToggleSub to={`/r/${props.article.slug}`}>
                        Switch to Live
                      </ToggleSub>
                    </LargerScreens>
                  )}
                </NavItem>
              </>
            ) : (
              <NavItem>
                <NavLink
                  style={{ zIndex: 1 }}
                  red
                  to={`/account/submission/${props.article.slug}`}
                >
                  <LargerScreens>Live </LargerScreens>◉
                </NavLink>
                <LargerScreens>
                  <ToggleSub to={`/account/submission/${props.article.slug}`}>
                    Submission
                  </ToggleSub>
                </LargerScreens>
              </NavItem>
            )}
          </>
        )}
    </SubNav>
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
    addComposerData: data => {
      dispatch(addComposerData(data));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleNav);
