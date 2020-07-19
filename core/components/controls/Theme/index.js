import { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import { switchTheme } from "../../../store/actions-theme";
import { themeOptions } from "../../../../constants/styles/themes";
import { withRedux } from "../../../../utils/with-redux";

const Theme = ({ children }) => {
  const theme = useSelector(({ theme }) => theme);
  const dispatch = useDispatch();

  useEffect(() => {
    (() => {
      if (!process.browser) return;
      const autoTheme =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

      const setTheme = localStorage.getItem("theme") || autoTheme || "light";

      let themeToggleDelay;
      window.addEventListener("load", () => {
        themeToggleDelay = setTimeout(() => {
          dispatch(switchTheme(setTheme));
          clearTimeout(themeToggleDelay);
        }, 2000);
      });
      return () => clearTimeout(themeToggleDelay);
    })();
  });

  return <ThemeProvider theme={themeOptions[theme]}>{children}</ThemeProvider>;
};

export default withRedux(Theme);
