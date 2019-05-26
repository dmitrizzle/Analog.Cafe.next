import { withRouter } from "next/router";
import Link from "next/link";
import React, { Children } from "react";

import { DOMAIN } from "../../../../constants/routes";
import { makeRelative } from "./utils";

const A = props => {
  // remove unsafe props (props that cause warnings in nested components)
  const {
    connectionStatus,
    domain,
    as,
    router,
    activeClassName,
    ...safeProps
  } = props;

  const externalLinkAttributes = {
    target: "_blank",
    rel: "nofollow noopener noreferrer",
  };

  // all links within analog.cafe domain should become relative
  const address = makeRelative(
    safeProps.href || safeProps.to,
    DOMAIN.APP.PRODUCTION
  );

  // relative links within domain
  if (address.startsWith("/")) {
    const { to, title, ...anchorProps } = safeProps;
    // no title attribute necessary
    return (
      <ActiveLink
        href={address}
        as={as}
        router={router}
        activeClassName={activeClassName}
      >
        <a {...anchorProps}>{safeProps.children}</a>
      </ActiveLink>
    );
  }

  // external links
  if (address.includes("http"))
    return (
      <a
        href={address}
        title={address}
        {...externalLinkAttributes}
        {...safeProps}
      >
        {safeProps.children}
      </a>
    );

  // anchor tags
  if (address.includes("#"))
    return (
      <a href={address} title={address} {...safeProps}>
        {safeProps.children}
      </a>
    );

  // fix links with missing protocol
  return (
    <a
      href={"http://" + address}
      title={"http://" + address}
      {...externalLinkAttributes}
      {...safeProps}
    >
      {safeProps.children}
    </a>
  );
};

const ActiveLink = ({ router, children, activeClassName, ...props }) => {
  console.log(router.pathname === props.href && activeClassName);
  const child = Children.only(children);
  let className = child.props.className || null;
  if (router.pathname === props.href && activeClassName) {
    className = `${
      className !== null ? className : ""
    } ${activeClassName}`.trim();
  }

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default withRouter(A);
