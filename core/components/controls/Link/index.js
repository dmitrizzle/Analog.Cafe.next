import { withRouter } from "next/router";
import Link from "next/link";
import React, { Children } from "react";

import { DOMAIN } from "../../../../constants/routes";
import {
  createMaskedURLLinkProps,
  makeRelative,
  processRedirectedURLs
} from "./utils";
import AnchorWithLoadingAnimation from "./components/AnchorWithLoadingAnimation";

const A = props => {
  // remove unsafe props (props that cause warnings in nested components)
  const {
    connectionStatus,
    domain,
    as,
    router,
    activeClassName,
    prefetch,
    skipAnimation,
    ...safeProps
  } = props;

  const externalLinkAttributes = {
    target: "_blank",
    rel: "nofollow noopener noreferrer"
  };

  // all links within analog.cafe domain should become relative
  const address = makeRelative(
    safeProps.href || safeProps.to,
    DOMAIN.APP.PRODUCTION
  );

  // relative links within domain
  if (address.startsWith("/")) {
    const { to, title, ...anchorProps } = safeProps;
    // no title & to attribute necessary

    return (
      <ActiveLink
        href={address}
        as={as}
        router={router}
        activeClassName={activeClassName}
        prefetch={prefetch}
      >
        <AnchorWithLoadingAnimation
          {...anchorProps}
          skipAnimation={skipAnimation}
        >
          {safeProps.children}
        </AnchorWithLoadingAnimation>
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

const ActiveLink = ({
  router,
  children,
  activeClassName,
  href,
  as,
  ...props
}) => {
  // convert masked routes to props with {href, as}
  const asFromMasked = processRedirectedURLs(href);
  const hrefFromMasked = createMaskedURLLinkProps(href);

  // add class from activeClassName to child element if link is active
  // NOTE: this may not work for masked routes
  const child = Children.only(children);
  let className = child.props.className || null;
  if (router.pathname === hrefFromMasked && activeClassName) {
    className = `${
      className !== null ? className : ""
    } ${activeClassName}`.trim();
  }

  return (
    <Link {...props} href={hrefFromMasked} as={asFromMasked}>
      {React.cloneElement(child, { className, href: asFromMasked })}
    </Link>
  );
};

export default withRouter(A);
