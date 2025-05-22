import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import AppContext from "./context/AppContext.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <AppContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppContext>
);
