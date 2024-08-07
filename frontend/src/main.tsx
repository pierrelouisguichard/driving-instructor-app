import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthContextProvider>
    {" "}
    <BrowserRouter>
      <App />
      <ScrollToTopButton />
    </BrowserRouter>
  </AuthContextProvider>
);
