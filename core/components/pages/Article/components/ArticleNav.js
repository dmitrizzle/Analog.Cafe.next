import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

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
        stroke-width: ${({ isFavourite }) => (isFavourite ? 1 : 3)}px;
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
const Nav = styled(SubNav)`
  position: absolute;
  width: 100%;
  padding: 0;
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
    event.preventDefault();
    event.target.blur();
    setFavouriteStatus(!isFavourite);
    isFavourite
      ? props.deleteFavourite(props.article.id)
      : props.addFavourite({
          id: props.article.id,
          slug: props.article.slug,
        });
  };

  return (
    <Nav>
      <NavItem isFavourite={isFavourite}>
        <NavLink onClick={handleFavourite}>
          <Heart /> Save{isFavourite && "d"}
        </NavLink>
      </NavItem>
    </Nav>
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
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleNav);
