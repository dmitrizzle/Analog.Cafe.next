import React from "react";

import Button, { LinkButton } from "..";
import Link from "../../Link";

const CommonLink = props => (
  <LinkButton linkComponent={Link} {...props}>
    {props.children}
  </LinkButton>
);
const EmailLink = props => (
  <a href={props.to} style={{ textDecoration: "none" }}>
    <Button {...props} />
  </a>
);

export default props => {
  return props.to && props.to.includes("mailto:") ? (
    <EmailLink {...props} />
  ) : (
    <CommonLink {...props} />
  );
};
