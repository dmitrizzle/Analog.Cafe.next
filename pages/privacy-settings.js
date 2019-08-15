import React from "react";

import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import Button from "../core/components/controls/Button";
import CardHeader from "../core/components/controls/Card/components/CardHeader";
import CardIntegrated from "../core/components/controls/Card/components/CardIntegrated";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Main from "../core/components/layouts/Main";

const RESTART_DELAY = 5000;
export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    // client only
    if (process.browser) {
      this.state = {
        isHidden: true,
        dataSharing: {
          googleAnalytics:
            localStorage.getItem("ga-enabled") === "false" ? false : true,
          fullStory:
            localStorage.getItem("fullstory-enabled") === "false"
              ? false
              : true,
        },
        restartCountDown: false,
        restartInSeconds: RESTART_DELAY / 1000,
        activeCounterId: 0,
      };
    } else {
      this.state = {
        isHidden: true,
      };
    }
  }
  componentDidMount = () => {
    this.setState({ isHidden: false });
  };
  restart = () => {
    const secondsMax = RESTART_DELAY / 1000;
    const activeCounterId = this.state.activeCounterId + 1;
    this.setState({
      restartInSeconds: secondsMax,
      activeCounterId,
    });
    for (let seconds = 0; seconds < secondsMax + 1; seconds++) {
      const periodical = setTimeout(() => {
        this.state.restartInSeconds === 1 && window && window.location.reload();
        this.state.activeCounterId === activeCounterId
          ? this.setState({
              restartInSeconds: secondsMax - seconds,
            })
          : clearTimeout(periodical);
      }, seconds * 1000);
    }
  };
  handleToggleGA = event => {
    event.target.blur();
    const googleAnalytics = !this.state.dataSharing.googleAnalytics;
    this.setState({
      dataSharing: {
        ...this.state.dataSharing,
        googleAnalytics,
      },
      restartCountDown: true,
    });
    localStorage.setItem("ga-enabled", googleAnalytics);
    this.restart();
  };
  handleToggleFS = event => {
    event.target.blur();
    const fullStory = !this.state.dataSharing.fullStory;
    this.setState({
      dataSharing: {
        ...this.state.dataSharing,
        fullStory,
      },
      restartCountDown: true,
    });
    localStorage.setItem("fullstory-enabled", fullStory);
    this.restart();
  };
  render = () => {
    const resetFontsize = { fontSize: "1em" };
    return (
      <Main>
        <ArticleWrapper>
          <HeaderLarge pageTitle="Privacy Settings" />
          <ArticleSection>
            <p>
              Google Analytics and FullStory is used by Analog.Cafe to
              anonymously (individual users can not be identified) study how the
              visitors are using the website and how the website experience
              could be improved based on those findings.
            </p>
            <p>
              Analog.Cafe will store your preferences in your browser’s{" "}
              <em>LocalStorage</em> (not a cookie) and remember them
              indefinitely, as long as your browser or you do not choose to
              remove that data.
            </p>
            {!this.state.isHidden && (
              <CardIntegrated >
                <CardHeader
                  stubborn
                  buttons={[0]}
                  noStar
                  title={
                    this.state.restartCountDown
                      ? `Restarting App in ${this.state.restartInSeconds}`
                      : "Share Usage Data With:"
                  }
                />
                <Button
                  onClick={this.handleToggleGA}
                  inverse={this.state.dataSharing.googleAnalytics}
                  style={resetFontsize}
                >
                  Google Analytics:
                  {this.state.dataSharing.googleAnalytics ? " ON" : " OFF"}
                </Button>
                <Button
                  onClick={this.handleToggleFS}
                  inverse={this.state.dataSharing.fullStory}
                  style={resetFontsize}
                >
                  FullStory: {this.state.dataSharing.fullStory ? " ON" : " OFF"}
                </Button>
              </CardIntegrated>
            )}
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    );
  };
}
