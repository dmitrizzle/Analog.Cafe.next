import React from "react";

import { LinkButton } from "..";
import Link from "../../Link";

const CommonLink = props => (
  <LinkButton linkComponent={Link} {...props}>
    {props.children}
  </LinkButton>
);
const EmailLink = props => (
  <LinkButton
    href={props.to}
    linkComponent={"a"}
    style={{ textDecoration: "none" }}
    {...props}
  >
    {props.children}
  </LinkButton>
);

const LinkButtonMain = props => {
  return props.to && props.to.includes("mailto:") ? (
    <EmailLink {...props} />
  ) : (
    <CommonLink {...props} />
  );
};
export default LinkButtonMain;
