import { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import { switchTheme } from "../../../store/actions-theme";
import { themeOptions } from "../../../../constants/styles/themes";
import { withRedux } from "../../../../utils/with-redux";

const Theme = ({ children, themeCookie }) => {
  const theme = useSelector(({ theme }) => theme);
  return <ThemeProvider theme={themeOptions[theme]}>{children}</ThemeProvider>;
};

export default withRedux(Theme);
