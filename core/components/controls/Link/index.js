import { withRouter } from "next/router";
import Link from "next/link";
import React, { Children } from "react";

import { DOMAIN } from "../../../../constants/router/defaults";
import {
  createMaskedURLLinkProps,
  makeRelative,
  processRedirectedURLs,
} from "./utils";
import ActiveLinkChild from "./components/ActiveLinkChild";
import ga from "../../../../utils/data/ga";

const A = props => {
  // remove unsafe props (props that cause warnings in nested components)
  const {
    // eslint-disable-next-line
    connectionStatus,
    // eslint-disable-next-line
    domain,
    as,
    router,
    activeClassName,
    scroll,
    affiliatePartnersData,
    ...safeProps
  } = props;

  const externalLinkAttributes = (address, isAffiliateLink) => {
    const className = `${safeProps.className ? safeProps.className : ""}${
      isAffiliateLink ? " verified-op" : ""
    }`;
    return {
      target: "_blank",
      rel: "nofollow noopener noreferrer",
      className,
      onClick: () =>
        ga("event", {
          category: "out",
          action: "Link.external",
          label: address,
        }),
    };
  };

  // all links within analog.cafe domain should become relative
  const address = makeRelative(
    safeProps.href || safeProps.to,
    DOMAIN.APP.PRODUCTION
  );

  const isAffiliateLink = (() => {
    let isAffiliate = false;
    ["ebay.com"].forEach(linkPattern => {
      if (address.includes(linkPattern)) isAffiliate = true;
    });
    return isAffiliate;
  })();

  // relative links within domain
  if (address.startsWith("/")) {
    // eslint-disable-next-line
    const { to, title, ...anchorProps } = safeProps;
    // no title & to attribute necessary

    return (
      <ActiveLink
        scroll={scroll}
        href={address}
        as={as}
        router={router}
        activeClassName={activeClassName}
      >
        <ActiveLinkChild {...anchorProps}>{safeProps.children}</ActiveLinkChild>
      </ActiveLink>
    );
  }

  // external links
  if (address.includes("http"))
    return (
      <a
        href={address}
        title={`${
          isAffiliateLink ? "Promoted" : "External"
        } website: ${address}`}
        {...externalLinkAttributes(address, isAffiliateLink)}
        {...safeProps}
      >
        {safeProps.children}
      </a>
    );

  // external anchor tags
  if (address.match(/#\w+/)) {
    return (
      <a
        href={address}
        title={`${
          address.includes("/") ? "Go and j" : "J"
        }ump to section: ${address}`}
        {...safeProps}
        router={router}
      >
        {safeProps.children}
      </a>
    );
  }

  // fix links with missing protocol
  return (
    <a
      href={"http://" + address}
      {...externalLinkAttributes(address, isAffiliateLink)}
      {...safeProps}
    >
      {safeProps.children}
    </a>
  );
};

const ActiveLink = ({
  title,
  router,
  children,
  activeClassName,
  href,
  ...props
}) => {
  // convert masked routes to props with {href, as}
  const asFromMasked = processRedirectedURLs(href);
  const hrefFromMasked = createMaskedURLLinkProps(href);

  // add class from activeClassName to child element if link is active
  // NOTE: this may not work for masked routes
  const child = Children.only(children);
  let className = child.props.className || null;

  if (router.asPath === asFromMasked && activeClassName) {
    className = `${
      className !== null ? className : ""
    } ${activeClassName}`.trim();
  }

  const titleWithInfo = (() => {
    // do not show title if has preventDefault actions
    if (child.props?.onClick) return undefined;

    if (title) return title;
    if (asFromMasked.includes("/u/")) return "Go to Analog.Cafe member profile";
    if (asFromMasked.includes("/r/")) return "Go to Analog.Cafe article";
    return undefined;
  })();

  return (
    <Link {...props} href={hrefFromMasked} as={asFromMasked} passHref>
      {React.cloneElement(child, {
        className,
        title: titleWithInfo,
      })}
    </Link>
  );
};

export default withRouter(A);
