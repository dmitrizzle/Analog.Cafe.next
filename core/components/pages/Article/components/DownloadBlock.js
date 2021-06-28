import React from "react";

import {
  DocketResponsive,
  DocketResponsiveImage,
  DocketResponsiveInfo,
} from "../../List/components/DocketResponsive";
import { LabelWrap } from "../../../controls/Docket";
import Label from "../../../vignettes/Label";
import Link from "../../../controls/Link";
import LinkButton from "../../../controls/Button/components/LinkButton";

const DownloadBlock = ({
  downloadLink,
  downloadClick,
  article,
  description,
  user,
}) => (
  <>
    <div style={{ display: "flex", paddingTop: "1.5em" }}>
      <DocketResponsive
        to={downloadLink}
        onClick={downloadClick}
        style={{
          maxWidth: "32em",
          margin: "0 auto",
        }}
      >
        <DocketResponsiveImage tag={article.tag} src={article.poster} />
        <DocketResponsiveInfo>
          <h4>{article.title}</h4>
          <small>
            <em>{description}</em>
          </small>
        </DocketResponsiveInfo>
        <LabelWrap>
          <Label blue>Download</Label>
        </LabelWrap>
      </DocketResponsive>
    </div>
    <LinkButton branded to={downloadLink} onClick={downloadClick}>
      {user.status === "ok" ? "Get It" : "Continue to Sign In"}
    </LinkButton>
    {user.status !== "ok" && (
      <small style={{ textAlign: "center", display: "block" }}>
        <em>
          Free, 5 seconds to sign up,{" "}
          <Link to="/privacy-policy" target="_blank">
            no spam
          </Link>
          .
        </em>
      </small>
    )}
  </>
);

export default DownloadBlock;
