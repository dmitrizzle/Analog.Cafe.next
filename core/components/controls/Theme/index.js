import { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import lscache from "lscache";

import { interpretTheme } from "./utils";
import { switchTheme } from "../../../store/actions-theme";
import { themeOptions } from "../../../../constants/styles/themes";
import { withRedux } from "../../../../utils/with-redux";

const Theme = ({ children }) => {
  const theme = interpretTheme(useSelector(({ theme }) => theme));
  const dispatch = useDispatch();

  useEffect(() => {
    if (process.browser) {
      const themePrefs = lscache.get("theme") || "auto";
      dispatch(switchTheme(themePrefs));
    }
  });

  return <ThemeProvider theme={themeOptions[theme]}>{children}</ThemeProvider>;
};

export default withRedux(Theme);
