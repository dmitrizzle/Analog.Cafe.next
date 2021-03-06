import { NextSeo } from "next-seo";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

import { MENU_BUTTONS } from "../../core/components/controls/Menu/constants";
import { b_mobile } from "../../constants/styles/measurements";
import { withRedux } from "../../utils/with-redux";
import ArticleSection from "../../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../../core/components/pages/Article/components/ArticleWrapper";
import ButtonGroupDivider from "../../core/components/controls/Button/components/ButtonGroupDivider";
import CardHeader from "../../core/components/controls/Card/components/CardHeader";
import CardIntegrated from "../../core/components/controls/Card/components/CardIntegrated";
import FollowButtons from "../../core/components/controls/Button/components/FollowButtons";
import Footer from "../../core/components/layouts/Main/components/Footer";
import LinkButton from "../../core/components/controls/Button/components/LinkButton";
import Main from "../../core/components/layouts/Main";
import Search from "../../core/components/icons/Search";
import SearchButtonIcon from "../../core/components/controls/Menu/components/SearchButtonIcon";

const seo = {
  title: "Analog.Cafe Menu",
  description: "All of the main website sections are listed here.",
};

export default withRedux(() => {
  const dispatch = useDispatch();
  const theme = useSelector(({ theme }) => theme);
  return (
    <>
      <NextSeo title={seo.title} description={seo.description} />
      <Main>
        <ArticleWrapper>
          <ArticleSection style={{ maxWidth: b_mobile }}>
            <CardIntegrated withOutline>
              <CardHeader stubborn buttons={[0]} noStar title={<>More…</>} />
              <ButtonGroupDivider />
              <LinkButton style={{ fontSize: "1em" }} to={"/nav/search"}>
                <SearchButtonIcon>
                  <Search />
                </SearchButtonIcon>{" "}
                Search Analog.Cafe
              </LinkButton>
              <ButtonGroupDivider />
              {MENU_BUTTONS(dispatch, theme).map((button, i) => {
                if (button.divider) return <ButtonGroupDivider key={i} />;
                if (button.socialButtons)
                  return <FollowButtons key="FollowButtons" />;
                return (
                  <LinkButton key={i} {...button}>
                    {button.text}
                  </LinkButton>
                );
              })}
            </CardIntegrated>
          </ArticleSection>
        </ArticleWrapper>
        <Footer />
      </Main>
    </>
  );
});
