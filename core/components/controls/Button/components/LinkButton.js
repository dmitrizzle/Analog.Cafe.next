import React from "react";

import { LinkButton } from "..";
import Link from "../../Link";

const CommonLink = props => {
  return <LinkButton linkComponent={Link} {...props} />;
};
const EmailLink = props => (
  <LinkButton
    href={props.to}
    linkComponent={"a"}
    style={{ textDecoration: "none" }}
    {...props}
  />
);

const LinkButtonMain = props => {
  return props.to && props.to.includes("mailto:") ? (
    <EmailLink {...props} />
  ) : (
    <CommonLink {...props} />
  );
};
export default LinkButtonMain;
