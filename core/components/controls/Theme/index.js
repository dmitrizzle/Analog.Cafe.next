import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import React from "react";

import { themeOptions } from "../../../../constants/styles/themes";
import { withRedux } from "../../../../utils/with-redux";

const Theme = ({ children }) => {
  const theme = useSelector(({ theme }) => theme);
  return <ThemeProvider theme={themeOptions[theme]}>{children}</ThemeProvider>;
};

export default withRedux(Theme);
