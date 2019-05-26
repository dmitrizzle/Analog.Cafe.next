import Link from "next/link";
import React from "react";

import { DOMAIN } from "../../../../constants/routes";
import { makeRelative } from "./utils";

const A = props => {
  // remove unsafe props (props that cause warnings in nested components)
  const { connectionStatus, domain, ...safeProps } = props;

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
    // no title attribute necessary
    return (
      <Link href={address}>
        <a {...anchorProps}>{safeProps.children}</a>
      </Link>
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

export default props => (
  <A domain={DOMAIN.APP.PRODUCTION} {...props}>
    {props.children}
  </A>
);
