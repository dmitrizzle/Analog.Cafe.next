import { connect } from "react-redux";
import { storeContentState } from "@roast-cms/french-press-editor/dist/utils/storage";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import styled, { keyframes, css } from "styled-components";

import { NavLink } from "../../../controls/Nav/components/NavLinks";
import {
  addFavourite,
  deleteFavourite,
  isFavourite,
} from "../../../../../user/store/actions-favourites";
import {
  c_black,
  c_red,
  c_white,
} from "../../../../../constants/styles/colors";
import { loadHeader, saveHeader } from "../../../../../utils/storage";
import { setModal } from "../../../../store/actions-modal";
import { setSubmissionId } from "../../../../../user/store/actions-composer";
import { turnicateSentence } from "../../../../../utils/author-credits";
import Heart from "../../../icons/Heart";
import SubNav, { SubNavItem } from "../../../controls/Nav/SubNav";

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
    ${({ fixedToEmWidth }) =>
      fixedToEmWidth &&
      css`
        width: ${fixedToEmWidth}em;
        display: inline-block;
      `}
    svg {
      height: 0.75em;
      margin: -0.25em 0 0 0;
      display: inline-block;
      overflow: visible;

      animation: ${({ isFavourite }) => (isFavourite ? fave : unfave)} 250ms
        cubic-bezier(0.46, 0.88, 0.37, 1.43) forwards;
      path {
        fill: ${({ isFavourite }) => (isFavourite ? c_red : c_white)};
        stroke: ${({ isFavourite }) => (isFavourite ? c_red : c_black)};
        stroke-width: ${({ isFavourite }) => (isFavourite ? 1 : 2)}px;
      }
    }
  }
  a:focus,
  a:active {
    svg path {
      stroke: ${({ isFavourite }) => (isFavourite ? c_white : "none")};
    }
  }
`;

const ArticleNav = props => {
  // determine favourite status
  const [isFavourite, setFavouriteStatus] = useState(false);
  useEffect(() => {
    if (!props.favourites[props.article.id])
      props.isFavourite(props.article.id);
    setFavouriteStatus(
      props.favourites[props.article.id] &&
        props.favourites[props.article.id].user > 0
    );
  }, [props.favourites[props.article.id]]);

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
        <NavItem isFavourite={isFavourite} fixedToEmWidth={4.5}>
          <NavLink onClick={handleFavourite}>
            <Heart /> Save{isFavourite && "d"}
          </NavLink>
        </NavItem>
      )}
      {props.user &&
        props.user.status === "ok" &&
        userHasPermission() &&
        props.article.isSubmission && (
          <NavItem>
            <NavLink
              onClick={event => {
                event.preventDefault();
                const draftTitle = loadHeader().title;
                const draftBody = localStorage.getItem("composer-content-text");

                const { title, subtitle, content, id } = props.article;

                const copyDraft = () => {
                  // store article state into LS
                  saveHeader({ title, subtitle });
                  storeContentState(content.raw);
                  props.setSubmissionId(id);

                  // redirect
                  Router.push("/submit/draft");
                };

                if (draftTitle || draftBody) {
                  return props.setModal({
                    status: "ok",
                    info: {
                      title: "Overwrite Current Draft?",
                      text: () => (
                        <div>
                          <h4>{draftTitle || "Untitled"}</h4>
                          {turnicateSentence(draftBody, 120)}
                        </div>
                      ),
                      buttons: [
                        {
                          to: "/submit/draft",
                          onClick: event => {
                            event.preventDefault();
                            copyDraft();
                          },
                          text: "Overwrite",
                          branded: true,
                        },
                        {
                          to: "#overwrite-draft",
                          text: "View Draft",
                        },
                        {
                          to: "#cancel",
                          onClick: event => {
                            event.preventDefault();
                          },
                          text: "Cancel",
                        },
                      ],
                    },
                    id: "hints/edit",
                  });
                }
                copyDraft();
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
                  <NavLink>Unpublish</NavLink>
                </NavItem>
              )}
            {props.article.isSubmission && props.article.status === "pending" && (
              <>
                <NavItem>
                  <NavLink>Reject</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>Archive</NavLink>
                </NavItem>
              </>
            )}
            {props.article.isSubmission ? (
              <>
                <NavItem>
                  <NavLink>
                    {props.article.status === "published"
                      ? "Publish Update"
                      : "Publish"}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    blue
                    to={
                      props.article.status === "published"
                        ? `/r/${props.article.slug}`
                        : "#"
                    }
                  >
                    Submission
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <NavItem>
                <NavLink red to={`/account/submission/${props.article.slug}`}>
                  Live!
                </NavLink>
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
    setSubmissionId: id => {
      dispatch(setSubmissionId(id));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleNav);
