import { connect } from "react-redux";
import React, { useEffect } from "react";

import { LabelWrap } from "../../../../core/components/controls/Docket";
import { getUserInfo } from "../../../store/actions-user";
import { makeFroth } from "../../../../utils/froth";
import { turnicateSentence } from "../../../../utils/author-credits";
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper";
import CardColumns, {
  CardIntegratedForColumns,
} from "../../../../core/components/controls/Card/components/CardColumns";
import CardHeader from "../../../../core/components/controls/Card/components/CardHeader";
import CardWithDockets, {
  CardWithDocketsImage,
  CardWithDocketsInfo,
} from "../../../../core/components/controls/Card/components/CardWithDockets";
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge";
import Label from "../../../../core/components/vignettes/Label";
import Link from "../../../../core/components/controls/Link";
import LinkButton from "../../../../core/components/controls/Button/components/LinkButton";
import Main from "../../../../core/components/layouts/Main";
import Placeholder from "../../../../core/components/vignettes/Picture/components/Placeholder";

const Dashboard = props => {
  const { info } = props.user;
  useEffect(() => {
    props.user.status === "forbidden" && process.browser && props.getUserInfo();
  });
  return (
    <Main>
      <ArticleWrapper>
        <HeaderLarge
          pageTitle="Your Account"
          pageSubtitle={
            info && info.title ? "Welcome Back!" : "Verifying Your Identity…"
          }
        />
        {props.user.status === "ok" && (
          <ArticleSection>
            {/* Profile and promo boxes */}
            <CardColumns>
              <CardIntegratedForColumns>
                <CardWithDockets href={`/u/${info.id}`}>
                  <CardWithDocketsImage
                    src={makeFroth({ src: info.image, size: "m" }).src}
                  >
                    <LabelWrap>
                      <Label branded>{info.role}</Label>
                    </LabelWrap>
                  </CardWithDocketsImage>
                  <CardWithDocketsInfo>
                    <h4>{info.title}</h4>
                    <small>
                      <em>{info.text && turnicateSentence(info.text, 40)}</em>
                    </small>
                  </CardWithDocketsInfo>
                </CardWithDockets>
                <LinkButton href="/account/profile">
                  Edit Your Profile
                </LinkButton>
              </CardIntegratedForColumns>
              <CardIntegratedForColumns>
                <Link to="/submit">
                  <figure style={{ lineHeight: 0 }}>
                    <Placeholder frothId="image-froth_1499794_BkFUA89IV">
                      <img
                        src={
                          makeFroth({
                            src: "image-froth_1499794_BkFUA89IV",
                            size: "s",
                          }).src
                        }
                      />
                    </Placeholder>
                  </figure>
                </Link>
              </CardIntegratedForColumns>
            </CardColumns>

            {/* Submissions and composer draft boxes */}
            <CardColumns>
              <CardIntegratedForColumns>
                <CardHeader
                  stubborn
                  buttons={[0]}
                  noStar
                  title="Your Recent Submissions"
                />
                <CardWithDocketsInfo
                  style={{ float: "none", width: "calc(100% - 1em)" }}
                >
                  <small>
                    <em>Submissions</em>
                  </small>
                </CardWithDocketsInfo>
                <LinkButton to="/account/submissions">View All</LinkButton>
              </CardIntegratedForColumns>

              <CardIntegratedForColumns>
                <CardHeader
                  stubborn
                  buttons={[0]}
                  noStar
                  title="Your Current Draft"
                />
                <CardWithDocketsInfo
                  style={{ float: "none", width: "calc(100% - 1em)" }}
                >
                  <h4>Title</h4>
                  <small>
                    <em>My Draft</em>
                  </small>
                </CardWithDocketsInfo>
                <LinkButton branded to="/submit/draft">
                  Edit Draft
                </LinkButton>
              </CardIntegratedForColumns>
            </CardColumns>
          </ArticleSection>
        )}
      </ArticleWrapper>
    </Main>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: () => {
      dispatch(getUserInfo());
    },
  };
};
export default connect(
  ({ user }) => {
    return { user };
  },
  mapDispatchToProps
)(Dashboard);
