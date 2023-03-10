import { createGlobalStyle, ThemeProvider } from "styled-components";
import { LightTheme } from "../css/theme";
import reset from "styled-reset";
import { Outlet } from "react-router-dom";

const GlobalyStyle = createGlobalStyle`
${reset}
  *{
    user-select: none;
    box-sizing: border-box;
  }
  a{
    text-decoration: none;
    color:inherit;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
  }
  #root {
    height:70vh;
  }
`;

function Root() {
  return (
    <>
      <ThemeProvider theme={LightTheme}>
        <GlobalyStyle />
        <Outlet />
      </ThemeProvider>
    </>
  );
}

export default Root;
