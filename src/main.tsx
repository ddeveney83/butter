import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/nunito";
import App from "./App";
import "./tokens.css";
import "./styles.css";
import "./pages.css";
import "./motion.css";
import "./components/ButterCursor.css";
import "./pages/Studio.css";
import "./brand-refresh.css";
import "./pages/Leads.css";
import "./components/HomeHero.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
