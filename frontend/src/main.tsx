import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { AuthContextProvider } from "./context/AuthContext";
import GlobalStyles from "./Styles/Global";
import { ThemeProvider } from "styled-components";
import { theme } from "./Styles/Theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthContextProvider>
    {" "}
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
        <ScrollToTopButton />
      </ThemeProvider>
    </BrowserRouter>
  </AuthContextProvider>
);
