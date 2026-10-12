import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/dm-sans";
import App from "./App";
import "./tokens.css";
import "./styles.css";
import "./pages.css";
import "./motion.css";
import "./components/ButterCursor.css";
import "./pages/Studio.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
